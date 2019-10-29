const express = require('express')
const app = express()

// includes routes
const mainRoute = require('./routes')

app.use('/', mainRoute)

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

// jalankan nodejs di port sesuai ENV
if(process.env.PORT) {
    app.listen(process.env.PORT, () => {
        console.log('server running at port', process.env.PORT)
    })
}

module.exports = app;