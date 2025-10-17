fetch('rsv10pt5.json')
  .then(response => response.json())
  .then(cards => {
    const container = document.getElementById('whiteflare-container');
    cards.forEach(card => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
        let img = document.createElement("img");
img.src = card.images?.small;
img.alt = card.name;

let name = document.createElement("h2");
name.textContent = card.name;

let hp = document.createElement("p");
hp.textContent = "HP: " + card.hp;

let type = document.createElement("p");
type.textContent = "Type: " + card.types;

let rarity = document.createElement("p");
rarity.textContent = "Rarity: " + card.rarity;

div.append(img, name, hp, type, rarity);

      `;
      container.appendChild(div);
    });
  })
  .catch(error => console.error('Error loading cards:', error));
