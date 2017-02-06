var assert = require('assert');

var mainUrl = 'https://mip-dev.onlini.co/';
var email = 'anton.vozghrin@onlini.co';
describe('Forgot Password test', function() {
	it('test', function(){
		browser.url(mainUrl);
		browser.waitForVisible('a*=Forgot');
		var forgotBtn = browser.element('a*=Forgot');
		forgotBtn.click();
		browser.waitForVisible('[name="Email"]');
		var emailField = browser.element('[name="Email"]');
		emailField.setValue(email);
		var submit = browser.element('[value="Email Link"]');
		submit.submitForm();
		browser.waitForVisible('p*=check your email');
		browser.url('https://exchange.onlini.co/');
	});
});