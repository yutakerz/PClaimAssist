/* ═══════════════════════════════════════════════════════════
   Overlay field coordinate map – CF3 (612×1008 pt)
   top/left are % of rendered page (0–100).
   Coordinates derived from actual PDF text/rect extraction.
   (NOTE: All top% values have been corrected using the 100-X rule)
═══════════════════════════════════════════════════════════ */
window.PDF_OVERLAY_CF3 = [
  // HCI Accreditation No.
  { id:'hciPAN', key:'hciPAN', page:1,
    top:18.0, left:47, w:21, fs:8 },

  // Patient Name
  { id:'patientLastName', key:'patientLastName', page:1,
    top:21.4, left:5, w:12, fs:8 },

  { id:'patientFirstName', key:'patientFirstName', page:1,
    top:21.4, left:18, w:11, fs:8 },

  { id:'patientMiddleName', key:'patientMiddleName', page:1,
    top:21.4, left:30.5, w:10, fs:8 },

  // Chief Complaint
  { id:'chiefComplaint', key:'chiefComplaint', page:1,
    top:22.2, left:73.5, w:22, fs:8 },

  // Date Admitted
  { id:'dateAdmitted', key:'dateAdmitted', page:1,
    top:25.3, left:15, w:23, fs:8, computed:'dateAdmitted' },

  { id:'timeAdmitted', key:'timeAdmitted', page:1,
    top:25.3, left:50, w:20, fs:8, computed:'timeAdmittedStr' },

  // Date Discharged
  { id:'dateDischarge', key:'dateDischarge', page:1,
    top:28.5, left:15, w:23, fs:8, computed:'dateDischarge' },

  { id:'timeDischarge', key:'timeDischarge', page:1,
    top:28.5, left:50, w:20, fs:8, computed:'timeDischargeStr' },

  // Brief History
  { id:'briefHistory', key:'briefHistory', page:1,
    top:34, left:7.8, w:88, fs:8 },

  // Disposition
  { id:'disposition', key:'disposition', page:1,
    top:95.6, left:23, w:20, fs:8 },
];
