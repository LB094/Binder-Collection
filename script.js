fetch('rsv10pt5.json')
  .then(response => response.json())
  .then(cards => {
    const container = document.getElementById('card-container');
    cards.forEach(card => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
        <img src="${card.images?.small}" alt="${card.name}">
        <h2>${card.name}</h2>
        <p><strong>${card.hp ? 'HP' : 'Supertype'}:</strong> ${card.hp || card.supertype}</p> 
        <p><strong>Type:</strong> ${card.types ? '' : 'Subtypes'}:</strong> ${card.types || card.subtype}</p>
        <p><strong>Rarity:</strong> ${card.rarity}</p>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => console.error('Error loading cards:', error));


