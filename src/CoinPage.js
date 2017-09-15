function updateCoinPage($coinPageTitle, $coinPageLinkList) {
  const coinAbbr = $coinPageTitle.querySelector('small').textContent.slice(1, -1);
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
}

module.exports = {
  updateCoinPage,
};
