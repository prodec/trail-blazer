import express from 'express';
import path from 'path';
import apiRoutes from './routes/api';
import DevServer from './devServer';
import webpackConfig from './webpack.config';
import webpackDevServerConfig from './webpackDevServer.config';
import dotenv from 'dotenv';
dotenv.load();

let app = express();
let port = parseInt(process.env.PORT, 10);
let isDevelopment = process.env.NODE_ENV === 'development';

app
  .use(express.static(path.join(__dirname, 'dist')))
  .use('/api', apiRoutes)
  .get('/', (req, res) => { res.sendFile('index.html'); })
  .listen(port, (error) => {
    if (error) { console.log(error); }
    console.log(`Server listening at localhost:${port}`);
  });

if (isDevelopment) {
  let devPort = parseInt(process.env.DEV_PORT, 10);
  let devServer = new DevServer(webpackConfig, webpackDevServerConfig);

  devServer.listen(devPort);
}
