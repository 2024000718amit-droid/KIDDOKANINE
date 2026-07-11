# HTML Integration Snippets

## Copy-Paste Ready Code Snippets

### 1. Load Last Visit Link
**Location**: Add this right after your patient name input field

```html
<!-- Add this after: <input id="patientName" ... > -->
<a href="javascript:void(0)" 
   onclick="const name = document.getElementById('patientName').value; if(name) PedoPlanDB.loadLastVisit(name); else toast('Enter patient name first');"
   style="
     font-size:11px;
     color:var(--accent);
     text-decoration:none;
     display:inline-flex;
     align-items:center;
     gap:4px;
     margin-top:4px;
     font-weight:600;
     cursor:pointer;
   ">
  <i class="fas fa-undo" style="font-size:10px;"></i>
  Load Last Visit
</a>
```

### 2. CSS Animation for Prompt Banner
**Location**: Add this to your `<style>` section

```css
/* Visit save prompt slide-down animation */
@keyframes slideDown {
  from {
    transform: translateX(-50%) translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}
```

### 3. Game Plan Success Handler Integration
**Location**: In your game plan generation function

```javascript
// After game plan is successfully generated
function onGamePlanSuccess() {
  // Get patient data from form
  const patientData = {
    name: document.getElementById('patientName').value,
    procedure: document.getElementById('procedure').value,
    behavior: document.querySelector('input[name="behavior"]:checked')?.value || ''
  };
  
  // Extract data from generated game plan (customize based on your plan structure)
  const gamePlanData = {
    techniques: extractTechniquesFromPlan(),  // Your custom function
    what_worked: '',   // Leave empty or pre-fill if available
    what_failed: '',   // Leave empty or pre-fill if available
    notes: ''          // Leave empty or pre-fill if available
  };
  
  // Show visit save prompt
  PedoPlanDB.showVisitSavePrompt(patientData, gamePlanData);
}

// Helper function example (customize based on your plan output)
function extractTechniquesFromPlan() {
  // Example: extract from a div with id 'gamePlanOutput'
  const planElement = document.getElementById('gamePlanOutput');
  if (!planElement) return '';
  
  // Example: look for techniques section
  const techniquesSection = planElement.querySelector('.techniques-section');
  return techniquesSection ? techniquesSection.textContent.trim() : '';
}
```

### 4. Alternative: Trigger on Button Click
**Location**: If you have a "Generate Game Plan" button

```javascript
// Add this to your generate button's onclick
document.getElementById('generatePlanBtn').addEventListener('click', async function() {
  // ... your plan generation code ...
  
  // After successful generation:
  const patientData = {
    name: document.getElementById('patientName').value,
    procedure: document.getElementById('procedure').value,
    behavior: document.querySelector('input[name="behavior"]:checked')?.value
  };
  
  PedoPlanDB.showVisitSavePrompt(patientData, {
    techniques: 'Tell-show-do, positive reinforcement',
    what_worked: '',
    what_failed: '',
    notes: ''
  });
});
```

### 5. Manual Visit Add (For Testing)
**Location**: Run in browser console or add as a test button

```javascript
// Test function to manually add a visit
async function testAddVisit() {
  // Get first patient
  const patients = await PedoPlanDB.loadPatients();
  if (patients.length === 0) {
    console.log('No patients found. Create a patient first.');
    return;
  }
  
  const patient = patients[0];
  
  // Add test visit
  await PedoPlanDB.addVisit(patient.id, {
    procedure: 'Test Extraction',
    frankl_score: 'positive',
    techniques_used: 'Tell-show-do, distraction, positive reinforcement',
    what_worked: 'Sticker reward system worked great, parent presence helpful',
    what_failed: 'Voice control was initially too stern, patient became anxious',
    notes: 'Patient responded well overall. Consider using quieter tone next time. Schedule follow-up in 2 weeks.'
  });
  
  console.log('Test visit added successfully!');
  PedoPlanDB.showVisitTimeline(patient.id);
}

// Run the test
testAddVisit();
```

### 6. Enhanced Patient Name Field (Complete Example)
**Location**: Replace your existing patient name field section

```html
<div class="field">
  <label for="patientName">Patient Name</label>
  <input 
    type="text" 
    id="patientName" 
    placeholder="Enter patient's full name" 
    required
  >
  
  <!-- Load Last Visit Link -->
  <a href="javascript:void(0)" 
     onclick="const name = document.getElementById('patientName').value.trim(); 
              if(name) { PedoPlanDB.loadLastVisit(name); } 
              else { toast('Please enter patient name first'); }"
     style="
       font-size:11px;
       color:var(--accent);
       text-decoration:none;
       display:inline-flex;
       align-items:center;
       gap:4px;
       margin-top:6px;
       font-weight:600;
       cursor:pointer;
       transition: color 0.15s;
     "
     onmouseover="this.style.color='var(--accent2)'"
     onmouseout="this.style.color='var(--accent)'">
    <i class="fas fa-undo" style="font-size:10px;"></i>
    Load Last Visit
  </a>
</div>
```

### 7. Visit Count Indicator (Optional Enhancement)
**Location**: Add to your patient list/search results

```javascript
// Function to get patient with visit count
function renderPatientWithVisits(patient) {
  const visitCount = (patient.visits || []).length;
  
  return `
    <div class="patient-card">
      <div class="patient-name">
        ${patient.name}
        ${visitCount > 0 ? `
          <span style="
            font-size:9px;
            font-weight:600;
            color:var(--accent);
            background:var(--accent-bg);
            border:1px solid var(--accent-border);
            padding:2px 6px;
            border-radius:10px;
            margin-left:6px;
          ">
            ${visitCount} visit${visitCount !== 1 ? 's' : ''}
          </span>
        ` : ''}
      </div>
      <button onclick="PedoPlanDB.showVisitTimeline('${patient.id}')">
        <i class="fas fa-history"></i> View Timeline
      </button>
    </div>
  `;
}
```

