var assert = require('assert');

var mainUrl = 'http://mip-dev.onlini.co/';

var email = 'anton.vozghrin@onlini.co';
var password = 'cometaChurumova75';

var current; //test counter

function makeRandomPassword(){
    var result = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$&";

    for( var i=0; i < Math.floor(Math.random()*10); i++ )
        result += possible.charAt(Math.floor(Math.random() * possible.length));

    return result;
}

var randomPassword = makeRandomPassword();

describe('LOGIN TESTS', function() {
	describe('negative', function(){

		before(function(){
			return current = 0;
		});
		beforeEach(function(){
			console.log('function ' + current + ' run');
			 return current++;
		});  // test counter function

		it('with incorrect password', function () {
			browser.url(mainUrl); 
			var emailField = browser.element('[name="Email"]'); 
			var passwordField = browser.element('[name="Password"]');
			var loginButton = browser.element('[value="Log in"]');
			emailField.setValue(email); 
			passwordField.setValue(randomPassword); 
			loginButton.submitForm();
			browser.waitForVisible('span*=Invalid login attempt.');
			var errorMessage = browser.element('span*=Invalid login attempt.').getText(); 
			assert.equal(errorMessage, 'Invalid login attempt.'); 
		});
		it('with empty password', function () {
			browser.url(mainUrl);
			var emailField = browser.element('[name="Email"]');
			var passwordField = browser.element('[name="Password"]');
			var loginButton = browser.element('[value="Log in"]'); 
			emailField.setValue(email);
			passwordField.setValue(''); 
			loginButton.submitForm(); 
			browser.waitForVisible('span*=The Password field is required.'); 
			var errorMessage = browser.element('span*=The Password field is required.').getText(); 
			assert.equal(errorMessage, 'The Password field is required.');
		});
		it('with empty email', function () {
			browser.url(mainUrl); 
			var emailField = browser.element('[name="Email"]');
			var passwordField = browser.element('[name="Password"]');
			var loginButton = browser.element('[value="Log in"]');
			emailField.setValue('');
			passwordField.setValue(password);
			loginButton.submitForm();
			browser.waitForVisible('span*=The Email field is required.');
			var errorMessage = browser.element('span*=The Email field is required.').getText(); 
			assert.equal(errorMessage, 'The Email field is required.');
		});
		it('with empty email and password', function () {
			browser.url(mainUrl); 
			var emailField = browser.element('[name="Email"]');
			var passwordField = browser.element('[name="Password"]');
			var loginButton = browser.element('[value="Log in"]');
			emailField.setValue('');
			passwordField.setValue('');
			loginButton.submitForm();
			browser.waitForVisible('span*=The Email field is required.');
			function getErrors(){
				var errorMessageBoth=[];
				var errorMessageEmail = browser.element('span*=The Email field is required.').getText();
				var errorMessagePassword = browser.element('span*=The Password field is required.').getText();
				errorMessageBoth.push(errorMessageEmail, errorMessagePassword);
				return errorMessageBoth;
			};
			var errors = getErrors();
			assert.deepEqual(errors, ['The Email field is required.','The Password field is required.']);
		});
	});
});