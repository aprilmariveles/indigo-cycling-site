<script>
  (function() {
  if (!document.body.classList.contains('collection-66102e378d41b336ea421e09')) return;

  var btn = document.createElement('button');
  btn.id = 'indigo-sound-btn';
  btn.setAttribute('aria-label', 'Toggle sound');
  btn.innerHTML = muteIcon() + '<span>sound off</span>';

  var style = document.createElement('style');
  style.textContent = [
  '#indigo-sound-btn {',
    '  position: absolute; bottom: 24px; right: 24px; z-index: 9999;',
  '  pointer-events: all;',
  '  display: flex; align-items: center; gap: 8px;',
  '  padding: 9px 16px; border-radius: 999px;',
  '  border: 1.5px solid #c8f000;',
  '  background: rgba(200,240,0,0.08);',
  '  color: #c8f000; font-size: 13px; font-weight: 500;',
  '  cursor: pointer; letter-spacing: 0.03em;',
  '  transition: background 0.15s;',
    '}',
  '#indigo-sound-btn:hover {background: rgba(200,240,0,0.18); }',
  '#indigo-sound-btn svg {width:15px; height:15px; flex-shrink:0; }'
  ].join('');
  document.head.appendChild(style);

  var playing = false;
  btn.addEventListener('click', function() {
    playing = !playing;
  var videoEl = document.querySelector('.sqs-video-background-native video');
  if (playing) {
    videoEl.muted = false;
  videoEl.play();
  btn.innerHTML = unmuteIcon() + '<span>sound on</span>';
    } else {
    videoEl.muted = true;
  btn.innerHTML = muteIcon() + '<span>sound off</span>';
    }
  });

  function waitForSection() {
    var section = document.querySelector('.sqs-video-background-native');
  if (section) {
      var existingPosition = window.getComputedStyle(section).position;
  if (existingPosition === 'static') section.style.position = 'relative';
  var contentWrapper = section.closest('.section-container, [data-section-id]');
  if (contentWrapper) {
        var cw = contentWrapper.querySelector('.content-wrapper');
  if (cw) {
    cw.style.pointerEvents = 'none';
    /* restore clicks on any actual links inside the content layer */
    cw.querySelectorAll('a').forEach(function(a) {
      a.style.pointerEvents = 'auto';
    });
  }
      }
  section.appendChild(btn);
    } else {
    setTimeout(waitForSection, 500);
    }
  }

  function muteIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="#c8f000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>';
  }
  function unmuteIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="#c8f000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForSection);
  } else {
    waitForSection();
  }
})();
</script>