var volCapSortOrder = true;
var $tableContainer = $('.container .row .col-lg-10');
var $table = $tableContainer.querySelector('table');
var $ads = $('#icobanner-wrapper, #leaderboard, .container .col-lg-2');
var $currencyHeader = $('#currencies_wrapper table thead tr');
var $currencyRows = $('#currencies_wrapper table tbody tr');

// Hide ads!
for (var i = 0; i < $ads.length; i++) {
	$ads[i].style.display = 'none';
}

// Expand the main table to fill the entire window
$tableContainer.style.width = '100%';

// Enhance currency data
addNewHeader($table, $currencyHeader);
for (var i = 0; i < $currencyRows.length; i++) {
	addNewColumn($currencyRows[i]);
}

// Simple $ selector
function $(q) {
	var elems = document.querySelectorAll(q);
	return elems.length === 1 ? elems[0] : elems;
}

/**
 * Adds the new header to the table.
 * @param {*}  
 * @param {*}  
 */
function addNewHeader($table, $currencyHeader) {
	var $lastHeader = $currencyHeader.lastChild;
	var $newColumnHeader = $lastHeader.cloneNode(true);
	$newColumnHeader.className = 'sortable text-right sorting';
	$newColumnHeader.attributes['aria-label'].value = 'Vol / Cap';
	$newColumnHeader.id = 'th-vol-cap';
	$newColumnHeader.innerHTML = 'Volume / Cap';
	$newColumnHeader.addEventListener('click', function() {
		sortTable($table, 7, volCapSortOrder);
	});
	$currencyHeader.insertBefore($newColumnHeader, $lastHeader);
}

function addNewColumn($row) {
	var VOL_CAP_MAX = 20;
	var $neighbor = $row.children[$row.childElementCount - 1];
	var cap = parseFloat($row.querySelector('.market-cap').attributes['data-usd'].value);
	var vol = parseFloat($row.querySelector('a[class="volume"]').attributes['data-usd'].value);
	var volToCap = ((vol / cap * 100).toFixed(2));
	var colorRatio = Math.min(volToCap, VOL_CAP_MAX) / VOL_CAP_MAX * 45;
	var colorVal = 'hsl(140, 100%, ' + colorRatio  + '%)';

	var $newColumnCell = document.createElement('td');
	$newColumnCell.className = 'no-wrap text-right';
	$newColumnCell.innerHTML = volToCap + '%';
	$newColumnCell.style.color = colorVal;
	$newColumnCell.style.width = '112px';
	$row.insertBefore($newColumnCell, $neighbor);
}

function sortTable(table, col, reverse) {
	var tb = table.tBodies[0],
			tr = Array.prototype.slice.call(tb.rows, 0),
			i;
	reverse = -((+reverse) || -1);
	tr = tr.sort(function (a, b) {
			return reverse
					* (parseFloat(a.cells[col].textContent.trim())
							 - (parseFloat(b.cells[col].textContent.trim())));
	});
	for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]);
	volCapSortOrder = !volCapSortOrder;
}