const Favorites = require('./Favorites');

let volCapSortOrder = true;
const nightTheme = true;

function sortTable(table, col, reverse) {
  const tb = table.tBodies[0];
  const reverser = -((+reverse) || -1);
  let tr = Array.prototype.slice.call(tb.rows, 0);
  let i;

  tr = tr.sort((a, b) => {
    let aVal = parseFloat(a.cells[col].textContent.trim());
    let bVal = parseFloat(b.cells[col].textContent.trim());

    aVal = isNaN(aVal) ? 0 : aVal;
    bVal = isNaN(bVal) ? 0 : bVal;

    return reverser * (aVal - bVal);
  });

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
function addNewHeader($table, $currencyHeader, columnOffset) {
  const $neighbor = $currencyHeader.children[$currencyHeader.childElementCount - columnOffset];
  const $favHeader = $currencyHeader.children[0].cloneNode(true);
  const $newColumnHeader = $neighbor.cloneNode(true);

  $newColumnHeader.className = 'sortable text-right sorting';
  $newColumnHeader.attributes['aria-label'].value = 'Vol / Cap';
  $newColumnHeader.id = 'th-vol-cap';
  $newColumnHeader.innerHTML = 'Volume / Cap';
  $newColumnHeader.addEventListener('click', () => {
    sortTable($table, $currencyHeader.childElementCount - columnOffset - 1, volCapSortOrder);
  });

  $favHeader.className = 'sortable text-right sorting';
  $favHeader.attributes['aria-label'].value = 'Favorite';
  $favHeader.id = 'th-fav';
  $favHeader.innerHTML = 'Fav.';

  $currencyHeader.insertBefore($newColumnHeader, $neighbor);
  $currencyHeader.insertBefore($favHeader, $currencyHeader.children[0]);
}

function addNewColumn($row, columnOffset) {
  const VOL_CAP_MAX = 20;
  const $neighbor = $row.children[$row.childElementCount - columnOffset];
  const cap = parseFloat($row.querySelector('.market-cap').attributes['data-usd'].value);
  const vol = parseFloat($row.querySelector('a[class="volume"]').attributes['data-usd'].value);
  const volToCap = (((vol / cap) * 100).toFixed(2));
  const volToCapStr = isNaN(volToCap) ? '?' : `${volToCap}%`;
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
  $newColumnCell.innerHTML = volToCapStr;
  $newColumnCell.style.color = colorVal;
  $newColumnCell.style.width = '112px';
  $row.insertBefore($newColumnCell, $neighbor);
}

function addFavoriteStar($row) {
  const coinName = $row.getAttribute('id').substr(3);
  const $neighbor = $row.children[0];
  const $newColumnCell = document.createElement('td');
  $newColumnCell.className = 'no-wrap text-right';
  $newColumnCell.appendChild(Favorites.createStarElem(coinName));
  $row.insertBefore($newColumnCell, $neighbor);
}

function updateMainTable($table, $currencyHeader, $currencyRows, columnOffset) {
  addNewHeader($table, $currencyHeader, columnOffset);
  for (let i = 0; i < $currencyRows.length; i += 1) {
    addNewColumn($currencyRows[i], columnOffset);
    addFavoriteStar($currencyRows[i]);
  }
}

module.exports = {
  updateMainTable,
};
