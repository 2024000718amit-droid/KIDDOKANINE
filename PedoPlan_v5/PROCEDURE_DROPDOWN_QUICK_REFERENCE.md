# Procedure Dropdown — Quick Reference

## 📋 Complete Procedure List (38 Procedures)

---

## 🔨 RESTORATIVE (6 procedures)

| Procedure | Matrix Value | Common For |
|-----------|-------------|------------|
| Composite Restoration (Anterior) | `restoration` | Anterior caries, esthetics |
| Composite Restoration (Posterior) | `restoration` | Posterior caries, Class I/II |
| GIC Restoration (ART) | `restoration` | ART technique, high-caries-risk |
| Stainless Steel Crown (SSC) | `ssc` | Multi-surface caries, large restorations |
| Strip Crown (Anterior) | `restoration` | Severe Early Childhood Caries (ECC) anterior |
| Zirconia Crown | `ssc` | Esthetic anterior crowns |

---

## 🦷 PULP THERAPY (6 procedures)

| Procedure | Matrix Value | Common For |
|-----------|-------------|------------|
| Pulp Capping (Direct) | `pulpectomy` | Small pulp exposure, vital pulp |
| Pulp Capping (Indirect) | `pulpectomy` | Deep caries close to pulp, no exposure |
| Pulpotomy | `pulpectomy` | Primary teeth with carious pulp exposure |
| Pulpectomy (Primary Tooth) | `pulpectomy` | Necrotic primary tooth pulp, root canal |
| RCT — Apexogenesis (Young Permanent) | `pulpectomy` | Young permanent tooth, open apex, vital pulp |
| Apexification | `pulpectomy` | Young permanent tooth, open apex, necrotic pulp |

---

## ✂️ SURGICAL / EXTRACTIONS (4 procedures)

| Procedure | Matrix Value | Common For |
|-----------|-------------|------------|
| Simple Extraction (Primary Tooth) | `extraction` | Mobile primary tooth, severe decay |
| Surgical Extraction | `extraction` | Impacted teeth, difficult extractions |
| Frenectomy (Labial / Lingual) | `extraction` | Tongue-tie (ankyloglossia), maxillary diastema |
| Operculectomy | `extraction` | Pericoronitis, partially erupted tooth |

---

## 🛡️ PREVENTIVE (4 procedures)

| Procedure | Matrix Value | Common For |
|-----------|-------------|------------|
| Pit & Fissure Sealant | `fluoride` | Caries prevention, deep fissures |
| Fluoride Application (Varnish/Gel) | `fluoride` | High caries risk, demineralization |
| Prophylaxis / Scaling | `exam` | Routine cleaning, gingivitis |
| OHI Session | `exam` | Oral hygiene instruction, caries prevention |

---

## 📏 SPACE MANAGEMENT (4 procedures)

| Procedure | Matrix Value | Common For |
|-----------|-------------|------------|
| Space Maintainer — Removable | `spacemaintainer` | Acrylic partial denture with clasps |
| Space Maintainer — Fixed (Band & Loop) | `spacemaintainer` | Single tooth space loss |
| Lingual Arch | `spacemaintainer` | Multiple space maintenance, mandibular |
| Space Regainer | `spacemaintainer` | Lost space, need to regain before ortho |

---

## 🤚 HABIT APPLIANCES (4 procedures)

| Procedure | Matrix Value | Common For |
|-----------|-------------|------------|
| Thumb/Finger Sucking Appliance | `habit` | Prolonged digit sucking habit |
| Tongue Thrusting Appliance | `habit` | Tongue thrust swallow, anterior open bite |
| Lip Bumper | `habit` | Lip sucking, lower arch expansion |
| Myofunctional Appliance | `habit` | Orofacial myofunctional disorders |

---

## 😰 BEHAVIOUR / SEDATION (4 procedures)

| Procedure | Matrix Value | Common For |
|-----------|-------------|------------|
| Behaviour Shaping Session (No Procedure) | `exam` | Frankl 1, desensitization visit |
| Conscious Sedation — N₂O | `exam` | Mild anxiety, cooperative with support |
| Oral Midazolam Sedation | `exam` | Moderate anxiety, young children |
| GA Referral Work-Up | `exam` | Severe dental phobia, extensive treatment |

---

## 🚨 TRAUMA (3 procedures)

| Procedure | Matrix Value | Common For |
|-----------|-------------|------------|
| Crown Fracture Management | `trauma` | Ellis Class I/II/III fractures |
| Luxation / Avulsion Management | `trauma` | Traumatic injuries, tooth displacement |
| Splinting | `trauma` | Stabilization after luxation/avulsion |

---

## 🎯 Quick Selection Guide

### By Age Group:

**Infant (0-18 months):**
- Exam/OHI Session
- Fluoride Application

**Toddler (1.5-3 years):**
- GIC Restoration (ART)
- Fluoride Application
- Behaviour Shaping Session

**Preschool (3-6 years):**
- Composite Restoration (Anterior/Posterior)
- Pulpotomy
- Simple Extraction
- SSC
- Space Maintainer

**School Age (6-9 years):**
- Composite Restoration
- Pulpectomy (Primary Tooth)
- Pit & Fissure Sealant
- Frenectomy
- Habit Appliances

**Preteen (9-12 years):**
- Composite Restoration
- RCT — Apexogenesis
- Surgical Extraction
- Lingual Arch
- Trauma Management

---

## 🔄 Common Procedure Combinations

### Multiple Procedures in One Visit:
1. **Exam + Prophylaxis + Fluoride + Sealants**
2. **Extraction + Space Maintainer (same visit or follow-up)**
3. **Pulpotomy + SSC**
4. **Composite Restoration + Pit & Fissure Sealant**
5. **Behaviour Shaping + OHI Session**

