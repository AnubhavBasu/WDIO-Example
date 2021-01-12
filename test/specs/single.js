var request = require("request");

describe('BrowserStack Local Testing', function() {
  it('can check tunnel working', function () {
    browser.url('http://localhost:8080/')
    //browser.pause(3000)
    //Taking ScreenShots
    //browser.saveScreenshot('./screenshots/'+browser.capabilities.browserName+'test.png')
    //percySnapshot(browser, browser.capabilities.browserName+'4')
    console.log('Opening ULR...')
    browser.pause(1000)
    browser.getPageSource().should.match(/Jenkins/i);
    console.log('Validating Test')
    //Tag Tests on BrowserStack
    session_id = browser.sessionId;
    console.log('SessionID:', session_id);
    
    if(process.env.ENVIRONMENT='BStack'){
        console.log('Marking Tests on BS');
        if (browser.getPageSource().should.match(/Jenkins/i)) {
          console.log('Test Passed')
          request({uri: "https://anubahavbasu1:ysAUqSiaZkL9UqSUrbdL@api.browserstack.com/automate/sessions/"+session_id+".json", method:"PUT", form:{"status":"Passed","reason":""}});
          browser.pause(3000)
      
      } else {
          console.log('Test Failed')
          request({uri: "https://anubahavbasu1:ysAUqSiaZkL9UqSUrbdL@api.browserstack.com/automate/sessions/"+session_id+".json", method:"PUT", form:{"status":"Failed","reason":"Title Mismatch"}});
          browser.pause(3000)

        }
    }
  });
});