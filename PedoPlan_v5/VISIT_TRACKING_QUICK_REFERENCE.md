# Visit Tracking - Quick Reference

## 🎯 What's New

### 1. Visit Save Prompt (After Game Plan)
```
┌────────────────────────────────────────────────────────┐
│ 💾  Save this as a visit for John Doe?                │
│     Track behavior patterns across appointments        │
│                                                        │
│  [✓ Yes, Save Visit]  [Skip]                         │
└────────────────────────────────────────────────────────┘
```

### 2. Patient Table with Visit Tracking
```
┌──────────────────────────────────────────────────────────────┐
│ Patient      │ Age Group  │ Procedure │ Frankl │ Actions   │
├──────────────┼────────────┼───────────┼────────┼───────────┤
│ John Doe     │ Preschool  │ Filling   │ F3 +   │ 🕐 📥 🗑️ │
│ (3 visits)   │            │           │        │           │
├──────────────┼────────────┼───────────┼────────┼───────────┤
│ Sarah K      │ Toddler    │ Checkup   │ F4 ++  │ 🕐 📥 🗑️ │
│ (1 visit)    │            │           │        │           │
└──────────────┴────────────┴───────────┴────────┴───────────┘
              ↑                                    ↑
        Visit count badge              History icon button
```

### 3. Visit Timeline Modal
```
┌─────────────────────────────────────────────────────────┐
│ 🕐 Visit Timeline                                  ×   │
│ John Doe                                               │
├─────────────────────────────────────────────────────────┤
│                                                        │
│  ┌───────────────────────────────────────────────┐   │
│  │ Extraction                        [F3 Positive] │   │
│  │ 📅 16 Dec 2026, 10:30 AM                       │   │
│  │                                                 │   │
│  │ ✓ WHAT WORKED                                  │   │
│  │ Sticker rewards, parent presence               │   │
│  │                                                 │   │
│  │ ✗ WHAT FAILED                                  │   │
│  │ Voice control too abrupt                       │   │
│  │                                                 │   │
│  │ 🔧 TECHNIQUES USED                             │   │
│  │ Tell-show-do, positive reinforcement           │   │
│  │                                                 │   │
│  │ 📝 NOTES                                       │   │
│  │ Consider nitrous oxide for next visit          │   │
│  └───────────────────────────────────────────────┘   │
│                                                        │
│  ┌───────────────────────────────────────────────┐   │
│  │ Checkup                       [F2 Negative]    │   │
│  │ 📅 10 Dec 2026, 2:15 PM                        │   │
│  │ ...                                            │   │
│  └───────────────────────────────────────────────┘   │
│                                                        │
├─────────────────────────────────────────────────────────┤
│ ✅ 3 visits recorded                                   │
└─────────────────────────────────────────────────────────┘
```

### 4. Load Last Visit Feature
```
Intake Form:
┌─────────────────────────────────┐
│ PATIENT NAME                    │
│ ┌─────────────────────────────┐ │
│ │ John Doe                    │ │
│ └─────────────────────────────┘ │
│ ↩ Load Last Visit               │ ← New link
└─────────────────────────────────┘
```

## 🔧 API Quick Reference

### Add a Visit
```javascript
await PedoPlanDB.addVisit(patientId, {
  procedure: "Extraction",
  frankl_score: "positive",
  techniques_used: "Tell-show-do",
  what_worked: "Sticker rewards",
  what_failed: "Voice control",
  notes: "Patient responded well"
});
```

### Show Visit Save Prompt
```javascript
PedoPlanDB.showVisitSavePrompt(
  {
    name: "John Doe",
    procedure: "Extraction",
    behavior: "positive"
  },
  {
    techniques: "Tell-show-do",
    what_worked: "Stickers",
    what_failed: "Voice control",
    notes: "Good progress"
  }
);
```

### Show Visit Timeline
```javascript
PedoPlanDB.showVisitTimeline(patientId);
```

