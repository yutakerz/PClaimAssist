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
   (NOTE: All top% values have been corrected using the 100-X rule)
─────────────────────────────────────────────────────────── */
const OVERLAY_MAP = {

  /* ── CSF (612×936 pt) ────────────────────────────────── */
  csf: [
    // Member PIN 
    { id:'memberPIN',        key:'memberPIN',        page:1, top:19.7, left:29,  w:68, fs:8 },
    // Member name row 
    { id:'memberLastName',   key:'memberLastName',   page:1, top:21.2, left:4,   w:19, fs:8 },
    { id:'memberFirstName',  key:'memberFirstName',  page:1, top:21.2, left:24,  w:19, fs:8 },
    { id:'memberNameExt',    key:'memberNameExt',    page:1, top:21.2, left:44,  w:7,  fs:8 },
    { id:'memberMiddleName', key:'memberMiddleName', page:1, top:21.2, left:52,  w:21, fs:8 },
    // Member DOB 
    { id:'memberDOB',        key:'memberDOB',        page:1, top:20.9, left:75,  w:22, fs:8, computed:'memberDOB' },
    // Patient PIN row 
    { id:'patientPIN',       key:'patientPIN',       page:1, top:25.9, left:29,  w:68, fs:8 },
    // Patient name row 
    { id:'patientLastName',  key:'patientLastName',  page:1, top:28.1, left:4,   w:19, fs:8 },
    { id:'patientFirstName', key:'patientFirstName', page:1, top:28.1, left:24,  w:19, fs:8 },
    { id:'patientNameExt',   key:'patientNameExt',   page:1, top:28.1, left:44,  w:7,  fs:8 },
    { id:'patientMiddleName',key:'patientMiddleName',page:1, top:28.1, left:52,  w:21, fs:8 },
    // Relationship 
    { id:'relationship',     key:'relationship',     page:1, top:27.8, left:75,  w:22, fs:8 },
    // Confinement dates 
    { id:'dateAdmitted',     key:'dateAdmitted',     page:1, top:34.5, left:10,  w:26, fs:8, computed:'dateAdmitted' },
    { id:'dateDischarge',    key:'dateDischarge',    page:1, top:34.5, left:40,  w:26, fs:8, computed:'dateDischarge' },
    // Patient DOB 
    { id:'patientDOB',       key:'patientDOB',       page:1, top:34.5, left:76,  w:21, fs:8, computed:'patientDOB' },
    // Employer section 
    { id:'employerPEN',      key:'employerPEN',      page:1, top:53.5, left:27,  w:36, fs:8 },
    { id:'employerPhone',    key:'employerPhone',    page:1, top:53.5, left:66,  w:32, fs:8 },
    // Business name 
    { id:'employerName',     key:'employerName',     page:1, top:55.2, left:21,  w:76, fs:8 },
  ],

  /* ── CF2 (612×936 pt) ────────────────────────────────── */
  cf2: [
    // HCI Accreditation No (PAN) 
    { id:'hciPAN',           key:'hciPAN',           page:1, top:23.5, left:32,  w:65, fs:8 },
    // HCI Name 
    { id:'hciName',          key:'hciName',          page:1, top:25.2, left:6,   w:90, fs:8 },
    // HCI Address row 
    { id:'hciStreet',        key:'hciStreet',        page:1, top:28.2, left:6,   w:44, fs:8 },
    { id:'hciCity',          key:'hciCity',          page:1, top:28.2, left:52,  w:24, fs:8 },
    { id:'hciProvince',      key:'hciProvince',      page:1, top:28.2, left:78,  w:19, fs:8 },
    // Patient name 
    { id:'patientLastName',  key:'patientLastName',  page:1, top:33.2, left:6,   w:20, fs:8 },
    { id:'patientFirstName', key:'patientFirstName', page:1, top:33.2, left:28,  w:18, fs:8 },
    { id:'patientMiddleName',key:'patientMiddleName',page:1, top:33.2, left:47,  w:18, fs:8 },
    { id:'patientNameExt',   key:'patientNameExt',   page:1, top:33.2, left:67,  w:9,  fs:8 },
    // Date/Time Admitted 
    { id:'dateAdmitted',     key:'dateAdmitted',     page:1, top:40.9, left:6,   w:32, fs:8, computed:'dateAdmitted' },
    { id:'timeAdmitted',     key:'timeAdmitted',     page:1, top:40.9, left:56,  w:24, fs:8, computed:'timeAdmittedStr' },
    // Date/Time Discharged 
    { id:'dateDischarge',    key:'dateDischarge',    page:1, top:42.6, left:6,   w:32, fs:8, computed:'dateDischarge' },
    { id:'timeDischarge',    key:'timeDischarge',    page:1, top:42.6, left:56,  w:24, fs:8, computed:'timeDischargeStr' },
    // Disposition 
    { id:'disposition',      key:'disposition',      page:1, top:45.2, left:6,   w:55, fs:8 },
    // Accommodation 
    { id:'accommodation',    key:'accommodation',    page:1, top:45.2, left:64,  w:33, fs:8 },
    // Admission diagnosis 
    { id:'admissionDx',      key:'admissionDx',      page:1, top:54.8, left:6,   w:91, fs:8 },
    // Discharge diagnosis 
    { id:'dischargeDx',      key:'dischargeDx',      page:1, top:59.0, left:6,   w:91, fs:8 },
  ],

  /* ── CF3 (612×1008 pt) ──────────────────────────────── */
  cf3: [
    // HCI Accreditation No 
    { id:'hciPAN',           key:'hciPAN',           page:1, top:17.6, left:32,  w:65, fs:8 },
    // Patient name row 
    { id:'patientLastName',  key:'patientLastName',  page:1, top:24.2, left:5,   w:24, fs:8 },
    { id:'patientFirstName', key:'patientFirstName', page:1, top:24.2, left:30,  w:22, fs:8 },
    { id:'patientMiddleName',key:'patientMiddleName',page:1, top:24.2, left:54,  w:42, fs:8 },
    // Chief complaint 
    { id:'chiefComplaint',   key:'chiefComplaint',   page:1, top:21.4, left:52,  w:45, fs:8 },
    // Date Admitted 
    { id:'dateAdmitted',     key:'dateAdmitted',     page:1, top:26.4, left:16,  w:32, fs:8, computed:'dateAdmitted' },
    { id:'timeAdmitted',     key:'timeAdmitted',     page:1, top:26.4, left:50,  w:22, fs:8, computed:'timeAdmittedStr' },
    // Date Discharged 
    { id:'dateDischarge',    key:'dateDischarge',    page:1, top:29.7, left:16,  w:32, fs:8, computed:'dateDischarge' },
    { id:'timeDischarge',    key:'timeDischarge',    page:1, top:29.7, left:50,  w:22, fs:8, computed:'timeDischargeStr' },
    // Brief History 
    { id:'briefHistory',     key:'briefHistory',     page:1, top:33.5, left:5,   w:91, fs:8 },
    // Disposition 
    { id:'disposition',      key:'disposition',      page:1, top:95.5, left:16,  w:40, fs:8 },
    // Page 2 — Maternity
    // LMP 
    { id:'lmp',              key:'lmp',              page:2, top:14.0, left:36,  w:30, fs:8, computed:'lmp' },
    // Gravida/Para 
    { id:'gravida',          key:'gravida',          page:2, top:22.2, left:45,  w:8,  fs:8 },
    { id:'para',             key:'para',             page:2, top:22.2, left:56,  w:8,  fs:8 },
    // Expected delivery 
    { id:'expectedDD',       key:'expectedDD',       page:2, top:33.8, left:52,  w:42, fs:8, computed:'expectedDD' },
    // Admission Diagnosis 
    { id:'admissionDx',      key:'admissionDx',      page:2, top:30.0, left:6,   w:86, fs:8 },
    // Delivery Date/Time 
    { id:'deliveryDate',     key:'deliveryDate',     page:2, top:51.8, left:6,   w:28, fs:8, computed:'deliveryDate' },
    { id:'deliveryTime',     key:'deliveryTime',     page:2, top:51.8, left:40,  w:22, fs:8, computed:'deliveryTimeStr' },
    // Manner of delivery 
    { id:'mannerOfDelivery', key:'mannerOfDelivery', page:2, top:57.8, left:40,  w:55, fs:8 },
    // Birth outcome row 
    { id:'fetalOutcome',     key:'fetalOutcome',     page:2, top:61.2, left:6,   w:22, fs:8 },
    { id:'babySex',          key:'babySex',          page:2, top:61.2, left:30,  w:16, fs:8 },
    { id:'birthWeight',      key:'birthWeight',      page:2, top:61.2, left:49,  w:20, fs:8 },
    { id:'apgarScore',       key:'apgarScore',       page:2, top:61.2, left:76,  w:18, fs:8 },
  ],

  /* ── PMRF (594.75×841.5 pt) ─────────────────────────── */
  pmrf: [
    // PIN row 
    { id:'memberPIN',        key:'memberPIN',        page:1, top:20.8, left:3,   w:90, fs:9 },
    // Member name row 
    { id:'memberLastName',   key:'memberLastName',   page:1, top:26.2, left:3,   w:11, fs:9 },
    { id:'memberFirstName',  key:'memberFirstName',  page:1, top:26.2, left:14.4,w:22, fs:9 },
    { id:'memberMiddleName', key:'memberMiddleName', page:1, top:26.2, left:36.3,w:22, fs:9 },
    { id:'memberNameExt',    key:'memberNameExt',    page:1, top:26.2, left:58.3,w:7,  fs:9 },
    // Mother's maiden name row 
    { id:'motherLastName',   key:'motherLastName',   page:1, top:28.8, left:3,   w:11, fs:9 },
    { id:'motherFirstName',  key:'motherFirstName',  page:1, top:28.8, left:14.4,w:22, fs:9 },
    { id:'motherMiddleName', key:'motherMiddleName', page:1, top:28.8, left:36.3,w:22, fs:9 },
    // Spouse name row
    { id:'spouseLastName',   key:'spouseLastName',   page:1, top:31.6, left:3,   w:11, fs:9 },
    { id:'spouseFirstName',  key:'spouseFirstName',  page:1, top:31.6, left:14.4,w:22, fs:9 },
    { id:'spouseMiddleName', key:'spouseMiddleName', page:1, top:31.6, left:36.3,w:22, fs:9 },
    // DOB block 
    { id:'memberDOB',        key:'memberDOB',        page:1, top:36.8, left:3,   w:28, fs:9, computed:'memberDOB' },
    { id:'placeOfBirth',     key:'placeOfBirth',     page:1, top:36.8, left:36,  w:54, fs:9 },
    // Sex/Civil Status/Citizenship 
    { id:'memberSex',        key:'memberSex',        page:1, top:42.9, left:3,   w:11, fs:9 },
    { id:'civilStatus',      key:'civilStatus',      page:1, top:42.9, left:14,  w:22, fs:9 },
    { id:'citizenship',      key:'citizenship',      page:1, top:42.9, left:36,  w:22, fs:9 },
    // Permanent address 
    { id:'addrStreet',       key:'addrStreet',       page:1, top:48.9, left:3,   w:63, fs:9 },
    { id:'mobile',           key:'mobile',           page:1, top:50.9, left:68,  w:28, fs:9 },
    { id:'addrSubdivision',  key:'addrSubdivision',  page:1, top:49.9, left:3,   w:11, fs:9 },
    { id:'addrBarangay',     key:'addrBarangay',     page:1, top:49.9, left:14.5,w:12, fs:9 },
    { id:'addrCity',         key:'addrCity',         page:1, top:49.9, left:26.1,w:11, fs:9 },
    { id:'addrProvince',     key:'addrProvince',     page:1, top:49.9, left:37.4,w:22, fs:9 },
    { id:'addrZip',          key:'addrZip',          page:1, top:49.9, left:59.9,w:7,  fs:9 },
    { id:'homePhone',        key:'homePhone',        page:1, top:46.3, left:68,  w:28, fs:9 },
    // Dependent row 1 
    { id:'patientLastName',  key:'patientLastName',  page:1, top:65.8, left:3,   w:17, fs:9 },
    { id:'patientFirstName', key:'patientFirstName', page:1, top:65.8, left:20.4,w:19, fs:9 },
    { id:'patientMiddleName',key:'patientMiddleName',page:1, top:65.8, left:48.1,w:14, fs:9 },
    { id:'relationship',     key:'relationship',     page:1, top:65.8, left:62.8,w:15, fs:9 },
    { id:'patientDOB',       key:'patientDOB',       page:1, top:65.8, left:78,  w:19, fs:9, computed:'patientDOB' },
    // Member type section 
    { id:'memberType',       key:'memberType',       page:1, top:77.5, left:3,   w:92, fs:9 },
    // Profession / Income 
    { id:'profession',       key:'profession',       page:1, top:93.5, left:3,   w:35, fs:9 },
    { id:'monthlyIncome',    key:'monthlyIncome',    page:1, top:93.5, left:40,  w:25, fs:9 },
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
  const targetW   = scroller ? scroller.clientWidth - 32 : 600; 
  const dpr       = window.devicePixelRatio || 1;
  const viewport  = page.getViewport({ scale: 1 });
  const scale     = targetW / viewport.width;
  const scaled    = page.getViewport({ scale });

  canvas.width  = Math.floor(scaled.width  * dpr);
  canvas.height = Math.floor(scaled.height * dpr);
  canvas.style.width  = Math.floor(scaled.width)  + 'px';
  canvas.style.height = Math.floor(scaled.height) + 'px';

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  await page.render({ canvasContext: ctx, viewport: scaled }).promise;

  const overlay = document.getElementById('overlay-' + formKey);
  if (overlay) {
    overlay.style.width  = Math.floor(scaled.width)  + 'px';
    overlay.style.height = Math.floor(scaled.height) + 'px';
  }

  const pageLabel = document.getElementById(formKey + '-page-info');
  if (pageLabel) pageLabel.textContent = `Page ${pageNum} / ${st.totalPages}`;

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

  const PAGE_H = { csf: 936, cf2: 936, cf3: 1008, pmrf: 841.5 };
  const refH = PAGE_H[formKey] || 936;

  (OVERLAY_MAP[formKey] || []).forEach(f => {
    const span = document.createElement('span');
    span.className     = 'pdf-field';
    span.id            = 'pof-' + formKey + '-' + f.id;
    span.dataset.page  = f.page;
    span.dataset.fsPct = (f.fs || 8) / refH; 
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

    span.style.display = (f.page === curPage) ? '' : 'none';

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
    const bytes = await fetch(PDF_PATHS[formKey]).then(r => {
      if (!r.ok) throw new Error('PDF not found');
      return r.arrayBuffer();
    });
    
    const pdfDoc = await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: true });
    const pages = pdfDoc.getPages();
    const { StandardFonts } = PDFLib;
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

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

      const x = (f.left / 100) * width;
      const baselineOffset = 2; // Increase this to push text further down when printing
      const y = height - ((f.top / 100) * height) - baselineOffset; 
      const fs = f.fs || 7;

      pg.drawText(String(val), {
        x: x, 
        y: y, 
        size: fs, 
        font: font,
        color: PDFLib.rgb(0, 0, 0),
        maxWidth: (f.w / 100) * width,
        lineHeight: fs + 1,
      });
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formKey.toUpperCase()}_filled_${Date.now()}.pdf`;
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

let _resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(_resizeTimer);
  _resizeTimer = setTimeout(() => {
    ['csf', 'cf2', 'cf3', 'pmrf'].forEach(key => {
      if (pdfState[key].rendered) renderPDFPage(key, pdfState[key].page);
    });
  }, 150);
});

window.state = state;