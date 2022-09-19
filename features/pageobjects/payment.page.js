const Page = require('./page');

class PaymentPage extends Page {
    
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
}

module.exports = new PaymentPage();
