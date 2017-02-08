var assert = require('assert');

var mainUrl = 'https://mip-dev.onlini.co/';
var email = 'anton.vozghrin@onlini.co';
var password = 'cometaChurumova75';
function makeRandomString(){
    var result = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$&";

    for( var i=0; i < Math.floor(Math.random()*10); i++ )
        result += possible.charAt(Math.floor(Math.random() * possible.length));

    return result;
}

function findErrorMessage(selector){
				if(browser.isVisible(selector)){
					return browser.getText(selector);
				}
				else {
					findErrorMessage(selector);
				}
			};

	describe('LOGIN TESTS', function() {
		beforeEach(function(){
			browser.url(mainUrl); 
		});
		it('with incorrect password', function () {
			var emailField = browser.element('[name="Email"]'); 
			var passwordField = browser.element('[name="Password"]');
			var loginButton = browser.element('[value="Log in"]');
			emailField.setValue(email);
			passwordField.setValue(makeRandomString()); 
			loginButton.submitForm();
			var errorMessage = findErrorMessage('span*=Invalid');
			assert.equal(errorMessage, 'Invalid login attempt.');
		});
		it('with empty password', function () {
			var emailField = browser.element('[name="Email"]');
			var passwordField = browser.element('[name="Password"]');
			var loginButton = browser.element('[value="Log in"]'); 
			emailField.setValue(email);
			passwordField.setValue(''); 
			loginButton.submitForm(); 
			browser.waitForVisible('span*=Password'); 
			var errorMessage = browser.element('span*=Password').getText(); 
			assert.equal(errorMessage, 'The Password field is required.');
		});
		it('with empty email', function () {
			var emailField = browser.element('[name="Email"]');
			var passwordField = browser.element('[name="Password"]');
			var loginButton = browser.element('[value="Log in"]');
			emailField.setValue('');
			passwordField.setValue(password);
			loginButton.submitForm();
			browser.waitForVisible('span*=The Email');
			var errorMessage = browser.element('span*=The Email').getText(); 
			assert.equal(errorMessage, 'The Email field is required.');
		});
		it('with empty email and password', function () {
			var emailField = browser.element('[name="Email"]');
			var passwordField = browser.element('[name="Password"]');
			var loginButton = browser.element('[value="Log in"]');
			emailField.setValue('');
			passwordField.setValue('');
			loginButton.submitForm();
			browser.waitForVisible('span*=The Email');
			browser.waitForVisible('span*=The Password');
			function getErrors(){
				var errorMessageBoth=[];
				var errorMessageEmail = browser.element('span*=The Email').getText();
				var errorMessagePassword = browser.element('span*=The Password').getText();
				errorMessageBoth.push(errorMessageEmail, errorMessagePassword);
				return errorMessageBoth;
			};
			var errors = getErrors();
			assert.deepEqual(errors, ['The Email field is required.','The Password field is required.']);
		});
		it('with email @asd.asd', function () {
			var emailField = browser.element('[name="Email"]'); 
			var passwordField = browser.element('[name="Password"]');
			var loginButton = browser.element('[value="Log in"]');
			emailField.setValue('@onlini.co'); 
			passwordField.setValue(password);
			loginButton.submitForm();
			browser.waitForVisible('span*=The Email field is not a valid e-mail address.');
			var errorMessage = browser.element('span*=The Email field is not a valid e-mail address.').getText(); 
			assert.equal(errorMessage, 'The Email field is not a valid e-mail address.'); 
		});
		it('with email asdasd.asd', function () {
			var emailField = browser.element('[name="Email"]'); 
			var passwordField = browser.element('[name="Password"]');
			var loginButton = browser.element('[value="Log in"]');
			emailField.setValue('anton.vozghrinonlini.co'); 
			passwordField.setValue(password);
			loginButton.submitForm();
			browser.waitForVisible('span*=The Email field is not a valid e-mail address.');
			var errorMessage = browser.element('span*=The Email field is not a valid e-mail address.').getText(); 
			assert.equal(errorMessage, 'The Email field is not a valid e-mail address.'); 
		});
		it('with email asd@.asd', function () {
			var emailField = browser.element('[name="Email"]'); 
			var passwordField = browser.element('[name="Password"]');
			var loginButton = browser.element('[value="Log in"]');
			emailField.setValue('anton.vozghrin@.co'); 
			passwordField.setValue(password);
			loginButton.submitForm();
			browser.waitForVisible('span*=The Email field is not a valid e-mail address.');
			var errorMessage = browser.element('span*=The Email field is not a valid e-mail address.').getText(); 
			assert.equal(errorMessage, 'The Email field is not a valid e-mail address.'); 
		});
		it('with email asd@asdasd', function () {
			var emailField = browser.element('[name="Email"]'); 
			var passwordField = browser.element('[name="Password"]');
			var loginButton = browser.element('[value="Log in"]');
			emailField.setValue('anton.vozghrin@onlinico'); 
			passwordField.setValue(password);
			loginButton.submitForm();
			browser.waitForVisible('span*=The Email field is not a valid e-mail address.');
			var errorMessage = browser.element('span*=The Email field is not a valid e-mail address.').getText(); 
			assert.equal(errorMessage, 'The Email field is not a valid e-mail address.'); 
		});
		it('with email asd@asd.', function () { 
			var emailField = browser.element('[name="Email"]'); 
			var passwordField = browser.element('[name="Password"]');
			var loginButton = browser.element('[value="Log in"]');
			emailField.setValue('anton.vozghrin@onlini.'); 
			passwordField.setValue(password);
			loginButton.submitForm();
			browser.waitForVisible('span*=The Email field is not a valid e-mail address.');
			var errorMessage = browser.element('span*=The Email field is not a valid e-mail address.').getText(); 
			assert.equal(errorMessage, 'The Email field is not a valid e-mail address.'); 
		});
		it('login', function(){
			var emailField = browser.element('[name="Email"]'); 
			var passwordField = browser.element('[name="Password"]');
			var loginButton = browser.element('[value="Log in"]');
			emailField.setValue(email); 
			passwordField.setValue(password);
			loginButton.submitForm();
			var title = browser.getTitle();
			assert.equal(title, 'Merchants');
		});
});
