// const container = document.getElementById("cardContainer"); //search will appear
// const searchInput = document.getElementById("searchInput"); //
// const form = document.getElementById("searchForm");

// let allCards = []; //array to store cards

// //get cards and store them
// async function loadCards() {
//   try {
//     const responses = await Promise.all([ //promise all will not proceed until all 3 files are fetched
//       fetch("zsv10pt5.json"), // get black bolt
//       fetch("rsv10pt5.json"), //get white flare
//       fetch("me1.json"), // get mega evo
//     ]);

//     const dataArrays = await Promise.all( 
//       responses.map(res => res.json()) //return json
//     );

    
//     allCards = dataArrays.flat(); //merge array

//     console.log("Cards loaded:", allCards.length); //

//   } catch (error) {
//     console.error("Error loading cards:", error);
//   }
// }

// // Call loadCards immediately when script runs
// loadCards();

// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const value = searchInput.value.trim();

//   if (value === "") return;

//   // redirect to search page
//   window.location.href = `search.html?q=${encodeURIComponent(value)}`;
// });

// // Render cards to the page
// function displayCards(cards) {
//   container.innerHTML = "";

//   if (cards.length === 0) {
//     container.innerHTML = "<p>No cards found.</p>";
//     return;
//   }

//   cards.forEach(card => {
//     const cardDiv = document.createElement("div");
//     cardDiv.classList.add("card");

//     cardDiv.innerHTML = `
//       <img src="${card.images?.small || ''}" alt="${card.name || 'Card image'}" />
//       <h2>${card.name || 'Unknown Name'}</h2>
//       <p><strong>${card.hp ? 'HP' : 'Type'}:</strong> ${card.hp || card.supertype || 'N/A'}</p>
//       <p><strong>${card.types ? 'Type' : 'Subtype'}:</strong> ${card.types ? card.types.join(', ') : (card.subtypes?.join(', ') || 'N/A')}</p>
//       <p><strong>Rarity:</strong> ${card.rarity || 'N/A'}</p>
//     `;

//     container.appendChild(cardDiv);
//   });
// }

const container = document.getElementById("cardContainer");
const searchInput = document.getElementById("searchInput");
const form = document.getElementById("searchForm");

let allCards = [];

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

    allCards = dataArrays.flat();
    console.log("Cards loaded:", allCards.length);

  } catch (error) {
    console.error("Error loading cards:", error);
  }
}

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
      <img src="${card.images?.small || ''}" alt="${card.name || 'Card image'}" />
      <h2>${card.name || 'Unknown Name'}</h2>
      <p><strong>HP:</strong> ${card.hp || 'N/A'}</p>
      <p><strong>Type:</strong> ${card.types ? card.types.join(', ') : (card.subtypes?.join(', ') || 'N/A')}</p>
      <p><strong>Rarity:</strong> ${card.rarity || 'N/A'}</p>
    `;

    container.appendChild(cardDiv);
  });
}

// Run search if a ?q= param exists in the URL (i.e. on search.html)
async function runSearch() {
  await loadCards();
  const query = getQuery();
  if (!query) return;

  const filtered = allCards.filter(card =>
    card.name?.toLowerCase().includes(query)
  );

  displayCards(filtered);
}

// Handle form submit on any page
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const value = searchInput.value.trim();
    if (value === "") return;
    window.location.href = `search.html?q=${encodeURIComponent(value)}`;
  });
}

runSearch();