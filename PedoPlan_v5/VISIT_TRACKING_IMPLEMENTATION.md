# Visit Tracking Implementation Guide

## Overview
This guide adds comprehensive per-patient visit logging to track behavior patterns across multiple appointments in your PedoPlan Electron app.

## New Features

### 1. **Visit Data Structure**
Each patient now has a `visits` array with entries containing:
```javascript
{
  visit_id: "uuid-v4",
  date: "2026-06-16T10:30:00.000Z",
  procedure: "Extraction",
  frankl_score: "positive",
  techniques_used: "Tell-show-do, positive reinforcement",
  what_worked: "Sticker reward system, parent presence",
  what_failed: "Voice control was too abrupt",
  notes: "Consider nitrous oxide for next visit",
  created_at: "2026-06-16T10:30:00.000Z"
}
```

### 2. **Visit Save Prompt**
- Non-blocking banner appears after generating game plan
- Shows patient name
- [Yes, Save Visit] and [Skip] buttons
- Auto-dismisses after 15 seconds

### 3. **Visit Timeline Modal**
- Clock/history icon button in each patient row
- Shows all visits newest-first
- Each visit displayed as a card with:
  - Date and procedure
  - Frankl score badge (color-coded)
  - What worked (green section)
  - What failed (red section)
  - Techniques used
  - Clinical notes

### 4. **Load Last Visit**
- "↩ Load Last Visit" link near patient name field
- Pre-fills form from most recent visit
- Shows confirmation toast

## Implementation Steps

### Step 1: Replace PedoPlanDB Object

Open `PedoPlan_v5.html` and replace the entire `PedoPlanDB` object (around lines 5800-6320) with the contents of `PedoPlan_With_Visit_Tracking.js`.

### Step 2: Add "Load Last Visit" Link to Intake Form

Find the patient name field in your HTML (search for `id="patientName"`). Add this link right after the field:

```html
<!-- After the patient name input field -->
<a href="javascript:void(0)" 
   onclick="const name = document.getElementById('patientName').value; if(name) PedoPlanDB.loadLastVisit(name); else toast('Enter patient name first');"
   style="
     font-size:11px;color:var(--accent);text-decoration:none;
     display:inline-flex;align-items:center;gap:4px;margin-top:4px;
     font-weight:600;
   ">
  <i class="fas fa-undo" style="font-size:10px;"></i>
  Load Last Visit
</a>
```

### Step 3: Trigger Visit Save Prompt After Game Plan

Find where your "Generate Game Plan" button succeeds (the function that generates the plan). Add this code after successful generation:

```javascript
// After game plan is successfully generated
// Assuming you have patientData object with form values
PedoPlanDB.showVisitSavePrompt(
  {
    name: patientData.name,
    procedure: patientData.procedure,
    behavior: patientData.behavior
  },
  {
    techniques: "Techniques extracted from game plan",
    what_worked: "What worked from plan",
    what_failed: "What failed from plan",
    notes: "Additional notes"
  }
);
```

**Example integration:**
```javascript
function generateGamePlan() {
  // ... your existing game plan generation logic ...
  
  // After successful generation:
  const patientData = {
    name: document.getElementById('patientName').value,
    procedure: document.getElementById('procedure').value,
    behavior: document.querySelector('input[name="behavior"]:checked').value
  };
  
  // Extract from your game plan output
  const gamePlanData = {
    techniques: extractTechniquesFromPlan(),  // Your function
    what_worked: '',  // Will be filled during visit
    what_failed: '',  // Will be filled during visit
    notes: ''         // Will be filled during visit
  };
  
  PedoPlanDB.showVisitSavePrompt(patientData, gamePlanData);
}
```

### Step 4: Add CSS Animation (Optional)

Add this to your `<style>` section for the prompt banner slide-in animation:

