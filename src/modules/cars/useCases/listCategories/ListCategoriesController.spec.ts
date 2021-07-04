import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('List Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuid();

    const password = await hash('admin', 8);

    await connection.query(`INSERT INTO USERS(ID,NAME,EMAIL, PASSWORD, IS_ADMIN, CREATED_AT, DRIVER_LICENSE)
    VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'xxxx')`);
  });

  it('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const category = await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest2',
        description: 'Category Supertest2',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    const response = await request(app)
      .get('/categories')
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(200);

    expect(response.body.length).toBe(1);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});
