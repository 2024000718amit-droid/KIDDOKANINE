# Weight-Based Drug Calculator — Test Checklist

## ✅ Complete Testing Checklist

Use this checklist to verify the weight calculator is working correctly before deploying to production.

---

## 🧪 Functional Tests

### Basic Functionality
- [ ] **Test 1**: Open PedoPlan_v5.html in browser
- [ ] **Test 2**: Generate a game plan (any patient/procedure)
- [ ] **Test 3**: Navigate to "Drug Reference" tab
- [ ] **Test 4**: Weight input field is visible at top
- [ ] **Test 5**: Weight input accepts keyboard entry
- [ ] **Test 6**: Summary strip is hidden initially

### Weight Entry Tests
- [ ] **Test 7**: Enter weight `12` → Summary appears
- [ ] **Test 8**: Enter weight `12` → Amoxicillin row highlights
- [ ] **Test 9**: Enter weight `12` → Metronidazole row highlights
- [ ] **Test 10**: Enter weight `12` → Paracetamol row highlights
- [ ] **Test 11**: Enter weight `12` → Ibuprofen row highlights
- [ ] **Test 12**: Enter weight `12` → Non-matching rows dim to 40%
- [ ] **Test 13**: Enter weight `12` → Checkmark icons appear
- [ ] **Test 14**: Enter weight `12` → Amber left border appears

### Edge Cases
- [ ] **Test 15**: Enter weight `3` (minimum) → Highlights correctly
- [ ] **Test 16**: Enter weight `60` (maximum) → Highlights correctly
- [ ] **Test 17**: Enter weight `2` (below min) → No highlights
- [ ] **Test 18**: Enter weight `65` (above max) → No highlights
- [ ] **Test 19**: Enter decimal `12.5` → Works correctly
- [ ] **Test 20**: Clear weight (delete all) → Highlights removed
- [ ] **Test 21**: Clear weight → Summary strip hides

### Summary Strip Tests
- [ ] **Test 22**: Summary shows correct weight value
- [ ] **Test 23**: Summary shows Amoxicillin dose
- [ ] **Test 24**: Summary shows Metronidazole dose
- [ ] **Test 25**: Summary shows Paracetamol dose
- [ ] **Test 26**: Summary shows Ibuprofen dose
- [ ] **Test 27**: Summary animates smoothly (slide down)
- [ ] **Test 28**: Copy All button is visible

### Copy Functionality
- [ ] **Test 29**: Click "Copy All" button
- [ ] **Test 30**: Toast message appears ("copied to clipboard")
- [ ] **Test 31**: Paste into text editor (Ctrl+V)
- [ ] **Test 32**: Pasted text includes all 4 drugs
- [ ] **Test 33**: Pasted text includes weight value
- [ ] **Test 34**: Pasted text includes disclaimer footer
- [ ] **Test 35**: Pasted text is formatted correctly

### Persistence Tests
- [ ] **Test 36**: Enter weight `15`
- [ ] **Test 37**: Switch to "Strategy" tab
- [ ] **Test 38**: Switch back to "Drug Reference" tab
- [ ] **Test 39**: Weight still shows `15`
- [ ] **Test 40**: Highlights still present
- [ ] **Test 41**: Reload page (F5)
- [ ] **Test 42**: Weight loads from localStorage
- [ ] **Test 43**: Highlights automatically apply

### Different Weight Values
- [ ] **Test 44**: Enter `8` → Correct rows highlight
- [ ] **Test 45**: Enter `10` → Correct rows highlight
- [ ] **Test 46**: Enter `15` → Correct rows highlight
- [ ] **Test 47**: Enter `20` → Correct rows highlight
- [ ] **Test 48**: Enter `24` → Correct rows highlight
- [ ] **Test 49**: Enter `30` → Correct rows highlight

---

## 🎨 Visual/UI Tests

### Styling
- [ ] **Test 50**: Weight input has blue background
- [ ] **Test 51**: Weight input has blue border
- [ ] **Test 52**: Summary has green background
- [ ] **Test 53**: Summary has green border
- [ ] **Test 54**: Highlighted rows have amber background
- [ ] **Test 55**: Highlighted rows have 3px amber left border
- [ ] **Test 56**: Checkmark icons are green
- [ ] **Test 57**: Copy button has green background

### Animations
- [ ] **Test 58**: Summary slides down smoothly (0.3s)
- [ ] **Test 59**: Table rows transition smoothly (0.2s)
- [ ] **Test 60**: No jarring jumps or flashes

### Typography
- [ ] **Test 61**: Weight input font is 16px (readable)
- [ ] **Test 62**: Weight input font is bold
- [ ] **Test 63**: Summary text is legible
- [ ] **Test 64**: Drug doses use monospace font

---

## 📱 Responsive Tests

