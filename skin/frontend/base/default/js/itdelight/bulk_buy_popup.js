/**
 * Created by AleksLi
 * <alex.litvinov@itdelight.com>
 */

/**
 * Create a standard Magento popup
 */
jQuery( document ).ready(function() {
  var btnHasOption =  jQuery('button[data-hasoptions]');

  if (btnHasOption.length > 0) {
    if (btnHasOption.first().data('hasoptions') != 0) {
      btnHasOption.first().attr('id', 'bulk_popup_create');
    }

  }
});

/**
 * Rewrite method _createWindow to manage standard Magento table inside the popup
 */
Window.addMethods({

  _createWindow: function(id) {
    var className = this.options.className;
    var win = document.createElement("div");
    win.setAttribute('id', id);
    win.className = "dialog";
    if (this.options.windowClassName) {
      win.className += ' ' + this.options.windowClassName;
    }

    var content;
    if (this.options.url)
      content= "<iframe frameborder=\"0\" name=\"" + id + "_content\"  id=\"" + id + "_content\" src=\"" + this.options.url + "\"> </iframe>";
    else
      content ="<div id=\"" + id + "_content\" class=\"" +className + "_content\"> </div>";

    var closeDiv = this.options.closable ? "<div class='"+ className +"_close' id='"+ id +"_close' onclick='Windows.close(\""+ id +"\", event)'> </div>" : "";
    var minDiv = this.options.minimizable ? "<div class='"+ className + "_minimize' id='"+ id +"_minimize' onclick='Windows.minimize(\""+ id +"\", event)'> </div>" : "";
    var maxDiv = this.options.maximizable ? "<div class='"+ className + "_maximize' id='"+ id +"_maximize' onclick='Windows.maximize(\""+ id +"\", event)'> </div>" : "";
    var seAttributes = this.options.resizable ? "class='" + className + "_sizer' id='" + id + "_sizer'" : "class='"  + className + "_se'";
    var blank = "../themes/default/blank.gif";

    win.innerHTML = closeDiv + minDiv + maxDiv + "\
      <a href='#' id='"+ id +"_focus_anchor'><!-- --></a>\
      <div class='buyinbulk_top'>\
      <table id='"+ id +"_row1' class=\"top table_window\">\
        <tr>\
          <td class='"+ className +"_nw'></td>\
          <td class='"+ className +"_n'><div id='"+ id +"_top' class='"+ className +"_title title_window'>"+ this.options.title +"</div></td>\
          <td class='"+ className +"_ne'></td>\
        </tr>\
      </table>\
      </div>\
      <table id='"+ id +"_content' class=\"mid table_window\">\
        <tr>\
          <th class='All colors'></td>\
          <th id='"+ id +"_table_content' class='"+ className +"_content' valign='top'>" + content + "</td>\
          <th class='"+ className +"_e'></td>\
        </tr>\
        <tr>\
          <td class='"+ className +"_w'></td>\
            <td id='"+ id +"_table_content' class='"+ className +"_content' valign='top'>" + content + "</td>\
          <td class='"+ className +"_e'></td>\
        </tr>\
      </table>\
        <table id='"+ id +"_row3' class=\"bot table_window\">\
        <tr>\
          <td class='"+ className +"_sw'></td>\
            <td class='"+ className +"_s'><div id='"+ id +"_bottom' class='status_bar'><span style='float:left; width:1px; height:1px'></span></div></td>\
            <td " + seAttributes + "></td>\
        </tr>\
      </table>\
    ";
    Element.hide(win);
    this.options.parent.insertBefore(win, this.options.parent.firstChild);
    Event.observe($(id + "_content"), "load", this.options.onload);
    return win;
  }
});

/**
 * Functions to work with popups spinners.
 * Create them and set last spinner with option to manage all spinners on this row
 */
jQuery( function() {
  var bulkProdTable = jQuery( "#bulk_product");
  bulkProdTable.find('td.product_id').each(function(){
    var prod_id = jQuery(this).data('productid');
    jQuery( "#spinner_" + prod_id ).spinner({
      min:0,
      icons: { up: "ui-icon-plus", down: "ui-icon-minus"}
    }).val(0);
  });
  bulkProdTable.find('td.not_available').each(function(){
    jQuery(this).append("<div class='empty'></div>");
  });
  bulkProdTable.find('td.attribute_id').each(function(){
    var attr_id = jQuery(this).data('attrid');
    jQuery( "#spinner_row_" + attr_id ).spinner({
      min:0,
      icons: { up: "ui-icon-plus", down: "ui-icon-minus"}
    }).val(0);
  });

  jQuery("#bulk_product td").click(function(e){

    if(jQuery(this).hasClass('attribute_id')) {
      var that = jQuery(this);
      var rowId = that.data('attrid');
      var spinnerRowIdValue = jQuery('#spinner_row_'+ rowId).spinner("value");
      if(spinnerRowIdValue > 0) {

        bulkProdTable.find('.product_id[data-attrid="'+rowId+'"]').each(function(){
          var spinnerId = jQuery(this).find('input').attr('id');
          jQuery("#"+spinnerId).spinner("value", spinnerRowIdValue);
        });

      }
    }
    e.stopPropagation();
  });

} );


