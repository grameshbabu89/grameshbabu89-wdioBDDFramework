# wdioBDDFramework
e2e test framework using WDIO-BDD
# Requirements:
- Node version 14 or higher
- Visual code studio
# Quick start
Download the latest stable release here or clone the git repo — git clone https://github.com/grameshbabu89/wdioBDDFramework.git

Then, Install the dependencies 
    
    npm install

Now you are ready to write your own features.

# Features
- Super simple setup
- Full integration with WebdriverIO
- Integrated with Allure report
# How to write a test
Tests are written in Gherkin syntax that means that you write down what's supposed to happen in a real language. 

All test files are located in ./features/* and have the file ending .feature. 

You will already find some test files in that directory. They should demonstrate, how tests could look like. Just create a new file and write your first test.

Sample site : http://automationpractice.com/index.php

1_Registration.feature

    Feature: New user registration
  
    Scenario Outline: As a user, I should be able to register as a new customer
  
      Given I am on the login page
      When I enter <email> address to be registerd
      When I enter <firstname> , <lastname> , <password> and other mandatory fields then submit
      Then I validate the <firstname> and <lastname> is displayed in the account section
      Then I logout the application

    Examples:
      | email                 | firstname | lastname | password |
      | wdiotesting2@test.com | David     | Sachin   | Testing  |

    Scenario: Another test
      Given ...
      
# How to run the test:

To run your tests just call the WDIO runner:

    $ npm run wdio
  
Make sure you have added the script in the package.json as below
  
    "scripts": {
        "wdio": "wdio run wdio.conf.js" }

Please note The WDIO runner uses the configuration file wdio.conf.js by default.
Define feature and step definition path in the configuration file.
  
    specs: [
        './features/**/*.feature'
    ]
    
    cucumberOpts: {
        require: ['./features/step-definitions/*.js']

# Report:
Specify the report location in the config file.

    reporters: ['spec',['allure', 
            {
                outputDir: 'allure-results'  
            }]]

An Allure report will be generated after execution is completed.

    ./allure-report/index.html
    
![image](https://user-images.githubusercontent.com/21173436/190952992-0835f0f6-1e8f-41b9-b660-88701f57a4ce.png)





