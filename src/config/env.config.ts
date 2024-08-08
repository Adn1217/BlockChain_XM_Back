
export const EnvConfig = () => ({
    chainRPC: process.env.CHAIN_RPC,
    environment: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 4000,
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY,
    xmcopOwnerPrivateKey: process.env.XMCOP_OWNER_PRIVATE_KEY
});