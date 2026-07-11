// ═══════════════════════════════════════════════════════════════
// PEDOPLANDB WITH VISIT TRACKING — COMPLETE IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════
// This replaces the entire PedoPlanDB object in PedoPlan_v5.html
// New Features:
// - Per-patient visit logs stored in IndexedDB
// - Visit save prompt after generating game plan
// - Visit timeline modal for each patient
// - Load last visit functionality
// ═══════════════════════════════════════════════════════════════

const PedoPlanDB = {

  // ── CONFIGURATION ─────────────────────────────────────────────
  SUPABASE_URL : 'https://ebtvqlltlrbjubkbitdu.supabase.co',
  SUPABASE_KEY : 'sb_publishable_If9dyweScLVGsFFr4MIwmQ_0CAINVbB',
  TABLE        : 'patients',
  
  // ── IndexedDB configuration ───────────────────────────────────
  DB_NAME: 'PedoPlanOfflineDB',
  DB_VERSION: 2,  // Incremented for schema upgrade
  STORE_NAME: 'patients',
  _db: null,
  _lastSavedTime: null,
  _currentGamePlanData: null,  // Store current plan for visit save

  // ── Internal: true once URL+KEY have been set ─────────────────
  get configured() {
    return this.SUPABASE_URL !== 'YOUR_SUPABASE_PROJECT_URL' &&
           this.SUPABASE_KEY !== 'YOUR_SUPABASE_ANON_KEY';
  },
  
  // ── Check if running in Electron (desktop mode) ───────────────
  get isDesktopMode() {
    return window.electronAPI && window.electronAPI.isElectron;
  },

  // ── Internal: build Supabase REST endpoint ────────────────────
  _endpoint: function(params = '') {
    return `${this.SUPABASE_URL}/rest/v1/${this.TABLE}${params}`;
  },

  // ── Internal: standard headers for every request ─────────────
  _headers: function(extra = {}) {
    return {
      'Content-Type'  : 'application/json',
      'apikey'        : this.SUPABASE_KEY,
      'Authorization' : `Bearer ${this.SUPABASE_KEY}`,
      ...extra
    };
  },

  // ── Get current user email from auth session ──────────────────
  _userEmail: function() {
    try {
      const s = JSON.parse(localStorage.getItem('pp_auth_session') || '{}');
      return s.email || 'anonymous';
    } catch { return 'anonymous'; }
  },

  // ── Generate UUID v4 ───────────────────────────────────────────
  _generateUUID: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  // ── Initialize IndexedDB (with visit support) ─────────────────
  _initDB: function() {
    return new Promise((resolve, reject) => {
      if (this._db) {
        resolve(this._db);
        return;
      }

      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
      
      request.onerror = () => {
        console.error('IndexedDB open error:', request.error);
        reject(request.error);
      };
      
      request.onsuccess = () => {
        this._db = request.result;
        console.info('IndexedDB: Connected to PedoPlanOfflineDB');
        resolve(this._db);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create or upgrade object store
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          const objectStore = db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
          objectStore.createIndex('name', 'name', { unique: false });
          objectStore.createIndex('created_at', 'created_at', { unique: false });
          objectStore.createIndex('user_email', 'user_email', { unique: false });
          console.info('IndexedDB: Created object store "patients"');
        }
      };
    });
  },

  // ══════════════════════════════════════════════════════════════
  // VISIT MANAGEMENT
  // ══════════════════════════════════════════════════════════════

  // ── ADD a visit to a patient's record ─────────────────────────
  addVisit: async function(patientId, visitData) {
    const db = await this._initDB();
    
    return new Promise(async (resolve, reject) => {
      const transaction = db.transaction([this.STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(this.STORE_NAME);
      const getRequest = objectStore.get(patientId);
      
      getRequest.onsuccess = () => {
        const patient = getRequest.result;
        if (!patient) {
          reject(new Error('Patient not found'));
          return;
        }
        
        // Initialize visits array if it doesn't exist
        if (!patient.visits) {
          patient.visits = [];
        }
        
        // Create new visit record
        const newVisit = {
          visit_id: this._generateUUID(),
          date: new Date().toISOString(),
          procedure: visitData.procedure || '',
          frankl_score: visitData.frankl_score || '',
          techniques_used: visitData.techniques_used || '',
          what_worked: visitData.what_worked || '',
          what_failed: visitData.what_failed || '',
          notes: visitData.notes || '',
          created_at: new Date().toISOString()
        };
        
        // Add visit to beginning (newest first)
        patient.visits.unshift(newVisit);
        patient.updated_at = new Date().toISOString();
        
        // Update patient record
        const putRequest = objectStore.put(patient);
        
        putRequest.onsuccess = () => {
          console.info('Visit added successfully');
          resolve(newVisit);
        };
        
        putRequest.onerror = () => {
          reject(putRequest.error);
        };
      };
      
      getRequest.onerror = () => {
        reject(getRequest.error);
      };
    });
  },

  // ── GET a patient by ID ───────────────────────────────────────
  getPatient: async function(patientId) {
    const db = await this._initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.STORE_NAME], 'readonly');
      const objectStore = transaction.objectStore(this.STORE_NAME);
      const request = objectStore.get(patientId);
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = () => {
        reject(request.error);
      };
    });
  },

  // ── SHOW visit save prompt after game plan generation ─────────
  showVisitSavePrompt: function(patientData, gamePlanData) {
    // Store data for later
    this._currentGamePlanData = { patientData, gamePlanData };
    
    // Remove existing prompt if any
    const existing = document.getElementById('ppVisitSavePrompt');
    if (existing) existing.remove();
    
    // Create prompt banner
    const banner = document.createElement('div');
    banner.id = 'ppVisitSavePrompt';
    banner.style.cssText = `
      position:fixed;top:70px;left:50%;transform:translateX(-50%);
      z-index:10000;max-width:500px;width:90%;
      background:var(--accent-bg);border:2px solid var(--accent-border);
      border-radius:12px;padding:14px 18px;
      box-shadow:0 8px 24px rgba(0,48,135,0.2);
      display:flex;align-items:center;gap:12px;
      animation:slideDown 0.3s ease;
      font-family:var(--sans);
    `;
    
    banner.innerHTML = `
      <i class="fas fa-save" style="color:var(--accent);font-size:18px;"></i>
      <div style="flex:1;">
        <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:2px;">
          Save this as a visit for ${patientData.name}?
        </div>
        <div style="font-size:11px;color:var(--text2);">
          Track behavior patterns across appointments
        </div>
      </div>
      <button onclick="PedoPlanDB._handleVisitSave(true)" style="
        background:var(--accent);color:white;border:none;
        border-radius:8px;padding:8px 16px;font-size:12px;font-weight:600;
        cursor:pointer;font-family:var(--sans);
      ">
        <i class="fas fa-check" style="margin-right:4px;"></i>Yes, Save Visit
      </button>
      <button onclick="PedoPlanDB._handleVisitSave(false)" style="
        background:var(--surface2);color:var(--text2);border:1px solid var(--border);
        border-radius:8px;padding:8px 12px;font-size:12px;font-weight:600;
        cursor:pointer;font-family:var(--sans);
      ">
        Skip
      </button>
    `;
    
    document.body.appendChild(banner);
    
    // Auto-dismiss after 15 seconds
    setTimeout(() => banner.remove(), 15000);
  },

  // ── Handle visit save button clicks ───────────────────────────
  _handleVisitSave: async function(shouldSave) {
    const banner = document.getElementById('ppVisitSavePrompt');
    if (banner) banner.remove();
    
    if (!shouldSave || !this._currentGamePlanData) {
      this._currentGamePlanData = null;
      return;
    }
    
    try {
      const { patientData, gamePlanData } = this._currentGamePlanData;
      
      // Find or create patient
      const patients = await this.loadPatients();
      let patient = patients.find(p => 
        p.name.toLowerCase() === patientData.name.toLowerCase()
      );
      
      // If patient doesn't exist, create it first
      if (!patient) {
        patient = await this.savePatient(patientData);
      }
      
      // Add visit
      await this.addVisit(patient.id, {
        procedure: patientData.procedure,
        frankl_score: patientData.behavior,
        techniques_used: gamePlanData.techniques || '',
        what_worked: gamePlanData.what_worked || '',
        what_failed: gamePlanData.what_failed || '',
        notes: gamePlanData.notes || ''
      });
      
      toast(`✓ Visit saved for ${patientData.name}`);
      this._currentGamePlanData = null;
    } catch (err) {
      console.error('Error saving visit:', err);
      toast('Failed to save visit');
    }
  },

  // ── SHOW visit timeline modal for a patient ───────────────────
  showVisitTimeline: async function(patientId) {
    try {
      const patient = await this.getPatient(patientId);
      if (!patient) {
        toast('Patient not found');
        return;
      }
      
      // Create modal
      const modal = document.createElement('div');
      modal.id = 'ppVisitTimelineModal';
      modal.style.cssText = `
        position:fixed;inset:0;z-index:50000;
        background:rgba(20,15,10,.65);backdrop-filter:blur(4px);
        display:flex;align-items:center;justify-content:center;
        padding:16px;overflow-y:auto;font-family:var(--sans);
      `;
      modal.addEventListener('click', e => { 
        if(e.target === modal) modal.remove(); 
      });
      
      const visits = patient.visits || [];
      const visitCards = visits.length ? visits.map(v => this._renderVisitCard(v)).join('') : `
        <div style="text-align:center;padding:48px 24px;color:var(--text3);">
          <i class="fas fa-calendar-plus" style="font-size:32px;margin-bottom:12px;display:block;opacity:.4;"></i>
          <div style="font-size:14px;font-weight:600;color:var(--text2);">No visits recorded yet</div>
          <div style="font-size:12px;margin-top:4px;">Save visits after generating game plans to track progress.</div>
        </div>
      `;
      
      modal.innerHTML = `
        <div style="
          background:var(--surface);border:1px solid var(--border);border-radius:16px;
          max-width:680px;width:100%;max-height:90vh;
          box-shadow:0 24px 64px rgba(0,0,0,0.2);
          display:flex;flex-direction:column;overflow:hidden;
        ">
          <div style="padding:20px 24px;border-bottom:1px solid var(--border);flex-shrink:0;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div>
                <div style="font-family:var(--serif);font-size:20px;color:var(--text);margin-bottom:2px;">
                  <i class="fas fa-history" style="color:var(--accent);margin-right:8px;font-size:16px;"></i>
                  Visit Timeline
                </div>
                <div style="font-size:13px;color:var(--text2);font-weight:600;">
                  ${patient.name}
                </div>
              </div>
              <button onclick="document.getElementById('ppVisitTimelineModal').remove();" style="
                background:none;border:none;font-size:22px;cursor:pointer;
                color:var(--text3);line-height:1;padding:4px;
              ">×</button>
            </div>
          </div>
          
          <div style="overflow-y:auto;flex:1;padding:16px 24px 20px;">
            ${visitCards}
          </div>
          
          <div style="padding:12px 24px;border-top:1px solid var(--border);background:var(--surface2);font-size:11px;color:var(--text3);">
            <i class="fas fa-calendar-check" style="margin-right:4px;color:var(--accent);"></i>
            ${visits.length} visit${visits.length !== 1 ? 's' : ''} recorded
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          modal.remove();
          document.removeEventListener('keydown', escHandler);
        }
      });
    } catch (err) {
      console.error('Error showing visit timeline:', err);
      toast('Failed to load visit timeline');
    }
  },

  // ── Render a single visit card ────────────────────────────────
  _renderVisitCard: function(visit) {
    const franklColors = {
      'definitely_negative': { bg: 'var(--red-bg)', color: 'var(--red)', border: 'var(--red-border)' },
      'definitely-negative': { bg: 'var(--red-bg)', color: 'var(--red)', border: 'var(--red-border)' },
      'negative': { bg: 'var(--amber-bg)', color: 'var(--amber)', border: 'var(--amber-border)' },
      'positive': { bg: 'var(--green-bg)', color: 'var(--green)', border: 'var(--green-border)' },
      'definitely_positive': { bg: 'var(--accent-bg)', color: 'var(--accent)', border: 'var(--accent-border)' },
      'definitely-positive': { bg: 'var(--accent-bg)', color: 'var(--accent)', border: 'var(--accent-border)' }
    };
    
    const colors = franklColors[visit.frankl_score] || franklColors.positive;
    
    return `
      <div style="
        background:var(--surface);border:1px solid var(--border);
        border-radius:12px;padding:16px;margin-bottom:12px;
      ">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px;">
          <div>
            <div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:4px;">
              ${visit.procedure || 'General Visit'}
            </div>
            <div style="font-size:11px;color:var(--text3);">
              <i class="fas fa-calendar" style="margin-right:4px;"></i>
              ${this._date(visit.date)}
            </div>
          </div>
          <span style="
            font-size:10px;font-weight:700;padding:4px 10px;border-radius:20px;white-space:nowrap;
            background:${colors.bg};color:${colors.color};border:1px solid ${colors.border};
          ">${this._fmt('behavior', visit.frankl_score)}</span>
        </div>
        
        ${visit.what_worked ? `
          <div style="margin-bottom:10px;">
            <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--green);margin-bottom:4px;">
              <i class="fas fa-check-circle" style="margin-right:4px;"></i>What Worked
            </div>
            <div style="font-size:12px;color:var(--text2);line-height:1.5;">
              ${visit.what_worked}
            </div>
          </div>
        ` : ''}
        
        ${visit.what_failed ? `
          <div style="margin-bottom:10px;">
            <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--red);margin-bottom:4px;">
              <i class="fas fa-times-circle" style="margin-right:4px;"></i>What Failed
            </div>
            <div style="font-size:12px;color:var(--text2);line-height:1.5;">
              ${visit.what_failed}
            </div>
          </div>
        ` : ''}
        
        ${visit.techniques_used ? `
          <div style="margin-bottom:10px;">
            <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text3);margin-bottom:4px;">
              <i class="fas fa-tools" style="margin-right:4px;"></i>Techniques Used
            </div>
            <div style="font-size:12px;color:var(--text2);line-height:1.5;">
              ${visit.techniques_used}
            </div>
          </div>
        ` : ''}
        
        ${visit.notes ? `
          <div>
            <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text3);margin-bottom:4px;">
              <i class="fas fa-sticky-note" style="margin-right:4px;"></i>Notes
            </div>
            <div style="font-size:12px;color:var(--text2);line-height:1.5;">
              ${visit.notes}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  },

  // ── LOAD last visit into form ─────────────────────────────────
  loadLastVisit: async function(patientName) {
    try {
      const patients = await this.loadPatients();
      const patient = patients.find(p => 
        p.name.toLowerCase() === patientName.toLowerCase()
      );
      
      if (!patient) {
        toast('No patient found with that name');
        return;
      }
      
      if (!patient.visits || patient.visits.length === 0) {
        toast('No previous visits for this patient');
        return;
      }
      
      const lastVisit = patient.visits[0]; // First item is most recent
      
      // Populate form with last visit data
      const set = (elId, val) => { 
        const el = document.getElementById(elId); 
        if (el) el.value = val || ''; 
      };
      
      set('procedure', lastVisit.procedure);
      
      // Set behavior radio
      const radio = document.querySelector(`input[name="behavior"][value="${lastVisit.frankl_score}"]`);
      if (radio) {
        radio.checked = true;
        document.querySelectorAll('.radio-card').forEach(c => c.classList.remove('selected'));
        const card = radio.closest('.radio-card');
        if (card) card.classList.add('selected');
      }
      
      // Update procedure dropdown if function exists
      if (typeof updateProcedures === 'function') updateProcedures();
      
      toast(`✓ Loaded last visit from ${this._formatTime(lastVisit.date)}`);
    } catch (err) {
      console.error('Error loading last visit:', err);
      toast('Failed to load last visit');
    }
  },

  // ══════════════════════════════════════════════════════════════
  // PATIENT MANAGEMENT (STANDARD CRUD)
  // ══════════════════════════════════════════════════════════════

  // ── SAVE a patient record ─────────────────────────────────────
  savePatient: async function(data) {
    if (this.isDesktopMode || !this.configured) {
      console.info('PedoPlanDB: Saving patient to IndexedDB');
      return this._savePatientLocal(data);
    }
    
    // Web mode with Supabase
    const payload = {
      user_email     : this._userEmail(),
      name           : data.name           || '',
      age_group      : data.age_group      || '',
      procedure      : data.procedure      || '',
      behavior       : data.behavior       || '',
      parent_profile : data.parent_profile || '',
      visit_history  : data.visit_history  || '',
      flags          : data.flags          || ''
    };
    const res = await fetch(this._endpoint(), {
      method  : 'POST',
      headers : this._headers({ 'Prefer': 'return=representation' }),
      body    : JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Supabase insert failed: ${err}`);
    }
    const saved = await res.json();
    this._refreshBadge();
    return saved[0];
  },

  // ── INDEXEDDB: Save patient ────────────────────────────────────
  _savePatientLocal: async function(data) {
    const db = await this._initDB();
    
    const newPatient = {
      id             : this._generateUUID(),
      user_email     : this._userEmail(),
      name           : data.name           || '',
      age_group      : data.age_group      || '',
      procedure      : data.procedure      || '',
      behavior       : data.behavior       || '',
      parent_profile : data.parent_profile || '',
      visit_history  : data.visit_history  || '',
      flags          : data.flags          || '',
      visits         : [],  // Initialize empty visits array
      created_at     : new Date().toISOString(),
      updated_at     : new Date().toISOString()
    };
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(this.STORE_NAME);
      const request = objectStore.add(newPatient);
      
      request.onsuccess = () => {
        this._lastSavedTime = new Date().toISOString();
        console.info('IndexedDB: Patient saved successfully');
        this._refreshBadge();
        this._updateFooterStatus();
        resolve(newPatient);
      };
      
      request.onerror = () => {
        console.error('IndexedDB: Save error:', request.error);
        reject(request.error);
      };
    });
  },
  
  // ── INDEXEDDB: Load all patients ───────────────────────────────
  _loadPatientsLocal: async function() {
    const db = await this._initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.STORE_NAME], 'readonly');
      const objectStore = transaction.objectStore(this.STORE_NAME);
      const request = objectStore.getAll();
      
      request.onsuccess = () => {
        const patients = request.result || [];
        patients.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        console.info(`IndexedDB: Loaded ${patients.length} patients`);
        resolve(patients);
      };
      
      request.onerror = () => {
        console.error('IndexedDB: Load error:', request.error);
        reject(request.error);
      };
    });
  },

  // ── LOAD all patients ──────────────────────────────────────────
  loadPatients: async function() {
    if (this.isDesktopMode || !this.configured) {
      console.info('PedoPlanDB: Loading patients from IndexedDB');
      return this._loadPatientsLocal();
    }
    
    // Web mode with Supabase
    const email = this._userEmail();
    const params = `?user_email=eq.${encodeURIComponent(email)}&order=created_at.desc&limit=200`;
    const res = await fetch(this._endpoint(params), {
      headers: this._headers({ 'Accept': 'application/json' })
    });
    if (!res.ok) throw new Error('Supabase fetch failed: ' + await res.text());
    return res.json();
  },

  // ── DELETE a patient record ───────────────────────────────────
  deletePatient: async function(id) {
    if (this.isDesktopMode || !this.configured) {
      const db = await this._initDB();
      
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.STORE_NAME], 'readwrite');
        const objectStore = transaction.objectStore(this.STORE_NAME);
        const request = objectStore.delete(id);
        
        request.onsuccess = () => {
          console.info('IndexedDB: Patient deleted successfully');
          this._refreshBadge();
          this._updateFooterStatus();
          resolve();
        };
        
        request.onerror = () => {
          console.error('IndexedDB: Delete error:', request.error);
          reject(request.error);
        };
      });
    }
    
    // Web mode with Supabase
    const email = this._userEmail();
    const res = await fetch(
      this._endpoint(`?id=eq.${id}&user_email=eq.${encodeURIComponent(email)}`),
      { method: 'DELETE', headers: this._headers() }
    );
    if (!res.ok) throw new Error('Supabase delete failed');
  },

  // ── SEARCH patients ────────────────────────────────────────────
  searchPatients: function(patients, query) {
    if (!query.trim()) return patients;
    const q = query.toLowerCase();
    return patients.filter(p =>
      (p.name       || '').toLowerCase().includes(q) ||
      (p.procedure  || '').toLowerCase().includes(q) ||
      (p.age_group  || '').toLowerCase().includes(q) ||
      (p.behavior   || '').toLowerCase().includes(q)
    );
  },

  // ── UPDATE badge count ─────────────────────────────────────────
  _refreshBadge: async function() {
    try {
      const list = await this.loadPatients();
      const btn = document.getElementById('ppPatientsBtn');
      if (btn && list.length > 0) {
        const existing = btn.querySelector('.pp-badge-count');
        if (existing) existing.remove();
        const badge = document.createElement('span');
        badge.className = 'pp-badge-count';
        badge.style.cssText = `
          background:var(--accent);color:white;border-radius:10px;
          font-size:9px;font-weight:700;padding:1px 5px;margin-left:2px;
        `;
        badge.textContent = list.length;
        btn.appendChild(badge);
      }
    } catch(e) {}
  },

  // ── UPDATE footer status ───────────────────────────────────────
  _updateFooterStatus: async function() {
    const footer = document.getElementById('ppPatientFooter');
    if (!footer) return;
    
    try {
      const list = await this.loadPatients();
      const count = list.length;
      const lastSaved = this._lastSavedTime ? this._formatTime(this._lastSavedTime) : 'Never';
      
      const statusEl = footer.querySelector('.pp-status-line');
      if (statusEl) {
        statusEl.innerHTML = `
          <i class="fas fa-database" style="margin-right:4px;color:var(--green);"></i>
          <strong style="color:var(--text);">${count} patient${count !== 1 ? 's' : ''}</strong> stored locally
          &nbsp;•&nbsp;
          Last saved: <strong style="color:var(--text2);">${lastSaved}</strong>
        `;
      }
    } catch(e) {
      console.error('Error updating footer status:', e);
    }
  },

  // ── FORMAT time for display ────────────────────────────────────
  _formatTime: function(iso) {
    try {
      const date = new Date(iso);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
      
      return date.toLocaleString('en-IN', {
        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
      });
    } catch {
      return iso;
    }
  },

  // ── FORMAT helpers ─────────────────────────────────────────────
  _label: {
    age_group: {
      infant: 'Infant (0–18mo)', toddler: 'Toddler (1.5–3yr)',
      preschool: 'Pre-school (3–6yr)', schoolage: 'School-age (6–9yr)', 
      preteen: 'Pre-teen (9–12yr)'
    },
    behavior: {
      'definitely_negative': 'Frankl 1 — Def. Negative',
      'negative':            'Frankl 2 — Negative',
      'positive':            'Frankl 3 — Positive',
      'definitely_positive': 'Frankl 4 — Def. Positive',
      'definitely-negative': 'Frankl 1 — Def. Negative',
      'definitely-positive': 'Frankl 4 — Def. Positive'
    }
  },
  _fmt: function(type, val) {
    return (this._label[type] && this._label[type][val]) || val || '—';
  },
  _date: function(iso) {
    try {
      return new Date(iso).toLocaleString('en-IN', {
        day:'2-digit', month:'short', year:'numeric',
        hour:'2-digit', minute:'2-digit'
      });
    } catch { return iso; }
  },

  // ══════════════════════════════════════════════════════════════
  // PATIENT HISTORY PANEL
  // ══════════════════════════════════════════════════════════════

  // ── SHOW patient history panel ─────────────────────────────────
  showHistory: async function() {
    const old = document.getElementById('ppPatientHistoryModal');
    if (old) { old.remove(); return; }

    const modal = document.createElement('div');
    modal.id = 'ppPatientHistoryModal';
    modal.style.cssText = `
      position:fixed;inset:0;z-index:50000;
      background:rgba(20,15,10,.65);backdrop-filter:blur(4px);
      display:flex;align-items:center;justify-content:center;
      padding:16px;overflow-y:auto;font-family:var(--sans);
    `;
    modal.addEventListener('click', e => { if(e.target === modal) modal.remove(); });

    modal.innerHTML = `
      <div style="
        background:var(--surface);border:1px solid var(--border);border-radius:16px;
        max-width:820px;width:100%;padding:0;position:relative;
        box-shadow:0 24px 64px rgba(0,0,0,0.2);max-height:90vh;
        display:flex;flex-direction:column;overflow:hidden;
      ">
        <div style="padding:20px 24px 16px;border-bottom:1px solid var(--border);flex-shrink:0;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <div style="font-family:var(--serif);font-size:20px;color:var(--text);">
              <i class="fas fa-users" style="color:var(--accent);margin-right:8px;font-size:16px;"></i>
              Patient History
            </div>
            <button onclick="document.getElementById('ppPatientHistoryModal').remove();" style="
              background:none;border:none;font-size:22px;cursor:pointer;
              color:var(--text3);line-height:1;padding:4px;
            ">×</button>
          </div>
          <div style="position:relative;">
            <i class="fas fa-search" style="position:absolute;left:11px;top:50%;transform:translateY(-50%);color:var(--text3);font-size:12px;"></i>
            <input id="ppPatientSearch" type="text" placeholder="Search by name, procedure, age group…"
              style="
                width:100%;padding:9px 12px 9px 32px;border:1px solid var(--border);
                border-radius:8px;background:var(--bg);color:var(--text);
                font-family:var(--sans);font-size:13px;outline:none;box-sizing:border-box;
              "
              oninput="PedoPlanDB._filterTable(this.value)"
            />
          </div>
        </div>

        <div style="overflow-y:auto;flex:1;padding:16px 24px 20px;">
          <div id="ppPatientTableWrap">
            <div style="text-align:center;padding:40px;color:var(--text3);">
              <i class="fas fa-spinner fa-spin" style="font-size:24px;margin-bottom:10px;display:block;"></i>
              Loading patients…
            </div>
          </div>
        </div>

        <div id="ppPatientFooter" style="
          padding:12px 24px;border-top:1px solid var(--border);flex-shrink:0;
          display:flex;flex-direction:column;gap:8px;
          font-size:11px;color:var(--text3);background:var(--surface2);
        ">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span id="ppPatientCount">—</span>
            <span>
              <i class="fas fa-user-circle" style="margin-right:4px;color:var(--accent);"></i>
              <strong style="color:var(--text2);">${this._userEmail()}</strong>
            </span>
          </div>
          <div class="pp-status-line" style="
            font-size:10px;color:var(--text3);
            padding:6px 10px;background:var(--surface);border-radius:6px;
            border:1px solid var(--border);
          ">
            <i class="fas fa-database" style="margin-right:4px;color:var(--green);"></i>
            Loading status...
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.addEventListener('keydown', function escH(e) {
      if (e.key === 'Escape') { modal.remove(); document.removeEventListener('keydown', escH); }
    });

    this._currentPatients = [];
    try {
      const patients = await this.loadPatients();
      this._currentPatients = patients;
      this._renderTable(patients);
      document.getElementById('ppPatientCount').textContent =
        patients.length === 0 ? 'No patients yet' : `${patients.length} patient${patients.length !== 1 ? 's' : ''} stored`;
      this._updateFooterStatus();
    } catch(err) {
      document.getElementById('ppPatientTableWrap').innerHTML = `
        <div style="
          text-align:center;padding:32px;
          background:var(--red-bg);border:1px solid var(--red-border);
          border-radius:10px;color:var(--red);font-size:13px;
        ">
          <i class="fas fa-exclamation-circle" style="font-size:20px;margin-bottom:8px;display:block;"></i>
          <strong>Could not load patients.</strong><br>
          Check your configuration and try again.<br>
          <code style="font-size:10px;opacity:.7;">${err.message}</code>
        </div>
      `;
      document.getElementById('ppPatientCount').textContent = 'Error loading data';
    }
  },

  // ── Render patient table ──────────────────────────────────────
  _currentPatients: [],
  _renderTable: function(patients) {
    const wrap = document.getElementById('ppPatientTableWrap');
    if (!wrap) return;

    if (!patients.length) {
      wrap.innerHTML = `
        <div style="text-align:center;padding:48px 24px;color:var(--text3);">
          <i class="fas fa-user-plus" style="font-size:32px;margin-bottom:12px;display:block;opacity:.4;"></i>
          <div style="font-size:14px;font-weight:600;color:var(--text2);">No patients yet</div>
          <div style="font-size:12px;margin-top:4px;">Generate a plan to save the first record.</div>
        </div>
      `;
      return;
    }

    const rows = patients.map(p => {
      const visitCount = (p.visits || []).length;
      return `
      <tr id="ppRow-${p.id}" style="border-bottom:1px solid var(--border);">
        <td style="padding:10px 12px;font-weight:600;font-size:13px;color:var(--text);">
          ${p.name || '—'}
          ${visitCount > 0 ? `
            <span style="
              font-size:9px;font-weight:600;color:var(--accent);
              background:var(--accent-bg);border:1px solid var(--accent-border);
              padding:1px 5px;border-radius:10px;margin-left:4px;
            ">${visitCount} visit${visitCount !== 1 ? 's' : ''}</span>
          ` : ''}
        </td>
        <td style="padding:10px 8px;font-size:12px;color:var(--text2);">${this._fmt('age_group', p.age_group)}</td>
        <td style="padding:10px 8px;font-size:12px;color:var(--text2);">${p.procedure || '—'}</td>
        <td style="padding:10px 8px;">
          <span style="
            font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;white-space:nowrap;
            ${(p.behavior === 'definitely_negative' || p.behavior === 'definitely-negative') ? 'background:var(--red-bg);color:var(--red);border:1px solid var(--red-border);' :
              (p.behavior === 'negative')                                                     ? 'background:var(--amber-bg);color:var(--amber);border:1px solid var(--amber-border);' :
              (p.behavior === 'positive')                                                     ? 'background:var(--green-bg);color:var(--green);border:1px solid var(--green-border);' :
                                                                                               'background:var(--accent-bg);color:var(--accent);border:1px solid var(--accent-border);'}
          ">${this._fmt('behavior', p.behavior)}</span>
        </td>
        <td style="padding:10px 8px;font-size:11px;color:var(--text3);white-space:nowrap;">${this._date(p.created_at)}</td>
        <td style="padding:10px 8px;text-align:center;">
          <button onclick="PedoPlanDB.showVisitTimeline('${p.id}')" title="View visit timeline"
            style="background:var(--blue-bg);border:1px solid var(--blue-border);color:var(--blue);
            border-radius:6px;padding:4px 8px;cursor:pointer;font-size:11px;
            font-family:var(--sans);margin-right:4px;">
            <i class="fas fa-history" style="font-size:10px;"></i>
          </button>
          <button onclick="PedoPlanDB._reloadPatient('${p.id}')" title="Load into form"
            style="background:var(--accent-bg);border:1px solid var(--accent-border);color:var(--accent);
            border-radius:6px;padding:4px 9px;cursor:pointer;font-size:11px;font-weight:600;
            font-family:var(--sans);margin-right:4px;">
            <i class="fas fa-redo" style="font-size:10px;"></i> Load
          </button>
          <button onclick="PedoPlanDB._confirmDelete('${p.id}')" title="Delete record"
            style="background:var(--red-bg);border:1px solid var(--red-border);color:var(--red);
            border-radius:6px;padding:4px 8px;cursor:pointer;font-size:11px;
            font-family:var(--sans);">
            <i class="fas fa-trash" style="font-size:10px;"></i>
          </button>
        </td>
      </tr>
    `;
    }).join('');

    wrap.innerHTML = `
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:var(--surface2);">
            ${['Patient','Age Group','Procedure','Frankl','Saved','Actions'].map(h =>
              `<th style="padding:8px 12px;text-align:left;font-size:10px;font-weight:700;
                letter-spacing:.06em;text-transform:uppercase;color:var(--text3);
                border-bottom:1px solid var(--border);">${h}</th>`
            ).join('')}
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  },

  // ── Filter table by search query ──────────────────────────────
  _filterTable: function(query) {
    const filtered = this.searchPatients(this._currentPatients, query);
    this._renderTable(filtered);
    const count = document.getElementById('ppPatientCount');
    if (count) count.textContent = query
      ? `${filtered.length} of ${this._currentPatients.length} patients`
      : `${this._currentPatients.length} patient${this._currentPatients.length !== 1 ? 's' : ''} stored`;
  },

  // ── Reload patient into intake form ───────────────────────────
  _reloadPatient: function(id) {
    const p = this._currentPatients.find(x => x.id === id);
    if (!p) return;

    const set = (elId, val) => { 
      const el = document.getElementById(elId); 
      if (el) el.value = val || ''; 
    };
    set('patientName',   p.name);
    set('ageGroup',      p.age_group);
    set('procedure',     p.procedure);
    set('parentProfile', p.parent_profile);
    set('visitHistory',  p.visit_history);

    const radio = document.querySelector(`input[name="behavior"][value="${p.behavior}"]`);
    if (radio) {
      radio.checked = true;
      document.querySelectorAll('.radio-card').forEach(c => c.classList.remove('selected'));
      const card = radio.closest('.radio-card');
      if (card) card.classList.add('selected');
    }

    document.querySelectorAll('input[name="flag"]').forEach(cb => {
      cb.checked = (p.flags || '').split(',').includes(cb.value);
    });

    if (typeof updateProcedures === 'function') updateProcedures();

    document.getElementById('ppPatientHistoryModal')?.remove();
    document.getElementById('intakeForm')?.scrollIntoView({ behavior: 'smooth' });
    toast(`Loaded: ${p.name}`);
  },

  // ── Confirm and delete patient ────────────────────────────────
  _confirmDelete: async function(id) {
    const p = this._currentPatients.find(x => x.id === id);
    if (!confirm(`Delete record for "${p?.name || 'this patient'}"? This cannot be undone.`)) return;
    try {
      await this.deletePatient(id);
      this._currentPatients = this._currentPatients.filter(x => x.id !== id);
      this._renderTable(this._currentPatients);
      const count = document.getElementById('ppPatientCount');
      if (count) count.textContent = `${this._currentPatients.length} patients stored`;
      this._refreshBadge();
      this._updateFooterStatus();
      toast('Patient record deleted.');
    } catch(e) {
      toast('Delete failed — check connection.');
    }
  },

  // ── INIT on app start ──────────────────────────────────────────
  init: function() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this._refreshBadge());
    } else {
      this._refreshBadge();
    }
  }
};
