require('express-async-errors');

const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/ErrorHandler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});
app.use('/rover', require('./routes/rover'));
app.use(errorMiddleware);

module.exports = app;
