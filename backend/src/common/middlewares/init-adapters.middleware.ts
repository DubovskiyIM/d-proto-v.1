import { INestApplication } from '@nestjs/common';

import { SocketStateAdapter } from '@src/shared/socket-state/socket-state.adapter';
import { SocketStateService } from '@src/shared/socket-state/socket-state.service';
import { RedisPropagatorService } from '@src/shared/redis-propagator/redis-propagator.service';

export const initAdapters = (app: INestApplication): INestApplication => {
    const socketStateService = app.get(SocketStateService);
    const redisPropagatorService = app.get(RedisPropagatorService);

    app.useWebSocketAdapter(new SocketStateAdapter(app, socketStateService, redisPropagatorService));

    return app;
};
