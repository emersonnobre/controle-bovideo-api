module.exports = {
    server: process.env.HOST,
    port: 1434,
    database: process.env.DATABASE,
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
}