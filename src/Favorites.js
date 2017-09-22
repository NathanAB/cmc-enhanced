let favoritesList = [];

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

function setFavorites(newFavorites) {
  favoritesList = newFavorites;
}

module.exports = {
  createStarElem,
  setFavorites,
};
