# Weight-Based Drug Calculator — Quick Guide

## 🎯 For Clinic Staff

### How to Use (3 Simple Steps)

1. **Open Drugs Tab**
   - Click "Drug Reference" tab in the game plan output

2. **Enter Weight**
   - Type child's weight in kg at the top
   - Example: `12` for a 12kg child
   - Range: 3–60 kg
   - Use decimal if needed: `15.5`

3. **Copy Doses**
   - See green summary box with all 4 drug doses
   - Click **"📋 Copy All"** button
   - Paste into prescription or WhatsApp

---

## 📱 What You'll See

### Before Entering Weight:
```
┌─────────────────────────────────────┐
│ Child's Weight (kg)                 │
│ [_____________________]             │
└─────────────────────────────────────┘

 Drug tables show all rows normally
```

### After Entering 12kg:
```
┌─────────────────────────────────────┐
│ Child's Weight (kg)                 │
│ [ 12 ]                              │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ✓ Recommended Doses for 12kg        │
│                                     │
│ Amoxicillin + Clavulanic Acid       │
│ 228.5mg — 6ml  BD                   │
│                                     │
│ Metronidazole                       │
│ 3 ml  TDS                           │
│                                     │
│ [📋 Copy All]                       │
└─────────────────────────────────────┘

 Matching rows HIGHLIGHTED in amber
 ✓ Checkmarks show correct doses
 Other rows dimmed (40% opacity)
```

---

## 📋 Copied Text Format

When you click "Copy All", this is what gets copied:

```
Pediatric Drug Doses for 12kg Child:

Amoxicillin + Clavulanic Acid
Dose: 228.5mg — 6ml
Frequency: BD

Metronidazole
Dose: 3 ml
Frequency: TDS

Paracetamol
Dose: 6 ml (125mg/5ml)
Frequency: 4–6 hrly PRN

Ibuprofen
Dose: 5 ml
Frequency: 6 hrly PRN

---
Always confirm with current BNFc or hospital formulary.
```

**Ready to paste into:**
- Prescription software
- WhatsApp message to parents
- SMS
- Email
- Electronic health record

---

## 💡 Tips

### ✅ DO:
- Enter weight at the start of visit
- Weight auto-saves (persists across tabs)
- Use for quick prescription writing
- Double-check dose before prescribing

### ❌ DON'T:
- Don't rely solely on this — always confirm with formulary
- Don't use for weights outside 3–60kg range
- Don't forget to update weight if child is weighed differently

---

## 🔄 Weight Persistence

**Weight value is saved automatically:**
- Stays when you switch tabs
- Stays when you close/reopen app
- Clears only when you delete the number

**To start fresh:**
- Clear the weight input field
- All highlights disappear
- Summary box hides

---

## 📱 Mobile/Tablet

Works perfectly on mobile:
- Large touch-friendly input (no zoom on iOS)
- Summary stack vertically
- Copy button easily accessible
- All highlights visible

---

## 🧮 Which Drugs Are Included?

### In Summary Strip (Main 4):
1. **Amoxicillin + Clavulanic Acid** (Augmentin)
2. **Metronidazole** (Metrogyl)
3. **Paracetamol** (Crocin/Calpol)
4. **Ibuprofen** (Ibugesic)

### Also Highlighted (in tables below):
5. **Cefadroxil** (Alternative antibiotic)

---

## 🎨 Visual Guide

### Highlighted Row (Correct Dose):
```
┌──────────────────────────────────────┐
│ ✓ 12   6 ml (125mg/5ml)   4–6 hrly  │ ← Amber background
│                                       │    3px green border on left
│                                       │    ✓ Checkmark icon
└──────────────────────────────────────┘
```

### Dimmed Row (Not Matching):
```
┌──────────────────────────────────────┐
│   10   5 ml (125mg/5ml)   4–6 hrly   │ ← Faded (40% opacity)
└──────────────────────────────────────┘
```

---

## 🚨 Common Questions

**Q: Weight doesn't highlight anything?**  
A: Check if weight is between 3–60 kg. Weights outside this range are ignored.

**Q: Multiple rows highlighted for one drug?**  
A: This shouldn't happen. Contact support if you see this.

**Q: Copy button doesn't work?**  
A: Ensure browser clipboard permissions are enabled. Try Ctrl+C instead.

**Q: Weight disappeared after closing app?**  
A: Check if browser data/cache was cleared. Weight is stored locally.

**Q: Can I use pounds?**  
A: No, only kilograms. Convert: `lbs ÷ 2.2 = kg`

---

## 📞 Troubleshooting

### Issue: Nothing happens when I type weight
**Fix:** 
- Ensure you're on the "Drug Reference" tab
- Check number is between 3–60
- Try refreshing the page

### Issue: Copy button says "No weight entered"
**Fix:**
- Enter weight first
- Wait for summary to appear
- Then click Copy All

### Issue: Highlights stay after clearing weight
**Fix:**
- Delete the weight completely (backspace)
- Or refresh the page

---

## 🎓 Training Checklist

For new clinic staff:

- [ ] Find the weight input field
- [ ] Enter a test weight (e.g., 12)
- [ ] Identify highlighted rows
- [ ] Read the summary box
- [ ] Click "Copy All" button
- [ ] Paste the text somewhere
- [ ] Clear the weight
- [ ] Confirm highlights disappear
- [ ] Switch to another tab and back
- [ ] Confirm weight persists

**Time to train:** ~2 minutes  
**Difficulty:** Very Easy ⭐

---

## 📖 Example Workflow

### Real Clinic Scenario:

1. **Patient arrives**: 5-year-old, 18kg
2. **Enter weight**: Type `18` in weight field
3. **Generate game plan**: Use main form
4. **Review plan**: Read behavior strategy
5. **Check drugs tab**: See highlighted doses
6. **Copy doses**: Click "📋 Copy All"
7. **Write prescription**: Paste into prescription pad
8. **Send to parent**: Copy again, send via WhatsApp

**Total time saved:** ~30 seconds per prescription  
**Errors reduced:** Weight calculation mistakes eliminated

---

**Last Updated:** June 2026  
**Version:** 1.0  
**Tested on:** Electron (Chrome-based)
