var assert = require('assert');
var email ='doctor2@mail.com';
var password = '123456';
var mainUrl = 'http://hivtest.dev.php.onlini.co/admin/login';
var suka = 'sssss';

function findElement(selector) {
    if (browser.isVisible(selector)) {
        return browser.element(selector);
    }
    else {
        findElement(selector);
    }

}
describe('1', function() {

    describe('2', function () {
        before(function(){
            browser.url(mainUrl);
            browser.setValue('[type="email"]',email);
            browser.setValue('[type="password"]',password);
            browser.submitForm('[type="submit"]');
            browser.url('http://hivtest.dev.php.onlini.co/admin/doctor/patient/');
            browser.setValue('//*[@id="txtSearch"]', '4550');
            browser.waitForVisible('[data-id="1196d110-54bb-458a-80cb-08df7c0808a9"]');
            browser.click('[data-id="1196d110-54bb-458a-80cb-08df7c0808a9"]');
        });
            for (var i = 1; i < 13; i++) {

                var currentMonth = i.toString();
                it('i', function () {
                    console.log(i);
                    currentMonth = currentMonth.toString();
                    if (currentMonth.length == 1) {
                        currentMonth = '0' + currentMonth;
                    }
                    var createTestBtn = findElement('[href="http://hivtest.dev.php.onlini.co/admin/doctor/test/new/patient/1196d110-54bb-458a-80cb-08df7c0808a9"]');
                    createTestBtn.click();
                    var customTypeName = findElement('#test_customTypeName');
                    customTypeName.setValue('Das Ergebnis der Analyse');
                    console.log(browser.getValue('#test_date'));
                    console.log(currentMonth);
                    var currentDate = "2011-" + currentMonth + "-09T13:30:12.000Z";
                    browser.execute(function (date) {
                        $("#test_date").val(date);
                    }, currentDate);
                    console.log(browser.getValue('#test_date'));
                    console.log('pizda');
                    var btnAddTestValue = findElement('#btnAddTestValue');
                    btnAddTestValue.click();
                    var selectbox = findElement('select.form-control');
                    selectbox.selectByValue("b1596fe1-5feb-424e-8f4f-f80ead3d4a45");
                    browser.addValue('//*[@id="divTestValues"]/div/div[5]/div[2]/div/input', '175');
                    browser.click('#test_submit');
                });
            }
    });
});