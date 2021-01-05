/*
 *  Document   : op_auth_signin.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Sign In Page
 */

var opValidateProduct = function() {
    // Init Sign In Form Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
    var initValidateProduct = function(){
        jQuery('#newProductForm').validate({
            errorClass: 'invalid-feedback animated fadeInDown',
            errorElement: 'div',
            errorPlacement: function(error, e) {
                jQuery(e).parents('.form-group > div').append(error);
            },
            highlight: function(e) {
                jQuery(e).closest('.form-group').removeClass('is-invalid').addClass('is-invalid');
            },
            success: function(e) {
                jQuery(e).closest('.form-group').removeClass('is-invalid');
                jQuery(e).remove();
            },
            rules: {
                'product-name': {
                    required: true
                }
            },
            messages: {
                'product-name': {
                    required: "Please enter product's name"
                }
            },
            submitHandler: Product.handleFormSubmit
        });
    };

    return {
        init: function () {
            // Init Sign In Form Validation
            initValidateProduct();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ opValidateProduct.init(); });