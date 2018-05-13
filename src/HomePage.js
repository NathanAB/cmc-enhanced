const $ = require('jquery');

let volCapSortOrder = true;
const darkTheme = document.documentElement.classList.contains('cmce-dark');

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
  const $newColumnHeader = $neighbor.cloneNode(true);

  $newColumnHeader.className = 'sortable text-right sorting';
  $newColumnHeader.attributes['aria-label'].value = 'Vol / Cap';
  $newColumnHeader.id = 'th-vol-cap';
  $newColumnHeader.innerHTML = 'Volume / Cap';
  $newColumnHeader.addEventListener('click', () => {
    sortTable($table, $currencyHeader.childElementCount - columnOffset - 1, volCapSortOrder);
  });

  $currencyHeader.insertBefore($newColumnHeader, $neighbor);
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

  if (darkTheme) {
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

function makeRowClickable($row) {
  const coinRowId = `${$row.getAttribute('id')}_rowDetail`;
  const iframeId = `${$row.getAttribute('id')}_rowIframe`;
  const numCols = $row.getElementsByTagName('td').length;
  const href = $row.getElementsByTagName('a')[0].href;
  $row.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn') || (e.target.getAttribute('alt') === 'More')) {
      return;
    }

    const row = document.getElementById(coinRowId);
    if (row) {
      const iframe = document.getElementById(iframeId);
      if (iframe.style.display === 'none') {
        $(iframe).slideDown('slow');
      } else {
        $(iframe).slideUp('slow');
      }
    } else {
      const newRow = document.createElement('tr');
      $row.parentNode.insertBefore(newRow, $row.nextSibling);
      newRow.id = coinRowId;
      newRow.classList.add('detail-view');

      const newEl = newRow.insertCell(0);
      newEl.colSpan = numCols;
      newEl.style.position = 'relative';

      const iframe = document.createElement('iframe');
      iframe.id = iframeId;
      iframe.src = href;

      const curtain = document.createElement('div');
      curtain.className = 'detail-curtain';
      curtain.textContent = 'Loading Chart...';

      newEl.appendChild(curtain);
      newEl.appendChild(iframe);
      $(iframe).hide();
      $(iframe).slideDown('slow');

      // Arbitrary curtain timeout to allow page to load first...
      // There's probably a better way to do this.
      setTimeout(() => {
        $(curtain).fadeOut('slow');
      }, 2500);
    }
  }, false);
}

function updateMainTable($table, $currencyHeader, $currencyRows, columnOffset) {
  addNewHeader($table, $currencyHeader, columnOffset);
  for (let i = 0; i < $currencyRows.length; i += 1) {
    addNewColumn($currencyRows[i], columnOffset);
    makeRowClickable($currencyRows[i]);
  }
}

module.exports = {
  updateMainTable,
};
