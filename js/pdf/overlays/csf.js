/* ═══════════════════════════════════════════════════════════
   Overlay field coordinate map – CSF (612×936 pt)
   top/left are % of rendered page (0–100).
   Coordinates derived from actual PDF text/rect extraction.
   (NOTE: All top% values have been corrected using the 100-X rule)
═══════════════════════════════════════════════════════════ */
window.PDF_OVERLAY_CSF = [
  // Member PIN (12 boxed digits: 2-9-1)
  { id:'memberPIN',        key:'memberPIN',        page:1, top:18.4, left:42.39, w:26.50, fs:8,
    boxLefts:[43.30,45.40,48.68,50.69,52.69,54.70,56.70,58.71,60.71,62.72,64.72,67.89] },
  // Member name row
  { id:'memberLastName',   key:'memberLastName',   page:1, top:21.3, left:4.13,  w:16.26, fs:8 },
  { id:'memberFirstName',  key:'memberFirstName',  page:1, top:21.3, left:22.22, w:16.26, fs:8 },
  { id:'memberNameExt',    key:'memberNameExt',    page:1, top:21.3, left:40.11, w:16.26, fs:8 },
  { id:'memberMiddleName', key:'memberMiddleName', page:1, top:21.3, left:58.15, w:13.46, fs:8 },
  // Member DOB (8 boxed digits: 2-2-4)
  { id:'memberDOB',        key:'memberDOB',        page:1, top:21.72, left:74.87, w:18.38, fs:8, computed:'memberDOB',
    boxLefts:[75.86,77.87,81.04,83.06,86.22,88.23,90.24,92.25] },
  // Patient PIN row (12 boxed digits: 2-9-1)
  { id:'patientPIN',       key:'patientPIN',       page:1, top:25.48, left:44.25, w:26.50, fs:8,
    boxLefts:[45.25,47.25,50.53,52.54,54.54,56.55,58.55,60.56,62.56,64.57,66.57,69.74] },
  // Patient name row
  { id:'patientLastName',  key:'patientLastName',  page:1, top:28.26, left:4.13,  w:16.26, fs:8 },
  { id:'patientFirstName', key:'patientFirstName', page:1, top:28.26, left:22.22, w:16.26, fs:8 },
  { id:'patientNameExt',   key:'patientNameExt',   page:1, top:28.26, left:40.11, w:16.26, fs:8 },
  { id:'patientMiddleName',key:'patientMiddleName',page:1, top:28.26, left:58.15, w:13.46, fs:8 },
  // Relationship to Member (checkbox: child / parent / spouse)
  { id:'relationship',     key:'relationship',     page:1, fs:9,
    checkOptions:[
      { value:'Child',  top:28.5, left:73.74 },
      { value:'Parent', top:28.5, left:80.58 },
      { value:'Spouse', top:28.5, left:87.67 },
    ] },
  // Confinement dates (8 boxed digits each: 2-2-4)
  { id:'dateAdmitted',     key:'dateAdmitted',     page:1, top:33.79, left:14.62, w:18.40, fs:8, computed:'dateAdmitted',
    boxLefts:[15.63,17.64,20.81,22.82,25.99,28.00,30.00,32.02] },
  { id:'dateDischarge',    key:'dateDischarge',    page:1, top:33.79, left:47.92, w:18.40, fs:8, computed:'dateDischarge',
    boxLefts:[48.92,50.93,54.10,56.11,59.28,61.29,63.30,65.31] },
  // Patient DOB (8 boxed digits: 2-2-4)
  { id:'patientDOB',       key:'patientDOB',       page:1, top:33.79, left:74.87, w:18.38, fs:8, computed:'patientDOB',
    boxLefts:[75.86,77.87,81.04,83.06,86.22,88.23,90.24,92.25] },
  // Employer section (PEN: 12 boxed digits: 2-9-1)
  { id:'employerPEN',      key:'employerPEN',      page:1, top:52.65, left:31.76, w:26.50, fs:8,
    boxLefts:[32.77,34.78,38.05,40.06,42.07,44.07,46.08,48.08,50.08,52.09,54.10,57.26] },
  { id:'employerPhone',    key:'employerPhone',    page:1, top:52.35, left:74.95, w:21.31, fs:8 },
  // Business name
  { id:'employerName',     key:'employerName',     page:1, top:54.03, left:20.10, w:75.67, fs:8 },

  // ═══ Part I – Certification of Member (signature block) ═══
  { id:'memberSignedDate', key:'memberSignedDate', page:1, top:41.91, left:21.11, w:16.4, fs:7, computed:'memberSignedDate',
    boxLefts:[21.11,23.14,26.31,28.32,31.47,33.48,35.49,37.5] },
  { id:'repSignedDate',    key:'repSignedDate',    page:1, top:41.91, left:65.43, w:16.4, fs:7, computed:'repSignedDate',
    boxLefts:[65.43,67.44,70.61,72.63,75.79,77.8,79.81,81.82] },
  { id:'memberSignerType', key:'memberSignerType', page:1, fs:9,
    checkOptions:[
      { value:'Member',         top:48.47, left:5.02 },
      { value:'Representative', top:48.47, left:13.03 },
    ] },
  { id:'repRelationship',  key:'repRelationship',  page:1, fs:8,
    checkOptions:[
      { value:'Spouse',  top:44.22, left:65.79 },
      { value:'Child',   top:44.22, left:73.37 },
      { value:'Parent',  top:44.22, left:79.68 },
      { value:'Sibling', top:45.68, left:65.79 },
      { value:'Others',  top:45.68, left:73.37 },
    ] },
  { id:'repRelationshipOther', key:'repRelationshipOther', page:1, top:45.27, left:83.57, w:12.17, fs:7 },
  { id:'repReason',        key:'repReason',        page:1, fs:8,
    checkOptions:[
      { value:'Incapacitated', top:47.25, left:65.79 },
      { value:'Other',         top:48.79, left:65.79 },
    ] },
  { id:'repReasonOther',   key:'repReasonOther',   page:1, top:48.9, left:75.9, w:19.87, fs:7 },

  // ═══ Part II – Employer's Certification (signature) ═══
  { id:'employerRepName',  key:'employerRepName',  page:1, top:61.97, left:4.89,  w:38.69, fs:7 },
  { id:'employerCapacity', key:'employerCapacity', page:1, top:61.97, left:45.07, w:22.99, fs:7 },
  { id:'employerSignedDate', key:'employerSignedDate', page:1, top:62.25, left:77.39, w:16.4, fs:7, computed:'employerSignedDate',
    boxLefts:[77.39,79.4,82.57,84.58,87.75,89.76,91.77,93.78] },

  // ═══ Part III – Consent to Access Patient Record/s ═══
  { id:'patientRepName',   key:'patientRepName',   page:1, top:70.89, left:11.15, w:40.93, fs:7 },
  { id:'patientRepSignedDate', key:'patientRepSignedDate', page:1, top:70.99, left:66.34, w:16.4, fs:7, computed:'patientRepSignedDate',
    boxLefts:[66.34,68.35,71.52,73.53,76.7,78.71,80.72,82.73] },
  { id:'patientSignerType', key:'patientSignerType', page:1, fs:9,
    checkOptions:[
      { value:'Patient',        top:77.82, left:5.02 },
      { value:'Representative', top:77.82, left:12.44 },
    ] },
  { id:'patientRepRelationship', key:'patientRepRelationship', page:1, fs:8,
    checkOptions:[
      { value:'Spouse',  top:73.64, left:65.79 },
      { value:'Child',   top:73.64, left:73.37 },
      { value:'Parent',  top:73.64, left:79.68 },
      { value:'Sibling', top:75.18, left:65.79 },
      { value:'Others',  top:75.18, left:73.37 },
    ] },
  { id:'patientRepRelationshipOther', key:'patientRepRelationshipOther', page:1, top:74.8, left:83.57, w:12.19, fs:7 },
  { id:'patientReason',    key:'patientReason',    page:1, fs:8,
    checkOptions:[
      { value:'Incapacitated', top:76.84, left:65.79 },
      { value:'Other',         top:78.38, left:65.79 },
    ] },
  { id:'patientReasonOther', key:'patientReasonOther', page:1, top:78.43, left:76.15, w:19.87, fs:7 },

  // ═══ Part IV – Health Care Professional Information (up to 3 rows) ═══
  { id:'hciProf1AccredNo', key:'hciProf1AccredNo', page:1, top:81.98, left:14.76, w:24.5, fs:7,
    boxLefts:[14.76,16.75,18.76,20.77,24.06,26.07,28.06,30.07,32.06,34.07,36.08,39.25] },
  { id:'hciProf1Name',     key:'hciProf1Name',     page:1, top:81.82, left:43.04, w:25.23, fs:7 },
  { id:'hciProf1DateSigned', key:'hciProf1DateSigned', page:1, top:81.98, left:77.39, w:16.4, fs:7, computed:'hciProf1DateSigned',
    boxLefts:[77.39,79.4,82.57,84.58,87.75,89.76,91.77,93.78] },

  { id:'hciProf2AccredNo', key:'hciProf2AccredNo', page:1, top:84.53, left:14.76, w:24.5, fs:7,
    boxLefts:[14.76,16.75,18.76,20.77,24.06,26.07,28.06,30.07,32.06,34.07,36.08,39.25] },
  { id:'hciProf2Name',     key:'hciProf2Name',     page:1, top:84.41, left:43.04, w:25.23, fs:7 },
  { id:'hciProf2DateSigned', key:'hciProf2DateSigned', page:1, top:84.53, left:77.39, w:16.4, fs:7, computed:'hciProf2DateSigned',
    boxLefts:[77.39,79.4,82.57,84.58,87.75,89.76,91.77,93.78] },

  { id:'hciProf3AccredNo', key:'hciProf3AccredNo', page:1, top:87.15, left:14.76, w:24.5, fs:7,
    boxLefts:[14.76,16.75,18.76,20.77,24.06,26.07,28.06,30.07,32.06,34.07,36.08,39.25] },
  { id:'hciProf3Name',     key:'hciProf3Name',     page:1, top:86.92, left:43.04, w:25.23, fs:7 },
  { id:'hciProf3DateSigned', key:'hciProf3DateSigned', page:1, top:87.03, left:77.39, w:16.4, fs:7, computed:'hciProf3DateSigned',
    boxLefts:[77.39,79.4,82.57,84.58,87.75,89.76,91.77,93.78] },

  // ═══ Part V – Provider Information and Certification ═══
  { id:'csfFirstCaseRate',  key:'csfFirstCaseRate',  page:1, top:92.04, left:46.93, w:16.81, fs:7 },
  { id:'csfSecondCaseRate', key:'csfSecondCaseRate', page:1, top:92.04, left:76.82, w:20.20, fs:7 },
  { id:'providerRepName',   key:'providerRepName',   page:1, top:95.01, left:4.89,  w:38.69, fs:7 },
  { id:'providerCapacity',  key:'providerCapacity',  page:1, top:95.01, left:45.07, w:22.99, fs:7 },
  { id:'providerSignedDate', key:'providerSignedDate', page:1, top:95.18, left:77.39, w:16.4, fs:7, computed:'providerSignedDate',
    boxLefts:[77.39,79.4,82.57,84.58,87.75,89.76,91.77,93.78] },
];
