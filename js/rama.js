/* ============================================================
   rama.js — ramy malowane na żywo w <canvas>
   Rysuje profil listwy dookoła dowolnego obrazu. Bez gotowych
   obrazków ram — wszystko liczone w przeglądarce, więc działa
   na każdej pracy (również wgranej przez użytkownika).

   Dwa tryby (oba opcjonalne, wykrywane po elementach na stronie):
   1) demo: #frameCanvas + #picker (+ #ramaUpload)   — strona rama-demo/
   2) galeria: [data-rama-gallery] z kafelkami .rama-work — sekcja na O mnie;
      każda praca dostaje przypisaną ramę, a klik otwiera modal z przymiarką.
   ============================================================ */
(function () {
  'use strict';

  /* --- definicje stylów ram: profil = przystanki gradientu w poprzek listwy
     (at: 0 = krawędź zewnętrzna, 1 = przy obrazie). t = grubość (ułamek krótszego boku). --- */
  const FRAMES = [
    { key: 'zlota-zdobiona', name: 'Klasyczna złota', t: 0.088, tex: 'gold',
      stops: [[0,'#6b5320'],[0.05,'#ecd187'],[0.12,'#6e521f'],[0.20,'#f4dc95'],
              [0.32,'#c89b4d'],[0.55,'#b88c3f'],[0.74,'#7a5b24'],[0.87,'#efd58a'],[1,'#5e4717']] },
    { key: 'zlota-gladka', name: 'Złota gładka', t: 0.050, tex: 'gold',
      stops: [[0,'#7c6128'],[0.18,'#efd892'],[0.5,'#cfae62'],[0.82,'#ead08a'],[1,'#6f561f']] },
    { key: 'orzech', name: 'Ciemny orzech', t: 0.072, tex: 'wood',
      stops: [[0,'#241608'],[0.12,'#6e4a2b'],[0.46,'#8a5e35'],[0.8,'#5e3d22'],[1,'#21150b']] },
    { key: 'debowa', name: 'Jasny dąb', t: 0.062, tex: 'wood',
      stops: [[0,'#6b5234'],[0.16,'#c8a56d'],[0.5,'#dabf8f'],[0.85,'#c2a169'],[1,'#67502f']] },
    { key: 'czarna', name: 'Czarna', t: 0.044, tex: 'matte',
      stops: [[0,'#050506'],[0.22,'#3d3d42'],[0.55,'#1b1b1e'],[0.85,'#47474d'],[1,'#08080a']] },
    { key: 'bez-ramy', name: 'Bez ramy', t: 0, tex: 'none', stops: [] },
  ];

  /* Światło z górnego-lewego rogu → cieniowanie fazki jako [zewn, wewn] jasność.
     Każdy przystanek profilu mnożymy przez wartość interpolowaną w poprzek listwy
     (0 = krawędź zewnętrzna, 1 = przy obrazie). Bok zwrócony do światła dostaje
     rozjaśnienie: górna i lewa listwa od strony ZEWNĘTRZNEJ, dolna i prawa od
     strony WEWNĘTRZNEJ. Dzięki temu prawa i dolna listwa łapią światło na
     wewnętrznej fazce i wyglądają trójwymiarowo, a nie jak płaski, przyciemniony
     pasek (wcześniej był jeden mnożnik na cały bok → prawa rama wyglądała płasko). */
  const LIGHT = {
    top:    [1.17, 0.99],
    left:   [1.11, 0.95],
    bottom: [0.87, 1.07],
    right:  [0.83, 1.09],
    flat:   [1, 1],
  };
  function dirMul(side, pos) { const L = LIGHT[side] || LIGHT.flat; return L[0] + (L[1] - L[0]) * pos; }

  /* small seeded PRNG so main canvas & thumbnails render identically */
  function rng(seed) { let s = seed >>> 0; return function () {
    s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  function hexRGB(h) { return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)]; }
  function tint(h, m) { const c = hexRGB(h);
    return 'rgb(' + c.map(v => Math.max(0, Math.min(255, Math.round(v*m)))).join(',') + ')'; }

  /* profil w poprzek listwy + kierunkowe cieniowanie fazki (dirMul per przystanek) */
  function grad(ctx, side, ox, oy, T, stops) {
    let g;
    if (side === 'top')    g = ctx.createLinearGradient(0, oy, 0, oy + T);
    if (side === 'bottom') g = ctx.createLinearGradient(0, oy, 0, oy - T);
    if (side === 'left')   g = ctx.createLinearGradient(ox, 0, ox + T, 0);
    if (side === 'right')  g = ctx.createLinearGradient(ox, 0, ox - T, 0);
    stops.forEach(s => g.addColorStop(s[0], tint(s[1], dirMul(side, s[0]))));
    return g;
  }

  /* draw one mitred side as a clipped trapezoid filled with the profile gradient + texture */
  function side(ctx, name, X, Y, W, H, T, spec, seed) {
    const oX = X, oY = Y, RX = X + W, BY = Y + H;
    const p = new Path2D();
    if (name === 'top')    { p.moveTo(oX,oY);  p.lineTo(RX,oY);  p.lineTo(RX-T,oY+T); p.lineTo(oX+T,oY+T); }
    if (name === 'bottom') { p.moveTo(RX,BY);  p.lineTo(oX,BY);  p.lineTo(oX+T,BY-T); p.lineTo(RX-T,BY-T); }
    if (name === 'left')   { p.moveTo(oX,BY);  p.lineTo(oX,oY);  p.lineTo(oX+T,oY+T); p.lineTo(oX+T,BY-T); }
    if (name === 'right')  { p.moveTo(RX,oY);  p.lineTo(RX,BY);  p.lineTo(RX-T,BY-T); p.lineTo(RX-T,oY+T); }
    ctx.save(); ctx.clip(p);
    const anchor = (name==='bottom') ? BY : (name==='right') ? RX : (name==='left') ? oX : oY;
    const vert = (name === 'left' || name === 'right');   // profil biegnie w poprzek X (lewa/prawa) albo Y (góra/dół)
    ctx.fillStyle = grad(ctx, name, vert ? anchor : oX, vert ? oY : anchor, T, spec.stops);
    ctx.fillRect(oX, oY, W, H);

    const horiz = (name === 'top' || name === 'bottom');
    const bx = (name === 'right')  ? RX - T : oX;   // początek pasma listwy przy krawędzi, żeby tekstura
    const by = (name === 'bottom') ? BY - T : oY;   // trafiła w clip także na prawej/dolnej, nie tylko górnej/lewej
    const r = rng(seed + name.charCodeAt(0));
    if (spec.tex === 'wood') {
      const n = Math.round(T * 0.7);
      for (let i = 0; i < n; i++) {
        const dark = r() < 0.5;
        ctx.strokeStyle = 'rgba(' + (dark ? '40,26,14' : '235,210,170') + ',' + (0.05 + r()*0.10) + ')';
        ctx.lineWidth = 0.6 + r()*1.1; ctx.beginPath();
        const off = (r() - 0.5) * 6;
        if (horiz) { const y = by + r()*T; ctx.moveTo(oX, y);
          for (let x = oX; x <= RX; x += 24) ctx.lineTo(x, y + Math.sin(x*0.03 + i)*1.4 + off*0.0);
        } else { const x = bx + r()*T; ctx.moveTo(x, oY);
          for (let y = oY; y <= BY; y += 24) ctx.lineTo(x + Math.sin(y*0.03 + i)*1.4, y); }
        ctx.stroke();
      }
    } else if (spec.tex === 'gold') {
      for (let i = 0; i < 6; i++) {                       // specular glints across the width
        ctx.strokeStyle = 'rgba(255,250,225,' + (0.10 + r()*0.16) + ')';
        ctx.lineWidth = 0.8 + r()*1.4; ctx.beginPath();
        if (horiz) { const x = oX + r()*W; ctx.moveTo(x, by); ctx.lineTo(x - T*0.5, by + T); }
        else       { const y = oY + r()*H; ctx.moveTo(bx, y); ctx.lineTo(bx + T, y - T*0.5); }
        ctx.stroke();
      }
    } else if (spec.tex === 'matte') {
      ctx.fillStyle = 'rgba(255,255,255,0.015)';          // faint sheen noise
      for (let i = 0; i < T*2; i++) ctx.fillRect(oX + r()*W, oY + r()*H, 1, 1);
    }

    /* cienka świetlna grań na wewnętrznej krawędzi boku zwróconego do światła
       — mocniej sprzedaje trójwymiar (zwł. na prawej/dolnej listwie). */
    if (T > 6 && spec.tex !== 'none') {
      const lit = LIGHT[name] ? LIGHT[name][1] > 1 : false; // wewn. fazka łapie światło (bottom/right)
      if (lit) {
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = 'rgba(255,248,228,0.16)';
        ctx.lineWidth = Math.max(1, T * 0.06);
        ctx.beginPath();
        if (name === 'right')  { ctx.moveTo(RX-T+0.5, oY+T); ctx.lineTo(RX-T+0.5, BY-T); }
        if (name === 'bottom') { ctx.moveTo(oX+T, BY-T+0.5); ctx.lineTo(RX-T, BY-T+0.5); }
        ctx.stroke();
        ctx.globalCompositeOperation = 'source-over';
      }
    }
    ctx.restore();
  }

  /* main: draw `img` framed with `spec` onto `canvas`, painting display width = artW (CSS px) */
  function render(canvas, img, spec, artW) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ar = img.naturalWidth / img.naturalHeight;
    const artH = Math.round(artW / ar);
    const T = Math.round(Math.min(artW, artH) * spec.t);
    const W = artW + 2*T, H = artH + 2*T;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // painting
    ctx.drawImage(img, T, T, artW, artH);

    if (T > 0) {
      const seed = (spec.key.length * 131 + spec.stops.length * 17) >>> 0;
      ['top','left','bottom','right'].forEach(s => side(ctx, s, 0, 0, W, H, T, spec, seed));

      // rabbet shadow: frame lip casts onto the artwork (top/left stronger)
      const sw = Math.max(2, T * 0.32);
      const cast = [['top',0,T,0,T+sw,0.40],['left',T,0,T+sw,0,0.34],
                    ['bottom',0,H-T,0,H-T-sw,0.22],['right',W-T,0,W-T-sw,0,0.22]];
      ctx.save(); ctx.beginPath(); ctx.rect(T, T, artW, artH); ctx.clip();
      cast.forEach(c => { const g = ctx.createLinearGradient(c[1],c[2],c[3],c[4]);
        g.addColorStop(0,'rgba(0,0,0,'+c[5]+')'); g.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.fillRect(0,0,W,H); });
      ctx.restore();

      ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(0,0,0,0.5)';            // outer edge
      ctx.strokeRect(0.5, 0.5, W-1, H-1);
      ctx.strokeStyle = 'rgba(0,0,0,0.45)';                              // rabbet edge
      ctx.strokeRect(T+0.5, T+0.5, artW-1, artH-1);
    } else {
      ctx.strokeStyle = 'rgba(0,0,0,0.18)'; ctx.lineWidth = 1;
      ctx.strokeRect(0.5, 0.5, W-1, H-1);
    }
  }

  function frameByKey(k) { return FRAMES.find(f => f.key === k) || FRAMES[0]; }
  /* render scaling outer box (art + frame) to a target outer width in CSS px */
  function renderOuter(canvas, img, spec, outerW) {
    render(canvas, img, spec, Math.max(40, Math.round(outerW / (1 + 2 * spec.t))));
  }

  /* ============================================================
     Tryb 1 — demo (rama-demo/)
     ============================================================ */
  function initDemo() {
    const canvas = document.getElementById('frameCanvas');
    const stage  = document.getElementById('stage');
    const picker = document.getElementById('picker');
    if (!canvas || !stage || !picker) return;

    const img = new Image();
    let current = FRAMES[0];

    function fitArtW() {
      const avail = Math.min(stage.clientWidth - 32, 760);
      return Math.round(avail / (1 + 2 * 0.088));
    }
    function paint() {
      render(canvas, img, current, fitArtW());
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (canvas.animate && !reduce) canvas.animate([{opacity:.4},{opacity:1}], {duration:200,easing:'ease'});
    }
    function buildPicker() {
      picker.innerHTML = '';
      FRAMES.forEach(f => {
        const b = document.createElement('button');
        b.className = 'rama-opt' + (f.key === current.key ? ' is-active' : '');
        b.type = 'button'; b.setAttribute('aria-label', 'Rama: ' + f.name);
        const c = document.createElement('canvas');
        render(c, img, f, 92);
        const span = document.createElement('span'); span.textContent = f.name;
        b.appendChild(c); b.appendChild(span);
        b.addEventListener('click', () => {
          current = f; paint();
          [...picker.children].forEach(x => x.classList.remove('is-active'));
          b.classList.add('is-active');
        });
        picker.appendChild(b);
      });
    }

    img.onload = () => { paint(); buildPicker(); };
    img.src = canvas.dataset.src || 'img/ramki/obraz-bez-ramy.jpg';

    const up = document.getElementById('ramaUpload');
    if (up) up.addEventListener('change', e => {
      const file = e.target.files[0]; if (!file) return;
      const fr = new FileReader();
      fr.onload = () => { img.onload = () => { paint(); buildPicker(); }; img.src = fr.result; };
      fr.readAsDataURL(file);
    });

    let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(paint, 120); });
  }

  /* ============================================================
     Tryb 2 — galeria prac w ramach + modal przymiarki
     Natywny <dialog> + showModal(): focus-trap, Escape, inert tła
     i powrót fokusu po zamknięciu robi przeglądarka.
     ============================================================ */
  let modal = null, modalImg = null, modalSpec = null;

  function buildModal() {
    if (modal) return modal;
    modal = document.createElement('dialog');
    modal.className = 'rama-modal';
    modal.setAttribute('aria-label', 'Przymierzalnia ram');
    modal.innerHTML =
      '<div class="rama-modal__backdrop" data-close></div>' +
      '<div class="rama-modal__panel" role="document">' +
        '<button class="rama-modal__close" type="button" aria-label="Zamknij przymierzalnię" data-close>&times;</button>' +
        '<div class="rama-modal__stage"><canvas aria-hidden="true"></canvas></div>' +
        '<div class="rama-modal__side">' +
          '<h3 class="rama-modal__title"></h3>' +
          '<p class="rama-modal__lead">Wybierz oprawę — rysowana na żywo wokół obrazu:</p>' +
          '<div class="rama-modal__picker" role="group" aria-label="Style ram"></div>' +
          '<label class="rama-upload-label">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>' +
            ' Wgraj własny obraz<input type="file" accept="image/*" class="sr-only"></label>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
    // 'close' łapie każdą drogę zamknięcia (przycisk, backdrop, natywny Escape)
    modal.addEventListener('close', () => {
      document.body.style.overflow = '';
    });
    modal.querySelector('.rama-upload-label input').addEventListener('change', e => {
      const file = e.target.files[0]; if (!file) return;
      const fr = new FileReader();
      fr.onload = () => { const im = new Image(); im.onload = () => {
        modalImg = im; modalSpec = FRAMES[0];
        modal.querySelector('.rama-modal__title').textContent = 'Twój obraz';
        buildModalPicker(); paintModal();
      }; im.src = fr.result; };
      fr.readAsDataURL(file);
    });

    let rt; window.addEventListener('resize', () => {
      if (!modal.open) return;
      clearTimeout(rt); rt = setTimeout(paintModal, 120);
    });
    return modal;
  }

  function fitModalArtW(spec) {
    const stage = modal.querySelector('.rama-modal__stage');
    const availW = Math.min((stage.clientWidth || 480) - 12, 620);
    const availH = Math.min(window.innerHeight * 0.72, 660);
    const ar = modalImg.naturalWidth / modalImg.naturalHeight;
    let artW = availW / (1 + 2 * spec.t);
    let artH = artW / ar;
    const T = Math.min(artW, artH) * spec.t;
    const outerH = artH + 2 * T;
    if (outerH > availH) artW *= availH / outerH;
    return Math.max(80, Math.round(artW));
  }
  function paintModal() {
    const c = modal.querySelector('.rama-modal__stage canvas');
    render(c, modalImg, modalSpec, fitModalArtW(modalSpec));
    modal.querySelectorAll('.rama-modal__picker .rama-opt').forEach(b =>
      b.classList.toggle('is-active', b.dataset.key === modalSpec.key));
  }
  function buildModalPicker() {
    const pick = modal.querySelector('.rama-modal__picker');
    pick.innerHTML = '';
    FRAMES.forEach(f => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'rama-opt'; b.dataset.key = f.key;
      b.setAttribute('aria-label', 'Rama: ' + f.name);
      const c = document.createElement('canvas'); renderOuter(c, modalImg, f, 78);
      const s = document.createElement('span'); s.textContent = f.name;
      b.appendChild(c); b.appendChild(s);
      b.addEventListener('click', () => { modalSpec = f; paintModal(); });
      pick.appendChild(b);
    });
  }
  function openModal(img, spec, title) {
    buildModal();
    modalImg = img; modalSpec = spec || FRAMES[0];
    modal.querySelector('.rama-modal__title').textContent = title || '';
    modal.showModal();                              // najpierw POKAŻ modal…
    document.body.style.overflow = 'hidden';
    buildModalPicker();
    requestAnimationFrame(paintModal);              // …a renderuj dopiero gdy ma layout → poprawne proporcje
  }
  function closeModal() {
    if (modal && modal.open) modal.close();
  }

  function initGallery() {
    const galleries = document.querySelectorAll('[data-rama-gallery]');
    if (!galleries.length) return;
    const works = [];

    galleries.forEach(g => {
      g.querySelectorAll('.rama-work').forEach(work => {
        const canvas = work.querySelector('canvas');
        const spec = frameByKey(work.dataset.frame);
        const title = work.dataset.title || '';
        const img = new Image();
        img.onload = () => {
          const w = (work.clientWidth || 280);
          renderOuter(canvas, img, spec, Math.min(w, 360));
          work._img = img; work._spec = spec;
          works.push({ work, canvas, img, spec });
        };
        img.src = work.dataset.src;
        if (canvas) canvas.setAttribute('aria-hidden', 'true');
        work.setAttribute('aria-label', 'Przymierz ramę do pracy: ' + title);
        work.addEventListener('click', () => { if (work._img) openModal(work._img, work._spec, title); });
      });
    });

    document.querySelectorAll('[data-rama-upload]').forEach(inp => {
      inp.addEventListener('change', e => {
        const file = e.target.files[0]; if (!file) return;
        const fr = new FileReader();
        fr.onload = () => { const im = new Image(); im.onload = () => openModal(im, FRAMES[0], 'Twój obraz'); im.src = fr.result; };
        fr.readAsDataURL(file);
        e.target.value = '';
      });
    });

    let rt; window.addEventListener('resize', () => {
      clearTimeout(rt); rt = setTimeout(() => works.forEach(w => {
        renderOuter(w.canvas, w.img, w.spec, Math.min(w.work.clientWidth || 280, 360));
      }), 150);
    });
  }

  function boot() { initDemo(); initGallery(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
