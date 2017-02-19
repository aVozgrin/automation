var assert = require('assert');
var chai = require('chai');
    global.expect = chai.expect;
    chai.Should();

var mainUrl = 'https://mip-stage.onlini.co/';
var email = 'anton.vozghrin@onlini.co';
var password = 'cometaChurumova75';

function makeRandomString(n){
	var n = n;
	if(n==null){
		n= Math.random()*10;
	}
	var s ='', abd ='abcdefghijklmnopqrstuvwxyz0123456789', aL = abd.length;
	while(s.length < n)
		s += abd[Math.random() * aL|0];
	return s;
}

function findErrorMessage(selector){
	if(browser.isVisible(selector)){
		return browser.getText(selector);
	}
	else {
		findErrorMessage(selector);
	}
}

function findElement(selector){
	if(browser.isVisible(selector)){
		return $(selector);
	}
	else {
		findElement(selector);
	}

}

function logOff(){
	var dropdownToggle = findElement('a.dropdown-toggle');
	dropdownToggle.click();
	var logOff = findElement('a*=off');
	logOff.click();
}

function logIn(email,password) {
	var emailField = findElement('[name="Email"]'); 
	var passwordField = findElement('[name="Password"]');
	var loginButton = findElement('[value="Log in"]');
	emailField.setValue(email);
	passwordField.setValue(password); 
	loginButton.submitForm();
}






describe('Test login', function() {
	beforeEach(function(){
		browser.url(mainUrl); 
	});
	describe('- incorrect login', function(){
		it('- with incorrect password', function () {
			logIn(email,makeRandomString());
			expect(browser.waitForExist('span=Invalid login attempt.')).to.be.ok;
		});
		it('- with empty password', function () {
			logIn(email,'');
			expect(browser.waitForExist('span=The Password field is required.')).to.be.ok;
		});
		it('- with empty email', function () {
			logIn('', password);
			expect(browser.waitForExist('span=The Email field is required.')).to.be.ok;
		});
		it('- with empty email and password', function () {
			logIn('','');
			expect(browser.waitForExist('span=The Email field is required.')).to.be.ok;
			expect(browser.waitForExist('span=The Password field is required.')).to.be.ok;
		});
		it('- with email @asd.asd', function () {
			logIn(email.slice(email.indexOf('@')), password);
			expect(browser.waitForExist('span=The Email field is not a valid e-mail address.')).to.be.ok;
		});
		it('- with email asdasd.asd', function () {
			logIn(email.slice(0, email.indexOf('@'))+email.slice(email.indexOf('@')+1), password);
			expect(browser.waitForExist('span=The Email field is not a valid e-mail address.')).to.be.ok;
		});
		it('- with email asd@.asd', function () {
			logIn(email.slice(0,email.indexOf('@')+1) + email.slice(email.lastIndexOf('.')), password);
			expect(browser.waitForExist('span=The Email field is not a valid e-mail address.')).to.be.ok; 
		});
		it('- with email asd@asdasd', function () {
			logIn(email.slice(0, email.lastIndexOf('.')) + email.slice(email.lastIndexOf('.')+1), password);
			expect(browser.waitForExist('span=The Email field is not a valid e-mail address.')).to.be.ok;
		});
		it('- with email asd@asd.', function () {
			logIn(email.slice(0, email.lastIndexOf('.')+1), password);
			expect(browser.waitForExist('span=The Email field is not a valid e-mail address.')).to.be.ok;
		});
	});
	describe('- correct login', function(){
		it('- login', function(){
			logIn(email, password);
			assert.equal(browser.getTitle(), 'Merchants');
			logOff();
		});
	})
});





