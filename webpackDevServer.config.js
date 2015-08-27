import config from './webpack.config';

 let devServerConfig = {
  publicPath: config.output.publicPath,
  proxy: {
    '/api': 'http://localhost:3001',
    '/*.png': 'http://localhost:3001'
  },
  hot: true,
  historyApiFallback: true,
  stats: { colors: true }
};

export default devServerConfig;
