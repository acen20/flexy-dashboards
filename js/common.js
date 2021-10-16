let logo_path = "static/checkinvest-logo-new.png";
document.querySelector(".title-icon").setAttribute("href", logo_path);
document.querySelector(".site-logo").setAttribute("src", logo_path);
var currencies = ["EUR", "USD", "RUB"];
var symbols = ["€", "$", "₽"];
var selected_cur = 1;

var current_currency = {
  abbr: currencies[selected_cur],
  symbol: symbols[selected_cur],
};
