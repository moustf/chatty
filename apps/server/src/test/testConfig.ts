export const config = {
  Memory: true,
  IP: '127.0.0.1',
  Port: '27017',
  Database: 'chatty-tests',
  version: process.env.MONGODB_VERSION ?? '6.0.3',
};
