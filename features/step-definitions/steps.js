const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../pageobjects/login.page');
const RegistrationPage = require('../pageobjects/registration.page');
const ProductSearchPage = require('../pageobjects/productSearch.page');
const CheckOutPage = require('../pageobjects/checkout.page');
const PaymentPage = require('../pageobjects/payment.page');
const MyAccountPage = require('../pageobjects/myAccount.page');
const expectChai = require('chai').expect;


Given(/^I launch the application$/, async () => {
    await LoginPage.open();
    await browser.maximizeWindow();

});

When(/^I am on the sign in page$/, async () => {
    await LoginPage.clickSignIn.click();

});

When(/^I enter (.*) address to be registerd$/, async (email) => {
    const pageHeading = await LoginPage.pageHeading;
    await LoginPage.waitUntil(pageHeading, 'AUTHENTICATION', 'Login page was NOT displayed.');
    await LoginPage.enterEmail.setValue(email);
    await LoginPage.createAccountBtn.click();
    await browser.pause(2000);

});

Then(/^I enter (.*) , (.*) , (.*) and other mandatory fields then submit$/, async (fn, ln, pw) => {
    const pageHeading = await LoginPage.pageHeading;
    await LoginPage.waitUntil(pageHeading, 'CREATE AN ACCOUNT', 'CREATE AN ACCOUNT page is NOT displayed.');
    await RegistrationPage.newCustomerRegistration(fn, ln, pw);
});

When(/^I login with (.*) and (.*)$/, async (username, password) => {
    await LoginPage.login(username, password);

});

Then(/^I validate the (.*) and (.*) is displayed in the account section$/, async (fn, ln) => {
    const pageHeading = await LoginPage.pageHeading;
    await LoginPage.waitUntil(pageHeading, 'MY ACCOUNT', 'Sign in was NOT successful.');
    const expUsrname = fn + " " + ln;
    const actUsrname = await MyAccountPage.username;
    await expect(actUsrname).toHaveText(expUsrname);
    const homebtn =await MyAccountPage.homeBtn
    await homebtn.click();
    await homebtn.waitForExist({ reverse: true });
});

When(/^I search (.*) in the search box$/, async (searchKey) => {
    await ProductSearchPage.searchTxtBox.setValue(searchKey);
    await ProductSearchPage.searchBtn.click();
    await browser.pause(2000);

});
Then(/^I add (.*) to the cart$/, async (item) => {
    const proList = await CheckOutPage.itemResults;
    for (let i = 0; i < await proList.length; i++) {
        const product = await proList[i].$("h5 a");
        await product.scrollIntoView();
        const proText = await product.getText();
        if (item == proText) {
            await product.click();
            //add to cart
            const addtoCart = await CheckOutPage.addtocart;
            await addtoCart.waitForExist({ timeout: 10000 })
            await addtoCart.click();
            await browser.pause(5000);
            break;
        }
    }
});
Then(/^I continue shopping$/, async () => {
    
    const continueShopping = await CheckOutPage.continueShopping;
    await continueShopping.waitForExist({ timeout: 10000 });
    await continueShopping.click();
    await browser.pause(2000);
});

Then(/^I proceed to checkout$/, async () => {
    //proceedCheckout
    const proceedToCheckout = await CheckOutPage.proceedToCheckout;
    const pageHeading = await CheckOutPage.pageHeading;
    await proceedToCheckout.waitForExist({ timeout: 10000 });
    await proceedToCheckout.click();

    //summaryCheckout
    await CheckOutPage.waitUntilTextContain(pageHeading, 'SHOPPING-CART SUMMARY', 'You are NOT in SHOPPING-CART SUMMARY page');
    const summaryCheckout = await CheckOutPage.summaryCheckout;
    await summaryCheckout.click();

    //addressCheckout
    await CheckOutPage.waitUntil(pageHeading, 'ADDRESSES', 'You are NOT in ADDRESSES page');
    await CheckOutPage.addressCheckout.click();
   
    //shippingCheckout
    await CheckOutPage.waitUntil(pageHeading, 'SHIPPING', 'You are NOT in SHIPPING page');
    const termsChkbox = await CheckOutPage.termsChkbox;
    const shippingCheckout = await CheckOutPage.shippingCheckout;
    await termsChkbox.click();
    await browser.pause(2000);
    await shippingCheckout.click();

});

Then(/^I verify the (.*) in the payment page$/, async (item) => {

    const pageHeading = await PaymentPage.pageHeading;
    await PaymentPage.waitUntil(pageHeading, 'PLEASE CHOOSE YOUR PAYMENT METHOD', 'You are NOT in PAYMENT page ')

    const items = await PaymentPage.itemsPayment;
    const proList = [];
    for (let i = 0; i < await items.length; i++) {
        const itemText = await items[i].getText();
        proList[i] = itemText;
    }
    const status = proList.includes(item);
    if (!status) console.log("Selected item was NOT displayed in the payment page");
    expectChai(status).to.equal(true);
    
});
Then(/^I make payment$/, async () => {
    await browser.pause(2000);
    const paybyBankwire = await PaymentPage.paybyBankwire;
    await paybyBankwire.waitForExist({ timeout: 10000 });

    //click payment as bankwire
    await paybyBankwire.scrollIntoView();
    await paybyBankwire.click();
    await browser.pause(2000);

    const pageHeading = await PaymentPage.pageHeading;
    await PaymentPage.waitUntil(pageHeading, 'ORDER SUMMARY', 'You are NOT in ORDER SUMMARY page ')

    //finally confirm my order
    await PaymentPage.confirmOrder.click();
    const confirmation = await PaymentPage.confirmation;
    await confirmation.waitForExist({ timeout: 10000 });
    await expect(PaymentPage.confirmation).toHaveTextContaining('Your order on My Store is complete');
    console.log("<--------Your order on My Store is completed-------->")

});

Then(/^I logout the application$/, async () => {
    const logout = await MyAccountPage.logout
    await logout.click();
    await logout.waitForExist({ reverse: true });
    const isExisting = await logout.isExisting();
    expectChai(isExisting).to.equal(false);
    

});
Then(/^I close the browser$/, async () => {
    browser.closeWindow();

});