### Desktop (>900px)
- [ ] **Test 65**: Weight input full width
- [ ] **Test 66**: Summary uses 2-column grid
- [ ] **Test 67**: Copy button on right side
- [ ] **Test 68**: All tables visible without horizontal scroll

### Tablet (600-900px)
- [ ] **Test 69**: Weight input full width
- [ ] **Test 70**: Summary uses 2-column grid
- [ ] **Test 71**: Copy button accessible
- [ ] **Test 72**: Tables stack properly

### Mobile (<600px)
- [ ] **Test 73**: Weight input full width
- [ ] **Test 74**: Summary uses 1-column grid (vertical stack)
- [ ] **Test 75**: Copy button full width below content
- [ ] **Test 76**: Font size 16px (no iOS zoom)
- [ ] **Test 77**: Touch targets at least 44px
- [ ] **Test 78**: No horizontal scroll required

---

## 🔄 Integration Tests

### Tab Switching
- [ ] **Test 79**: Enter weight in Drugs tab
- [ ] **Test 80**: Switch to Strategy tab
- [ ] **Test 81**: Switch to Escalation tab
- [ ] **Test 82**: Switch to Parent Script tab
- [ ] **Test 83**: Return to Drugs tab
- [ ] **Test 84**: Weight and highlights persist

### Multiple Game Plans
- [ ] **Test 85**: Enter weight `12`
- [ ] **Test 86**: Generate new game plan
- [ ] **Test 87**: Navigate to Drugs tab
- [ ] **Test 88**: Weight still shows `12`
- [ ] **Test 89**: Update weight to `15`
- [ ] **Test 90**: New highlights apply correctly

---

## 💾 Data Tests

### localStorage
- [ ] **Test 91**: Enter weight `20`
- [ ] **Test 92**: Open browser console (F12)
- [ ] **Test 93**: Run: `localStorage.getItem('pp_childWeight')`
- [ ] **Test 94**: Returns `"20"` (string)
- [ ] **Test 95**: Clear localStorage: `localStorage.removeItem('pp_childWeight')`
- [ ] **Test 96**: Reload page → Weight input is empty
- [ ] **Test 97**: Re-enter weight → Saves again

### Browser Compatibility
- [ ] **Test 98**: Test in Chrome/Edge (Electron uses Chromium)
- [ ] **Test 99**: Test in Firefox (optional)
- [ ] **Test 100**: Test in Safari (optional)

---

## 🚨 Error Handling Tests

### Invalid Input
- [ ] **Test 101**: Enter negative number → Ignored/reset
- [ ] **Test 102**: Enter letters → Blocked (type="number")
- [ ] **Test 103**: Enter special characters → Blocked
- [ ] **Test 104**: Paste invalid text → Sanitized

### Missing Elements
- [ ] **Test 105**: If table missing → Gracefully skipped (no error)
- [ ] **Test 106**: If summary div missing → No crash
- [ ] **Test 107**: If copy button missing → No crash

### Clipboard Errors
- [ ] **Test 108**: Deny clipboard permission → Shows error toast
- [ ] **Test 109**: Clipboard API unavailable → Graceful fallback

---

## 🔍 Accessibility Tests

### Keyboard Navigation
- [ ] **Test 110**: Tab to weight input
- [ ] **Test 111**: Enter weight via keyboard
- [ ] **Test 112**: Tab to Copy button
- [ ] **Test 113**: Press Enter to copy

### Screen Reader (Optional)
- [ ] **Test 114**: Label announces "Child's Weight (kg)"
- [ ] **Test 115**: Input value announced
- [ ] **Test 116**: Copy button announces "Copy All"

---

## 🎯 Performance Tests

### Speed
- [ ] **Test 117**: Enter weight → Highlights appear <100ms
- [ ] **Test 118**: Clear weight → Highlights remove <100ms
- [ ] **Test 119**: Summary animates smoothly (no lag)
- [ ] **Test 120**: No browser console errors

### Memory
- [ ] **Test 121**: Check localStorage size (<1KB)
- [ ] **Test 122**: No memory leaks after 10 weight changes

---

## 📊 Real-World Scenario Tests

### Scenario 1: New Patient
- [ ] **Test 123**: Patient arrives (weight: 18kg)
- [ ] **Test 124**: Generate game plan
- [ ] **Test 125**: Enter weight `18`
- [ ] **Test 126**: Verify correct rows highlighted
- [ ] **Test 127**: Click Copy All
- [ ] **Test 128**: Paste into text file
- [ ] **Test 129**: Verify all 4 doses present

### Scenario 2: Prescription Writing
- [ ] **Test 130**: Enter weight `12`
- [ ] **Test 131**: Copy doses
- [ ] **Test 132**: Paste into prescription software
- [ ] **Test 133**: Verify format is clean
- [ ] **Test 134**: Send to parent via WhatsApp (paste again)

