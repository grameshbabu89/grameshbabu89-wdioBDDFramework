/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {

    get pageHeading () {
        return  $('.page-heading');
    }
    open() {
        return browser.url(`http://automationpractice.com/index.php/`);
    }
    async waitUntil(element, eleText, errorMsg) {
        await element.waitUntil(async function () {
            return (await this.getText()) === eleText
        }, {
            timeout: 10000,
            timeoutMsg: errorMsg
        });
    }
    async waitUntilTextContain(element, eleText, errorMsg) {
        await element.waitUntil(async function () {
            return (await this.getText()).includes(eleText)
        }, {
            timeout: 10000,
            timeoutMsg: errorMsg
        });
    }
}

