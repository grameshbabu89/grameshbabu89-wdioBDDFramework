const Page = require('./page');


class MyAccountPage extends Page {
    
    get username () {
        return $('.account')
    }
    get homeBtn () {
        return $('a[title="Home"]');
    }
    get logout () {
        return $('.logout')
    }
    
}

module.exports = new MyAccountPage();
