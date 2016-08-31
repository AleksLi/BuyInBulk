/**
 * Created by AleksLi
 * <alex.litvinov@itdelight.com>
 */

//<![CDATA[
if (productAddToCartForm) {

  /**
   * Action which is using as onclick function for button ADD TO CART in popup
   */
  productAddToCartForm.popupSubmit = function() {

    //console.log('get Class');

    var calcValue = this.calcProductQty();

    if (Math.round(calcValue) === calcValue) {
      this.setProductQty(this.form, calcValue);
    }

    this.submitAction();

  };

  /**
   * Calculate quantity of products, depends on numbers in spinners
   */
  productAddToCartForm.calcProductQty = function() {

    var bulkProdTable = document.getElementById('bulk_product');

    if (bulkProdTable) {

      var calculatedResult = 0;
      jQuery(bulkProdTable).find('td.product_id').each(function(){
        var prod_id = jQuery(this).data('productid');
        var elementQty = jQuery( "#spinner_" + prod_id ).val();
        calculatedResult+= parseInt(elementQty);
      });

      return calculatedResult;
    }

  };

  /**
   * Create a standard Magento popup
   */
  productAddToCartForm.setProductQty = function(form, productQty){

    var inputQty = jQuery(form).find('#qty').first();
    return inputQty.val(productQty);
  };

  /**
   *  Create a standard Magento popup
   * @type {function(this:productAddToCartForm)}
   */
  productAddToCartForm.showPopupWindow = function() {

    oPopup = new Window({
      id:'buy_in_bulk',
      className: 'magento',
      windowClassName: "buyinbulk",
      url: null,
      width: 630,
      height: 360,
      draggable: false,
      minimizable: false,
      maximizable: false,
      showEffectOptions: {
        duration: 0.4
      },
      hideEffectOptions:{
        duration: 0.4
      },
      setDestroyOnClose: true,
      destroyOnClose: true,
      onClose: function() {
        jQuery('#bulk_table_popup').css('display', 'none');
      }
    });
    oPopup.setZIndex(100);
    oPopup.showCenter(true);
    oPopup.setContent(document.getElementById('bulk_table_popup'));

  }.bind(productAddToCartForm);

  /**
   *
   * @type {function(this:productAddToCartForm)}
   */
  productAddToCartForm.closeWindowPopup = function(){
    Windows.close('popup_window');
  }.bind(productAddToCartForm);

}
//]]>

