const { exec } = require('child_process');
if(process.env.CLOUD_ENV == 'BStack') {
  console.log("BSTACK exec")
  exec('npm run single',
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