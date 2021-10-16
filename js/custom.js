var colors = ["text-success", "text-danger", "text-secondary"];
var currencies = ["EUR", "USD", "RUB"];
var symbols = ["€", "$", "₽"];
var selected_cur = 1;

var commission = {
  element: document.querySelector("#commission"),
  value: 0,
  type: "money",
};

var cash_top_up = {
  element: document.querySelector("#cash-top-up"),
  value: 0,
  type: "money",
};

var invested = {
  element: document.querySelector("#invested"),
  value: 0,
  type: "money",
};

var total_product_element = {
  element: document.querySelector("#total_product"),
  value: 0,
  type: "percentage",
};

var asset_rows = document.querySelectorAll("#dom_jq_event tbody tr");

var elements = [commission, cash_top_up, invested];

var profitability_elems = document.querySelectorAll("#profitability .cost");

profitability_elems.forEach((elem) => {
  elem = {
    element: elem,
    value: 0,
  };
  elements.push(elem);
});

elements.push(total_product_element);

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
