var transactions = deposits["transactions"];
var com_transactions = commissions["transactions"];
var pageLength = 5;

function create_table1_layout() {
  var table_layout = `  <table id="dom_jq_event1" class="w-100 table table-striped table-bordered no-wrap">
      <thead>
          <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Currency</th>
          <th>Comment</th>
          </tr>
      </thead>
      <tbody>
      </tbody>
      <tfoot>
          <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Currency</th>
          <th>Comment</th>
          </tr>
      </tfoot>
  </table>`;
  document.querySelector("#table1-container").innerHTML = table_layout;
}

function create_table2_layout() {
  var table_layout = `  <table id="dom_jq_event2" class="w-100 table table-striped table-bordered no-wrap">
      <thead>
          <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Currency</th>
          <th>Comment</th>
          <th>Comment</th>
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
            <th>Comment</th>
          </tr>
      </tfoot>
  </table>`;
  document.querySelector("#table2-container").innerHTML = table_layout;
}

const initialize_table1 = () => {
  var _table = $("#dom_jq_event1").DataTable({
    columns: [
      { data: "date" },
      { data: "amount" },
      { data: "currency" },
      { data: "comment" },
    ],
    pageLength: 5,
    order: [[2, "asc"]],
    destroy: true,
  });
};

const initialize_table2 = () => {
  var _table = $("#dom_jq_event2").DataTable({
    columns: [
      { data: "date" },
      { data: "amount" },
      { data: "currency" },
      { data: "comment" },
      { data: "comment" },
    ],
    pageLength: pageLength,
    order: [[2, "asc"]],
    destroy: true,
  });
};

const render_table1 = () => {
  document.querySelector("#dom_jq_event1").remove();
  create_table1_layout();
  var tbody = document.querySelector("tbody");
  if ($.fn.dataTable.isDataTable("#dom_jq_event1")) {
    $("#dom_jq_event1").DataTable().destroy();
  }
  let iterator = 0;
  transactions.forEach((transaction) => {
    //currency controller
    let current_curr = String(currencies[selected_cur]);
    let obj_price = "equalIn".concat(current_curr);
    let options = { year: "numeric", month: "short", day: "numeric" };
    var date = moment(transaction["date"], "DD-MM-YYYY")
      .toDate()
      .toLocaleDateString("en-GB", options);
    var amount = transaction["amount"];
    var currency = transaction["currency"];
    var comment = transaction["comment"];

    let item =
      `<tr id="asset-tr-` +
      iterator +
      `">
      <td>` +
      date +
      `</td>
      <td>` +
      amount +
      `</td>
      <td>` +
      currency +
      `</td>
      <td>` +
      comment +
      `</td>
  </tr>`;
    tbody.innerHTML += item;
    iterator += 1;
  });
};

const render_table2 = () => {
  document.querySelector("#dom_jq_event2").remove();
  create_table2_layout();
  var tbody = document.querySelector("tbody");
  if ($.fn.dataTable.isDataTable("#dom_jq_event1")) {
    $("#dom_jq_event1").DataTable().destroy();
  }
  let iterator = 0;
  transactions.forEach((transaction) => {
    //currency controller
    let current_curr = String(currencies[selected_cur]);
    let obj_price = "equalIn".concat(current_curr);
    let options = { year: "numeric", month: "short", day: "numeric" };
    var date = moment(transaction["date"], "DD-MM-YYYY")
      .toDate()
      .toLocaleDateString("en-GB", options);
    var amount = transaction["amount"];
    var currency = transaction["currency"];
    var comment = transaction["comment"];

    let item =
      `<tr id="asset-tr-` +
      iterator +
      `">
      <td>` +
      date +
      `</td>
      <td>` +
      amount +
      `</td>
      <td>` +
      currency +
      `</td>
      <td>` +
      type +
      `</td>
      <td>` +
      comment +
      `</td>
  </tr>`;
    tbody.innerHTML += item;
    iterator += 1;
  });
};

const initialize_tables = () => {
  initialize_table1();
  initialize_table2();
};

const render_tables = () => {
  render_table1();
  render_table2();
};

//function to switch currencies

const change_asset_currency = () => {
  render_tables();
  initialize_tables();
};

change_asset_currency();
