import 'dotenv/config';
import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import * as mongoose from 'mongoose';

import { LoginDTO, RegisterDTO } from '../src/auth/dto/auth.dto';

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
    const user: RegisterDTO = {
      username: 'username',
      password: 'password',
      name: 'name',
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

  it('should reject dublicate registration', () => {
    const user: RegisterDTO = {
      username: 'username',
      password: 'password',
      name: 'name',
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
    const user: LoginDTO = {
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
