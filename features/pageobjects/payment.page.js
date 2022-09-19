const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class PaymentPage extends Page {
    /**
     * define selectors using getter methods
     */
     get pageHeading () {
        return $('.page-heading');   
    }
    get itemsPayment () {
        return $$('p.product-name a');   
    }
      
    //Pay by bank wire

    get paybyBankwire () {
        return $('.bankwire');
    }

    get confirmOrder () {
        return $('#cart_navigation button');
    }
    get confirmation () {
        return $('.cheque-indent');
    }
    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

module.exports = new PaymentPage();
