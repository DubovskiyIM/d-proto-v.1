import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => ({
  uri: getMongoString(configService),
  ...getMongoOptions(),
});

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

export const getMongoString = (configService: ConfigService) =>
  configService.get('MONGO_URI');
