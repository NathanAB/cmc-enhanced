const HomePage = require('./HomePage');
const AutoRefresh = require('./AutoRefresh');
const CoinPage = require('./CoinPage');
const $ = require('./FakeQuery');
const Favorites = require('./Favorites');

const $tableContainer = $('.container .row .col-lg-10');
const $table = $tableContainer.querySelector('table');
const $currencyHeader = $('#currencies_wrapper table thead tr');
const $currencyRows = $('#currencies_wrapper table tbody tr');
const $currencyAllHeader = $('#currencies-all_wrapper table thead tr');
const $currencyAllRows = $('#currencies-all_wrapper table tbody tr');
const $tableCategoryTabs = $('#category-tabs');
const $coinPageTitle = $('.col-sm-4.col-md-4');
const $coinPageLinkList = $('.row .list-unstyled');


function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

// Load settings first
chrome.storage.sync.get({
  autoRefresh: 10,
  favorites: [],
  favoritesFilter: false,
}, (settings) => {
  if (inIframe()) {
    CoinPage.shrinkToChart();
    return;
  }

  Favorites.setFavorites(settings.favorites, settings.favoritesFilter);
  if (settings.autoRefresh > 0) {
    const timerContainer = document.createElement('div');
    timerContainer.className = 'auto-refresh';
    timerContainer.setAttribute('seconds', settings.autoRefresh * 60);
    timerContainer.onclick = () => {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL('options/index.html'));
      }
    };

    const timerLabel = document.createElement('div');
    timerLabel.className = 'timer-label';
    timerLabel.innerHTML = 'Refreshing&nbspin ';

    const timerTime = document.createElement('div');
    timerTime.className = 'time';
    timerContainer.appendChild(timerLabel);
    timerContainer.appendChild(timerTime);
    document.body.appendChild(timerContainer);

    AutoRefresh.setRefreshTimer(settings.autoRefresh);
  }

  // Expand the main table to fill the entire window
  $tableContainer.style.width = '100%';

  // Enhance main page currency data
  if ($table && $currencyHeader) {
    HomePage.updateMainTable($table, $currencyHeader, $currencyRows, 1);
  }

  // Enhance all page currency data
  if ($table && $currencyAllHeader) {
    HomePage.updateMainTable($table, $currencyAllHeader, $currencyAllRows, 3);
  }

  // Add the TradingView link to coin pages
  if ($coinPageTitle && $coinPageLinkList) {
    CoinPage.updateCoinPage($coinPageTitle, $coinPageLinkList);
  }

  // Add favorites filter toggle
  if ($table && $tableCategoryTabs && ($currencyHeader || $currencyAllHeader)) {
    Favorites.addFavoritesFilter($table, $tableCategoryTabs);
  }
});

