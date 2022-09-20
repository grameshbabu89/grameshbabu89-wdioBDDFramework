const Page = require('./page');

class CheckOutPage extends Page {
   
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
    get continueShopping () {
        return $('span[title="Continue shopping"]');
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

}

module.exports = new CheckOutPage();
