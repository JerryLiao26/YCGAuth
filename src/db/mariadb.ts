import { createConnection, Connection } from 'mariadb';
import { DBConfig, DBClientWrap, DataItem } from '@src/types';

export async function init(config: DBConfig): Promise<MariaDBWrap> {
  return new Promise((resolve, _) => {
    createConnection({
      host: config.dbHost,
      port: config.dbPort,
      user: config.dbUser,
      password: config.dbPass,
      database: config.dbName,
    })
      .then(connection => resolve(new MariaDBWrap(connection)))
      .catch(err => {
        throw err;
      });
  });
}

class MariaDBWrap implements DBClientWrap {
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
    try {
      await this.connection.end();
      return Promise.resolve();
    } catch {
      return Promise.reject();
    }
  }
}
