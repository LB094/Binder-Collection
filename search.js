const container = document.getElementById("cardContainer");
const searchInput = document.getElementById("searchInput");

let allCards = [];

// Load all 4 JSON files
async function loadCards() {
  try {
    const responses = await Promise.all([
      fetch("zsv10pt5.json"),
      fetch("rsv10pt5.json"),
      fetch("me1.json"),
    ]);

    const dataArrays = await Promise.all(
      responses.map(response => response.json())
    );

    // Combine all 4 arrays into one
    allCards = dataArrays.flat();

    displayCards(allCards);

  } catch (error) {
    console.error("Error loading JSON files:", error);
  }
}

loadCards();


// Display cards
function displayCards(cards) {
  container.innerHTML = "";

  cards.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    cardDiv.innerHTML = `
      <h2>${card.name}</h2>
      <p>${card.description}</p>
    `;

    container.appendChild(cardDiv);
  });
}


// Search functionality
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filteredCards = allCards.filter(card =>
    card.name.toLowerCase().includes(value) ||
    card.description.toLowerCase().includes(value)
  );

  displayCards(filteredCards);
});