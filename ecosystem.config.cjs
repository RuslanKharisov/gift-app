module.exports = {
  apps: [
    {
      name: 'giftjs-app',
      script: 'npm',
      args: 'run start',
      env_production: {
        HOST: '127.0.0.1',
        PORT: '3002',
        NODE_ENV: 'production',
      },
    },
  ],
}
