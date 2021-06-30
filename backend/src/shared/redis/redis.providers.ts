import { Provider } from '@nestjs/common';
// import { createAdapter } from 'socket.io-redis';
import { RedisClient } from 'redis';

import { REDIS_PUBLISHER_CLIENT, REDIS_SUBSCRIBER_CLIENT } from './redis.constants';

export const redisProviders: Provider[] = [
    {
        useFactory: (): RedisClient => {
            return new RedisClient({
                host: 'redis',
                port: 6379,
            });
        },
        provide: REDIS_SUBSCRIBER_CLIENT,
    },
    {
        useFactory: (): RedisClient => {
            return new RedisClient({
                host: 'redis',
                port: 6379,
            });
        },
        provide: REDIS_PUBLISHER_CLIENT,
    },
];
