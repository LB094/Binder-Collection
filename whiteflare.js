fetch('zsv10pt5.json')
  .then(response => response.json())
  .then(cards => {
    const container = document.getElementById('card-container');
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
  })
  .catch(error => console.error('Error loading cards:', error));
