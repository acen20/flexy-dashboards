//assets for table
var assets = portfolioValue["assets"];
var table = null;

function delete_table_layout(){
  document.querySelector('#dom_jq_event').remove();
}

function create_table_layout(){
  var table_layout = `  <table id="dom_jq_event" class="w-100 table table-striped table-bordered no-wrap">
      <thead>
          <tr>
              <th></th>
              <th></th>
              <th>Ticker</th>
              <th>Portfolio %</th>
              <th>Amount</th>
              <th>Current Price</th>
              <th>Profitability %</th>
              <th>Type</th>
              <th></th>
              <th class="d-none"></th>
              <th class="d-none"></th>
              <th class="d-none"></th>
              <th class="d-none"></th>
              <th class="d-none"></th>
              <th class="d-none"></th>
              <th class="d-none"></th>
          </tr>
      </thead>
      <tbody>
      </tbody>
      <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th>Ticker</th>
            <th>Portfolio %</th>
            <th>Amount</th>
            <th>Current Price</th>
            <th>Profitability %</th>
            <th>Type</th>
            <th></th>
            <th class="d-none"></th>
            <th class="d-none"></th>
            <th class="d-none"></th>
            <th class="d-none"></th>
            <th class="d-none"></th>
            <th class="d-none"></th>
            <th class="d-none"></th>
          </tr>
      </tfoot>
  </table>`
  document.querySelector('#assets-table-container').innerHTML = table_layout;
}
//binding table utilities
function format (d) {

	var type = d.type_;
	var extra = '';
	if(type == "Bonds"){
		extra =
		'<tr>'+
		    '<td>Nominal:</td>'+
		    '<td>'+'Yes'+'</td>'+
		'</tr>'+
		'<tr>'+
		    '<td>Coupon:</td>'+
		    '<td>'+'Yes'+'</td>'+
		'</tr>'+
		'<tr>'+
		    '<td>NKD:</td>'+
		    '<td>'+'No'+'</td>'+
		'</tr>';
	}


	var dailyProfitColor = d.dailyProfitability > 0?"text-success":"text-danger";
	if (!d.dailyProfitability){
		dailyProfitColor = "text-secondary";
	}

	var dailyProfitPercentColor = d.dailyProfitabilityPercent > 0?"text-success":"text-danger";
	if (!d.dailyProfitability){
		dailyProfitPercentColor = "text-secondary";
	}
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" class="bg-light  w-50 mr-auto p-4">'+
        '<tr>'+
            '<td>Name:</td>'+
            '<td>'+d.name+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Price for one:</td>'+
            '<td>'+d.priceforone+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Price total:</td>'+
            '<td>'+d.price_total+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Amount:</td>'+
            '<td>'+d.amount+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>% in portfolio:</td>'+
            '<td>'+d.portfolioPercent+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Currency:</td>'+
            '<td>'+d.currency+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Profitability %:</td>'+
            '<td>'+d.profitabilityPercent+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Profitability:</td>'+
            '<td>'+d.profitability+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Daily profitability %:</td>'+
            '<td class="'+dailyProfitPercentColor+'">'+d.dailyProfitabilityPercent+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Daily profitability:</td>'+
            '<td class="'+dailyProfitColor+'">'+d.dailyProfitability+'</td>'+
        '</tr>'+ extra +

    '</table>';
}


const initialize_asset_table = () =>{
  var _table = $("#dom_jq_event").DataTable({
		"columns": [
		    {
		        "className":      'details-control',
		        "orderable":      false,
		        "data":           null,
		        "defaultContent": ''
		    },
		    {
			"orderable":      false
		    },
		    { "data": "ticker"},
		    { "data": "portfolioPercent" },
		    { "data": "amount" },
		    { "data": "price" },
		    { "data": "profitabilityPercent" },
		    { "data": "type_" },
		    {	"orderable":      false },
		    { "data": "name"},
		    { "data": "priceforone"},
		    { "data": "price_total"},
		    { "data": "currency"},
		    { "data": "profitability"},
		    { "data": "dailyProfitability"},
		    { "data": "dailyProfitabilityPercent"},
		],
		"order": [[2, 'asc']],
    destroy: true
	});
  bind_table_controls(_table);
}

