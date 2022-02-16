const proxy = require('express-http-proxy');
const express = require('express');
const cfg = require('../../pkg/config');
const path = require('path');

const app = express();

app.use('/api/v1/auth', proxy(
    'http://localhost:7001',
    { proxyReqPathResolver: (req) => `http://localhost:7001/api/v1/auth${req.url}` }
));

app.use('/api/v1/storage', proxy(
    'http://localhost:7002',
    { proxyReqPathResolver: (req) => `http://localhost:7003/api/v1/storage${req.url}` }
));

app.use('/api/v1/recipe', proxy(
    'http://localhost:7003',
    { proxyReqPathResolver: (req) => `http://localhost:7004/api/v1/recipe${req.url}` }
));

app.use('/', proxy(
    'http://localhost:3000',
    { proxyReqPathResolver: (req) => `http://localhost:3000${req.url}` }
));

app.use('/', express.static(path.join(__dirname, '/../../public/build')));

const PORT = process.env.PORT || cfg.get('services').proxy.port;

app.listen(PORT, err => {
    if (err) {
        return console.error(err);
    }
    console.log(`Server started on port ${PORT}`);
});



