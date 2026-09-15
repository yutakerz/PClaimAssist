/* ═══════════════════════════════════════════════════════════
   Overlay field coordinate map – CF2 (612×936 pt)
   top/left are % of rendered page (0–100).
   Coordinates derived from actual PDF text/rect extraction.
   (NOTE: All top% values have been corrected using the 100-X rule)
═══════════════════════════════════════════════════════════ */
window.PDF_OVERLAY_CF2 = [
  // HCI Accreditation No (PAN) — 9 boxed digits
  { id:'hciPAN',           key:'hciPAN',           page:1, top:21.5, left:54.95, w:18.06, fs:8,
    boxLefts:[53.95,55.96,57.97,59.98,61.98,63.99,66.00,68.01,70.00] },
  // HCI Name
  { id:'hciName',          key:'hciName',          page:1, top:23.2, left:28.45, w:67.83, fs:8 },
  // HCI Address row
  { id:'hciStreet',        key:'hciStreet',        page:1, top:24.86, left:13.27, w:33.64, fs:8 },
  { id:'hciCity',          key:'hciCity',          page:1, top:24.86, left:48.42, w:23.56, fs:8 },
  { id:'hciProvince',      key:'hciProvince',      page:1, top:24.86, left:73.82, w:22.43, fs:8 },
  // Patient name
  { id:'patientLastName',  key:'patientLastName',  page:1, top:29.83, left:20.39, w:17.96, fs:8 },
  { id:'patientFirstName', key:'patientFirstName', page:1, top:29.83, left:40.29, w:19.62, fs:8 },
  { id:'patientMiddleName',key:'patientMiddleName',page:1, top:29.95, left:76.81, w:19.64, fs:8 },
  { id:'patientNameExt',   key:'patientNameExt',   page:1, top:29.83, left:61.42, w:13.46, fs:8 },
  // Was patient referred by another HCI? (Yes/No checkbox)
  { id:'referredByHCI',    key:'referredByHCI',    page:1, fs:9,
    checkOptions:[
      { value:'No',  top:36.01, left:5.31 },
      { value:'Yes', top:36.01, left:11.49 },
    ] },
  { id:'referralHciName',  key:'referralHciName',  page:1, top:35.81, left:18.37, w:24.10, fs:7 },
  { id:'referralStreet',   key:'referralStreet',   page:1, top:35.81, left:44.35, w:18.51, fs:7 },
  { id:'referralCity',     key:'referralCity',     page:1, top:35.85, left:64.67, w:10.67, fs:7 },
  { id:'referralProvince', key:'referralProvince', page:1, top:35.85, left:76.81, w:11.78, fs:7 },
  { id:'referralZip',      key:'referralZip',      page:1, top:35.85, left:90.11, w:6.18,  fs:7 },
  // Date/Time Admitted — 8 boxed digits (2-2-4) + 4 boxed digits (2-2)
  { id:'dateAdmitted',     key:'dateAdmitted',     page:1, top:39.49, left:32.35, w:18.40, fs:8, computed:'dateAdmitted',
    boxLefts:[32.35,34.36,37.53,39.54,42.71,44.72,46.73,48.74] },
  { id:'timeAdmitted',     key:'timeAdmitted',     page:1, top:38.97, left:63.94, w:9.20, fs:8, computed:'timeAdmittedDigits',
    boxLefts:[63.94,65.95,69.12,71.14] },
  // Date/Time Discharged
  { id:'dateDischarge',    key:'dateDischarge',    page:1, top:41.18, left:32.35, w:18.40, fs:8, computed:'dateDischarge',
    boxLefts:[32.35,34.36,37.53,39.54,42.71,44.72,46.73,48.74] },
  { id:'timeDischarge',    key:'timeDischarge',    page:1, top:40.69, left:63.94, w:9.20, fs:8, computed:'timeDischargeDigits',
    boxLefts:[63.94,65.95,69.12,71.14] },
  // AM/PM checkboxes (Admitted / Discharged)
  { id:'amPmAdmitted',     key:'amPmAdmitted',     page:1, fs:9,
    checkOptions:[
      { value:'AM', top:39.31, left:76.98 },
      { value:'PM', top:39.31, left:83.86 },
    ] },
  { id:'amPmDischarge',    key:'amPmDischarge',    page:1, fs:9,
    checkOptions:[
      { value:'AM', top:40.93, left:76.98 },
      { value:'PM', top:40.93, left:83.86 },
    ] },
  // Patient Disposition checkboxes
  { id:'disposition',      key:'disposition',      page:1, fs:9,
    checkOptions:[
      { value:'Improved',    top:44.34, left:5.31 },
      { value:'Recovered',   top:45.95, left:5.31 },
      { value:'HAMA',        top:47.56, left:5.31 },
      { value:'Absconded',   top:49.17, left:5.31 },
      { value:'Expired',     top:44.34, left:31.13 },
      { value:'Transferred', top:45.95, left:31.13 },
    ] },
  // Type of Accommodation checkboxes
  { id:'accommodation',    key:'accommodation',    page:1, fs:9,
    checkOptions:[
      { value:'Private',     top:50.81, left:23.53 },
      { value:'Non-Private', top:50.81, left:32.43 },
    ] },
  // Admission diagnosis
  { id:'admissionDx',      key:'admissionDx',      page:1, top:54.3, left:6,   w:91, fs:8 },

  // Discharge Diagnosis table (7. Discharge Diagnosis/es)
  // Diagnosis A
  { id:'dxADiagnosis',     key:'dxADiagnosis',     page:1, top:59.62, left:6.96,  w:11.55, fs:7 },
  { id:'dxAIcd10',         key:'dxAIcd10',         page:1, top:59.62, left:20.39, w:8.99,  fs:7 },
  { id:'dxAProcI',         key:'dxAProcI',         page:1, top:59.62, left:32.81, w:18.59, fs:7 },
  { id:'dxARvsI',          key:'dxARvsI',          page:1, top:59.62, left:53.30, w:9.62,  fs:7 },
  { id:'dxADateI',         key:'dxADateI',         page:1, top:59.62, left:64.67, w:10.26, fs:7, computed:'dxADateI' },
  { id:'dxALatI',          key:'dxALatI',          page:1, fs:8,
    checkOptions:[
      { value:'left',  top:59.6, left:77.34 },
      { value:'right', top:59.6, left:83.15 },
      { value:'both',  top:59.6, left:89.54 },
    ] },
  { id:'dxAProcII',        key:'dxAProcII',        page:1, top:61.06, left:32.81, w:18.59, fs:7 },
  { id:'dxARvsII',         key:'dxARvsII',         page:1, top:61.06, left:53.30, w:9.62,  fs:7 },
  { id:'dxADateII',        key:'dxADateII',        page:1, top:61.06, left:64.67, w:10.26, fs:7, computed:'dxADateII' },
  { id:'dxALatII',         key:'dxALatII',         page:1, fs:8,
    checkOptions:[
      { value:'left',  top:61.04, left:77.34 },
      { value:'right', top:61.04, left:83.15 },
      { value:'both',  top:61.04, left:89.54 },
    ] },
  { id:'dxAProcIII',       key:'dxAProcIII',       page:1, top:62.5,  left:32.81, w:18.59, fs:7 },
  { id:'dxARvsIII',        key:'dxARvsIII',        page:1, top:62.5,  left:53.30, w:9.62,  fs:7 },
  { id:'dxADateIII',       key:'dxADateIII',       page:1, top:62.5,  left:64.67, w:10.26, fs:7, computed:'dxADateIII' },
  { id:'dxALatIII',        key:'dxALatIII',        page:1, fs:8,
    checkOptions:[
      { value:'left',  top:62.48, left:77.34 },
      { value:'right', top:62.48, left:83.15 },
      { value:'both',  top:62.48, left:89.54 },
    ] },
  // Diagnosis B
  { id:'dxBDiagnosis',     key:'dxBDiagnosis',     page:1, top:63.94, left:7.01,  w:11.54, fs:7 },
  { id:'dxBIcd10',         key:'dxBIcd10',         page:1, top:63.94, left:20.39, w:8.99,  fs:7 },
  { id:'dxBProcI',         key:'dxBProcI',         page:1, top:63.94, left:32.81, w:18.59, fs:7 },
  { id:'dxBRvsI',          key:'dxBRvsI',          page:1, top:63.94, left:53.30, w:9.62,  fs:7 },
  { id:'dxBDateI',         key:'dxBDateI',         page:1, top:63.94, left:64.67, w:10.26, fs:7, computed:'dxBDateI' },
  { id:'dxBLatI',          key:'dxBLatI',          page:1, fs:8,
    checkOptions:[
      { value:'left',  top:63.92, left:77.34 },
      { value:'right', top:63.92, left:83.15 },
      { value:'both',  top:63.92, left:89.54 },
    ] },
  { id:'dxBProcII',        key:'dxBProcII',        page:1, top:65.39, left:32.81, w:18.59, fs:7 },
  { id:'dxBRvsII',         key:'dxBRvsII',         page:1, top:65.39, left:53.30, w:9.62,  fs:7 },
  { id:'dxBDateII',        key:'dxBDateII',        page:1, top:65.39, left:64.67, w:10.26, fs:7, computed:'dxBDateII' },
  { id:'dxBLatII',         key:'dxBLatII',         page:1, fs:8,
    checkOptions:[
      { value:'left',  top:65.37, left:77.34 },
      { value:'right', top:65.37, left:83.15 },
      { value:'both',  top:65.37, left:89.54 },
    ] },
  { id:'dxBProcIII',       key:'dxBProcIII',       page:1, top:66.8, left:32.81, w:18.59, fs:7 },
  { id:'dxBRvsIII',        key:'dxBRvsIII',        page:1, top:66.8, left:53.30, w:9.62,  fs:7 },
  { id:'dxBDateIII',       key:'dxBDateIII',       page:1, top:66.8, left:64.67, w:10.26, fs:7, computed:'dxBDateIII' },
  { id:'dxBLatIII',        key:'dxBLatIII',        page:1, fs:8,
    checkOptions:[
      { value:'left',  top:66.8, left:77.34 },
      { value:'right', top:66.8, left:83.15 },
      { value:'both',  top:66.8, left:89.54 },
    ] },

  // ═══ PAGE 2 ═══

  // Item 10 – Accreditation/Signature/Date Signed + Co-pay (3 rows)
  { id:'cf2Prof1AccredNo', key:'cf2Prof1AccredNo', page:2, top:7.81, left:16.29, w:24.5, fs:7,
    boxLefts:[16.29,18.30,20.31,22.32,25.49,27.50,29.51,31.52,33.53,35.54,37.55,40.72] },
  { id:'cf2Prof1Name',     key:'cf2Prof1Name',     page:2, top:9.92, left:9.35, w:38.45, fs:7 },
  { id:'cf2Prof1DateSigned', key:'cf2Prof1DateSigned', page:2, top:12.58, left:20.51, w:16.4, fs:7, computed:'cf2Prof1DateSigned',
    boxLefts:[20.51,22.52,25.69,27.70,30.87,32.88,34.89,36.90] },
  { id:'cf2Prof1Copay',    key:'cf2Prof1Copay',    page:2, fs:8,
    checkOptions:[
      { value:'No',   top:9.97, left:54.33 },
      { value:'Yes',  top:11.51, left:54.33 },
    ] },
  { id:'cf2Prof1CopayAmount', key:'cf2Prof1CopayAmount', page:2, top:11.52, left:80.67, w:14.1, fs:7 },

  { id:'cf2Prof2AccredNo', key:'cf2Prof2AccredNo', page:2, top:15.11, left:16.29, w:24.5, fs:7,
    boxLefts:[16.29,18.30,20.31,22.32,25.49,27.50,29.51,31.52,33.53,35.54,37.55,40.72] },
  { id:'cf2Prof2Name',     key:'cf2Prof2Name',     page:2, top:16.63, left:9.35, w:38.45, fs:7 },
  { id:'cf2Prof2DateSigned', key:'cf2Prof2DateSigned', page:2, top:19.14, left:20.51, w:16.4, fs:7, computed:'cf2Prof2DateSigned',
    boxLefts:[20.51,22.52,25.69,27.70,30.87,32.88,34.89,36.90] },
  { id:'cf2Prof2Copay',    key:'cf2Prof2Copay',    page:2, fs:8,
    checkOptions:[
      { value:'No',   top:16.67, left:54.33 },
      { value:'Yes',  top:18.21, left:54.33 },
    ] },
  { id:'cf2Prof2CopayAmount', key:'cf2Prof2CopayAmount', page:2, top:18.23, left:80.67, w:14.1, fs:7 },

  { id:'cf2Prof3AccredNo', key:'cf2Prof3AccredNo', page:2, top:21.1, left:16.29, w:24.5, fs:7,
    boxLefts:[16.29,18.30,20.31,22.32,25.49,27.50,29.51,31.52,33.53,35.54,37.55,40.72] },
  { id:'cf2Prof3Name',     key:'cf2Prof3Name',     page:2, top:23.21, left:9.35, w:38.45, fs:7 },
  { id:'cf2Prof3DateSigned', key:'cf2Prof3DateSigned', page:2, top:25.71, left:20.51, w:16.4, fs:7, computed:'cf2Prof3DateSigned',
    boxLefts:[20.51,22.52,25.69,27.70,30.87,32.88,34.89,36.90] },
  { id:'cf2Prof3Copay',    key:'cf2Prof3Copay',    page:2, fs:8,
    checkOptions:[
      { value:'No',   top:23.24, left:54.33 },
      { value:'Yes',  top:24.78, left:54.33 },
    ] },
  { id:'cf2Prof3CopayAmount', key:'cf2Prof3CopayAmount', page:2, top:24.81, left:80.67, w:14.1, fs:7 },

  // Part III-B – Consent to Access Patient Record/s
  { id:'cf2PatientRepName', key:'cf2PatientRepName', page:2, top:78.1, left:5.31, w:39.08, fs:7 },
  { id:'cf2PatientRepSignedDate', key:'cf2PatientRepSignedDate', page:2, top:81.17, left:20.51, w:16.4, fs:7, computed:'cf2PatientRepSignedDate',
    boxLefts:[20.51,22.52,25.69,27.70,30.87,32.88,34.89,36.90] },
  { id:'cf2PatientRepRelationship', key:'cf2PatientRepRelationship', page:2, fs:8,
    checkOptions:[
      { value:'Spouse',  top:84.14, left:26.16 },
      { value:'Child',   top:84.14, left:33.58 },
      { value:'Parent',  top:84.14, left:40.42 },
      { value:'Sibling', top:85.34, left:26.16 },
      { value:'Others',  top:85.34, left:33.58 },
    ] },
  { id:'cf2PatientRepRelationshipOther', key:'cf2PatientRepRelationshipOther', page:2, top:85.34, left:44.23, w:12.17, fs:7 },
  { id:'cf2PatientReason', key:'cf2PatientReason', page:2, fs:8,
    checkOptions:[
      { value:'Incapacitated', top:86.78, left:58.33 },
      { value:'Other',         top:88.06, left:58.33 },
    ] },
  { id:'cf2PatientReasonOther', key:'cf2PatientReasonOther', page:2, top:88.02, left:36.58, w:19.87, fs:7 },

  // Part IV – Certification of Consumption of Health Care Institution
  { id:'cf2ProviderRepName', key:'cf2ProviderRepName', page:2, top:95.18, left:5.31, w:33.32, fs:7 },
  { id:'cf2ProviderCapacity', key:'cf2ProviderCapacity', page:2, top:95.18, left:40.29, w:26.91, fs:7 },
  { id:'cf2ProviderSignedDate', key:'cf2ProviderSignedDate', page:2, top:95.11, left:76.81, w:16.4, fs:7, computed:'cf2ProviderSignedDate',
    boxLefts:[76.81,78.82,81.99,84.00,87.16,89.18,91.18,93.19] },
];
