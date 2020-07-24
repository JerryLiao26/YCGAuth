import { MongoClient } from 'mongodb';
import { DBConfig, DBClientWrap, DataItem } from '@src/types';

export async function init(config: DBConfig): Promise<MongoClientWrap> {
  const userString = config.dbUser ? `${encodeURIComponent(config.dbUser)}:${encodeURIComponent(config.dbPass)}@` : '';
  const connectString = `mongodb://${userString}${config.dbHost}:${config.dbPort} `;

  return new Promise((resolve, reject) => {
    MongoClient.connect(connectString, { useNewUrlParser: true }, (err, db) => {
      if (err) reject(null);
      else resolve(new MongoClientWrap(db));
    });
  });
}

class MongoClientWrap implements DBClientWrap {
  private db: MongoClient;

  constructor(db: MongoClient) {
    this.db = db;
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
      await this.db.close();
      return Promise.resolve();
    } catch {
      return Promise.reject();
    }
  }
}
