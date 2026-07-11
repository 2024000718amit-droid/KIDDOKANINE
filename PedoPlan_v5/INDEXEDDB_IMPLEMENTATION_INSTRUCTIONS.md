# IndexedDB Implementation Instructions

## Overview
This guide explains how to replace the current localStorage-based patient storage (with 200-patient limit) with IndexedDB for unlimited offline storage in your PedoPlan Electron app.

## What Changes
- **Storage**: localStorage → IndexedDB (browser's native API, already available in Electron)
- **Database**: `PedoPlanOfflineDB` with `patients` object store
- **Patient Limit**: 200 patients → **UNLIMITED**
- **IDs**: `Date.now()` → UUID v4
- **Data Structure**: Added `updated_at` field to each patient record
- **UI**: Added status line showing patient count and last saved time

## Implementation Steps

### Step 1: Locate the PedoPlanDB Object

1. Open `PedoPlan_v5.html` in your code editor
2. Search for `const PedoPlanDB = {` (around line 5833)
3. The object starts with configuration and ends before the next major section (around line 6320)

### Step 2: Replace the PedoPlanDB Object

**Option A: Manual Replacement**
1. Find the line: `const PedoPlanDB = {`
2. Selecteverything from that line until the closing `};` of the object (before `// ═══════════════...` comment for the next module)
3. Delete the selected code
4. Open `PedoPlan_IndexedDB_Replacement.js` 
5. Copy the entire contents
6. Paste it where you deleted the old code

**Option B: Search and Replace Sections** (More precise)

The PedoPlanDB object contains these key functions that need replacement:
- `savePatient()` - Main save function
- `_savePatientLocal()` - Local storage save (needs to become IndexedDB)
- `_loadPatientsLocal()` - Local storage load (needs to become IndexedDB)
- `loadPatients()` - Main load function
- `deletePatient()` - Delete function
- `showHistory()` - Patient history modal
- `_renderTable()` - Table rendering
- `_updateFooterStatus()` - NEW: Status line updater

### Step 3: Key Changes to Note

#### New Properties Added
```javascript
DB_NAME: 'PedoPlanOfflineDB',
DB_VERSION: 1,
STORE_NAME: 'patients',
_db: null,
_lastSavedTime: null,
```

#### New Methods Added
```javascript
_generateUUID()        // Generates UUID v4 for patient IDs
_initDB()              // Initializes IndexedDB connection
_updateFooterStatus()  // Updates the status line in patient modal
_formatTime()          // Formats timestamps for display
```

#### Modified Methods
- `_savePatientLocal()` - Now uses IndexedDB instead of localStorage
- `_loadPatientsLocal()` - Now uses IndexedDB instead of localStorage
- `deletePatient()` - Now deletes from IndexedDB instead of localStorage
- `showHistory()` - Now includes status line in footer
- `_confirmDelete()` - Now calls `_updateFooterStatus()`

#### Removed
- `LOCAL_STORAGE_KEY` property (no longer needed)
- 200-patient limit code (removed from `_savePatientLocal`)

### Step 4: Test the Implementation

1. Save the modified `PedoPlan_v5.html`
2. Rebuild the Electron app:
   ```bash
   npm run build
   # or
   electron-builder
   ```
3. Run the app and test:
   - ✅ Create a new patient (should save with UUID)
   - ✅ View patient history (should show all patients)
   - ✅ Check status line at bottom (should show count and last saved time)
   - ✅ Search for patients (should work as before)
   - ✅ Load a patient back into form
   - ✅ Delete a patient
   - ✅ Close and reopen app (data should persist)

### Step 5: Verify IndexedDB in DevTools

1. Open the app and save a patient
2. Press `F12` to open DevTools
3. Go to **Application** tab → **IndexedDB**
4. You should see:
   - Database: `PedoPlanOfflineDB`
   - Object Store: `patients`
   - Indexes: `name`, `created_at`, `user_email`

### Step 6: Migration from localStorage (Optional)

If you have existing patients in localStorage, add this migration code after `PedoPlanDB.init()`:

```javascript
// One-time migration from localStorage to IndexedDB
(async function migr ateLegacyPatients() {
  const OLD_KEY = 'pp_patients_local';
  const legacyData = localStorage.getItem(OLD_KEY);
  
  if (!legacyData) return; // Nothing to migrate
  
  try {
    const oldPatients = JSON.parse(legacyData);
    if (!oldPatients.length) return;
    
    console.log(`Migrating ${oldPatients.length} patients from localStorage to IndexedDB...`);
    
    for (const patient of oldPatients) {
      // Convert old numeric ID to UUID if needed
      if (typeof patient.id === 'number') {
        patient.id = PedoPlanDB._generateUUID();
      }
      // Add updated_at if missing
      if (!patient.updated_at) {
        patient.updated_at = patient.created_at || new Date().toISOString();
      }
      
      // Save to IndexedDB
      const db = await PedoPlanDB._initDB();
      const transaction = db.transaction([PedoPlanDB.STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(PedoPlanDB.STORE_NAME);
      await objectStore.add(patient);
    }
    
    console.log('Migration complete! Removing legacy localStorage data...');
    localStorage.removeItem(OLD_KEY);
    PedoPlanDB._refreshBadge();
  } catch (err) {
    console.error('Migration failed:', err);
    // Keep localStorage data if migration fails
  }
})();
```

## Patient Record Structure

Each patient record now has these fields:

```javascript
{
  id: "550e8400-e29b-41d4-a716-446655440000",  // UUID v4
  user_email: "user@example.com",
  name: "Patient Name",
  age_group: "preschool",
  procedure: "Extraction",
  behavior: "positive",
  parent_profile: "Supportive",
  visit_history: "First visit",
  flags: "anxiety,special_needs",
  created_at: "2026-06-16T10:30:00.000Z",
  updated_at: "2026-06-16T10:30:00.000Z"
}
```

## Status Line Display

The patient modal footer now shows:
```
📊 42 patients stored locally • Last saved: 5m ago
👤 user@example.com
```

## Benefits

1. **Unlimited Storage**: No more 200-patient limit
2. **Better Performance**: IndexedDB is optimized for large datasets
3. **Structured Data**: Proper database with indexes
4. **UUID IDs**: Globally unique identifiers instead of timestamps
5. **Better Status Tracking**: Real-time feedback on storage state
6. **Future-Proof**: Easy to add advanced features (bulk operations, export, etc.)

## Rollback Plan

If you need to revert to localStorage:

1. Keep a backup of the original `PedoPlan_v5.html`
2. Or extract from `app.asar.backup` if you created one
3. The old localStorage data (`pp_patients_local`) remains untouched unless you run the migration script

## Troubleshooting

**Problem**: "IndexedDB is not defined"
- **Solution**: Make sure you're running in Electron renderer process, not Node.js main process

**Problem**: Data doesn't persist after app restart
- **Solution**: Check Electron's user data directory permissions

**Problem**: Can't see database in DevTools
- **Solution**: Make sure to save at least one patient first to trigger database creation

**Problem**: Migration script runs every time
- **Solution**: The script checks for localStorage data first - once migrated and localStorage is cleared, it won't run again

## Support

For issues or questions:
1. Check the console (F12 → Console) for error messages
2. Verify IndexedDB is accessible in DevTools
3. Test with a fresh database (delete in DevTools → Application → IndexedDB)
