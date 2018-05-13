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

function shrinkToChart() {
  document.body.style.overflow = 'hidden';
  const divEls = document.querySelectorAll('div, nav');
  for (let i = 0; i < divEls.length; i += 1) {
    divEls[i].style.display = 'none';
  }

  let chartEl = document.getElementsByClassName('highcharts-container')[0];
  chartEl.style.display = 'block';
  while (chartEl.parentElement) {
    chartEl = chartEl.parentElement;
    chartEl.style.display = 'block';
  }
}

module.exports = {
  updateCoinPage,
  shrinkToChart,
};
