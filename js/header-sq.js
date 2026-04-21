<script>
document.addEventListener('DOMContentLoaded', function () {

  function attachWave(link, color, lineWidth, bottomOffset) {
    let canvas, animFrame;
    function startWave() {
      link.style.setProperty('text-decoration', 'none', 'important');
      canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.pointerEvents = 'none';
      canvas.style.left = '0';
      canvas.style.bottom = bottomOffset + 'px';
      link.style.position = 'relative';
      link.style.display = 'inline-block';
      link.appendChild(canvas);
      const dpr = window.devicePixelRatio || 1;
      const w = link.offsetWidth;
      const h = 10;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      let offset = 0;
      function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        for (let x = 0; x <= w; x++) {
          const y = h / 2 + Math.sin((x + offset) * 0.30) * 1.8;
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
      link.style.removeProperty('text-decoration');
      link.style.position = '';
      link.style.display = '';
    }
    link.addEventListener('mouseenter', startWave);
    link.addEventListener('mouseleave', stopWave);
  }

  // Inline links — 1px, inherited text color, tight to text
	document.querySelectorAll('p a:not(.btn-link)').forEach(function (link) {
		attachWave(link, getComputedStyle(link).color, 1, -2);
	});

	document.querySelectorAll('.oi-val a').forEach(function (link) {
		attachWave(link, '#c8e02a', 1, -5);
	});

  // Button-style links — 3px chartreuse, offset below
  document.querySelectorAll('p a.btn-link').forEach(function (link) {
    attachWave(link, '#c8e02a', 3, -10);
  });

});
</script>