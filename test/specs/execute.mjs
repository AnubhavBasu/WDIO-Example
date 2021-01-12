import { createRequire } from 'module'
const require = createRequire(import.meta.url);
import {series} from 'async';
let {exec} = require('child_process');


console.log('ENVIRONMENT: ', process.env.ENVIRONMENT)
if(process.env.ENVIRONMENT=='BS'){
    series([  () => exec('npm run single')]);
}
else{
    series([  () => exec('npx wdio wdio.conf.js')]);
}
console.log('Tests Completed')