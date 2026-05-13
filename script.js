/* === DUCKS HUNTER — script.js === */

(function () {
  'use strict';

  const cardWrapper = document.querySelector('.card-wrapper');
  const cardFlip = document.querySelector('.card-flip');
  const tapHint = document.querySelector('.tap-hint');
  const sparksContainer = document.querySelector('.sparks');

  if (!cardFlip) return;

  let flipped = false;

  // Determine theme
  const isGold = cardWrapper && cardWrapper.classList.contains('gold-theme');
  const sparkColor = isGold
    ? ['#f5c842', '#ffe066', '#fff4a0', '#c8960a']
    : ['#a855f7', '#7b2fff', '#d8b4fe', '#4c1d95'];

  function spawnSparks(x, y) {
    if (!sparksContainer) return;
    for (let i = 0; i < 22; i++) {
      const spark = document.createElement('div');
      spark.classList.add('spark');

      const angle = Math.random() * 360;
      const dist = 60 + Math.random() * 120;
      const dx = Math.cos((angle * Math.PI) / 180) * dist;
      const dy = Math.sin((angle * Math.PI) / 180) * dist;
      const size = 4 + Math.random() * 8;
      const color = sparkColor[Math.floor(Math.random() * sparkColor.length)];
      const delay = Math.random() * 0.2;

      spark.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        box-shadow: 0 0 ${size * 2}px ${color};
        --dx: ${dx}px;
        --dy: ${dy}px;
        animation-delay: ${delay}s;
        animation-duration: ${0.8 + Math.random() * 0.6}s;
      `;

      sparksContainer.appendChild(spark);
      spark.addEventListener('animationend', () => spark.remove());
    }
  }

  function flipCard(e) {
    if (flipped) return;
    flipped = true;

    // Get tap position for sparks
    let x, y;
    if (e.touches && e.touches[0]) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }

    // Stop float animation
    cardWrapper.classList.remove('floating');
    cardWrapper.classList.add('flipped');

    // Flip
    cardFlip.classList.add('flipped');

    // Hide hint
    if (tapHint) {
      tapHint.classList.add('hidden');
    }

    // Sparks burst
    setTimeout(() => spawnSparks(x, y), 50);

    // Screen flash
    flashScreen();
  }

  function flashScreen() {
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: fixed;
      inset: 0;
      background: ${isGold ? 'rgba(245,200,66,0.18)' : 'rgba(123,47,255,0.2)'};
      pointer-events: none;
      z-index: 100;
      animation: flashFade 0.5s ease forwards;
    `;

    // Inject keyframes if not present
    if (!document.getElementById('flash-style')) {
      const s = document.createElement('style');
      s.id = 'flash-style';
      s.textContent = `@keyframes flashFade { 0% { opacity:1; } 100% { opacity:0; } }`;
      document.head.appendChild(s);
    }

    document.body.appendChild(flash);
    flash.addEventListener('animationend', () => flash.remove());
  }

  // Events
  cardFlip.addEventListener('click', flipCard);
  cardFlip.addEventListener('touchstart', flipCard, { passive: true });

  // Start float when loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (cardWrapper && !flipped) {
        cardWrapper.classList.add('floating');
      }
    }, 300);
  });

})();
