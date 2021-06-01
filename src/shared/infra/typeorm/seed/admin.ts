import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');
  const id = uuid();

  const password = await hash('admin', 8);

  await connection.query(`INSERT INTO USERS(ID,NAME,EMAIL, PASSWORD, IS_ADMIN, CREATED_AT, DRIVER_LICENSE)
    VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'xxxx')`);

  await connection.close();
}

create().then(() => console.info('User Admin created!'));
