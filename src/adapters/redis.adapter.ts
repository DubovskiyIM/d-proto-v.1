import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { RedisClient } from 'redis';

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number): any {
    const server = super.createIOServer(port);

    const pubClient = new RedisClient({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    });
    const subClient = pubClient.duplicate();

    server.adapter(createAdapter(pubClient, subClient));

    return server;
  }
}
