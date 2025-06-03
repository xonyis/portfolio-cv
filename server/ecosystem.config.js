module.exports = {
    apps: [{
      name: 'portfolio-chat',
      script: './server.js',
      instances: 1,
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    }]
  }