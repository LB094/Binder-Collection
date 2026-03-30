const container = document.getElementById("cardContainer");

let allCards = [];

async function loadCards() {
  const responses = await Promise.all([
    fetch("zsv10pt5.json"),
    fetch("rsv10pt5.json"),
    fetch("me1.json")
  ]);

  const dataArrays = await Promise.all(
    responses.map(res => res.json())
  );

  allCards = dataArrays.flat();
}

// get query from URL
function getQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("q")?.toLowerCase() || "";
}

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
      <img src="${card.images?.small || ''}">
      <h2>${card.name}</h2>
      <p>HP: ${card.hp || "N/A"}</p>
      <p>Type: ${card.types ? card.types.join(", ") : "N/A"}</p>
      <p>Rarity: ${card.rarity || "N/A"}</p>
    `;

    container.appendChild(cardDiv);
  });
}

async function runSearch() {
  await loadCards();

  const query = getQuery();

  const filtered = allCards.filter(card =>
    card.name?.toLowerCase().includes(query)
  );

  displayCards(filtered);
}

runSearch();
//   for the search page
const form = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const value = searchInput.value.trim();
    if (value === "") return;
    window.location.href = `search.html?q=${encodeURIComponent(value)}`;
  });
}