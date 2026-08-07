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
   OVERLAY_MAP itself is defined in js/pdf/overlays/index.js,
   built from the per-form maps in js/pdf/overlays/{csf,cf2,cf3,pmrf}.js.
   Those files must be loaded before this one (see index.html).
─────────────────────────────────────────────────────────── */

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
      `top:${f.top}%;left:${f.left}%;width:${f.w}%;transform:translateY(-70%);`;
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
      const baselineOffset = 6; // Increase this to push text further down when printing
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