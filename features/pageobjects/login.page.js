const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */

    get clickSignIn () {
        return $('.login');
    }
    // To register a new customer
    get enterEmail () {
        return $('#email_create');
    }
    
    get createAccountBtn () {
        return $('#SubmitCreate');
    }
    // Already registered customer
    get inputUsername () {
        return $('#email');
    }
    get inputPassword () {
        return $('#passwd');
    }

    get btnSubmit () {
        return $('#SubmitLogin');
    }
    get createAccountP () {
        return  $('.page-heading');
    }
   

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
        await browser.pause(3000);
        await expect(browser).toHaveTitle('My account - My Store')
        
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open();      
    }
}

module.exports = new LoginPage();
