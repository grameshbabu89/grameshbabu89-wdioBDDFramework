const Page = require('./page');


class ProductSearchPage extends Page {
    
    get searchTxtBox () {
        return $('#search_query_top');
    }
     get searchBtn () {
        return $('button[name ="submit_search"]');
    }
    get accountlnk () {
        return $('button[name ="submit_search"]');
    }
    
}

module.exports = new ProductSearchPage();
