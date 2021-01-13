var request = require("request");
const { expect } = require("chai");

describe('BrowserStack Local Testing', function() {
  it('can check tunnel working', function () {
    browser.url('http://localhost:8080/')
    browser.pause(3000);
    session_id = browser.sessionId;
    console.log('SessionID:', session_id);
    console.log('Testing on: ', process.env.ENVIRONMENT);

    if (process.env.ENVIRONMENT=='BStack') {
      let timestamp = Date.now().toString;
      console.log('Taking PercySnapShot at: ',timestamp);
      percySnapshot(browser, browser.capabilities.browserName+"_"+timestamp);
      browser.getTitle().should.match(/Jenkins/i)
    } else {
      console.log('Opening ULR...')
      browser.getTitle().should.match(/Jenkins/i);
      console.log('Validating Test');
      console.log('Taking Local SS');
      let timestamp = Date.now().toString();
      browser.saveScreenshot('./screenshots/'+browser.capabilities.browserName+timestamp+'test.png');
    }
    if(process.env.ENVIRONMENT=='BStack') {
        console.log('Marking on BStack')
        var url = "https://"+process.env.BROWSERSTACK_USERNAME+":"+process.env.BROWSERSTACK_ACCESS_KEY+"@api.browserstack.com/automate/sessions/"+session_id+".json";
        console.log('Marking Tests on BS', url);
        if (browser.getTitle().should.match(/Jenkins/i)) {
          console.log('Test Passed')
          request({uri: url, method:"PUT", form:{"status":"Passed","reason":""}});
          browser.pause(2000)
      } else {
          console.log('Test Failed');
          request({uri: url, method:"PUT", form:{"status":"Failed","reason":"Title Mismatch"}});
          browser.pause(2000);

        }
    }
    else {
      console.log('Taking Local ScreenShots', process.env.ENVIRONMENT);
      let timestamp = Date.now().toString();
      browser.saveScreenshot('./screenshots/'+browser.capabilities.browserName+timestamp+'test.png');
    }
    
  });
});