### Load Last Visit
```javascript
PedoPlanDB.loadLastVisit("John Doe");
```

### Get Patient with Visits
```javascript
const patient = await PedoPlanDB.getPatient(patientId);
console.log(patient.visits);  // Array of visit objects
```

## 📊 Data Structure

### Patient Record (Enhanced)
```javascript
{
  id: "uuid",
  name: "John Doe",
  age_group: "preschool",
  procedure: "Extraction",
  behavior: "positive",
  visits: [                    // ← NEW
    {
      visit_id: "uuid",
      date: "2026-06-16T10:30:00.000Z",
      procedure: "Extraction",
      frankl_score: "positive",
      techniques_used: "Tell-show-do",
      what_worked: "Stickers",
      what_failed: "Voice control",
      notes: "Good progress",
      created_at: "2026-06-16T10:30:00.000Z"
    }
  ],
  created_at: "2026-06-10T...",
  updated_at: "2026-06-16T..."
}
```

## 🎨 UI Integration Points

### 1. After Generate Game Plan
```javascript
// In your generateGamePlan() function
function generateGamePlan() {
  // ... plan generation logic ...
  
  // Show visit save prompt
  PedoPlanDB.showVisitSavePrompt(patientData, gamePlanData);
}
```

### 2. In Patient Table Row
```html
<!-- History icon button -->
<button onclick="PedoPlanDB.showVisitTimeline('${patientId}')" 
        title="View visit timeline">
  <i class="fas fa-history"></i>
</button>
```

### 3. In Intake Form
```html
<!-- Load last visit link -->
<a href="javascript:void(0)" 
   onclick="const name = document.getElementById('patientName').value; 
            if(name) PedoPlanDB.loadLastVisit(name); 
            else toast('Enter patient name first');">
  <i class="fas fa-undo"></i> Load Last Visit
</a>
```

## ⚡ Quick Implementation

**3 Steps to Add Visit Tracking:**

1. **Replace PedoPlanDB**
   - Open `PedoPlan_v5.html`
   - Find `const PedoPlanDB = {`
   - Replace entire object with `PedoPlan_With_Visit_Tracking.js`

2. **Add Load Last Visit Link**
   - Find patient name field
   - Add link after input field (see HTML above)

3. **Trigger Visit Prompt**
   - Find game plan success handler
   - Call `showVisitSavePrompt()` (see example above)

**Done!** 🎉

## 🔍 Testing Commands

Open DevTools Console and run:

```javascript
// Check database version
console.log(PedoPlanDB.DB_VERSION);  // Should be 2

// Get a patient with visits
const patients = await PedoPlanDB.loadPatients();
console.log(patients[0].visits);

// Manually add a test visit
await PedoPlanDB.addVisit(patients[0].id, {
  procedure: "Test Procedure",
  frankl_score: "positive",
  techniques_used: "Manual test",
  what_worked: "Everything",
  what_failed: "Nothing",
  notes: "Test visit"
});

// Show timeline
PedoPlanDB.showVisitTimeline(patients[0].id);
```

## 📱 Mobile Responsiveness

All components work on mobile:
- **Prompt banner**: Responsive width, stacks buttons on small screens
- **Timeline modal**: Scrollable, touch-friendly
- **Visit cards**: Stack vertically on mobile
- **History icon**: Touch-optimized button size

## 🎯 Benefits

✅ **Longitudinal tracking**: See behavior patterns over time  
✅ **Clinical insights**: What works/fails for each patient  
✅ **Quick reference**: Load last visit data instantly  
✅ **No data limits**: Unlimited visits per patient  
✅ **Offline-first**: Works without internet  
✅ **Auto-save**: Persistent storage in IndexedDB  

---

**Implementation Time**: ~30 minutes  
**Difficulty**: ⭐⭐⭐☆☆ (Medium)  
**Value**: ⭐⭐⭐⭐⭐ (High - enables evidence-based care)
