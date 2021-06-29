import 'dotenv/config';
import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import * as mongoose from 'mongoose';

import { LoginDto, RegisterDto } from '../src/modules/auth/dto/auth.dto';

const app = 'http://localhost:3000';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await mongoose.connection.db.dropDatabase();
});

afterAll((done) => mongoose.disconnect(done));

describe('ROOT', () => {
  it('should ping', () => {
    return request(app).get('/').expect(200).expect('Hello World!');
  });
});

describe('AUTH', () => {
  it('should register', () => {
    const user: RegisterDto = {
      username: 'username',
      password: 'password',
      name: 'name',
      phone: '+79998889999',
    };
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('username');
        // expect(body.user.password).toBeUndefined();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should reject duplicate registration', () => {
    const user: RegisterDto = {
      username: 'username',
      password: 'password',
      name: 'name',
      phone: '+79998889999',
    };
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.message).toEqual('User already exist');
        expect(body.statusCode).toEqual(HttpStatus.BAD_REQUEST);
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('should login', () => {
    const user: LoginDto = {
      username: 'username',
      password: 'password',
    };
    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('username');
        // expect(body.user.password).toBeUndefined();
      })
      .expect(HttpStatus.CREATED);
  });
});
