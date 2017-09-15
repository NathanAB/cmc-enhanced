const HomePage = require('./HomePage');
const CoinPage = require('./CoinPage');
const $ = require('./FakeQuery');

const $tableContainer = $('.container .row .col-lg-10');
const $table = $tableContainer.querySelector('table');
const $currencyHeader = $('#currencies_wrapper table thead tr');
const $currencyRows = $('#currencies_wrapper table tbody tr');
const $coinPageTitle = $('.col-xs-6.col-sm-4.col-md-4');
const $coinPageLinkList = $('.col-xs-4.col-sm-4 .list-unstyled');

// Expand the main table to fill the entire window
$tableContainer.style.width = '100%';

// Enhance main page currency data
if ($table && $currencyHeader) {
  HomePage.updateMainTable($table, $currencyHeader, $currencyRows);
}

// Add the TradingView link to coin pages
if ($coinPageTitle && $coinPageLinkList) {
  CoinPage.updateCoinPage($coinPageTitle, $coinPageLinkList);
}
