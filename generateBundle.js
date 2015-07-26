import { exec } from 'child_process';

let isProduction = process.env.NODE_ENV === 'production';

if(isProduction) {
  exec('webpack -p', (error) => {
    if (error) { console.log(`exec error: ${error}`); }
  });
}
