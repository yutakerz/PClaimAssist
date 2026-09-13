/* ═══════════════════════════════════════════════════════════
   Overlay field coordinate map – CSF (612×936 pt)
   top/left are % of rendered page (0–100).
   Coordinates derived from actual PDF text/rect extraction
   (page.get_drawings() + get_text('words') via PyMuPDF).
   PIN/PAN/date fields use the generic `digit` resolver (see
   pdf-overlay.js resolveOverlayFieldValue) to place one character
   per printed digit box.
═══════════════════════════════════════════════════════════ */
window.PDF_OVERLAY_CSF = [
  // 1. PhilHealth Identification Number (PIN) of Member — 12 digit boxes
  { id:'memberPINc1', key:'memberPINc1', page:1, top:18.71, left:42.39, w:2.0, fs:8, digit:0, digitKey:'memberPIN' },
  { id:'memberPINc2', key:'memberPINc2', page:1, top:18.71, left:44.4,  w:2.0, fs:8, digit:1, digitKey:'memberPIN' },
  { id:'memberPINc3', key:'memberPINc3', page:1, top:18.71, left:47.68, w:2.0, fs:8, digit:2, digitKey:'memberPIN' },
  { id:'memberPINc4', key:'memberPINc4', page:1, top:18.71, left:49.69, w:2.0, fs:8, digit:3, digitKey:'memberPIN' },
  { id:'memberPINc5', key:'memberPINc5', page:1, top:18.71, left:51.69, w:2.0, fs:8, digit:4, digitKey:'memberPIN' },
  { id:'memberPINc6', key:'memberPINc6', page:1, top:18.71, left:53.7,  w:2.0, fs:8, digit:5, digitKey:'memberPIN' },
  { id:'memberPINc7', key:'memberPINc7', page:1, top:18.71, left:55.7,  w:2.0, fs:8, digit:6, digitKey:'memberPIN' },
  { id:'memberPINc8', key:'memberPINc8', page:1, top:18.71, left:57.71, w:2.0, fs:8, digit:7, digitKey:'memberPIN' },
  { id:'memberPINc9', key:'memberPINc9', page:1, top:18.71, left:59.71, w:2.0, fs:8, digit:8, digitKey:'memberPIN' },
  { id:'memberPINc10', key:'memberPINc10', page:1, top:18.71, left:61.72, w:2.0, fs:8, digit:9, digitKey:'memberPIN' },
  { id:'memberPINc11', key:'memberPINc11', page:1, top:18.71, left:63.72, w:2.0, fs:8, digit:10, digitKey:'memberPIN' },
  { id:'memberPINc12', key:'memberPINc12', page:1, top:18.71, left:66.89, w:2.0, fs:8, digit:11, digitKey:'memberPIN' },

  // 2. Name of Member
  { id:'memberLastName',   key:'memberLastName',   page:1, top:21.69, left:4.13,  w:16.26, fs:8 },
  { id:'memberFirstName',  key:'memberFirstName',  page:1, top:21.69, left:22.22, w:16.26, fs:8 },
  { id:'memberNameExt',    key:'memberNameExt',    page:1, top:21.69, left:40.11, w:16.26, fs:8 },
  { id:'memberMiddleName', key:'memberMiddleName', page:1, top:21.69, left:58.16, w:13.46, fs:8 },

  // 3. Member Date of Birth — 8 digit boxes (mm mm dd dd yyyy yyyy yyyy yyyy)
  { id:'memberDOBd1', key:'memberDOBd1', page:1, top:22.04, left:74.86, w:2.0, fs:8, digit:0, digitKey:'memberDOB', digitOrder:'mmddyyyy' },
  { id:'memberDOBd2', key:'memberDOBd2', page:1, top:22.04, left:76.9,  w:2.0, fs:8, digit:1, digitKey:'memberDOB', digitOrder:'mmddyyyy' },
  { id:'memberDOBd3', key:'memberDOBd3', page:1, top:22.04, left:80.04, w:2.0, fs:8, digit:2, digitKey:'memberDOB', digitOrder:'mmddyyyy' },
  { id:'memberDOBd4', key:'memberDOBd4', page:1, top:22.04, left:82.05, w:2.0, fs:8, digit:3, digitKey:'memberDOB', digitOrder:'mmddyyyy' },
  { id:'memberDOBd5', key:'memberDOBd5', page:1, top:22.04, left:85.22, w:2.0, fs:8, digit:4, digitKey:'memberDOB', digitOrder:'mmddyyyy' },
  { id:'memberDOBd6', key:'memberDOBd6', page:1, top:22.04, left:87.23, w:2.0, fs:8, digit:5, digitKey:'memberDOB', digitOrder:'mmddyyyy' },
  { id:'memberDOBd7', key:'memberDOBd7', page:1, top:22.04, left:89.24, w:2.0, fs:8, digit:6, digitKey:'memberDOB', digitOrder:'mmddyyyy' },
  { id:'memberDOBd8', key:'memberDOBd8', page:1, top:22.04, left:91.25, w:2.0, fs:8, digit:7, digitKey:'memberDOB', digitOrder:'mmddyyyy' },

  // 4. PhilHealth Identification Number (PIN) of Dependent — 12 digit boxes
  { id:'patientPINc1', key:'patientPINc1', page:1, top:25.79, left:44.24, w:2.0, fs:8, digit:0, digitKey:'patientPIN' },
  { id:'patientPINc2', key:'patientPINc2', page:1, top:25.79, left:46.25, w:2.0, fs:8, digit:1, digitKey:'patientPIN' },
  { id:'patientPINc3', key:'patientPINc3', page:1, top:25.79, left:49.53, w:2.0, fs:8, digit:2, digitKey:'patientPIN' },
  { id:'patientPINc4', key:'patientPINc4', page:1, top:25.79, left:51.54, w:2.0, fs:8, digit:3, digitKey:'patientPIN' },
  { id:'patientPINc5', key:'patientPINc5', page:1, top:25.79, left:53.54, w:2.0, fs:8, digit:4, digitKey:'patientPIN' },
  { id:'patientPINc6', key:'patientPINc6', page:1, top:25.79, left:55.55, w:2.0, fs:8, digit:5, digitKey:'patientPIN' },
  { id:'patientPINc7', key:'patientPINc7', page:1, top:25.79, left:57.56, w:2.0, fs:8, digit:6, digitKey:'patientPIN' },
  { id:'patientPINc8', key:'patientPINc8', page:1, top:25.79, left:59.56, w:2.0, fs:8, digit:7, digitKey:'patientPIN' },
  { id:'patientPINc9', key:'patientPINc9', page:1, top:25.79, left:61.56, w:2.0, fs:8, digit:8, digitKey:'patientPIN' },
  { id:'patientPINc10', key:'patientPINc10', page:1, top:25.79, left:63.57, w:2.0, fs:8, digit:9, digitKey:'patientPIN' },
  { id:'patientPINc11', key:'patientPINc11', page:1, top:25.79, left:65.57, w:2.0, fs:8, digit:10, digitKey:'patientPIN' },
  { id:'patientPINc12', key:'patientPINc12', page:1, top:25.79, left:68.74, w:2.0, fs:8, digit:11, digitKey:'patientPIN' },

  // 5. Name of Patient
  { id:'patientLastName',  key:'patientLastName',  page:1, top:28.66, left:4.13,  w:16.26, fs:8 },
  { id:'patientFirstName', key:'patientFirstName', page:1, top:28.66, left:22.22, w:16.26, fs:8 },
  { id:'patientNameExt',   key:'patientNameExt',   page:1, top:28.66, left:40.11, w:16.26, fs:8 },
  { id:'patientMiddleName',key:'patientMiddleName',page:1, top:28.66, left:58.16, w:13.46, fs:8 },

  // 6. Relationship to Member — checkboxes (share the "relationship" field)
  { id:'relChild',  key:'relationship', page:1, top:28.87, left:73.23, w:2.0, fs:8, checkbox:true, checkValue:'Child' },
  { id:'relParent', key:'relationship', page:1, top:28.87, left:80.08, w:2.0, fs:8, checkbox:true, checkValue:'Parent' },
  { id:'relSpouse', key:'relationship', page:1, top:28.87, left:87.47, w:2.0, fs:8, checkbox:true, checkValue:'Spouse' },

  // 7. Confinement Period — 8 digit boxes each (mm mm dd dd yyyy yyyy yyyy yyyy)
  { id:'dateAdmittedD1', key:'dateAdmittedD1', page:1, top:34.1, left:14.63, w:2.0, fs:8, digit:0, digitKey:'dateAdmitted', digitOrder:'mmddyyyy' },
  { id:'dateAdmittedD2', key:'dateAdmittedD2', page:1, top:34.1, left:16.64, w:2.0, fs:8, digit:1, digitKey:'dateAdmitted', digitOrder:'mmddyyyy' },
  { id:'dateAdmittedD3', key:'dateAdmittedD3', page:1, top:34.1, left:19.81, w:2.0, fs:8, digit:2, digitKey:'dateAdmitted', digitOrder:'mmddyyyy' },
  { id:'dateAdmittedD4', key:'dateAdmittedD4', page:1, top:34.1, left:21.82, w:2.0, fs:8, digit:3, digitKey:'dateAdmitted', digitOrder:'mmddyyyy' },
  { id:'dateAdmittedD5', key:'dateAdmittedD5', page:1, top:34.1, left:24.98, w:2.0, fs:8, digit:4, digitKey:'dateAdmitted', digitOrder:'mmddyyyy' },
  { id:'dateAdmittedD6', key:'dateAdmittedD6', page:1, top:34.1, left:27.0,  w:2.0, fs:8, digit:5, digitKey:'dateAdmitted', digitOrder:'mmddyyyy' },
  { id:'dateAdmittedD7', key:'dateAdmittedD7', page:1, top:34.1, left:29.0,  w:2.0, fs:8, digit:6, digitKey:'dateAdmitted', digitOrder:'mmddyyyy' },
  { id:'dateAdmittedD8', key:'dateAdmittedD8', page:1, top:34.1, left:31.02, w:2.0, fs:8, digit:7, digitKey:'dateAdmitted', digitOrder:'mmddyyyy' },

  { id:'dateDischargeD1', key:'dateDischargeD1', page:1, top:34.1, left:47.92, w:2.0, fs:8, digit:0, digitKey:'dateDischarge', digitOrder:'mmddyyyy' },
  { id:'dateDischargeD2', key:'dateDischargeD2', page:1, top:34.1, left:49.93, w:2.0, fs:8, digit:1, digitKey:'dateDischarge', digitOrder:'mmddyyyy' },
  { id:'dateDischargeD3', key:'dateDischargeD3', page:1, top:34.1, left:53.1,  w:2.0, fs:8, digit:2, digitKey:'dateDischarge', digitOrder:'mmddyyyy' },
  { id:'dateDischargeD4', key:'dateDischargeD4', page:1, top:34.1, left:55.11, w:2.0, fs:8, digit:3, digitKey:'dateDischarge', digitOrder:'mmddyyyy' },
  { id:'dateDischargeD5', key:'dateDischargeD5', page:1, top:34.1, left:58.28, w:2.0, fs:8, digit:4, digitKey:'dateDischarge', digitOrder:'mmddyyyy' },
  { id:'dateDischargeD6', key:'dateDischargeD6', page:1, top:34.1, left:60.29, w:2.0, fs:8, digit:5, digitKey:'dateDischarge', digitOrder:'mmddyyyy' },
  { id:'dateDischargeD7', key:'dateDischargeD7', page:1, top:34.1, left:62.29, w:2.0, fs:8, digit:6, digitKey:'dateDischarge', digitOrder:'mmddyyyy' },
  { id:'dateDischargeD8', key:'dateDischargeD8', page:1, top:34.1, left:64.31, w:2.0, fs:8, digit:7, digitKey:'dateDischarge', digitOrder:'mmddyyyy' },

  // 8. Patient Date of Birth — 8 digit boxes
  { id:'patientDOBd1', key:'patientDOBd1', page:1, top:34.1, left:74.86, w:2.0, fs:8, digit:0, digitKey:'patientDOB', digitOrder:'mmddyyyy' },
  { id:'patientDOBd2', key:'patientDOBd2', page:1, top:34.1, left:76.9,  w:2.0, fs:8, digit:1, digitKey:'patientDOB', digitOrder:'mmddyyyy' },
  { id:'patientDOBd3', key:'patientDOBd3', page:1, top:34.1, left:80.04, w:2.0, fs:8, digit:2, digitKey:'patientDOB', digitOrder:'mmddyyyy' },
  { id:'patientDOBd4', key:'patientDOBd4', page:1, top:34.1, left:82.05, w:2.0, fs:8, digit:3, digitKey:'patientDOB', digitOrder:'mmddyyyy' },
  { id:'patientDOBd5', key:'patientDOBd5', page:1, top:34.1, left:85.22, w:2.0, fs:8, digit:4, digitKey:'patientDOB', digitOrder:'mmddyyyy' },
  { id:'patientDOBd6', key:'patientDOBd6', page:1, top:34.1, left:87.23, w:2.0, fs:8, digit:5, digitKey:'patientDOB', digitOrder:'mmddyyyy' },
  { id:'patientDOBd7', key:'patientDOBd7', page:1, top:34.1, left:89.24, w:2.0, fs:8, digit:6, digitKey:'patientDOB', digitOrder:'mmddyyyy' },
  { id:'patientDOBd8', key:'patientDOBd8', page:1, top:34.1, left:91.25, w:2.0, fs:8, digit:7, digitKey:'patientDOB', digitOrder:'mmddyyyy' },

  // PART II — 1. PhilHealth Employer Number (PEN) — 11 digit boxes
  { id:'employerPENc1', key:'employerPENc1', page:1, top:52.96, left:31.77, w:2.0, fs:8, digit:0, digitKey:'employerPEN' },
  { id:'employerPENc2', key:'employerPENc2', page:1, top:52.96, left:33.78, w:2.0, fs:8, digit:1, digitKey:'employerPEN' },
  { id:'employerPENc3', key:'employerPENc3', page:1, top:52.96, left:37.05, w:2.0, fs:8, digit:2, digitKey:'employerPEN' },
  { id:'employerPENc4', key:'employerPENc4', page:1, top:52.96, left:39.06, w:2.0, fs:8, digit:3, digitKey:'employerPEN' },
  { id:'employerPENc5', key:'employerPENc5', page:1, top:52.96, left:41.06, w:2.0, fs:8, digit:4, digitKey:'employerPEN' },
  { id:'employerPENc6', key:'employerPENc6', page:1, top:52.96, left:43.07, w:2.0, fs:8, digit:5, digitKey:'employerPEN' },
  { id:'employerPENc7', key:'employerPENc7', page:1, top:52.96, left:45.07, w:2.0, fs:8, digit:6, digitKey:'employerPEN' },
  { id:'employerPENc8', key:'employerPENc8', page:1, top:52.96, left:47.08, w:2.0, fs:8, digit:7, digitKey:'employerPEN' },
  { id:'employerPENc9', key:'employerPENc9', page:1, top:52.96, left:49.08, w:2.0, fs:8, digit:8, digitKey:'employerPEN' },
  { id:'employerPENc10', key:'employerPENc10', page:1, top:52.96, left:51.09, w:2.0, fs:8, digit:9, digitKey:'employerPEN' },
  { id:'employerPENc11', key:'employerPENc11', page:1, top:52.96, left:56.26, w:2.0, fs:8, digit:10, digitKey:'employerPEN' },

  // 2. Contact No.
  { id:'employerPhone', key:'employerPhone', page:1, top:52.75, left:74.95, w:21.31, fs:8 },

  // 3. Business Name
  { id:'employerName', key:'employerName', page:1, top:54.24, left:20.1, w:75.68, fs:8 },
];
