// Conexão utilizada caso sua forma de autenticação no SQLServer for pelo Windows
module.exports = {
    server: process.env.HOST || 'localhost',
    port: 1434, // NÃO é a porta padrão, alterar para 1433
    database: process.env.DATABASE || 'iagro_previa_emerson',
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
}