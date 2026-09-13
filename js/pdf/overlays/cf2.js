/* ═══════════════════════════════════════════════════════════
   Overlay field coordinate map – CF2 (612×936 pt)
   top/left are % of rendered page (0–100).
   Coordinates derived from actual PDF text/rect extraction
   (page.get_drawings() + get_text('words') via PyMuPDF).
   PAN/date/time fields use the generic `digit` resolver (see
   pdf-overlay.js resolveOverlayFieldValue) to place one character
   per printed digit box; disposition/accommodation use `checkbox`.
═══════════════════════════════════════════════════════════ */
window.PDF_OVERLAY_CF2 = [
  // 1. PhilHealth Accreditation Number (PAN) of HCI — 9 digit boxes
  { id:'hciPANc1', key:'hciPANc1', page:1, top:21.89, left:53.96, w:2.0, fs:8, digit:0, digitKey:'hciPAN' },
  { id:'hciPANc2', key:'hciPANc2', page:1, top:21.89, left:55.97, w:2.0, fs:8, digit:1, digitKey:'hciPAN' },
  { id:'hciPANc3', key:'hciPANc3', page:1, top:21.89, left:57.97, w:2.0, fs:8, digit:2, digitKey:'hciPAN' },
  { id:'hciPANc4', key:'hciPANc4', page:1, top:21.89, left:59.98, w:2.0, fs:8, digit:3, digitKey:'hciPAN' },
  { id:'hciPANc5', key:'hciPANc5', page:1, top:21.89, left:61.98, w:2.0, fs:8, digit:4, digitKey:'hciPAN' },
  { id:'hciPANc6', key:'hciPANc6', page:1, top:21.89, left:63.99, w:2.0, fs:8, digit:5, digitKey:'hciPAN' },
  { id:'hciPANc7', key:'hciPANc7', page:1, top:21.89, left:65.99, w:2.0, fs:8, digit:6, digitKey:'hciPAN' },
  { id:'hciPANc8', key:'hciPANc8', page:1, top:21.89, left:68.0,  w:2.0, fs:8, digit:7, digitKey:'hciPAN' },
  { id:'hciPANc9', key:'hciPANc9', page:1, top:21.89, left:70.0,  w:2.0, fs:8, digit:8, digitKey:'hciPAN' },

  // 2. Name of Health Care Institution
  { id:'hciName', key:'hciName', page:1, top:23.6, left:28.44, w:67.83, fs:8 },

  // 3. Address
  { id:'hciStreet',   key:'hciStreet',   page:1, top:25.36, left:13.27, w:33.64, fs:8 },
  { id:'hciCity',     key:'hciCity',     page:1, top:25.36, left:48.42, w:23.55, fs:8 },
  { id:'hciProvince', key:'hciProvince', page:1, top:25.36, left:73.83, w:22.43, fs:8 },

  // PART II — 1. Name of Patient
  { id:'patientLastName',   key:'patientLastName',   page:1, top:30.33, left:20.4,  w:17.94, fs:8 },
  { id:'patientFirstName',  key:'patientFirstName',  page:1, top:30.33, left:40.29, w:19.63, fs:8 },
  { id:'patientNameExt',    key:'patientNameExt',    page:1, top:30.33, left:61.42, w:13.46, fs:8 },
  { id:'patientMiddleName', key:'patientMiddleName', page:1, top:30.45, left:76.82, w:19.63, fs:8 },

  // 3. Confinement Period — a. Date Admitted (8 digits mm/dd/yyyy) + b. Time Admitted (4 digits hh:mm + AM/PM)
  { id:'dateAdmittedD1', key:'dateAdmittedD1', page:1, top:39.48, left:32.35, w:2.0, fs:7, digit:0, digitKey:'dateAdmitted', digitOrder:'mmddyyyy' },
  { id:'dateAdmittedD2', key:'dateAdmittedD2', page:1, top:39.48, left:34.36, w:2.0, fs:7, digit:1, digitKey:'dateAdmitted', digitOrder:'mmddyyyy' },
  { id:'dateAdmittedD3', key:'dateAdmittedD3', page:1, top:39.48, left:37.53, w:2.0, fs:7, digit:2, digitKey:'dateAdmitted', digitOrder:'mmddyyyy' },
  { id:'dateAdmittedD4', key:'dateAdmittedD4', page:1, top:39.48, left:39.54, w:2.0, fs:7, digit:3, digitKey:'dateAdmitted', digitOrder:'mmddyyyy' },
  { id:'dateAdmittedD5', key:'dateAdmittedD5', page:1, top:39.48, left:42.71, w:2.0, fs:7, digit:4, digitKey:'dateAdmitted', digitOrder:'mmddyyyy' },
  { id:'dateAdmittedD6', key:'dateAdmittedD6', page:1, top:39.48, left:44.72, w:2.0, fs:7, digit:5, digitKey:'dateAdmitted', digitOrder:'mmddyyyy' },
  { id:'dateAdmittedD7', key:'dateAdmittedD7', page:1, top:39.48, left:46.73, w:2.0, fs:7, digit:6, digitKey:'dateAdmitted', digitOrder:'mmddyyyy' },
  { id:'dateAdmittedD8', key:'dateAdmittedD8', page:1, top:39.48, left:48.74, w:2.0, fs:7, digit:7, digitKey:'dateAdmitted', digitOrder:'mmddyyyy' },

  { id:'timeAdmittedD1', key:'timeAdmittedD1', page:1, top:39.47, left:63.94, w:2.0, fs:7, digit:0, digitKey:'timeAdmitted' },
  { id:'timeAdmittedD2', key:'timeAdmittedD2', page:1, top:39.47, left:65.96, w:2.0, fs:7, digit:1, digitKey:'timeAdmitted' },
  { id:'timeAdmittedD3', key:'timeAdmittedD3', page:1, top:39.47, left:69.13, w:2.0, fs:7, digit:2, digitKey:'timeAdmitted' },
  { id:'timeAdmittedD4', key:'timeAdmittedD4', page:1, top:39.47, left:71.14, w:2.0, fs:7, digit:3, digitKey:'timeAdmitted' },
  { id:'timeAdmittedAM', key:'timeAdmitted', page:1, top:39.81, left:76.98, w:2.0, fs:8, amPmCheck:'AM' },
  { id:'timeAdmittedPM', key:'timeAdmitted', page:1, top:39.81, left:83.85, w:2.0, fs:8, amPmCheck:'PM' },

  // c. Date Discharge (8 digits) + d. Time Discharge (4 digits + AM/PM)
  { id:'dateDischargeD1', key:'dateDischargeD1', page:1, top:41.17, left:32.35, w:2.0, fs:7, digit:0, digitKey:'dateDischarge', digitOrder:'mmddyyyy' },
  { id:'dateDischargeD2', key:'dateDischargeD2', page:1, top:41.17, left:34.36, w:2.0, fs:7, digit:1, digitKey:'dateDischarge', digitOrder:'mmddyyyy' },
  { id:'dateDischargeD3', key:'dateDischargeD3', page:1, top:41.17, left:37.53, w:2.0, fs:7, digit:2, digitKey:'dateDischarge', digitOrder:'mmddyyyy' },
  { id:'dateDischargeD4', key:'dateDischargeD4', page:1, top:41.17, left:39.54, w:2.0, fs:7, digit:3, digitKey:'dateDischarge', digitOrder:'mmddyyyy' },
  { id:'dateDischargeD5', key:'dateDischargeD5', page:1, top:41.17, left:42.71, w:2.0, fs:7, digit:4, digitKey:'dateDischarge', digitOrder:'mmddyyyy' },
  { id:'dateDischargeD6', key:'dateDischargeD6', page:1, top:41.17, left:44.72, w:2.0, fs:7, digit:5, digitKey:'dateDischarge', digitOrder:'mmddyyyy' },
  { id:'dateDischargeD7', key:'dateDischargeD7', page:1, top:41.17, left:46.73, w:2.0, fs:7, digit:6, digitKey:'dateDischarge', digitOrder:'mmddyyyy' },
  { id:'dateDischargeD8', key:'dateDischargeD8', page:1, top:41.17, left:48.74, w:2.0, fs:7, digit:7, digitKey:'dateDischarge', digitOrder:'mmddyyyy' },

  { id:'timeDischargeD1', key:'timeDischargeD1', page:1, top:41.19, left:63.94, w:2.0, fs:7, digit:0, digitKey:'timeDischarge' },
  { id:'timeDischargeD2', key:'timeDischargeD2', page:1, top:41.19, left:65.96, w:2.0, fs:7, digit:1, digitKey:'timeDischarge' },
  { id:'timeDischargeD3', key:'timeDischargeD3', page:1, top:41.19, left:69.13, w:2.0, fs:7, digit:2, digitKey:'timeDischarge' },
  { id:'timeDischargeD4', key:'timeDischargeD4', page:1, top:41.19, left:71.14, w:2.0, fs:7, digit:3, digitKey:'timeDischarge' },
  { id:'timeDischargeAM', key:'timeDischarge', page:1, top:41.43, left:76.98, w:2.0, fs:8, amPmCheck:'AM' },
  { id:'timeDischargePM', key:'timeDischarge', page:1, top:41.43, left:83.85, w:2.0, fs:8, amPmCheck:'PM' },

  // 4. Patient Disposition — checkboxes (shares the "disposition" select)
  { id:'dispImproved',   key:'disposition', page:1, top:44.84, left:5.31,  w:2.0, fs:8, checkbox:true, checkValue:'Improved' },
  { id:'dispRecovered',  key:'disposition', page:1, top:46.45, left:5.31,  w:2.0, fs:8, checkbox:true, checkValue:'Recovered' },
  { id:'dispHAMA',       key:'disposition', page:1, top:48.06, left:5.31,  w:2.0, fs:8, checkbox:true, checkValue:'HAMA' },
  { id:'dispAbsconded',  key:'disposition', page:1, top:49.66, left:5.31,  w:2.0, fs:8, checkbox:true, checkValue:'Absconded' },
  { id:'dispExpired',    key:'disposition', page:1, top:44.84, left:31.12, w:2.0, fs:8, checkbox:true, checkValue:'Expired' },
  { id:'dispTransferred',key:'disposition', page:1, top:46.45, left:31.12, w:2.0, fs:8, checkbox:true, checkValue:'Transferred' },

  // 5. Type of Accomodation — checkboxes
  { id:'accomPrivate',    key:'accommodation', page:1, top:51.31, left:23.53, w:2.0, fs:8, checkbox:true, checkValue:'Private' },
  { id:'accomNonPrivate', key:'accommodation', page:1, top:51.31, left:32.43, w:2.0, fs:8, checkbox:true, checkValue:'Non-Private' },

  // 6. Admission Diagnosis/es
  { id:'admissionDx', key:'admissionDx', page:1, top:54.86, left:4.58, w:88, fs:8 },

  // 7. Discharge Diagnosis/es (row "a." Diagnosis column only)
  { id:'dischargeDx', key:'dischargeDx', page:1, top:60.11, left:6.96, w:24.38, fs:5 },
];
