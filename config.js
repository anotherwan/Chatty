const config = {
    development: {
        PORT: 4000,
        HOST: 'ws://localhost:'
    },
    production: {
        PORT: process.env.PORT,
        HOST: 'https://the-chattery.herokuapp.com:'
    }

}
module.exports = config[process.env.NODE_ENV || 'development'];