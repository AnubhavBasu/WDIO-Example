var request = require("request");
const { expect } = require("chai");

describe('BrowserStack Local Testing', function() {
  it('can check tunnel working', function () {
    browser.url('http://localhost:8080/')
    browser.pause(3000)
    //Taking ScreenShots
    //browser.saveScreenshot('./screenshots/'+browser.capabilities.browserName+'test.png')
    console.log('Testing on: ', process.env.ENVIRONMENT)
    if (process.env.ENVIRONMENT.toString==="BStack") {
      console.log('Taking PercySnapShot')
      percySnapshot(browser, browser.capabilities.browserName+'5');
      console.log('Opening ULR...');
      browser.getTitle().should.match(/Jenkins/i);
      console.log('Validating Test');
      //Tag Tests on BrowserStack
      session_id = browser.sessionId;
      console.log('SessionID:', session_id);
    } else {
      console.log('Opening ULR...');
      browser.getTitle().should.match(/Jenkins/i);
      console.log('Validating Test');
      console.log('Taking Local ScreenShots');
      browser.saveScreenshot('./screenshots/'+browser.capabilities.browserName+'test.png');
    }
    if(process.env.ENVIRONMENT.toString==="BStack") {
        console.log('Marking Tests on BS');
        if (browser.getTitle().should.match(/Jenkins/i)) {
          
          console.log('Test Passed');
          request({uri: "https://anubahavbasu1:ysAUqSiaZkL9UqSUrbdL@api.browserstack.com/automate/sessions/"+session_id+".json", method:"PUT", form:{"status":"Passed","reason":""}});
          browser.pause(2000);
      
      } else {
          console.log('Test Failed');
          request({uri: "https://anubahavbasu1:ysAUqSiaZkL9UqSUrbdL@api.browserstack.com/automate/sessions/"+session_id+".json", method:"PUT", form:{"status":"Failed","reason":"Title Mismatch"}});
          browser.pause(2000);

        }
    }
    else {
      console.log('Taking Local ScreenShots');
      browser.saveScreenshot('./screenshots/'+browser.capabilities.browserName+'test.png');
    }
    console.log('Outside if-else')
  });
});