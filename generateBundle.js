import { exec } from 'child_process';

let isProduction = process.env.NODE_ENV === 'production';

if(isProduction) {
  exec('webpack -p --config webpack.config.js', (error) => {
    if (error) { console.log(`exec error: ${error}`); }
  });
}
