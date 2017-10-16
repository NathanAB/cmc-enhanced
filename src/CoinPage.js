const Favorites = require('./Favorites');

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function updateCoinPage($coinPageTitle, $coinPageLinkList) {
  const coinName = window.location.pathname.split('/')[2];
  const coinAbbr = $coinPageTitle.querySelector('small').textContent.slice(1, -1);
  const coinSubtitle = $coinPageTitle.querySelector('.hidden-xs');
  const tradingViewURL = `https://www.tradingview.com/symbols/${coinAbbr}USD/`;

  const $chartIcon = document.createElement('span');
  $chartIcon.className = 'glyphicon glyphicon-stats text-gray';
  $chartIcon.setAttribute('title', 'TradingView');

  const $chartLink = document.createElement('a');
  $chartLink.setAttribute('href', tradingViewURL);
  $chartLink.setAttribute('target', '_blank');
  $chartLink.innerText = 'TradingView';

  const $chartLinkListItem = document.createElement('li');
  $chartLinkListItem.prepend($chartLink);
  $chartLinkListItem.prepend(document.createTextNode(' '));
  $chartLinkListItem.prepend($chartIcon);

  $coinPageLinkList.prepend($chartLinkListItem);

  coinSubtitle.appendChild(Favorites.createStarElem(coinName));
  
  if (inIframe()) {
        var divEls =  document.getElementsByTagName('div');
        for (var i = 0; i < divEls.length; ++i) {
            if (divEls[i].parentNode != document.body) continue;
            if (divEls[i].className != 'container') {
                 divEls[i].style.display = 'none';
            }
        }
        var mainEl = document.getElementsByClassName('row bottom-margin-1x')[1];
        var containerChildren = document.getElementsByClassName('col-xs-12 col-sm-12 col-md-12 col-lg-10')[0].childNodes;
        for (var i = 0; i < containerChildren.length; ++i) {
            if (!containerChildren[i].tagName) continue;
            if (containerChildren[i].tagName.toLowerCase() != 'div' &&
                containerChildren[i].tagName.toLowerCase() != 'hr' &&
                containerChildren[i].tagName.toLowerCase() != 'nav') continue;
            if (containerChildren[i] !== mainEl) {
                containerChildren[i].style.display = 'none';
            }
        }

  }
}

module.exports = {
  updateCoinPage,
};