```css
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


## Key Changes from Previous Version

### Database Schema
- **DB_VERSION**: Incremented from 1 to 2 (triggers schema upgrade)
- **visits array**: New field added to each patient record
- **visits structure**: Array of visit objects with detailed tracking

### New Methods
```javascript
addVisit(patientId, visitData)           // Add visit to patient record
getPatient(patientId)                     // Get single patient by ID
showVisitSavePrompt(patientData, gamePlanData)  // Show save prompt banner
showVisitTimeline(patientId)              // Show visit history modal
loadLastVisit(patientName)                // Pre-fill form from last visit
_handleVisitSave(shouldSave)              // Handle prompt button clicks
_renderVisitCard(visit)                   // Render single visit card
```

### Modified Methods
- `_savePatientLocal()`: Initializes empty `visits` array for new patients
- `_renderTable()`: Adds visit count badge and history icon button

### New Properties
- `_currentGamePlanData`: Stores plan data for visit save

## UI Components

### 1. Visit Save Prompt Banner
**Location**: Fixed at top of page (below nav)  
**Style**: Accent-colored banner with blue background  
**Auto-dismiss**: 15 seconds  
**Buttons**:
- **Yes, Save Visit**: Blue accent button with check icon
- **Skip**: Neutral button

### 2. Visit Timeline Modal
**Location**: Centered overlay modal  
**Width**: 680px max  
**Sections**:
- **Header**: Patient name, visit count, close button
- **Body**: Scrollable visit cards (newest first)
- **Footer**: Total visit count

### 3. Visit Cards
**Style**: White cards with colored Frankl badges  
**Sections**:
- Procedure and date (top)
- Frankl score badge (top right)
- What worked (green with check icon)
- What failed (red with x icon)
- Techniques used (gray with tools icon)
- Notes (gray with note icon)

### 4. Load Last Visit Link
**Location**: Under patient name field  
**Style**: Small blue link with undo icon  
**Behavior**: 
- Requires patient name to be entered first
- Shows toast if name is empty
- Pre-fills procedure and behavior from last visit

### 5. Patient Table Enhancement
**New in each row**:
- Visit count badge (if visits > 0)
- History icon button (blue) before Load button

## Testing Checklist

### Visit Creation
- [ ] Generate game plan → prompt appears
- [ ] Click "Yes, Save Visit" → toast confirms
- [ ] Click "Skip" → prompt dismisses
- [ ] Prompt auto-dismisses after 15 seconds
- [ ] Visit saves with correct data

### Visit Timeline
- [ ] Click history icon → modal opens
- [ ] Visits display newest first
- [ ] Frankl badges show correct colors
- [ ] Green/red sections display correctly
- [ ] Empty state shows when no visits
- [ ] ESC key closes modal
- [ ] Click outside closes modal

### Load Last Visit
- [ ] Enter patient name → click link
- [ ] Form pre-fills with last visit data
- [ ] Toast shows confirmation
- [ ] Works with patients who have visits
- [ ] Shows "no visits" for new patients
- [ ] Shows "not found" for non-existent patients

### Data Persistence
- [ ] Visits survive app restart
- [ ] Visit count badge updates correctly
- [ ] IndexedDB shows visits array in DevTools
- [ ] Delete patient removes all visits

## Database Upgrade Notes

### Version Bump
The DB_VERSION is incremented from 1 to 2. IndexedDB will automatically trigger the `onupgradeneeded` event, but the current implementation doesn't modify the schema (visits are added dynamically to records).

### Manual Migration (Optional)
If you want to add the `visits` array to existing patients:

```javascript
// Run this once after upgrading
(async function addVisitsToExistingPatients() {
  const db = await PedoPlanDB._initDB();
  const transaction = db.transaction(['patients'], 'readwrite');
  const objectStore = transaction.objectStore('patients');
  const request = objectStore.getAll();
  
  request.onsuccess = () => {
    const patients = request.result;
    patients.forEach(patient => {
      if (!patient.visits) {
        patient.visits = [];
        objectStore.put(patient);
      }
    });
    console.log('Migration complete: added visits arrays');
  };
})();
```

## Frankl Score Color Mapping

```javascript
definitely_negative → Red (critical)
negative            → Amber (warning)
positive            → Green (success)
definitely_positive → Blue (excellent)
```

## Toast Messages

```
✓ Visit saved for [Patient Name]
Failed to save visit
✓ Loaded last visit from [time ago]
No patient found with that name
No previous visits for this patient
Enter patient name first
```

## Performance Considerations

- **Visit count**: Displayed directly from `visits.length` (O(1))
- **Visit sorting**: Already sorted when saved (newest first)
- **IndexedDB queries**: Efficient with proper indexing
- **Modal rendering**: Only renders when opened

## Future Enhancements

Consider adding:
- Edit/delete individual visits
- Visit export (CSV, PDF)
- Visit comparison view
- Behavior trend charts
- Filter visits by date range
- Search within visit notes
- Print visit timeline

## Troubleshooting

**Problem**: Visit prompt doesn't appear  
**Solution**: Check that `showVisitSavePrompt()` is called after plan generation

**Problem**: History icon doesn't work  
**Solution**: Verify patient has `id` field and `showVisitTimeline()` function exists

**Problem**: Can't see visits in DevTools  
**Solution**: Make sure DB_VERSION is 2 and at least one visit has been saved

**Problem**: Load last visit doesn't work  
**Solution**: Ensure patient name matches exactly (case-insensitive search is implemented)

**Problem**: Visits don't persist  
**Solution**: Check that `addVisit()` is calling `objectStore.put()` successfully

## Support

For issues:
1. Check browser console for errors
2. Verify IndexedDB in DevTools → Application → IndexedDB → PedoPlanOfflineDB
3. Confirm DB_VERSION is 2
4. Test with a fresh patient record

---

**Status**: ✅ Ready for implementation  
**Complexity**: 🟡 Medium (multiple UI components)  
**Impact**: 🎯 High (enables longitudinal behavior tracking)
