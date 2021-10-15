var transactions = deposits["transactions"];
var com_transactions = commissions["transactions"];
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
  var table_layout = `  <table id="dom_jq_event3" class="w-100 table table-striped table-bordered no-wrap">
      <thead>
          <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Currency</th>
          <th>Ticker</th>
          <th>Fixation Data</th>
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
          <th>Fixation Data</th>
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
    var amount = transaction["amount"];
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
  com_transactions.forEach((transaction) => {
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
    var type = transaction["type"];

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

change_asset_currency();
