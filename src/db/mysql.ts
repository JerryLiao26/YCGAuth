import { createConnection, Connection } from 'mysql';
import { DBConfig, DBClientWrap, DataItem } from '@src/types';

export async function init(config: DBConfig): Promise<MySQLWrap> {
  return new Promise((resolve, _) => {
    const connection = createConnection({
      host: config.dbHost,
      port: config.dbPort,
      user: config.dbUser,
      password: config.dbPass,
      database: config.dbName,
    });

    connection.connect(err => {
      if (err) throw err;
      else resolve(new MySQLWrap(connection));
    });
  });
}

class MySQLWrap implements DBClientWrap {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async add(item: DataItem) {
    return Promise.resolve(item);
  }

  public async update(item: DataItem) {
    return Promise.resolve(item);
  }

  public async remove(id: string) {
    console.log('ID::', id);
    return Promise.resolve();
  }

  public async count() {
    return Promise.resolve(0);
  }

  public async stop() {
    this.connection.end(err => {
      if (err) return Promise.reject();
      else return Promise.resolve();
    });
  }
}
