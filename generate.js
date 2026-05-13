#!/usr/bin/env node
// Generates all card HTML pages

const fs = require('fs');
const path = require('path');

const cards = [
  // === ЗОЛОТЫЕ (golden.png back) ===
  {
    file: 'chaotic.html',
    title: 'Chaos Duck',
    theme: 'gold',
    back: 'golden.png',
    front: 'chaotic.png',
  },
  {
    file: 'holy.html',
    title: 'Holy Duck',
    theme: 'gold',
    back: 'golden.png',
    front: 'holy.png',
  },
  {
    file: 'priority.html',
    title: 'Priority Duck',
    theme: 'gold',
    back: 'golden.png',
    front: 'priority.png',
  },
  // === ПРОКЛЯТЫЕ (proklatie.png back) ===
  {
    file: 'pastuh.html',
    title: 'Средневековый Пастух',
    theme: 'cursed',
    back: 'proklatie.png',
    front: 'Pastuh.png',
  },
  {
    file: 'someliee.html',
    title: 'Злитный Сомелье',
    theme: 'cursed',
    back: 'proklatie.png',
    front: 'someliee.png',
  },
  {
    file: 'infozigan.html',
    title: 'Инфоцыган-Гуру',
    theme: 'cursed',
    back: 'proklatie.png',
    front: 'Infozigan.png',
  },
  {
    file: 'zlodei.html',
    title: 'Сказочный Злодей',
    theme: 'cursed',
    back: 'proklatie.png',
    front: 'skasochnui-zlodeii.png',
  },
  {
    file: 'toksik.html',
    title: 'Корпоративный Токсик Коуч',
    theme: 'cursed',
    back: 'proklatie.png',
    front: 'toksik-kouch.png',
  },
  {
    file: 'polit.html',
    title: 'Политическая Марионетка',
    theme: 'cursed',
    back: 'proklatie.png',
    front: 'polit-doll.png',
  },
];

function makeCardHTML(card) {
  const glowColor = card.theme === 'gold'
    ? 'rgba(245,200,66,0.5)'
    : 'rgba(123,47,255,0.55)';

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="theme-color" content="#050505">
  <title>${card.title} — Ducks Hunter</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- Ambient glow background -->
  <div class="ambient ${card.theme}-theme"></div>

  <!-- Spark particles container -->
  <div class="sparks"></div>

  <!-- Main scene -->
  <div class="scene">
    <div class="card-wrapper ${card.theme}-theme">

      <!-- Flip card -->
      <div class="card-flip">

        <!-- BACK side -->
        <div class="card-face card-back">
          <img src="cards/${card.back}" alt="Card Back" draggable="false">

          <!-- Tap hint overlay -->
          <div class="tap-hint">
            <span class="tap-hint-text">Нажми чтобы открыть</span>
            <span class="tap-hint-icon">👆</span>
          </div>

          <!-- Corner ornaments -->
          <svg class="corner-ornament tl" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 38 L2 2 L38 2" stroke="${card.theme === 'gold' ? '#f5c842' : '#a855f7'}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="2" cy="2" r="2.5" fill="${card.theme === 'gold' ? '#f5c842' : '#a855f7'}"/>
          </svg>
          <svg class="corner-ornament tr" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 38 L2 2 L38 2" stroke="${card.theme === 'gold' ? '#f5c842' : '#a855f7'}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="2" cy="2" r="2.5" fill="${card.theme === 'gold' ? '#f5c842' : '#a855f7'}"/>
          </svg>
          <svg class="corner-ornament bl" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 38 L2 2 L38 2" stroke="${card.theme === 'gold' ? '#f5c842' : '#a855f7'}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="2" cy="2" r="2.5" fill="${card.theme === 'gold' ? '#f5c842' : '#a855f7'}"/>
          </svg>
          <svg class="corner-ornament br" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 38 L2 2 L38 2" stroke="${card.theme === 'gold' ? '#f5c842' : '#a855f7'}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="2" cy="2" r="2.5" fill="${card.theme === 'gold' ? '#f5c842' : '#a855f7'}"/>
          </svg>
        </div>

        <!-- FRONT side -->
        <div class="card-face card-front">
          <img src="cards/${card.front}" alt="${card.title}" draggable="false">
        </div>

      </div><!-- /card-flip -->
    </div><!-- /card-wrapper -->
  </div><!-- /scene -->

  <script src="script.js"></script>
</body>
</html>
`;
}

cards.forEach(card => {
  const html = makeCardHTML(card);
  fs.writeFileSync(path.join(__dirname, card.file), html, 'utf8');
  console.log(`Created ${card.file}`);
});

console.log('All card pages generated!');
