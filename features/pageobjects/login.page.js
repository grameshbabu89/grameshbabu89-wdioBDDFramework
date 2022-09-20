const Page = require('./page');

class LoginPage extends Page {


    get clickSignIn() {
        return $('.login');
    }
    // To register a new customer
    get enterEmail() {
        return $('#email_create');
    }
    get createAccountBtn() {
        return $('#SubmitCreate');
    }
    // Already registered customer
    get inputUsername() {
        return $('#email');
    }
    get inputPassword() {
        return $('#passwd');
    }

    get btnSubmit() {
        return $('#SubmitLogin');
    }

    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
        await browser.pause(3000);

    }
}

module.exports = new LoginPage();
