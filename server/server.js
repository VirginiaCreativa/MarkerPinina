const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const hotmiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');

const paths = require('../webpack/paths');
const logger = require('./logger.js');
const home = require('./routes/home.js');
const significados = require('./routes/significados.js');
const notascornell = require('./routes/notascornell.js');
const documentos = require('./routes/documentos.js');
const foros = require('./routes/foros.js');

const compiler = webpack(webpackConfig);

app.use(logger);
app.use(express.static(paths.templatePath));
app.use(bodyParser.json());

app.use(
  middleware(compiler, {
    hot: true,
    noInfo: true,
    publicPath: webpackConfig.dev,
  }),
);

app.use(
  hotmiddleware(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 2000,
  }),
);

// ROUTER
app.use('/', home);
app.use('/significados', significados);
app.use('/notascornell', notascornell);
app.use('/documentos', documentos);
app.use('/foros', foros);

app.use('/', router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Listening 8000');
});
