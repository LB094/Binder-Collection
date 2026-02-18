const container = document.getElementById("cardContainer");
const searchInput = document.getElementById("searchInput");
const form = document.getElementById("searchForm");

let allCards = [];

async function loadCards() {
  const responses = await Promise.all([
    fetch("cards1.json"),
    fetch("cards2.json"),
    fetch("cards3.json"),
    fetch("cards4.json")
  ]);

  const dataArrays = await Promise.all(
    responses.map(res => res.json())
  );

  allCards = dataArrays.flat();

  // DO NOT call displayCards here
}

loadCards();


// Only runs when search button is pressed
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const value = searchInput.value.toLowerCase();

  // If search is empty, show nothing
  if (value === "") {
    container.innerHTML = "";
    return;
  }

  const filtered = allCards.filter(card =>
    card.name.toLowerCase().includes(value)
  );

  displayCards(filtered);
});


function displayCards(cards) {
  container.innerHTML = "";

  if (cards.length === 0) {
    container.innerHTML = "<p>No cards found.</p>";
    return;
  }

  cards.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    cardDiv.innerHTML = `
        <img src="${card.images?.small}" alt="${card.name}">
        <h2>${card.name}</h2>
        <p><strong>${card.hp ? 'HP' : 'Type'}:</strong> ${card.hp || card.supertype}</p> 
        <p><strong>${card.types ? 'Type' : 'Subtype'}:</strong> ${card.types ? card.types.join(', ') : card.subtypes?.join(', ')}</p>
        <p><strong>Rarity:</strong> ${card.rarity}</p> 
      `;

    container.appendChild(cardDiv);
  });
}