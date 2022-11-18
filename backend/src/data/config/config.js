if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports = {
    development: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: process.env.DB_PORT,
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
        logging: false,
    },
    test: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: process.env.DB_PORT,
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
        logging: false,
    },
};