### 8. Toast Function (If Not Already Present)
**Location**: Add to your global JavaScript if toast() doesn't exist

```javascript
// Simple toast notification function
function toast(message, duration = 3000) {
  // Remove existing toast
  const existing = document.getElementById('toast');
  if (existing) existing.remove();
  
  // Create new toast
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position:fixed;
    bottom:20px;
    right:20px;
    z-index:9999;
    background:#1e1a16;
    color:#e8e0d4;
    padding:12px 18px;
    border-radius:8px;
    font-size:13px;
    font-weight:500;
    box-shadow:0 4px 12px rgba(0,0,0,0.3);
    animation:toastIn 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  // Auto-remove
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Add CSS for toast animations
const style = document.createElement('style');
style.textContent = `
  @keyframes toastIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes toastOut {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(20px); opacity: 0; }
  }
`;
document.head.appendChild(style);
```

### 9. Debug Helper Functions
**Location**: Run in browser console for debugging

```javascript
// Debug: List all patients with visit counts
async function debugListPatients() {
  const patients = await PedoPlanDB.loadPatients();
  console.table(patients.map(p => ({
    id: p.id.substring(0, 8) + '...',
    name: p.name,
    visits: (p.visits || []).length,
    created: new Date(p.created_at).toLocaleString()
  })));
}

// Debug: Show patient details with visits
async function debugShowPatient(patientId) {
  const patient = await PedoPlanDB.getPatient(patientId);
  console.log('Patient:', patient);
  console.log('Visits:', patient.visits);
  return patient;
}

// Debug: Clear all visits for a patient
async function debugClearVisits(patientId) {
  const db = await PedoPlanDB._initDB();
  const transaction = db.transaction(['patients'], 'readwrite');
  const objectStore = transaction.objectStore('patients');
  const patient = await PedoPlanDB.getPatient(patientId);
  patient.visits = [];
  objectStore.put(patient);
  console.log('Cleared visits for', patient.name);
}

// Debug: Export patient data as JSON
async function debugExportPatient(patientId) {
  const patient = await PedoPlanDB.getPatient(patientId);
  const json = JSON.stringify(patient, null, 2);
  console.log(json);
  
  // Copy to clipboard
  navigator.clipboard.writeText(json);
  console.log('Copied to clipboard!');
}
```

### 10. Complete Integration Example
**Location**: Full example showing all pieces together

```html
<!-- In your intake form -->
<div id="intakeForm">
  <!-- Patient Name Field with Load Last Visit -->
  <div class="field">
    <label for="patientName">Patient Name</label>
    <input type="text" id="patientName" placeholder="Enter patient's full name">
    <a href="javascript:void(0)" 
       onclick="loadLastVisitHelper()"
       style="font-size:11px;color:var(--accent);text-decoration:none;
              display:inline-flex;align-items:center;gap:4px;margin-top:4px;
              font-weight:600;cursor:pointer;">
      <i class="fas fa-undo"></i> Load Last Visit
    </a>
  </div>
  
  <!-- ... other form fields ... -->
  
  <!-- Generate Button -->
  <button class="btn-primary" onclick="handleGenerateGamePlan()">
    <i class="fas fa-magic"></i> Generate Game Plan
  </button>
</div>

<script>
// Helper function for Load Last Visit
function loadLastVisitHelper() {
  const name = document.getElementById('patientName').value.trim();
  if (!name) {
    toast('Please enter patient name first');
    return;
  }
  PedoPlanDB.loadLastVisit(name);
}

// Game plan generation handler
async function handleGenerateGamePlan() {
  try {
    // Get form data
    const patientData = {
      name: document.getElementById('patientName').value.trim(),
      procedure: document.getElementById('procedure').value,
      behavior: document.querySelector('input[name="behavior"]:checked')?.value
    };
    
    // Validate
    if (!patientData.name || !patientData.procedure || !patientData.behavior) {
      toast('Please fill all required fields');
      return;
    }
    
    // Generate game plan (your existing logic)
    await generateGamePlanLogic(patientData);
    
    // Show visit save prompt
    PedoPlanDB.showVisitSavePrompt(
      patientData,
      {
        techniques: extractTechniquesFromPlan(),
        what_worked: '',
        what_failed: '',
        notes: ''
      }
    );
    
  } catch (err) {
    console.error('Error generating game plan:', err);
    toast('Failed to generate game plan');
  }
}

// Your existing game plan logic
async function generateGamePlanLogic(patientData) {
  // Your plan generation code here
  console.log('Generating plan for:', patientData);
  // ... 
}

// Extract techniques from plan (customize based on your output)
function extractTechniquesFromPlan() {
  const planOutput = document.getElementById('gamePlanOutput');
  if (!planOutput) return '';
  
  // Example: extract from specific section
  const techniques = planOutput.querySelector('[data-section="techniques"]');
  return techniques ? techniques.textContent.trim() : '';
}
</script>
```

## Quick Testing Checklist

After adding the snippets, test in this order:

1. ✅ Generate game plan → prompt appears
2. ✅ Click "Yes, Save Visit" → toast confirms
3. ✅ View patient list → visit count badge shows
4. ✅ Click history icon → timeline opens with visit
5. ✅ Enter patient name → click "Load Last Visit"
6. ✅ Form pre-fills → toast confirms
7. ✅ Restart app → visits persist
8. ✅ Open DevTools → IndexedDB shows visits array

---

**Pro Tip**: Copy the debug functions to your browser console for easy testing!
