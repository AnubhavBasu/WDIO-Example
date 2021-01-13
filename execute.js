const { exec } = require('child_process');
const { percy } = require('percy/@wbdriverio');
if(process.env.ENVIRONMENT == 'BStack') {
  console.log("BSTACK exec")
  exec('percy exec -- npm run single',
          (error, stdout, stderr) => {
              console.log(stdout);
              console.log(stderr);
              if (error !== null) {
                  console.log(`exec error: ${error}`);
              }
          });
}
else {
  console.log("in house exec")
  exec('npx wdio wdio.conf.js',
          (error, stdout, stderr) => {
              console.log(stdout);
              console.log(stderr);
              if (error !== null) {
                  console.log(`exec error: ${error}`);
              }
          });
}