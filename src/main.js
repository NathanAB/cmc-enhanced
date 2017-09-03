let volCapSortOrder = true;
let nightTheme = true;

// Simple $ selector, who needs jQuery anyway?
function $(q) {
  const elems = document.querySelectorAll(q);
  if (elems.length) {
    return elems.length === 1 ? elems[0] : elems;
  }
  return false;
}

function sortTable(table, col, reverse) {
  const tb = table.tBodies[0];
  const reverser = -((+reverse) || -1);
  let tr = Array.prototype.slice.call(tb.rows, 0);
  let i;

  tr = tr.sort((a, b) => reverser
  * (parseFloat(a.cells[col].textContent.trim())
  - (parseFloat(b.cells[col].textContent.trim()))));

  for (i = 0; i < tr.length; i += 1) {
    tb.appendChild(tr[i]);
  }

  volCapSortOrder = !volCapSortOrder;
}

/**
 * Adds the new header to the table.
 * @param {*}  
 * @param {*}  
 */
function addNewHeader($table, $currencyHeader) {
  const $lastHeader = $currencyHeader.lastChild;
  const $newColumnHeader = $lastHeader.cloneNode(true);
  $newColumnHeader.className = 'sortable text-right sorting';
  $newColumnHeader.attributes['aria-label'].value = 'Vol / Cap';
  $newColumnHeader.id = 'th-vol-cap';
  $newColumnHeader.innerHTML = 'Volume / Cap';
  $newColumnHeader.addEventListener('click', () => {
    sortTable($table, 7, volCapSortOrder);
  });
  $currencyHeader.insertBefore($newColumnHeader, $lastHeader);
}

function addNewColumn($row) {
  const VOL_CAP_MAX = 20;
  const $neighbor = $row.children[$row.childElementCount - 1];
  const cap = parseFloat($row.querySelector('.market-cap').attributes['data-usd'].value);
  const vol = parseFloat($row.querySelector('a[class="volume"]').attributes['data-usd'].value);
  const volToCap = (((vol / cap) * 100).toFixed(2));
  let colorRatio;
  let alpha;

  if (nightTheme) {
    colorRatio = 100 - ((Math.min(volToCap, VOL_CAP_MAX) / VOL_CAP_MAX) * 45);
    alpha = 0.8;
  } else {
    colorRatio = (Math.min(volToCap, VOL_CAP_MAX) / VOL_CAP_MAX) * 45;
    alpha = 1;
  }

  const colorVal = `hsla(140, 100%, ${colorRatio}%, ${alpha})`;

  const $newColumnCell = document.createElement('td');
  $newColumnCell.className = 'no-wrap text-right';
  $newColumnCell.innerHTML = `${volToCap}%`;
  $newColumnCell.style.color = colorVal;
  $newColumnCell.style.width = '112px';
  $row.insertBefore($newColumnCell, $neighbor);
}

/*
chrome.storage.sync.get({
  useNightTheme: true,
}, (settings) => {
  if (settings.useNightTheme) {
    $('body').className += ' cmc-enhanced-night';
    nightTheme = true;
  }
});
*/

const $tableContainer = $('.container .row .col-lg-10');
const $table = $tableContainer.querySelector('table');
const $currencyHeader = $('#currencies_wrapper table thead tr');
const $currencyRows = $('#currencies_wrapper table tbody tr');
const $coinPageTitle = $('.col-xs-6.col-sm-4.col-md-4');
const $coinPageLinkList = $('.col-xs-4.col-sm-4 .list-unstyled');

// Expand the main table to fill the entire window
$tableContainer.style.width = '100%';

// Enhance currency data
if ($table && $currencyHeader) {
  addNewHeader($table, $currencyHeader);
  for (let i = 0; i < $currencyRows.length; i += 1) {
    addNewColumn($currencyRows[i]);
  }
}

// Add the TradingView link to coin pages
if ($coinPageTitle && $coinPageLinkList) {
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
