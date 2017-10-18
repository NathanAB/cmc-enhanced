const $ = require('./FakeQuery');

let favoritesList = [];
let initialFilterState = false;

// Add or remove a coin from favorites
function toggleFavorite(e) {
  const starElem = e.currentTarget;
  const coin = starElem.getAttribute('coin');
  const isFavorite = starElem.getAttribute('is-favorite') === 'true';
  starElem.classList.toggle('glyphicon-star');
  starElem.classList.toggle('glyphicon-star-empty');
  if (!isFavorite) {
    favoritesList.push(coin);
  } else {
    favoritesList.splice(favoritesList.indexOf(coin), 1);
  }
  chrome.storage.sync.set({
    favorites: favoritesList,
  });
  starElem.setAttribute('is-favorite', !isFavorite);
}

// Creates the clickable star/favorite button
function createStarElem(coin) {
  const isFavorite = favoritesList.indexOf(coin) >= 0;
  const starElem = document.createElement('span');
  const glyphicon = isFavorite ? 'glyphicon-star' : 'glyphicon-star-empty';
  starElem.className = `favorite-star glyphicon ${glyphicon}`;
  starElem.setAttribute('is-favorite', isFavorite);
  starElem.setAttribute('coin', coin);
  starElem.onclick = toggleFavorite;
  return starElem;
}

// Adds the toggle/checkbox to filter on favorites
function addFavoritesFilter($table, $tableCategoryTabs) {
  const toggleElem = document.createElement('li');
  toggleElem.className = 'favorites-filter';
  toggleElem.innerHTML = '<label><input type="checkbox"> Favorites Only</label>';
  $tableCategoryTabs.appendChild(toggleElem);
  
  // Filter the currency table on click
  const checkbox = $('.favorites-filter input');
  checkbox.onchange = (e) => {
    const isFiltering = e.currentTarget.checked;
    const rows = $table.querySelectorAll('tbody tr:not(.detail-view)');
    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const isFavorite = row.querySelector('.favorite-star').getAttribute('is-favorite') === 'true';
      if (!isFavorite && isFiltering) {
        row.classList.add('hidden');
      } else {
        row.classList.remove('hidden');
      }
    }

    // Save the filter toggle state so it's "sticky"
    chrome.storage.sync.set({
      favoritesFilter: isFiltering,
    });
  };

  // If the user had previously left the filter on, auto-check the toggle
  if (initialFilterState) {
    checkbox.checked = true;
    checkbox.setAttribute('checked', true);

    // This seems hacky and gross but...it works :P
    checkbox.onchange({ currentTarget: checkbox });
  }
}

function setFavorites(newFavorites, savedFilterState) {
  favoritesList = newFavorites;
  initialFilterState = savedFilterState;
}

module.exports = {
  createStarElem,
  setFavorites,
  addFavoritesFilter,
};
