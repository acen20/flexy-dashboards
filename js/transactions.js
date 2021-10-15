var assets = portfolioValue["assets"];

function create_table1_layout(){
  var table_layout = `  <table id="dom_jq_event1" class="w-100 table table-striped table-bordered no-wrap">
      <thead>
          <tr>
          <th>Ticker</th>
          <th>Portfolio %</th>
          <th>Amount</th>
          <th>Current Price</th>
          </tr>
      </thead>
      <tbody>
      </tbody>
      <tfoot>
          <tr>
            <th>Ticker</th>
            <th>Portfolio %</th>
            <th>Amount</th>
            <th>Current Price</th>
          </tr>
      </tfoot>
  </table>`
  document.querySelector('#table1-container').innerHTML = table_layout;
}

const initialize_table1 = () =>{
  var _table = $("#dom_jq_event1").DataTable({
		"columns": [
		    { "data": "date"},
		    { "data": "amount" },
		    { "data": "currency" },
		    { "data": "comment" },
		],
		"order": [[2, 'asc']],
    destroy: true
	});
}

const render_table1 = () => {
  document.querySelector('#dom_jq_event1').remove();
  create_table1_layout();
  var tbody = document.querySelector('tbody');
  if ($.fn.dataTable.isDataTable('#dom_jq_event1')) {
        $('#dom_jq_event1').DataTable().destroy();
    }
  let iterator = 0;
  assets.forEach((asset) => {

  //currency controller
  let current_curr = String(currencies[selected_cur]);
  let obj_price = 'equalIn'.concat(current_curr);

  var date = asset['date']
  var amount = asset['amount'];
  var currency = asset['currency'];

  let item = `<tr id="asset-tr-`+iterator+`">
      <td>`+ticker+`</td>
      <td>`+portfolioPercent+`</td>
      <td>`+amount+`</td>
      <td>`+type+`</td>
  </tr>`;
  tbody.innerHTML += item;
  iterator += 1;
});
}

const initialize_tables = () =>{
  initialize_table1();
}

const render_tables = () =>{
  render_table1();
}

//function to switch currencies

const change_asset_currency = () => {
  render_tables();
  initialize_tables();
}

change_asset_currency();
