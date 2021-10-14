/*************************************************************************************/
// -->Template Name: Bootstrap Press Admin
// -->Author: Themedesigner
// -->Email: niravjoshi87@gmail.com
// -->File: datatable_advanced_init
/*************************************************************************************/

//=============================================//
//    File export                              //
//=============================================//


function format (d) {
	
	var type = d.type;
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




$("#file_export").DataTable({
  dom: "Bfrtip",
  buttons: ["copy", "csv", "excel", "pdf", "print"],
});
$(
  ".buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel"
).addClass("btn btn-primary mr-1");

//==================================================//
//  Show / hide columns dynamically                 //
//==================================================//

var table = $("#show_hide_col").DataTable({
  scrollY: "200px",
  paging: false,
});

$("a.toggle-vis").on("click", function (e) {
  e.preventDefault();

  // Get the column API object
  /*var column = table.column($(this).attr('data-column'));*/
  var column = $("#show_hide_col")
    .dataTable()
    .api()
    .column($(this).attr("data-column"));
  // Toggle the visibility
  column.visible(!column.visible());
});

//=============================================//
//    Column rendering                         //
//=============================================//
$("#col_render").DataTable({
  columnDefs: [
    {
      // The `data` parameter refers to the data for the cell (defined by the
      // `data` option, which defaults to the column being worked with, in
      // this case `data: 0`.
      render: function (data, type, row) {
        return data + " (" + row[3] + ")";
      },
      targets: 0,
    },
    { visible: false, targets: [3] },
  ],
});

//=============================================//
//     Row grouping                            //
//=============================================//
var table = $("#row_group").DataTable({
  pageLength: 10,
  columnDefs: [{ visible: false, targets: 2 }],
  order: [[2, "asc"]],
  displayLength: 25,
  drawCallback: function (settings) {
    var api = this.api();
    var rows = api.rows({ page: "current" }).nodes();
    var last = null;

    api
      .column(2, { page: "current" })
      .data()
      .each(function (group, i) {
        if (last !== group) {
          $(rows)
            .eq(i)
            .before(
              '<tr class="group"><td colspan="5">' + group + "</td></tr>"
            );

          last = group;
        }
      });
  },
});

//=============================================//
// Order by the grouping
//=============================================//
$("#row_group tbody").on("click", "tr.group", function () {
  var currentOrder = table.order()[0];
  if (currentOrder[0] === 2 && currentOrder[1] === "asc") {
    table.order([2, "desc"]).draw();
  } else {
    table.order([2, "asc"]).draw();
  }
});

//=============================================//
//    Multiple table control element           //
//=============================================//
$("#multi_control").DataTable({
  dom: '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
});

//=============================================//
//    DOM/jquery events                        //
//=============================================//

function initialize_asset_table(){
	var table = $("#dom_jq_event").DataTable({
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
		    { "data": "ticker" },
		    { "data": "portfolioPercent" },
		    { "data": "amount" },
		    { "data": "price" },
		    { "data": "profitabilityPercent" },
		    { "data": "type" },
		    {	"orderable":      false },
		    { "data": "name"},
		    { "data": "priceforone"},
		    { "data": "price_total"},
		    { "data": "currency"},
		    { "data": "profitability"},
		    { "data": "dailyProfitability"},
		    { "data": "dailyProfitabilityPercent"},
		    
		    
		],
		"order": [[2, 'asc']]
	});
}

initialize_asset_table();

function bind_table_controls(){
	console.log("here it is");
	$("#dom_jq_event tbody").on("click", "td.details-control", function () {

	  var tr = $(this).closest('tr');
		var row = table.row( tr );
	 
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



//=============================================//
//    Language File                            //
//=============================================//
$("#lang_file").DataTable({
  language: {
    url: "../../dist/js/pages/datatable/German.json",
  },
});

//=============================================//
//    Complex headers with column visibility   //
//=============================================//

$("#complex_head_col").DataTable({
  columnDefs: [
    {
      visible: false,
      targets: -1,
    },
  ],
});

//=============================================//
//    Setting defaults                         //
//=============================================//
var defaults = {
  searching: false,
  ordering: false,
};

$("#setting_defaults").dataTable($.extend(true, {}, defaults, {}));

//=============================================//
//    Footer callback                          //
//=============================================//
$("#footer_callback").DataTable({
  footerCallback: function (row, data, start, end, display) {
    var api = this.api(),
      data;

    // Remove the formatting to get integer data for summation
    var intVal = function (i) {
      return typeof i === "string"
        ? i.replace(/[\$,]/g, "") * 1
        : typeof i === "number"
        ? i
        : 0;
    };

    // Total over all pages
    total = api
      .column(4)
      .data()
      .reduce(function (a, b) {
        return intVal(a) + intVal(b);
      }, 0);

    // Total over this page
    pageTotal = api
      .column(4, { page: "current" })
      .data()
      .reduce(function (a, b) {
        return intVal(a) + intVal(b);
      }, 0);

    // Update footer
    $(api.column(4).footer()).html(
      "$" + pageTotal + " ( $" + total + " total)"
    );
  },
});

//=============================================//
//    Custom toolbar elements                  //
//=============================================//

$("#custom_tool_ele").DataTable({
  dom: '<"toolbar">frtip',
});

$("div.toolbar").html("<b>Custom tool bar! Text/images etc.</b>");

//=============================================//
//    Row created callback                     //
//=============================================//
$("#row_create_call").DataTable({
  createdRow: function (row, data, index) {
    if (data[5].replace(/[\$,]/g, "") * 1 > 150000) {
      $("td", row).eq(5).addClass("highlight");
    }
  },
});
