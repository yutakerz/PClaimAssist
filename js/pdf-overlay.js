/* ═══════════════════════════════════════════════════════════
   PClaimAssist – PDF Rendering & Live Overlay Engine
   Uses PDF.js (render) + pdf-lib (export)
   Privacy-by-design: no server calls.
═══════════════════════════════════════════════════════════ */

/* ── PDF.js worker setup ─────────────────────────────────── */
if (typeof pdfjsLib !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

/* ── Per-form state ──────────────────────────────────────── */
const pdfState = {
  csf:  { doc: null, page: 1, totalPages: 1, rendered: false },
  cf2:  { doc: null, page: 1, totalPages: 2, rendered: false },
  cf3:  { doc: null, page: 1, totalPages: 2, rendered: false },
  pmrf: { doc: null, page: 1, totalPages: 1, rendered: false },
};

/* ── Overlay field coordinate maps ──────────────────────────
   top/left are % of rendered page (0–100).
   Coordinates derived from actual PDF text/rect extraction.
   CSF/CF3 page size: 612×936 / 612×1008 pt.
   PMRF page size: 594.75×841.5 pt.
   top% = ((pageH - y_bottom) / pageH) * 100  (CSS-ready)
─────────────────────────────────────────────────────────── */
const OVERLAY_MAP = {

  /* ── CSF (612×936 pt) ────────────────────────────────── */
  /* Input underlines sit at y≈195pt (member) and y≈260pt (patient).
     top% = ((936 - y_bottom) / 936) * 100
     Member underlines bottom ≈ 198pt → top% ≈ 78.8%
     Patient underlines bottom ≈ 263pt → top% ≈ 71.9%
     Date of Admission row bottom ≈ 318pt → top% ≈ 66.0%
  */
  csf: [
    // Member PIN — label at y≈165-175, input line below at ~182pt
    { id:'memberPIN',        key:'memberPIN',        page:1, top:80.3, left:29,  w:68, fs:8 },
    // Member name row — underlines bottom at ~198pt, columns: Last/First/Ext/Middle
    { id:'memberLastName',   key:'memberLastName',   page:1, top:78.8, left:4,   w:19, fs:8 },
    { id:'memberFirstName',  key:'memberFirstName',  page:1, top:78.8, left:24,  w:19, fs:8 },
    { id:'memberNameExt',    key:'memberNameExt',    page:1, top:78.8, left:44,  w:7,  fs:8 },
    { id:'memberMiddleName', key:'memberMiddleName', page:1, top:78.8, left:52,  w:21, fs:8 },
    // Member DOB — month/day/year boxes right side, ~same row
    { id:'memberDOB',        key:'memberDOB',        page:1, top:79.1, left:75,  w:22, fs:8, computed:'memberDOB' },
    // Patient PIN row — label at y≈230-240
    { id:'patientPIN',       key:'patientPIN',       page:1, top:74.1, left:29,  w:68, fs:8 },
    // Patient name row — underlines bottom at ~263pt
    { id:'patientLastName',  key:'patientLastName',  page:1, top:71.9, left:4,   w:19, fs:8 },
    { id:'patientFirstName', key:'patientFirstName', page:1, top:71.9, left:24,  w:19, fs:8 },
    { id:'patientNameExt',   key:'patientNameExt',   page:1, top:71.9, left:44,  w:7,  fs:8 },
    { id:'patientMiddleName',key:'patientMiddleName',page:1, top:71.9, left:52,  w:21, fs:8 },
    // Relationship — right side same row as patient name
    { id:'relationship',     key:'relationship',     page:1, top:72.2, left:75,  w:22, fs:8 },
    // Confinement dates — label row at ~310pt, input below ~318pt → top%≈66.0%
    { id:'dateAdmitted',     key:'dateAdmitted',     page:1, top:65.5, left:10,  w:26, fs:8, computed:'dateAdmitted' },
    { id:'dateDischarge',    key:'dateDischarge',    page:1, top:65.5, left:40,  w:26, fs:8, computed:'dateDischarge' },
    // Patient DOB — right side of confinement row
    { id:'patientDOB',       key:'patientDOB',       page:1, top:65.5, left:76,  w:21, fs:8, computed:'patientDOB' },
    // Employer section — PEN label at y≈485 → input line ~495pt → top%≈47.1%
    { id:'employerPEN',      key:'employerPEN',      page:1, top:46.5, left:27,  w:36, fs:8 },
    { id:'employerPhone',    key:'employerPhone',    page:1, top:46.5, left:66,  w:32, fs:8 },
    // Business name — label at y≈500 → input line spans full width
    { id:'employerName',     key:'employerName',     page:1, top:44.8, left:21,  w:76, fs:8 },
  ],

  /* ── CF2 (612×936 pt) ────────────────────────────────── */
  /* HCI Accreditation label bottom ≈ 206pt → top%≈78.0%
     HCI Name label bottom ≈ 222pt → top%≈76.3% (input right of label)
     Patient name label bottom ≈ 297pt → top%≈68.3%
     Date Admitted bottom ≈ 371pt → top%≈60.4%
     Date Discharged bottom ≈ 387pt → top%≈58.7%
  */
  cf2: [
    // HCI Accreditation No (PAN) — label at ~78% top, input to the right
    { id:'hciPAN',           key:'hciPAN',           page:1, top:76.5, left:32,  w:65, fs:8 },
    // HCI Name — full width below header
    { id:'hciName',          key:'hciName',          page:1, top:74.8, left:6,   w:90, fs:8 },
    // HCI Address row — Street / City / Province
    { id:'hciStreet',        key:'hciStreet',        page:1, top:71.8, left:6,   w:44, fs:8 },
    { id:'hciCity',          key:'hciCity',          page:1, top:71.8, left:52,  w:24, fs:8 },
    { id:'hciProvince',      key:'hciProvince',      page:1, top:71.8, left:78,  w:19, fs:8 },
    // Patient name — label bottom ≈ 297pt → top%≈68.3%; columns from label x positions
    { id:'patientLastName',  key:'patientLastName',  page:1, top:66.8, left:6,   w:20, fs:8 },
    { id:'patientFirstName', key:'patientFirstName', page:1, top:66.8, left:28,  w:18, fs:8 },
    { id:'patientMiddleName',key:'patientMiddleName',page:1, top:66.8, left:47,  w:18, fs:8 },
    { id:'patientNameExt',   key:'patientNameExt',   page:1, top:66.8, left:67,  w:9,  fs:8 },
    // Date/Time Admitted — drawn boxes at top%≈60.4%
    { id:'dateAdmitted',     key:'dateAdmitted',     page:1, top:59.1, left:6,   w:32, fs:8, computed:'dateAdmitted' },
    { id:'timeAdmitted',     key:'timeAdmitted',     page:1, top:59.1, left:56,  w:24, fs:8, computed:'timeAdmittedStr' },
    // Date/Time Discharged — boxes at top%≈58.7%
    { id:'dateDischarge',    key:'dateDischarge',    page:1, top:57.4, left:6,   w:32, fs:8, computed:'dateDischarge' },
    { id:'timeDischarge',    key:'timeDischarge',    page:1, top:57.4, left:56,  w:24, fs:8, computed:'timeDischargeStr' },
    // Disposition — label "Disposition:" at top%≈56.7%
    { id:'disposition',      key:'disposition',      page:1, top:54.8, left:6,   w:55, fs:8 },
    // Accommodation — Time label area right side
    { id:'accommodation',    key:'accommodation',    page:1, top:54.8, left:64,  w:33, fs:8 },
    // Admission diagnosis — label at top%≈46.8%
    { id:'admissionDx',      key:'admissionDx',      page:1, top:45.2, left:6,   w:91, fs:8 },
    // Discharge diagnosis — label at top%≈42.9%
    { id:'dischargeDx',      key:'dischargeDx',      page:1, top:41.0, left:6,   w:91, fs:8 },
  ],

  /* ── CF3 (612×1008 pt) ──────────────────────────────── */
  /* HCI Accred label bottom ≈ 173pt → top%≈82.8%
     Patient name label bottom ≈ 231pt → top%≈77.1%
     Date Admitted label bottom ≈ 253pt → top%≈74.9%
     Date Discharged label bottom ≈ 286pt → top%≈71.6%
     Brief History label bottom ≈ 323pt → top%≈68.0%
     Disposition label bottom ≈ 948pt → top%≈5.9%
  */
  cf3: [
    // HCI Accreditation No — label "Accreditation" at left%≈10.2%, value right of it
    { id:'hciPAN',           key:'hciPAN',           page:1, top:82.4, left:32,  w:65, fs:8 },
    // Patient name row — labels at top%≈77.1%
    { id:'patientLastName',  key:'patientLastName',  page:1, top:75.8, left:5,   w:24, fs:8 },
    { id:'patientFirstName', key:'patientFirstName', page:1, top:75.8, left:30,  w:22, fs:8 },
    { id:'patientMiddleName',key:'patientMiddleName',page:1, top:75.8, left:54,  w:42, fs:8 },
    // Chief complaint — right side, same row area
    { id:'chiefComplaint',   key:'chiefComplaint',   page:1, top:78.6, left:52,  w:45, fs:8 },
    // Date Admitted — label bottom ≈ 253pt → top%≈74.9%; input after label
    { id:'dateAdmitted',     key:'dateAdmitted',     page:1, top:73.6, left:16,  w:32, fs:8, computed:'dateAdmitted' },
    { id:'timeAdmitted',     key:'timeAdmitted',     page:1, top:73.6, left:50,  w:22, fs:8, computed:'timeAdmittedStr' },
    // Date Discharged — label bottom ≈ 286pt → top%≈71.6%
    { id:'dateDischarge',    key:'dateDischarge',    page:1, top:70.3, left:16,  w:32, fs:8, computed:'dateDischarge' },
    { id:'timeDischarge',    key:'timeDischarge',    page:1, top:70.3, left:50,  w:22, fs:8, computed:'timeDischargeStr' },
    // Brief History — label bottom ≈ 323pt → top%≈68.0%; text runs below that
    { id:'briefHistory',     key:'briefHistory',     page:1, top:66.5, left:5,   w:91, fs:8 },
    // Disposition — near bottom of page 1
    { id:'disposition',      key:'disposition',      page:1, top:4.5,  left:16,  w:40, fs:8 },
    // Page 2 — Maternity
    // LMP "LMP" label at top%≈87.4% on page 2
    { id:'lmp',              key:'lmp',              page:2, top:86.0, left:36,  w:30, fs:8, computed:'lmp' },
    // Gravida/Para — "stillbirth" label area ~ top%≈79.4%; G/P values
    { id:'gravida',          key:'gravida',          page:2, top:77.8, left:45,  w:8,  fs:8 },
    { id:'para',             key:'para',             page:2, top:77.8, left:56,  w:8,  fs:8 },
    // Expected delivery — label "Expected" at top%≈67.5%
    { id:'expectedDD',       key:'expectedDD',       page:2, top:66.2, left:52,  w:42, fs:8, computed:'expectedDD' },
    // Admission Diagnosis — label bottom ≈ 288pt → top%≈71.4%
    { id:'admissionDx',      key:'admissionDx',      page:2, top:70.0, left:6,   w:86, fs:8 },
    // Delivery Date/Time — "DELIVERY" label at top%≈49.9%
    { id:'deliveryDate',     key:'deliveryDate',     page:2, top:48.2, left:6,   w:28, fs:8, computed:'deliveryDate' },
    { id:'deliveryTime',     key:'deliveryTime',     page:2, top:48.2, left:40,  w:22, fs:8, computed:'deliveryTimeStr' },
    // Manner of delivery — "Manner" label top%≈43.6%
    { id:'mannerOfDelivery', key:'mannerOfDelivery', page:2, top:42.2, left:40,  w:55, fs:8 },
    // Birth outcome row — "Birth" label top%≈41.2%; Fetal/Sex/Weight/APGAR
    { id:'fetalOutcome',     key:'fetalOutcome',     page:2, top:38.8, left:6,   w:22, fs:8 },
    { id:'babySex',          key:'babySex',          page:2, top:38.8, left:30,  w:16, fs:8 },
    { id:'birthWeight',      key:'birthWeight',      page:2, top:38.8, left:49,  w:20, fs:8 },
    { id:'apgarScore',       key:'apgarScore',       page:2, top:38.8, left:76,  w:18, fs:8 },
  ],

  /* ── PMRF (594.75×841.5 pt) ─────────────────────────── */
  /* From drawn rectangle extraction:
     PIN row: y0=161.6 y1=175.2 → top%=((841.5-175.2)/841.5)*100=79.2%
     Member name row: y0=197.7 y1=220.2 → top%=73.8%
     Mother name row: y0=220.2 y1=242.7 → top%=71.2%
     Spouse name row: y0=242.7 y1=265.9 → top%=68.4%
     DOB block: y0=266.2 y1=309.7 → top%=63.2%
     Address block: y0=378.4 y1=411.9 → top%=51.1%
     Dep row 1: y0=522.4 y1=553.9 → top%=34.2%
  */
  pmrf: [
    // PIN row — full width box, text starts at left side
    { id:'memberPIN',        key:'memberPIN',        page:1, top:79.2, left:3,   w:90, fs:9 },
    // Member name row — columns at x: 18/85.5/216/346.5/387 → left%: 3/14.4/36.3/58.3/65.1
    { id:'memberLastName',   key:'memberLastName',   page:1, top:73.8, left:3,   w:11, fs:9 },
    { id:'memberFirstName',  key:'memberFirstName',  page:1, top:73.8, left:14.4,w:22, fs:9 },
    { id:'memberMiddleName', key:'memberMiddleName', page:1, top:73.8, left:36.3,w:22, fs:9 },
    { id:'memberNameExt',    key:'memberNameExt',    page:1, top:73.8, left:58.3,w:7,  fs:9 },
    // Mother's maiden name row — same columns, next row down
    { id:'motherLastName',   key:'motherLastName',   page:1, top:71.2, left:3,   w:11, fs:9 },
    { id:'motherFirstName',  key:'motherFirstName',  page:1, top:71.2, left:14.4,w:22, fs:9 },
    { id:'motherMiddleName', key:'motherMiddleName', page:1, top:71.2, left:36.3,w:22, fs:9 },
    // Spouse name row
    { id:'spouseLastName',   key:'spouseLastName',   page:1, top:68.4, left:3,   w:11, fs:9 },
    { id:'spouseFirstName',  key:'spouseFirstName',  page:1, top:68.4, left:14.4,w:22, fs:9 },
    { id:'spouseMiddleName', key:'spouseMiddleName', page:1, top:68.4, left:36.3,w:22, fs:9 },
    // DOB block top%≈63.2%; Place of birth right portion
    { id:'memberDOB',        key:'memberDOB',        page:1, top:63.2, left:3,   w:28, fs:9, computed:'memberDOB' },
    { id:'placeOfBirth',     key:'placeOfBirth',     page:1, top:63.2, left:36,  w:54, fs:9 },
    // Sex/Civil Status/Citizenship — block top%≈57.1%
    { id:'memberSex',        key:'memberSex',        page:1, top:57.1, left:3,   w:11, fs:9 },
    { id:'civilStatus',      key:'civilStatus',      page:1, top:57.1, left:14,  w:22, fs:9 },
    { id:'citizenship',      key:'citizenship',      page:1, top:57.1, left:36,  w:22, fs:9 },
    // Permanent address — top%≈51.1%; second row (subdivision/brgy/city/province/zip) at top%≈50.1%
    { id:'addrStreet',       key:'addrStreet',       page:1, top:51.1, left:3,   w:63, fs:9 },
    { id:'mobile',           key:'mobile',           page:1, top:49.1, left:68,  w:28, fs:9 },
    { id:'addrSubdivision',  key:'addrSubdivision',  page:1, top:50.1, left:3,   w:11, fs:9 },
    { id:'addrBarangay',     key:'addrBarangay',     page:1, top:50.1, left:14.5,w:12, fs:9 },
    { id:'addrCity',         key:'addrCity',         page:1, top:50.1, left:26.1,w:11, fs:9 },
    { id:'addrProvince',     key:'addrProvince',     page:1, top:50.1, left:37.4,w:22, fs:9 },
    { id:'addrZip',          key:'addrZip',          page:1, top:50.1, left:59.9,w:7,  fs:9 },
    { id:'homePhone',        key:'homePhone',        page:1, top:53.7, left:68,  w:28, fs:9 },
    // Dependent row 1 — top%≈34.2%; columns same as name columns
    { id:'patientLastName',  key:'patientLastName',  page:1, top:34.2, left:3,   w:17, fs:9 },
    { id:'patientFirstName', key:'patientFirstName', page:1, top:34.2, left:20.4,w:19, fs:9 },
    { id:'patientMiddleName',key:'patientMiddleName',page:1, top:34.2, left:48.1,w:14, fs:9 },
    { id:'relationship',     key:'relationship',     page:1, top:34.2, left:62.8,w:15, fs:9 },
    { id:'patientDOB',       key:'patientDOB',       page:1, top:34.2, left:78,  w:19, fs:9, computed:'patientDOB' },
    // Member type section — "MEMBER TYPE" label at top%≈23.9%
    { id:'memberType',       key:'memberType',       page:1, top:22.5, left:3,   w:92, fs:9 },
    // Profession / Income — label at top%≈7.5%
    { id:'profession',       key:'profession',       page:1, top:6.5,  left:3,   w:35, fs:9 },
    { id:'monthlyIncome',    key:'monthlyIncome',    page:1, top:6.5,  left:40,  w:25, fs:9 },
  ],
};

/* ── PDF file paths ──────────────────────────────────────── */
const PDF_PATHS = {
  csf:  'forms/CSF.pdf',
  cf2:  'forms/CF2.pdf',
  cf3:  'forms/CF3.pdf',
  pmrf: 'forms/PMRF.pdf',
};

/* ── Render a PDF page to a canvas ──────────────────────── */
async function renderPDFPage(formKey, pageNum) {
  const st = pdfState[formKey];
  if (!st.doc) return;

  const page      = await st.doc.getPage(pageNum);
  const canvas    = document.getElementById('canvas-' + formKey);
  if (!canvas) return;

  const ctx       = canvas.getContext('2d');
  const scroller  = document.querySelector(`#pdf-wrap-${formKey}`).closest('.pdf-canvas-scroller');
  const targetW   = scroller ? scroller.clientWidth - 32 : 600; // 32px for padding
  const dpr       = window.devicePixelRatio || 1;
  const viewport  = page.getViewport({ scale: 1 });
  const scale     = targetW / viewport.width;
  const scaled    = page.getViewport({ scale });

  // Physical pixels = logical * dpr (sharp on HiDPI)
  canvas.width  = Math.floor(scaled.width  * dpr);
  canvas.height = Math.floor(scaled.height * dpr);
  canvas.style.width  = Math.floor(scaled.width)  + 'px';
  canvas.style.height = Math.floor(scaled.height) + 'px';

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  await page.render({ canvasContext: ctx, viewport: scaled }).promise;

  // Sync overlay div to CSS (logical) pixel size
  const overlay = document.getElementById('overlay-' + formKey);
  if (overlay) {
    overlay.style.width  = Math.floor(scaled.width)  + 'px';
    overlay.style.height = Math.floor(scaled.height) + 'px';
  }

  // Update page indicator
  const pageLabel = document.getElementById(formKey + '-page-info');
  if (pageLabel) pageLabel.textContent = `Page ${pageNum} / ${st.totalPages}`;

  // Enable/disable nav buttons
  const prevBtn = document.getElementById(formKey + '-prev-page');
  const nextBtn = document.getElementById(formKey + '-next-page');
  if (prevBtn) prevBtn.disabled = pageNum <= 1;
  if (nextBtn) nextBtn.disabled = pageNum >= st.totalPages;

  st.page = pageNum;
  scaleOverlayFonts(formKey);
  updateOverlayForForm(formKey);
}

/* ── Load PDF and show first page ───────────────────────── */
async function loadFormPDF(formKey) {
  if (!window.pdfjsLib) return;

  const loadingEl = document.getElementById('pdf-loading-' + formKey);
  const wrapEl    = document.getElementById('pdf-wrap-'    + formKey);
  const nofileEl  = document.getElementById('pdf-nofile-'  + formKey);

  if (loadingEl) loadingEl.style.display = '';
  if (wrapEl)    wrapEl.style.display    = 'none';
  if (nofileEl)  nofileEl.style.display  = 'none';

  try {
    const doc = await pdfjsLib.getDocument(PDF_PATHS[formKey]).promise;
    pdfState[formKey].doc        = doc;
    pdfState[formKey].totalPages = doc.numPages;
    pdfState[formKey].rendered   = true;

    if (loadingEl) loadingEl.style.display = 'none';
    if (wrapEl)    wrapEl.style.display    = '';

    injectOverlaySpans(formKey);
    await renderPDFPage(formKey, 1);
  } catch (err) {
    if (loadingEl) loadingEl.style.display = 'none';
    if (nofileEl)  nofileEl.style.display  = '';
    console.warn('[PCA] PDF load failed for', formKey, '–', err.message);
  }
}

/* ── Inject overlay <span> elements into overlay div ────── */
function injectOverlaySpans(formKey) {
  const overlay = document.getElementById('overlay-' + formKey);
  if (!overlay) return;
  overlay.innerHTML = '';

  // Reference page heights per form (pt) — used for proportional font scaling
  const PAGE_H = { csf: 936, cf2: 936, cf3: 1008, pmrf: 841.5 };
  const refH = PAGE_H[formKey] || 936;

  (OVERLAY_MAP[formKey] || []).forEach(f => {
    const span = document.createElement('span');
    span.className     = 'pdf-field';
    span.id            = 'pof-' + formKey + '-' + f.id;
    span.dataset.page  = f.page;
    span.dataset.fsPct = (f.fs || 8) / refH; // font-size as fraction of this form's page height
    // width set explicitly so ellipsis and wrapping are consistent at all zoom levels;
    // translateY(-100%) anchors the text baseline (bottom) to the % coordinate
    span.style.cssText =
      `top:${f.top}%;left:${f.left}%;width:${f.w}%;transform:translateY(-100%);`;
    overlay.appendChild(span);
  });
  scaleOverlayFonts(formKey);
}

/* ── Scale font sizes relative to current canvas height ── */
function scaleOverlayFonts(formKey) {
  const overlay = document.getElementById('overlay-' + formKey);
  if (!overlay) return;
  // Use the rendered CSS pixel height of the overlay (set explicitly after each render)
  const h = parseFloat(overlay.style.height) || overlay.getBoundingClientRect().height || 800;
  overlay.querySelectorAll('.pdf-field').forEach(span => {
    const fsPct = parseFloat(span.dataset.fsPct) || (8 / 936);
    span.style.fontSize = Math.max(6, Math.round(fsPct * h)) + 'px';
  });
}

/* ── Update overlay text for one form ───────────────────── */
function updateOverlayForForm(formKey) {
  const st      = pdfState[formKey];
  const curPage = st ? st.page : 1;
  const fields  = OVERLAY_MAP[formKey] || [];

  fields.forEach(f => {
    const span = document.getElementById('pof-' + formKey + '-' + f.id);
    if (!span) return;

    // Show only fields for the current page
    span.style.display = (f.page === curPage) ? '' : 'none';

    // Get value (computed or raw)
    let val = '';
    const gcv = window.getComputedValue;
    if (typeof gcv === 'function') {
      val = f.computed ? gcv(f.computed) : (window.state?.data?.[f.key] || '');
    } else {
      val = window.state?.data?.[f.key] || '';
    }
    span.textContent = val;
    span.classList.toggle('pdf-field--filled', !!val);
  });
}

/* ── Update all form overlays ────────────────────────────── */
function updateAllOverlays() {
  ['csf', 'cf2', 'cf3', 'pmrf'].forEach(key => {
    if (pdfState[key].rendered) updateOverlayForForm(key);
  });
}

/* ── Page navigation ─────────────────────────────────────── */
function setupPageNav(formKey) {
  const prev = document.getElementById(formKey + '-prev-page');
  const next = document.getElementById(formKey + '-next-page');
  if (prev) prev.addEventListener('click', () => {
    const st = pdfState[formKey];
    if (st.page > 1) renderPDFPage(formKey, st.page - 1);
  });
  if (next) next.addEventListener('click', () => {
    const st = pdfState[formKey];
    if (st.page < st.totalPages) renderPDFPage(formKey, st.page + 1);
  });
}

/* ── Lazy load: only render PDF when its section opens ───── */
function onFormSectionActivated(formKey) {
  if (!pdfState[formKey].rendered) {
    loadFormPDF(formKey);
  } else {
    updateOverlayForForm(formKey);
  }
  // Re-render on resize to fit the (possibly new) container width
}

/* ── Export: filled PDF via pdf-lib ─────────────────────── */
async function exportFilledPDF(formKey) {
  if (!window.PDFLib) {
    showToast('Export unavailable', 'pdf-lib did not load. Check your connection.', 'danger');
    return;
  }
  const btn = document.getElementById('export-' + formKey + '-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Generating…'; }

  try {
    const bytes      = await fetch(PDF_PATHS[formKey]).then(r => {
      if (!r.ok) throw new Error('PDF not found');
      return r.arrayBuffer();
    });
    const pdfDoc     = await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: true });
    const pages      = pdfDoc.getPages();
    const { StandardFonts } = PDFLib;
    const font       = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const fields = OVERLAY_MAP[formKey] || [];
    fields.forEach(f => {
      const pg = pages[f.page - 1];
      if (!pg) return;
      const { width, height } = pg.getSize();

      let val = '';
      const gcv2 = window.getComputedValue;
      if (typeof gcv2 === 'function') {
        val = f.computed ? gcv2(f.computed) : (window.state?.data?.[f.key] || '');
      } else {
        val = window.state?.data?.[f.key] || '';
      }
      if (!val) return;

      // Convert % coordinates to PDF points
      // HTML: top=0% at top; PDF: y=0 at bottom → invert
      const x  = (f.left / 100) * width;
      const y  = height - ((f.top / 100) * height) - 8; // 8pt baseline offset
      const fs = f.fs || 7;

      pg.drawText(String(val), {
        x, y, size: fs, font,
        color: PDFLib.rgb(0, 0, 0),
        maxWidth: (f.w / 100) * width,
        lineHeight: fs + 1,
      });
    });

    const pdfBytes  = await pdfDoc.save();
    const blob      = new Blob([pdfBytes], { type: 'application/pdf' });
    const url       = URL.createObjectURL(blob);
    const a         = document.createElement('a');
    a.href          = url;
    a.download      = `${formKey.toUpperCase()}_filled_${Date.now()}.pdf`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    showToast('PDF exported', `${formKey.toUpperCase()} downloaded with filled data.`, 'success');
  } catch (err) {
    showToast('Export failed', err.message || 'Could not generate PDF.', 'danger');
    console.error('[PCA] Export error:', err);
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="bi bi-download me-1"></i>Export PDF'; }
  }
}

/* ── Init: setup nav buttons + resize handler ────────────── */
document.addEventListener('DOMContentLoaded', () => {
  ['csf', 'cf2', 'cf3', 'pmrf'].forEach(setupPageNav);
});

// Re-render on resize so the canvas always fills the panel at full quality
let _resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(_resizeTimer);
  _resizeTimer = setTimeout(() => {
    ['csf', 'cf2', 'cf3', 'pmrf'].forEach(key => {
      if (pdfState[key].rendered) renderPDFPage(key, pdfState[key].page);
    });
  }, 150);
});