describe('Test Change Password', function(){
	var newpass6 = makeRandomString(6);
	before(function(){
		browser.url(mainUrl);
		logIn(email,password);
		var dropdownToggle = findElement('a.dropdown-toggle');
		dropdownToggle.click();
		var changePasswordButton = findElement('a*=Change Password');
		changePasswordButton.click();
	});
	it('- with empty fields', function(){
		var changePasswordButton = browser.element('[value="Change Password"]');
		changePasswordButton.submitForm();
		function getErrors(){
			var errorMessages=[];
			errorMessages.push(findErrorMessage('span*=The Current'), findErrorMessage('span*=The New'));
			return errorMessages;
		};
		var errors = getErrors();
		assert.deepEqual(errors, ['The Current password field is required.', 'The New password field is required.']);
	});
	it('- with empty old password', function(){
		var newPasswordField = browser.element('[name="NewPassword"]');
		var confirmPasswordField = browser.element('[name="ConfirmPassword"]');
		var changePasswordButton = browser.element('[value="Change Password"]');
		newPasswordField.setValue(newpass6);
		confirmPasswordField.setValue(newpass6);
		changePasswordButton.submitForm();
		expect(browser.waitForExist('span=The Current password field is required.')).to.be.ok;
	});
	it('- with incorrect old password', function(){
		var currentPasswordField = browser.element('[name="OldPassword"]');
		var newPasswordField = browser.element('[name="NewPassword"]');
		var confirmPasswordField = browser.element('[name="ConfirmPassword"]');
		var changePasswordButton = browser.element('[value="Change Password"]');
		currentPasswordField.setValue(password.slice(0, password.length-1));
		newPasswordField.setValue(newpass6);
		confirmPasswordField.setValue(newpass6);
		changePasswordButton.submitForm();
		expect(browser.waitForExist('span=Failed to change password')).to.be.ok;

	});
	it('- with incorrect confirmation password # new password', function(){
		var currentPasswordField = browser.element('[name="OldPassword"]');
		var newPasswordField = browser.element('[name="NewPassword"]');
		var confirmPasswordField = browser.element('[name="ConfirmPassword"]');
		var changePasswordButton = browser.element('[value="Change Password"]');
		currentPasswordField.setValue(password);
		newPasswordField.setValue(newpass6);
		confirmPasswordField.setValue(newpass6.slice(0,5));
		changePasswordButton.submitForm();
		assert.equal(findErrorMessage('span*=new password and confirmation password'), 'The new password and confirmation password do not match.');
	});
	it('- with new password and confirmation < 6 characters long', function(){
		var currentPasswordField = browser.element('[name="OldPassword"]');
		var newPasswordField = browser.element('[name="NewPassword"]');
		var confirmPasswordField = browser.element('[name="ConfirmPassword"]');
		var changePasswordButton = browser.element('[value="Change Password"]');
		currentPasswordField.setValue(password);
		newPasswordField.setValue(newpass6.slice(0,5));
		confirmPasswordField.setValue(newpass6.slice(0,5));
		changePasswordButton.submitForm();
		assert.equal(findErrorMessage('span*=password must be'), 'The New password must be at least 6 characters long.');
	});
	describe('- correct change', function(){
		it('- correct change password', function(){
			var currentPasswordField = browser.element('[name="OldPassword"]');
			var newPasswordField = browser.element('[name="NewPassword"]');
			var confirmPasswordField = browser.element('[name="ConfirmPassword"]');
			var changePasswordButton = browser.element('[value="Change Password"]');
			currentPasswordField.setValue(password);
			newPasswordField.setValue(newpass6);
			confirmPasswordField.setValue(newpass6);
			changePasswordButton.submitForm();
			assert.equal(findErrorMessage('span*=successfully'), 'Password updated successfully');
			logOff();
		});
		it('- login with new password',function(){
			browser.url(mainUrl);
			var emailField = findElement('[name="Email"]'); 
			var passwordField = findElement('[name="Password"]');
			var loginButton = findElement('[value="Log in"]');
			emailField.setValue(email);
			passwordField.setValue(newpass6); 
			loginButton.submitForm();
			assert.equal(browser.getTitle(), 'Merchants');
		});
		it('- change password again', function(){
			var dropdownToggle = findElement('a.dropdown-toggle');
			dropdownToggle.click();
			var changePasswordButton = findElement('a*=Change Password');
			changePasswordButton.click();
			var currentPasswordField = findElement('[name="OldPassword"]');
			var newPasswordField = findElement('[name="NewPassword"]');
			var confirmPasswordField = findElement('[name="ConfirmPassword"]');
			var changePasswordButton = findElement('[value="Change Password"]');
			currentPasswordField.setValue(newpass6);
			newPasswordField.setValue(password);
			confirmPasswordField.setValue(password);
			changePasswordButton.submitForm();
			assert.equal(findErrorMessage('span*=successfully'), 'Password updated successfully');
			logOff();
		});
		it('- login with old changed password', function(){
			browser.url(mainUrl);
			logIn(email,password);
			assert.equal(browser.getTitle(), 'Merchants');
		});
	});

});



// describe('Test Merchants', function() {
// 	before(function(){
// 		browser.url(mainUrl);
// 		logIn(email, password);
// 	});
// 	it('- test', function(){
// 		console.log(browser.getAttribute('[data-row-id="0"]', 'class'))
// 	});
// });