const bind_table_controls = (_table) => {
	$("#dom_jq_event tbody").on("click", "td.details-control", function () {
	  var tr = $(this).closest('tr');
		var row = _table.row( tr );
    console.log(row.data())
		if ( row.child.isShown() ) {
		    // This row is already open - close it
		    row.child.hide();
		    tr.removeClass('shown');
		}
		else {
		    // Open this row
		    row.child( format(row.data()) ).show();
		    tr.addClass('shown');
		}

	});
}

//binding all price elements

const render_asset_table = () => {
  delete_table_layout();
  create_table_layout();
  var tbody = document.querySelector('tbody');
  if ($.fn.dataTable.isDataTable('#dom_jq_event')) {
        $('#dom_jq_event').DataTable().destroy();
    }
  let iterator = 0;
  assets.forEach((asset) => {

  //currency controller
  let current_curr = String(currencies[selected_cur]);
  let obj_price = 'equalIn'.concat(current_curr);

  var ticker = asset['ticker'];
  var portfolioPercent = asset['portfolioPercent'].toFixed(2)
  var amount = asset['amount'];
  var profitabilityPercent = 89;
  var profitability = 76;
  var price = asset[obj_price];
  var ticker = asset['ticker'];
  var priceforone = 100;
  var price_total = price;
  var type = asset['type'];
  if (type == "STOCK:ETF"){
    type = "ETF";
  }
  else if (type.includes('BOND:')) {
    type = "Bonds";
  }
  else{
    type = "Stock";
  }
  var img = "https://invest-brands.cdn-tinkoff.ru/US88160R1014x640.png";
  var profitabilityPercentColor = profitabilityPercent > 0 ? "text-success": "text-danger";
  if (!profitabilityPercent){
    profitabilityPercentColor = "text-secondary"
  }
  var currency = asset['currency'];
  var dailyProfitabilityPercent = profitabilityPercent;
  var dailyProfitability = -208.3;

  let item = `<tr id="asset-tr-`+iterator+`">
    <td class="details-control"></td>
    <td style="text-align:center">
      <img class="company-logo" src="`+img+`" alt="`+ticker+`">
    </td>
      <td>`+ticker+`</td>
      <td>`+portfolioPercent+`</td>
      <td>`+amount+`</td>
      <td class="asset-price">`+symbols[selected_cur]+price+`</td>
      <td class="`+profitabilityPercentColor+`">`+profitabilityPercent+`</td>
      <td>`+type+`</td>
      <td class="p-0 m-0 py-1">
        <div class="stylize bg-light py-2 px-3 d-flex flex-column align-items-start">
          <div class="upper">
            <img class="company-logo small" src="https://invest-brands.cdn-tinkoff.ru/US88160R1014x640.png" alt="">
            <p class="p-0 m-0 font-weight-light">`+ticker+`</p>
          </div>
          <div class="lower">
            <div class="d-flex">
              <i class="fas fa-layer-group"></i>
              <p class="p-0 m-0 ml-2">`+amount+`</p>
            </div>
            <div class="d-flex">
              <i class="fas fa-chart-pie"></i>
              <p class="p-0 m-0 ml-2 asset-percent">`+portfolioPercent+`%</p>
            </div>
          </div>
        </div>
      </td>
      <td hidden>`+ticker+`</td>
      <td class="asset-value" hidden>`+priceforone+`</td>
      <td class="asset-value" hidden>`+symbols[selected_cur]+price_total+`</td>
      <td class="asset-currency" hidden>`+currency+`</td>
      <td hidden>`+profitability+`</td>
      <td hidden>`+dailyProfitability+`</td>
      <td hidden>`+dailyProfitabilityPercent+`</td>
  </tr>`;
  tbody.innerHTML += item;
  iterator += 1;
});

  initialize_asset_table();
}

//function to switch currencies

const change_asset_currency = () => {
  render_asset_table();
}
change_asset_currency();