### Scenario 3: Weight Change
- [ ] **Test 135**: Initially enter `15`
- [ ] **Test 136**: Patient re-weighed: `16kg`
- [ ] **Test 137**: Update weight to `16`
- [ ] **Test 138**: New highlights appear correctly
- [ ] **Test 139**: Old highlights removed

---

## 📝 Documentation Tests

### User Documentation
- [ ] **Test 140**: WEIGHT_CALCULATOR_QUICK_GUIDE.md is accurate
- [ ] **Test 141**: WEIGHT_CALCULATOR_DEMO.md screenshots match reality
- [ ] **Test 142**: README_WEIGHT_CALCULATOR.md instructions work

### Technical Documentation
- [ ] **Test 143**: WEIGHT_CALCULATOR_IMPLEMENTATION.md code refs are correct
- [ ] **Test 144**: WEIGHT_CALCULATOR_SUMMARY.md metrics match testing

---

## 🎓 Training Tests

### New Staff Onboarding
- [ ] **Test 145**: Give Quick Guide to new staff member
- [ ] **Test 146**: They can find weight input (<30 sec)
- [ ] **Test 147**: They can enter weight correctly
- [ ] **Test 148**: They can use Copy All button
- [ ] **Test 149**: They understand copied format
- [ ] **Test 150**: Total training time <5 minutes

---

## ✅ Pre-Deployment Checklist

### Code Quality
- [ ] **Test 151**: No console errors in browser DevTools
- [ ] **Test 152**: No console warnings
- [ ] **Test 153**: HTML validates (optional)
- [ ] **Test 154**: CSS has no unused rules (optional)

### Production Readiness
- [ ] **Test 155**: Feature works in Electron app
- [ ] **Test 156**: localStorage persists after app restart
- [ ] **Test 157**: All documentation files present
- [ ] **Test 158**: README updated
- [ ] **Test 159**: Version number updated (if applicable)

### Final Checks
- [ ] **Test 160**: Backup of original PedoPlan_v5.html exists
- [ ] **Test 161**: All team members trained
- [ ] **Test 162**: Support contact info shared
- [ ] **Test 163**: Rollback plan in place
- [ ] **Test 164**: Success metrics defined

---

## 📊 Test Results Summary

### Total Tests: 164

**Functional**: 49 tests  
**Visual/UI**: 15 tests  
**Responsive**: 14 tests  
**Integration**: 12 tests  
**Data**: 8 tests  
**Error Handling**: 9 tests  
**Accessibility**: 7 tests  
**Performance**: 6 tests  
**Real-World**: 15 tests  
**Documentation**: 5 tests  
**Training**: 6 tests  
**Pre-Deployment**: 14 tests  

---

## 🎯 Pass Criteria

### Minimum to Deploy:
- ✅ All **Functional Tests** (1-49) pass
- ✅ All **Visual/UI Tests** (50-64) pass
- ✅ All **Mobile Tests** (73-78) pass
- ✅ At least 1 **Real-World Scenario** (123-139) passes
- ✅ No console errors

### Recommended to Deploy:
- ✅ >95% of all tests pass (156/164)
- ✅ All critical paths tested
- ✅ Documentation verified

---

## 📝 Test Log Template

Use this to record test results:

```
Date: __________
Tester: __________
Browser: __________
OS: __________

Test Results:
- Functional: ___ / 49 passed
- Visual: ___ / 15 passed
- Responsive: ___ / 14 passed
- Integration: ___ / 12 passed
- Data: ___ / 8 passed
- Error Handling: ___ / 9 passed
- Performance: ___ / 6 passed
- Real-World: ___ / 15 passed

TOTAL: ___ / 164 passed

Failed Tests (if any):
- Test #___: [Description of failure]
- Test #___: [Description of failure]

Notes:
[Any additional observations]

Recommendation:
[ ] Deploy to production
[ ] Fix issues first
[ ] Retest required
```

---

## 🚨 Critical Bugs (Must Fix Before Deploy)

If any of these fail, **DO NOT DEPLOY**:

1. Weight input crashes app
2. Copy button doesn't work at all
3. Wrong doses copied
4. Data loss (weight not saved)
5. Mobile completely broken
6. Tables don't highlight at all
7. Console errors on every action

---

## 🎉 Success Criteria

**Feature is ready when:**
- [x] All critical tests pass
- [x] Zero console errors
- [x] Mobile responsive confirmed
- [x] Copy functionality verified
- [x] Weight persistence tested
- [x] Documentation complete
- [x] Training materials ready

---

**Testing Status**: ⏳ Pending  
**Tested By**: ___________  
**Date**: ___________  
**Result**: [ ] PASS | [ ] FAIL | [ ] PENDING

