/* eslint-disable prettier/prettier */
export default () => ({
      port: parseInt(process.env.PORT, 10) || 3000,
      database: {
        uri: process.env.MONGODB_URI,
      },
      rabbitmq: {
        url: process.env.RABBITMQ_URL,
      },
      reqres: {
        baseUrl: 'https://reqres.in/api',
      },
    });