// fetch('rsv10pt5.json', 'zsv10pt5.json')
//   .then(response => response.json())
//   .then(cards => {
//     const container = document.getElementById('card-container');
//     cards.forEach(card => {
//       const div = document.createElement('div');
//       div.classList.add('card');
//       div.innerHTML = `
//         <img src="${card.images?.small}" alt="${card.name}">
//         <h2>${card.name}</h2>
//         <p><strong>HP:</strong> ${card.hp}</p>
//         <p><strong>Type:</strong> ${card.types?.join(', ')}</p>
//         <p><strong>Rarity:</strong> ${card.rarity || 'Unknown'}</p>
//         <p><em>${card.flavorText || ''}</em></p>
//       `;
//       container.appendChild(div);
//     });
//   })
//   .catch(error => console.error('Error loading cards:', error));
Promise.all([
  fetch('rsv10pt5.json').then(res => res.json()),
  fetch('zsv10pt5.json').then(res => res.json())
])
.then(([blackBoltCards, whiteFlareCards]) => {
  const allCards = [...blackBoltCards, ...whiteFlareCards];
  displayCards(allCards);
})
.catch(err => console.error('Error loading files:', err));

function displayCards(cards) {
  const container = document.getElementById('card-container');
  container.innerHTML = ''; // clear previous
  cards.forEach(card => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <img src="${card.images?.small}" alt="${card.name}">
      <h2>${card.name}</h2>
      <p><strong>HP:</strong> ${card.hp}</p>
      <p><strong>Type:</strong> ${card.types?.join(', ')}</p>
      <p><strong>Rarity:</strong> ${card.rarity || 'Unknown'}</p>
      <p><em>${card.flavorText || ''}</em></p>
    `;
    container.appendChild(div);
  });
}