*Note: Generate separate game plans for each major procedure if needed*

---

## 📊 Procedure Complexity & Time

| Complexity | Procedures | Typical Duration |
|------------|-----------|------------------|
| **Simple** | Exam, OHI, Fluoride, Prophylaxis | 10-20 min |
| **Moderate** | Composite (small), Pit & Fissure Sealant | 20-30 min |
| **Complex** | SSC, Pulpotomy, Extraction, Space Maintainer | 30-45 min |
| **Very Complex** | Pulpectomy, Surgical Extraction, RCT Apexogenesis | 45-60 min |

---

## 🎨 Visual Dropdown Structure

```
Procedure
├─ 🔨 Restorative
│  ├─ Composite Restoration (Anterior)
│  ├─ Composite Restoration (Posterior)
│  ├─ GIC Restoration (ART)
│  ├─ Stainless Steel Crown (SSC)
│  ├─ Strip Crown (Anterior)
│  └─ Zirconia Crown
│
├─ 🦷 Pulp Therapy
│  ├─ Pulp Capping (Direct)
│  ├─ Pulp Capping (Indirect)
│  ├─ Pulpotomy
│  ├─ Pulpectomy (Primary Tooth)
│  ├─ RCT — Apexogenesis (Young Permanent)
│  └─ Apexification
│
├─ ✂️ Surgical / Extractions
│  ├─ Simple Extraction (Primary Tooth)
│  ├─ Surgical Extraction
│  ├─ Frenectomy (Labial / Lingual)
│  └─ Operculectomy
│
├─ 🛡️ Preventive
│  ├─ Pit & Fissure Sealant
│  ├─ Fluoride Application (Varnish/Gel)
│  ├─ Prophylaxis / Scaling
│  └─ OHI Session
│
├─ 📏 Space Management
│  ├─ Space Maintainer — Removable
│  ├─ Space Maintainer — Fixed (Band & Loop)
│  ├─ Lingual Arch
│  └─ Space Regainer
│
├─ 🤚 Habit Appliances
│  ├─ Thumb/Finger Sucking Appliance
│  ├─ Tongue Thrusting Appliance
│  ├─ Lip Bumper
│  └─ Myofunctional Appliance
│
├─ 😰 Behaviour / Sedation
│  ├─ Behaviour Shaping Session (No Procedure)
│  ├─ Conscious Sedation — N₂O
│  ├─ Oral Midazolam Sedation
│  └─ GA Referral Work-Up
│
└─ 🚨 Trauma
   ├─ Crown Fracture Management
   ├─ Luxation / Avulsion Management
   └─ Splinting
```

---

## 💡 Pro Tips

### For Clinic Staff:

1. **Can't find a procedure?**
   - Check similar procedures in the same group
   - Use the most specific option available
   - Example: If doing "Anterior composite with strip crown," choose "Strip Crown (Anterior)"

2. **Multiple procedures?**
   - Generate game plan for the PRIMARY/MOST COMPLEX procedure
   - The behavior management strategy applies to all procedures

3. **Sedation procedures?**
   - If doing a procedure UNDER sedation, select the ACTUAL procedure (not sedation)
   - Example: "Pulpotomy under N₂O" → Select "Pulpotomy"
   - Sedation options are for cases where sedation itself is the primary goal

4. **Behaviour shaping?**
   - Use "Behaviour Shaping Session" for desensitization visits
   - Use "OHI Session" for pure education/instruction visits

---

## 🔍 Search Tips

### Finding Procedures Quickly:

**By Keyword:**
- "Crown" → Restorative group (SSC, Strip, Zirconia)
- "Pulp" → Pulp Therapy group
- "Extraction" → Surgical group
- "Sealant" → Preventive group
- "Space" → Space Management group
- "Habit" → Habit Appliances group
- "Sedation" → Behaviour/Sedation group
- "Fracture" or "Avulsion" → Trauma group

**By Tooth Type:**
- **Primary teeth**: Pulpotomy, Pulpectomy (Primary), SSC
- **Young permanent**: RCT Apexogenesis, Apexification
- **Mixed dentition**: Space Maintainer, Lingual Arch

**By Indication:**
- **Caries**: Composite, GIC, SSC, Strip Crown, Pulpotomy
- **Deep caries**: Pulp Capping, Pulpotomy, Pulpectomy
- **Prevention**: Sealant, Fluoride, Prophylaxis, OHI
- **Space loss**: Space Maintainer, Space Regainer
- **Habits**: Thumb Sucking, Tongue Thrusting, Lip Bumper
- **Anxiety**: Behaviour Shaping, N₂O, Midazolam
- **Injury**: Crown Fracture, Luxation, Splinting

---

## 📖 References

### Clinical Guidelines:
- **Marwah**: Textbook of Pediatric Dentistry, 5th Edition
- **McDonald & Avery**: Dentistry for the Child and Adolescent, 11th Ed
- **Pinkham**: Pediatric Dentistry: Infancy Through Adolescence, 5th Ed
- **AAPD**: Clinical Practice Guidelines (2024)
- **EAPD**: European Academy of Paediatric Dentistry Guidelines

### India-Specific:
- **DCI**: Dental Council of India Guidelines
- **IAPD**: Indian Academy of Pediatric Dentistry Protocols
- **Nair Hospital Dental College**: Mumbai clinical protocols

---

**Last Updated**: June 16, 2026  
**Total Procedures**: 38  
**Categories**: 8  
**Version**: 1.1
