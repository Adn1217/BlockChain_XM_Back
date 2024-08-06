
export const EnvConfig = () => ({
    environment: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 4000,
    privateKey: process.env.PRIVATE_KEY,
    chainRPC: process.env.CHAIN_RPC
});