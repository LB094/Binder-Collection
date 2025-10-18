fetch('zsv10pt5.json')
  .then(response => response.json())
  .then(cards => {
    const container = document.getElementById('card-container');
    cards.forEach(card => {
      const div = document.createElement('div');
      div.classList.add('card');
      if (card.types && card.types.length > 0) {
  div.classList.add(card.types[0]); // e.g. 'Fire', 'Water'
}
      //Does the text for the code   Line 12 and 13 if it doesn't have a HP/Type THEN display supertype/subtype
      div.innerHTML = `
        <img src="${card.images?.small}" alt="${card.name}">
        <h2>${card.name}</h2>
        <p><strong>${card.hp ? 'HP' : 'Type'}:</strong> ${card.hp || card.supertype}</p> 
        <p><strong>${card.types ? 'Type' : 'Subtype'}:</strong> ${card.types ? card.types.join(', ') : card.subtypes?.join(', ')}</p>
        <p><strong>Rarity:</strong> ${card.rarity}</p> 
      `;
      container.appendChild(div);
    });
    })
   .catch(error => console.error('Error loading cards:', error));
  

// addCardHoverEffects();
//   })
//   .catch(error => console.error('Error loading cards:', error));


// function addCardHoverEffects() {
//   document.querySelectorAll('.card').forEach(card => {
//     const img = card.querySelector('img');

//     // Tilt and scale effect
//     card.addEventListener('mousemove', e => {
//       const rect = card.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       const centerX = rect.width / 2;
//       const centerY = rect.height / 2;
//       const rotateX = ((y - centerY) / centerY) * 5;
//       const rotateY = ((x - centerX) / centerX) * -5;

//       img.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
//     });

//     // Reset on mouse leave
//     card.addEventListener('mouseleave', () => {
//       img.style.transform = 'scale(1)';
//     });

//     // Reflection effect
//     card.addEventListener('mousemove', e => {
//       const rect = card.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       card.style.setProperty('--x', `${x}px`);
//       card.style.setProperty('--y', `${y}px`);
//     });
//   });
// }