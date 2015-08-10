import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

export default class DevServer {
  constructor(webpackConfig, webpackDevServerConfig) {
    this.server = new WebpackDevServer(webpack(webpackConfig), webpackDevServerConfig);
  }

  listen(port) {
    this.server.listen(port, (error) => {
      if (error) { console.log(error); }
      console.log(`Development server listening at localhost:${port}`);
    });
  }
}

export default DevServer;
