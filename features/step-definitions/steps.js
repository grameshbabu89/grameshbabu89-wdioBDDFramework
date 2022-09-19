const { Given, When, Then } = require('@wdio/cucumber-framework');
const expectChai = require('chai').expect;
const LoginPage = require('../pageobjects/login.page');
const RegistrationPage = require('../pageobjects/registration.page');
const ProductSearchPage = require('../pageobjects/productSearch.page');
const CheckOutPage = require('../pageobjects/checkout.page');
const PaymentPage = require('../pageobjects/payment.page');


Given(/^I launch the application$/, async () => {
    LoginPage.open();
    await browser.maximizeWindow();
});

When(/^I am on the sign in page$/, async () => {
    await LoginPage.clickSignIn.click();
    const elem = await LoginPage.pageHeading;
    await elem.waitUntil(async function () {
        return (await this.getText()) === 'AUTHENTICATION'
    }, {
        timeout: 10000,
        timeoutMsg: 'Login page is NOT displayed.'
    });
});

When(/^I enter (.*) address to be registerd$/, async (email) => {
    await LoginPage.enterEmail.setValue(email);
    await LoginPage.createAccountBtn.click();
    await browser.pause(2000);

}); 

Then(/^I enter (.*) , (.*) , (.*) and other mandatory fields then submit$/, async (fn,ln,pw) => {
    const elem = await LoginPage.pageHeading;
    await elem.waitUntil(async function () {
        return (await this.getText()) === 'CREATE AN ACCOUNT'
    }, {
        timeout: 10000,
        timeoutMsg: 'CREATE AN ACCOUNT page is NOT displayed.'
    });
    await RegistrationPage.newCustomerRegistration(fn,ln,pw);
});

When(/^I login with (.*) and (.*)$/, async (username, password) => {
    await LoginPage.login(username, password);
    
});

Then(/^I validate the (.*) and (.*) is displayed in the account section$/, async (fn,ln) => {
    const elem = await LoginPage.pageHeading;
    await elem.waitUntil(async function () {
        return (await this.getText()) === 'MY ACCOUNT'
    }, {
        timeout: 10000,
        timeoutMsg: 'Sign in is NOT successful.'
    });
    const expUsrname = fn+" "+ln;
    const actUsrname = await $('.account'); 
    await expect(actUsrname).toHaveText(expUsrname); 
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
            const wfe = await frame.waitForExist({ timeout: 5000 });
            if(wfe){
                await browser.switchToFrame(frame);
                //add to cart
                const addtoCart = await CheckOutPage.addtocart;
                await addtoCart.waitForExist({ timeout: 10000 })
                await addtoCart.click();
                await browser.pause(5000);
                await browser.switchToParentFrame();
                break; 
            }
            //add to cart
            const addtoCart = await CheckOutPage.addtocart;
            await addtoCart.waitForExist({ timeout: 10000 })
            await addtoCart.click();
            await browser.pause(5000);
            break;   
        }    
    }
});  
Then(/^I proceed to checkout$/, async () => {
    //proceedCheckout
    const proceedToCheckout = await CheckOutPage.proceedToCheckout;
    await proceedToCheckout.waitForExist({ timeout: 10000 })
    await proceedToCheckout.click();
    
    //summaryCheckout
    const summaryCheckout = await CheckOutPage.summaryCheckout;
    await summaryCheckout.waitForExist({ timeout: 10000 });
    await summaryCheckout.click();
   
    //addressCheckout
    const addressCheckout = await CheckOutPage.addressCheckout;
    await addressCheckout.waitForExist({ timeout: 10000 });
    await addressCheckout.click();
    
    //terms and condions checkbox
    const termsChkbox = await CheckOutPage.termsChkbox;
    await termsChkbox.waitForExist({ timeout: 10000 });
    await termsChkbox.click();
    
    //shippingCheckout
    const shippingCheckout = await CheckOutPage.shippingCheckout;
    await shippingCheckout.waitForExist({ timeout: 10000 });
    await shippingCheckout.click();
    

});
    
 Then(/^I verify the (.*) in the payment page$/, async (item) => {

    const items= await PaymentPage.itemsPayment;
    await items.waitForExist({ timeout: 10000 });
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
    const paybyBankwire= await PaymentPage.paybyBankwire;
    await paybyBankwire.waitForExist({ timeout: 10000 });


    // const isExisting = PaymentPage.paybyBankwire.isExisting();
    // if(!isExisting) assert.fail("You are not in Payment page!");
    //click payment as bankwire
    await paybyBankwire.scrollIntoView();
    await paybyBankwire.click();
    await browser.pause(2000);

    const elem = await LoginPage.pageHeading;
    await elem.waitUntil(async function () {
        return (await this.getText()) === 'ORDER SUMMARY'
    }, {
        timeout: 10000,
        timeoutMsg: 'Order Summary page is NOT displayed.'
    });

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
Then(/^I close the browser$/, async () => {
    browser.closeWindow();

});
