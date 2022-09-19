const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckOutPage extends Page {
    /**
     * define selectors using getter methods
     */

    get itemResults () {
        return $$('.product-container');   
    }
    get selectProduct () {
        return $(".product_img_link");  
    }
    get iframe () {
        return $('.fancybox-iframe');   
    }
    get addtocart () {
        return $('#add_to_cart button');    
    }
     get proceedToCheckout () {
        return $('a[title="Proceed to checkout"]');
    }
    get summaryCheckout () {
        return $('.cart_navigation a[title="Proceed to checkout"]');
    }
    get addressCheckout () {
        return $('[name="processAddress"]');
    }
    get termsChkbox () {
        return $('#cgv');
    }
    get shippingCheckout () {
        return $('[name="processCarrier"]');
    }


    
    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

module.exports = new CheckOutPage();
