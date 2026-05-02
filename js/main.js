// Indigo Cycling - Main JavaScript

(function () {

  /* ── Wave animation (tertiary buttons) ── */

  function attachWave(el, color, lineWidth, bottomOffset) {
    var canvas, animFrame;

    function startWave() {
      canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.pointerEvents = 'none';
      canvas.style.left = '0';
      canvas.style.bottom = bottomOffset + 'px';
      el.appendChild(canvas);

      var dpr = window.devicePixelRatio || 1;
      var w = el.offsetWidth;
      var h = 10;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';

      var ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      var offset = 0;

      function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        for (var x = 0; x <= w; x++) {
          var y = h / 2 + Math.sin((x + offset) * 0.30) * 1.8;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
        offset += 0.8;
        animFrame = requestAnimationFrame(draw);
      }
      draw();
    }

    function stopWave() {
      cancelAnimationFrame(animFrame);
      if (canvas) canvas.remove();
    }

    el.addEventListener('mouseenter', startWave);
    el.addEventListener('mouseleave', stopWave);
  }

  /* ── Header ── */

  var LOGO_WHITE = 'https://images.squarespace-cdn.com/content/66102729044a365f961127e0/749a0837-f97c-4d7f-9f00-ba43705efa78/logomark_white_2026.png?content-type=image%2Fpng';
  var LOGO_BLACK = 'https://images.squarespace-cdn.com/content/66102729044a365f961127e0/94bc2e63-ef06-4060-93cf-4ee37abfa1a5/logomark_black_2026.png?content-type=image%2Fpng';

  function createHeader() {
    var mode = document.body.dataset.header || 'dark';

    var html = '<header class="site-header site-header--' + mode + '" id="site-header">'
      + '<div class="site-header__inner">'
      +   '<a href="/" class="site-header__logo" target="_top">'
      +     '<img class="site-header__logo-img site-header__logo-img--light" src="' + LOGO_WHITE + '" alt="Indigo Cycling Chicago">'
      +     '<img class="site-header__logo-img site-header__logo-img--dark" src="' + LOGO_BLACK + '" alt="Indigo Cycling Chicago">'
      +   '</a>'
      +   '<nav class="site-nav" id="site-nav">'
      +     '<ul class="site-nav__list">'
      +       '<li class="site-nav__item">'
      +         '<a href="/about" target="_top" class="site-nav__link">About</a>'
      +       '</li>'
      +       '<li class="site-nav__item site-nav__item--has-dropdown">'
      +         '<a href="/team" target="_top" class="site-nav__link">Team <span class="site-nav__arrow">&#9662;</span></a>'
      +         '<ul class="site-nav__dropdown">'
      +           '<li><a href="/roster" target="_top" class="site-nav__link">Roster</a></li>'
      +           '<li><a href="/code-of-conduct" target="_top" class="site-nav__link">Code of Conduct</a></li>'
      +         '</ul>'
      +       '</li>'
      +       '<li class="site-nav__item">'
      +         '<a href="/events" target="_top" class="site-nav__link">Events</a>'
      +       '</li>'
      +       '<li class="site-nav__item">'
      +         '<a href="/grants" target="_top" class="site-nav__link">Grants</a>'
      +       '</li>'
      +       '<li class="site-nav__item">'
      +         '<a href="/sponsors" target="_top" class="site-nav__link">Sponsors</a>'
      +       '</li>'
      +       '<li class="site-nav__item">'
      +         '<a href="/shop" target="_top" class="site-nav__link">Shop</a>'
      +       '</li>'
      +       '<li class="site-nav__item">'
      +         '<a href="/contact" target="_top" class="site-nav__link">Contact</a>'
      +       '</li>'
      +       '<li class="site-nav__item site-nav__item--cta">'
      +         '<a href="" class="btn btn--primary site-nav__cta">Donate</a>'
      +       '</li>'
      +     '</ul>'
      +   '</nav>'
      +   '<button class="site-header__menu-btn" id="menu-toggle" aria-label="Toggle menu" aria-expanded="false">'
      +     '<span class="site-header__menu-icon"></span>'
      +   '</button>'
      + '</div>'
      + '</header>'
      + '<div class="site-nav-overlay" id="site-nav-overlay"></div>';

    document.body.insertAdjacentHTML('afterbegin', html);
  }

  function initHeaderScroll() {
    var header = document.getElementById('site-header');
    if (!header) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }, { passive: true });
  }

  function initMobileMenu() {
    var toggle = document.getElementById('menu-toggle');
    var nav = document.getElementById('site-nav');
    var overlay = document.getElementById('site-nav-overlay');
    if (!toggle || !nav) return;

    function closeMenu() {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      if (overlay) overlay.classList.remove('is-visible');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        nav.classList.add('is-open');
        toggle.classList.add('is-active');
        toggle.setAttribute('aria-expanded', 'true');
        if (overlay) overlay.classList.add('is-visible');
        document.body.style.overflow = 'hidden';
      }
    });

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }
  }

  /* ── Init ── */

  document.addEventListener('DOMContentLoaded', function () {
    createHeader();
    initHeaderScroll();
    initMobileMenu();

    document.querySelectorAll('.btn--tertiary').forEach(function (btn) {
      btn.style.position = 'relative';
      attachWave(btn, '#c8e02a', 3, 0);
    });

    document.querySelectorAll('a:not(.btn):not(.site-nav__link):not(.site-header__logo)').forEach(function (link) {
      link.classList.add('wave-link');
      attachWave(link, getComputedStyle(link).color, 1, -6);
    });
  });

})();
