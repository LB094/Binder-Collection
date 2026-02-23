const container = document.getElementById("cardContainer");
const searchInput = document.getElementById("searchInput");
const form = document.getElementById("searchForm");

let allCards = [];

// Load all cards once and store them
async function loadCards() {
  try {
    const responses = await Promise.all([
      fetch("zsv10pt5.json"),
      fetch("rsv10pt5.json"),
      fetch("me1.json"),
    ]);

    const dataArrays = await Promise.all(
      responses.map(res => res.json())
    );

    // Assuming each JSON file has a 'data' array of cards
    allCards = dataArrays.flat();

    console.log("Cards loaded:", allCards.length);

  } catch (error) {
    console.error("Error loading cards:", error);
  }
}

// Call loadCards immediately when script runs
loadCards();

// Handle form submit (search)
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // If cards not loaded yet, wait for them
  if (allCards.length === 0) {
    await loadCards();
  }

  const value = searchInput.value.toLowerCase().trim();

  if (value === "") {
    container.innerHTML = "";
    return;
  }

  const filtered = allCards.filter(card =>
    card.name?.toLowerCase().includes(value)
  );

  displayCards(filtered);
});

// Render cards to the page
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
      <img src="${card.images?.small || ''}" alt="${card.name || 'Card image'}" />
      <h2>${card.name || 'Unknown Name'}</h2>
      <p><strong>${card.hp ? 'HP' : 'Type'}:</strong> ${card.hp || card.supertype || 'N/A'}</p>
      <p><strong>${card.types ? 'Type' : 'Subtype'}:</strong> ${card.types ? card.types.join(', ') : (card.subtypes?.join(', ') || 'N/A')}</p>
      <p><strong>Rarity:</strong> ${card.rarity || 'N/A'}</p>
    `;

    container.appendChild(cardDiv);
  });
}
