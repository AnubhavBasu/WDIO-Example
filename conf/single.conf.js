var browserstack = require('browserstack-local');
exports.config = {
    user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACC_KEY',
  
    updateJob: false,
    specs: [
      './test/specs/single.js'
    ],
    exclude: [],
  
    maxInstances: 10,
    commonCapabilities: {
      name: 'parallel_local_test',
      build: 'wido-browserstack',
      'browserstack.local': true
    },
  
    capabilities: [{
      browser: 'chrome'
    },{
      browser: 'firefox'
    },{
      browser: 'internet explorer'
    },{
      browser: 'safari'
    }],
  
    logLevel: 'warn',
    coloredLogs: true,
    screenshotPath: './errorShots/',
    baseUrl: '',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    host: 'hub.browserstack.com',
    
    before: function () {
      var chai = require('chai');
      global.expect = chai.expect;
      chai.Should();
    },
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        
    },
      // Code to start browserstack local before start of test
    onPrepare: function (config, capabilities) {
        console.log("Connecting local");
        return new Promise(function (resolve, reject) {
        exports.bs_local = new browserstack.Local();
        exports.bs_local.start({ 'key': exports.config.key }, function (error) {
            if (error) return reject(error);

            console.log('Connected. Now testing...');
            resolve();
        });
        });
    },

    // Code to stop browserstack local after end of test
    onComplete: function (capabilties, specs) { 
        return new Promise(function(resolve, reject){
        exports.bs_local.stop(function() {
            console.log("Binary stopped");
            resolve();
        });
        });
    }
    }
  
  // Code to support common capabilities
  exports.config.capabilities.forEach(function(caps){
    for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
  });
  
  