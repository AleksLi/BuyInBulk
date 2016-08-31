# Module to add a custom number of configurable products to your cart 


## What to change

### In this file take:
```
app/design/frontend/base/default/template/catalog/product/view/addtocart.phtml
```
line __28__ and add: code 
```
data-hasOptions="<?php echo $hasOptionsFlag; ?>"
```
to tag of your button where you want to observe click to call popup

---
### take script in file
```
app/design/frontend/base/default/template/catalog/product/view.phtml
```
and replace it in ```view.phtml``` file in your project
```
<script type="text/javascript">
        //<![CDATA[
            var productAddToCartForm = new VarienForm('product_addtocart_form');
            productAddToCartForm.submit = function(button, url) {
                if (this.validator.validate()) {

                    if(document.getElementById('bulk_popup_create')) {
                        this.showPopupWindow();

                    } else {
                        this.submitAction();
                    }

                }
            }.bind(productAddToCartForm);

            productAddToCartForm.submitAction = function(button, url) {

                var form = this.form;
                var oldUrl = form.action;

                if (url) {
                    form.action = url;

                }

                var e = null;

                try {
                    this.form.submit();
                } catch (e) {
                }
                this.form.action = oldUrl;
                if (e) {
                    throw e;
                }

                if (button && button != 'undefined') {
                    button.disabled = true;
                }
            }.bind(productAddToCartForm);

            productAddToCartForm.submitLight = function(button, url){
                if(this.validator) {
                    var nv = Validation.methods;
                    delete Validation.methods['required-entry'];
                    delete Validation.methods['validate-one-required'];
                    delete Validation.methods['validate-one-required-by-name'];
                    // Remove custom datetime validators
                    for (var methodName in Validation.methods) {
                        if (methodName.match(/^validate-datetime-.*/i)) {
                            delete Validation.methods[methodName];
                        }
                    }

                    if (this.validator.validate()) {
                        if (url) {
                            this.form.action = url;
                        }
                        this.form.submit();
                    }
                    Object.extend(Validation.methods, nv);
                }
            }.bind(productAddToCartForm);
        //]]>
        </script>
```

---
`Hope you enjoy my work
 That is all.`