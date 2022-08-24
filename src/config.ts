interface Config {
    clientUrl: string;
    workbenchServerUrl: string;
    gateServerUrl: string;
    gateServerSocketIoPath: string;
    grpcHost: string;
    contentSystemUrl: string;
}

const config: Config = {
    clientUrl: 'https://dev.darksun.com/client',
    workbenchServerUrl: 'wss://dev.darksun.com/service/workbench/ws',
    gateServerUrl: 'https://dev.darksun.com',
    grpcHost: 'https://dev.darksun.com',
    contentSystemUrl: 'https://dev.darksun.com/service/content-system/Files',
    gateServerSocketIoPath: '/services/gate/socket.io',
};

export default config;
