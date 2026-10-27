// Lightweight crucible script — minimal listeners, no MutationObserver.
(() => {
  const factions = [
    'Adolescent Epic Geckos','Ancient Egyptians','Astroknights','Bear Cavalry','Clerics','Clowns',
    'Disco Dancers','Dwarves','Elder Things','Explorers','Fairies','G.I. Gerald','Giant Ants','Innsmouth',
    'Killer Plants','Kitty Cats','Mages','Magical Girls','Mega Troopers','Miskatonic University','Mounties',
    'Mythic Horses','Orcs','Pearl and the Images','Penguins','Princesses','Rulers of the Cosmos','Samurai',
    'Slashers','Star Roamers','Sumo Wrestlers','Super Spies','Teddy Bears','Thieves','Tricksters','Truckers',
    'Vampires','Vigilantes','Warriors','Werewolves'
  ];

  function pickRandomUnique(array, n) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, Math.min(n, arr.length));
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderCrucible() {
    const chosen = pickRandomUnique(factions, 14);

    const prev = document.getElementById('crucibleResults');
    if (prev) prev.remove();

    const container = document.createElement('div');
    container.id = 'crucibleResults';
    container.className = 'container my-4';
    container.innerHTML = `
      <div class="card p-3" style="background:#f8f9fa;color:#222;border:1px solid #e0e0e0;">
        <h3 class="h5 mb-3">Crucible draft — 14 random factions</h3>
        <ol class="mb-0">
          ${chosen.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
        </ol>
      </div>
    `;

    const footer = document.querySelector('footer');
    if (footer && footer.parentNode) footer.parentNode.insertBefore(container, footer);
    else document.body.appendChild(container);

    container.scrollIntoView({ behavior: 'smooth' });
  }

  // Single lightweight delegated listener — fast and ensures first click works
  document.addEventListener('click', (e) => {
    const btn = e.target.closest && e.target.closest('#crucibleBtn');
    if (btn) {
      renderCrucible();
    }
  });
})();
