// import { IoAdapter } from '@nestjs/platform-socket.io';
// import { createAdapter } from '@socket.io/redis-adapter';
// import { RedisClient } from 'redis';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    const redisAdapter = redisIoAdapter({ host: 'redis', port: 6379 });

    server.adapter(redisAdapter);
    return server;
  }
}
