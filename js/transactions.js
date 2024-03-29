window.onload = () => {
  setTimeout(function () {
    update_tables_currencies();
    change_asset_currency();
  }, 1500);
};

const update_currency = (e) => {
  let symbol = e.target.innerHTML;
  selected_cur = symbols.indexOf(symbol);
  current_currency["symbol"] = symbols[selected_cur];
  update_tables_currencies();
  change_asset_currency();
};

const update_tables_currencies = () => {
  let table_totals = document.querySelectorAll(".table-total");
  console.log(table_totals.length);
  table_totals[0].innerHTML =
    symbols[selected_cur] + deposits.total[currencies[selected_cur]];
  table_totals[1].innerHTML =
    symbols[selected_cur] + commissions.total[currencies[selected_cur]];
  table_totals[2].innerHTML =
    symbols[selected_cur] +
    corpactions.total.GRANDTOTAL[currencies[selected_cur]];
};

var currency_symbol = document.querySelector(".currency-symbol");
var currency_selector = document.querySelector(".currency-selector");
var currencies_ = currency_selector.children;

for (var i = 0; i < currencies_.length; i++) {
  currencies_[i].addEventListener("click", (e) => {
    update_currency(e);
    var current = currency_symbol.innerHTML;
    currency_symbol.innerHTML = e.target.innerHTML;
    e.target.innerHTML = current;
  });
}

var transactions = deposits["transactions"];
var com_transactions = commissions["transactions"];
var dividend_transactions = corpactions["transactions"];
var pageLength = 5;
var lengthMenu = [
  [5, 10, 50, -1],
  [5, 10, 50, "All"],
];

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
          <th>Type</th>
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
          <th>Type</th>
          <th>Comment</th>
          </tr>
      </tfoot>
  </table>`;
  document.querySelector("#table2-container").innerHTML = table_layout;
}

function create_table3_layout() {
  var table_layout = `  <table id="dom_jq_event3" class="w-100 table table-striped table-bordered no-wrap overflow-hidden">
      <thead>
          <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Currency</th>
          <th>Ticker</th>
          <th>Fixation Date</th>
          <th>Source Tax</th>
          <th>Source Tax Currency</th>
          <th>Comment</th>
          </tr>
      </thead>
      <tbody>
      </tbody>
      <tfoot>
          <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Currency</th>
          <th>Ticker</th>
          <th>Fixation Date</th>
          <th>Source Tax</th>
          <th>Source Tax Currency</th>
          <th>Comment</th>
          </tr>
      </tfoot>
  </table>`;
  document.querySelector("#table3-container").innerHTML = table_layout;
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
    lengthMenu: lengthMenu,
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
      { data: "type" },
      { data: "comment" },
    ],
    pageLength: pageLength,
    lengthMenu: lengthMenu,
    order: [[2, "asc"]],
    destroy: true,
  });
};

const initialize_table3 = () => {
  var _table = $("#dom_jq_event3").DataTable({
    columns: [
      { data: "date" },
      { data: "amount" },
      { data: "currency" },
      { data: "type" },
      { data: "comment" },
      { data: "ticker" },
      { data: "fixation_date" },
      { data: "src_tax" },
      { data: "src_tax_currency" },
    ],
    pageLength: pageLength,
    lengthMenu: lengthMenu,
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
    var amount = transaction[obj_price];
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
      symbols[selected_cur] +
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
  var tbody = document.querySelector("#dom_jq_event2 tbody");
  if ($.fn.dataTable.isDataTable("#dom_jq_event2")) {
    $("#dom_jq_event2").DataTable().destroy();
  }
  let iterator = 0;
  com_transactions.forEach((transaction) => {
    //currency controller
    let current_curr = String(currencies[selected_cur]);
    let obj_price = "equalIn".concat(current_curr);
    let options = { year: "numeric", month: "short", day: "numeric" };
    var date = moment(transaction["date"], "DD-MM-YYYY")
      .toDate()
      .toLocaleDateString("en-GB", options);
    var amount = transaction[obj_price];
    var currency = transaction["currency"];
    var comment = transaction["comment"];
    var type = transaction["type"];

    let item =
      `<tr id="asset-tr-` +
      iterator +
      `">
      <td>` +
      date +
      `</td>
      <td>` +
      symbols[selected_cur] +
      amount +
      `</td>
      <td>` +
      currency +
      `</td>
      <td>` +
      type +
      `</td>
      <td class="overflow-hidden text-wrap">` +
      comment +
      `</td>
  </tr>`;
    tbody.innerHTML += item;
    iterator += 1;
  });
};

const render_table3 = () => {
  document.querySelector("#dom_jq_event3").remove();
  create_table3_layout();
  var tbody = document.querySelector("#dom_jq_event3 tbody");
  if ($.fn.dataTable.isDataTable("#dom_jq_event3")) {
    $("#dom_jq_event3").DataTable().destroy();
  }
  let iterator = 0;
  dividend_transactions.forEach((transaction) => {
    //currency controller
    let current_curr = String(currencies[selected_cur]);
    let obj_price = "equalIn".concat(current_curr);
    let options = { year: "numeric", month: "short", day: "numeric" };
    var date = moment(transaction["date"], "DD-MM-YYYY")
      .toDate()
      .toLocaleDateString("en-GB", options);
    var amount = transaction[obj_price];
    var ticker = transaction["ticker"];
    var currency = transaction["currency"];
    var comment = transaction["comment"];
    var fixation_date = moment(transaction["ficsationDate"], "YYYY-MM-DD")
      .toDate()
      .toLocaleDateString("en-GB", options);
    var src_tax = transaction["sourceTax"];
    var src_tax_currency = transaction["sourceTaxCurrency"];
    var type = transaction["type"];

    let item =
      `<tr id="asset-tr-` +
      iterator +
      `">
      <td>` +
      date +
      `</td>
      <td>` +
      type +
      `</td>
      <td>` +
      symbols[selected_cur] +
      amount +
      `</td>
      <td>` +
      currency +
      `</td>
      <td>` +
      ticker +
      `</td>
      <td>` +
      fixation_date +
      `</td>
      <td>` +
      src_tax +
      `</td>
      <td>` +
      src_tax_currency +
      `</td>
      <td class="overflow-hidden text-wrap">` +
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
  initialize_table3();
};

const render_tables = () => {
  render_table1();
  render_table2();
  render_table3();
};

//function to switch currencies

const change_asset_currency = () => {
  render_tables();
  initialize_tables();
};
