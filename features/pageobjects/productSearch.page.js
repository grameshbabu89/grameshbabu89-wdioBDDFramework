const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductSearchPage extends Page {
    /**
     * define selectors using getter methods
     */

    get searchTxtBox () {
        return $('#search_query_top');
    }
     get searchBtn () {
        return $('button[name ="submit_search"]');
    }
    

    
    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

module.exports = new ProductSearchPage();
