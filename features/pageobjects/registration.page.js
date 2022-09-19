const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RegistrationPage extends Page {
    /**
     * define selectors using getter methods
     */

    get selectGender () {
        return $('#id_gender1');
    }
     get enterFirstName () {
        return $('#customer_firstname');
    }
    get enterLastName () {
        return $('#customer_lastname');
    }
    get enterPassword () {
        return $('#passwd');
    }
    get address_enterFirstName() {
        return $('#firstname');
    }
    get address_enterLastName () {
        return $('#lastname');
    }
    get enterFullAddress () {
        return $('#address1');
    }
    get enterCity () {
        return $('#city');
    }
    get selectState () {
        return $('#id_state');
    }
    get enterPostcode () {
        return $('#postcode');
    }
    get enterPhoneNo () {
        return $('#phone_mobile');
    }
    get enterAlias () {
        return $('#alias');
    }
    get clickRegister () {
        return $('#submitAccount');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
  
    async newCustomerRegistration(firstname,lastname, password) {
        await this.selectGender.click();
        await this.enterFirstName.setValue(firstname);
        await this.enterLastName.setValue(lastname);
        await this.enterPassword.setValue(password);
        await this.address_enterFirstName.setValue('Ramesh');
        await this.address_enterLastName.setValue('Babu');
        await this.enterFullAddress.setValue('Laporte Avenue, United States');
        await this.enterCity.setValue('Valparaiso');
        await $('#id_state').selectByVisibleText('Indiana');
        await this.enterPostcode.setValue('00000');
        await this.enterPhoneNo.setValue('1234567890');
        await this.enterAlias.setValue('MyAddress');
        await this.clickRegister.click();
        await browser.pause(5000);
       
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

module.exports = new RegistrationPage();
