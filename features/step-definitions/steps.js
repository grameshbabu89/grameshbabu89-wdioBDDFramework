const { Given, When, Then } = require('@wdio/cucumber-framework');
const expectChai = require('chai').expect;
const LoginPage = require('../pageobjects/login.page');
const RegistrationPage = require('../pageobjects/registration.page');
const ProductSearchPage = require('../pageobjects/productSearch.page');
const CheckOutPage = require('../pageobjects/checkout.page');
const PaymentPage = require('../pageobjects/payment.page');

const pages = {
    login: LoginPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open();
    await browser.maximizeWindow();
    await LoginPage.clickSignIn.click();
 
});
When(/^I enter (.*) address to be registerd$/, async (email) => {
    await LoginPage.enterEmail.setValue(email);
    await LoginPage.createAccountBtn.click();
    const elem = await LoginPage.createAccountP;
    await expect(elem).toHaveText('CREATE AN ACCOUNT');

}); 

Then(/^I enter (.*) , (.*) , (.*) and other mandatory fields then submit$/, async (fn,ln,pw) => {
    await RegistrationPage.newCustomerRegistration(fn,ln,pw);
});

Then(/^I validate the (.*) and (.*) is displayed in the account section$/, async (fn,ln) => {
    await expect(browser).toHaveTitleContaining('My account - My Store');
    const expUsrname = fn+" "+ln;
    const actUsrname = await $('.account'); 
    await expect(actUsrname).toHaveText(expUsrname); 
});

When(/^I login with (.*) and (.*)$/, async (username, password) => {
    await LoginPage.login(username, password);
});

When(/^I search (.*) in the search box$/, async (searchKey) => {
    await ProductSearchPage.searchTxtBox.setValue(searchKey);
    await ProductSearchPage.searchBtn.click();
    await browser.pause(2000);
  
});
Then(/^I add (.*) to the cart$/, async (item) => {

    const proList= await CheckOutPage.itemResults;
    for (let i=0; i<await proList.length; i++){

        const product = await proList[i].$("h5 a");
        await product.scrollIntoView();
        const proText =await product.getText(); 
        if(item == proText){
            await proList[i].$(".product_img_link").click();
            const frame = await CheckOutPage.iframe;
            await frame.waitForExist({ timeout: 5000 })
            await browser.switchToFrame(frame);
            //add to cart
            const addtoCart = await CheckOutPage.addtocart;
            await addtoCart.waitForExist({ timeout: 5000 })
            await addtoCart.click();
            await browser.pause(5000);
            await browser.switchToParentFrame();
            break;   
        }    
    }
});  
Then(/^I proceed to checkout$/, async () => {

    //proceedCheckout
    await browser.pause(5000);
    const proceedToCheckout = await CheckOutPage.proceedToCheckout;
    await proceedToCheckout.waitForExist({ timeout: 20000 })
    await proceedToCheckout.click();
    await browser.pause(2000);

    //summaryCheckout
    const summaryCheckout = await CheckOutPage.summaryCheckout;
    await summaryCheckout.waitForExist({ timeout: 5000 });
    await summaryCheckout.click();
    await browser.pause(2000);
    
    //addressCheckout
    await CheckOutPage.addressCheckout.click();
    await browser.pause(2000);

    //terms and condions checkbox
    await CheckOutPage.termsChkbox.click();
    await browser.pause(2000);

    //shippingCheckout
    await CheckOutPage.shippingCheckout.click();
    await browser.pause(2000);

});
    
 Then(/^I verify the (.*) in the payment page$/, async (item) => {
    await browser.pause(5000);
    const items= await PaymentPage.itemsPayment;
    const proList = [];
    for (let i=0; i<await items.length; i++){
        const itemText =await items[i].getText();
        proList[i] = itemText;
    }
    const status = proList.includes(item);
    if(status) console.log("Products are available in the payment page");
    else assert.fail("Selected item is not displayed in the payment page");
   
});   
Then(/^I make payment$/, async () => {
    await browser.pause(2000);
    const isExisting = PaymentPage.paybyBankwire.isExisting();
    if(!isExisting) assert.fail("You are not in Payment page!");
    //click payment as bankwire
    await PaymentPage.paybyBankwire.scrollIntoView();
    await PaymentPage.paybyBankwire.click();
    await browser.pause(2000);
    await expect(PaymentPage.pageHeading).toHaveText('ORDER SUMMARY');
    //finally confirm my order
    await PaymentPage.confirmOrder.click();
    const confirmation = await PaymentPage.confirmation;
    await confirmation.waitForExist({ timeout: 10000 });
    await expect(PaymentPage.confirmation).toHaveTextContaining('Your order on My Store is complete');
    console.log("<--------Your order on My Store is completed-------->")

}); 

Then(/^I logout the application$/, async () => {
    await $('.logout').click(); 
    await browser.pause(2000);
    let status = await $('.account').isExisting();
    expectChai(status).to.equal(false);
    await expect(browser).toHaveTitleContaining('Login - My Store');

});

