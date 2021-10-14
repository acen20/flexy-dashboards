//initailly the data is in USD
const set_data = () => {
  var total = all_commissions["total"];
  var key = Object.keys(total)[selected_cur];
  commission['value'] = total[key];

  total = all_top_ups["total"];
  key = Object.keys(total)[selected_cur];
  cash_top_up['value'] = total[key];

  invested['value'] = cash_top_up['value'] - commission['value'];

  total = profitability["total"];
  key = Object.keys(total)[selected_cur];
  elements[3]['value'] = total[key];

  total = profitability["Monthly"];
  key = Object.keys(total)[selected_cur];
  elements[4]['value'] = total[key];

  total = profitability["Day"];
  key = Object.keys(total)[selected_cur];
  elements[5]['value'] = total[key];

  total = total_product["total"];
  total_product_element["value"] = total;
}



//on currency change
const update_costs = () => {
  set_data();
  display_costs();
}


const update_currency = (e) => {
  let symbol = e.target.innerHTML;
  selected_cur = symbols.indexOf(symbol);
  current_currency['symbol'] = symbols[selected_cur];
  update_costs();
  change_asset_currency();
  update_portfolio_total();
  update_portfolio_total_chart();
}

const update_portfolio_total = () => {
  let result = parseFloat(portfolioTotal[currencies[selected_cur]]) +
  parseFloat(remaindersTotal[currencies[selected_cur]]);
  document.querySelector('#portfolio-total').innerHTML = symbols[selected_cur]+
  result.toFixed(2);
}


const display_costs = () => {
  elements.forEach((element) => {
    let value = element['value'];
    let type = element['type'];
    let sign = value > 0 ? "+" : "-";
    let color = value > 0 ? 0 : 1;
    let cur = current_currency['symbol'];
    let percent = "";
    let precision = 2;
    if (type == "percentage"){
      percent = "%"
      cur = ""
    }
    if (!value){
      color = 2;
    }
    value = Math.abs(value);
    element['element'].innerHTML = sign + cur +
    value.toFixed(precision) + percent;
    colors.forEach((clr) => {
      element['element'].classList.remove(clr);
    })
    element['element'].classList.add(colors[color]);
  });
}
