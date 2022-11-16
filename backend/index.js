if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = require('./src/server');
const port = process.env.EXTERNAL_PORT || 3001;

app.listen(port, () => {
    console.log('connected to port:', port);
});
