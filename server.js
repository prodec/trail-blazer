import express from 'express';
import cors from 'cors';
import path from 'path';
import apiRoutes from './routes/api';
import DevServer from './devServer';
import webpackConfig from './webpack.config';
import webpackDevServerConfig from './webpackDevServer.config';

let app = express();
let port = process.env.PORT || 3001;
let isDevelopment = process.env.NODE_ENV !== 'production';

app
  .use(cors())
  .use(express.static(path.join(__dirname, 'dist')))
  .use(express.static(path.join(__dirname, 'src', 'images')))
  .use('/api', apiRoutes)
  .get('/', (_, res) => { res.sendFile('index.html'); })
  .listen(port, (error) => {
    if (error) { console.log(error); }
    console.log(`Server listening at localhost:${port}`);
  });

if (isDevelopment) {
  let devServer = new DevServer(webpackConfig, webpackDevServerConfig);

  devServer.listen(3000);
}
