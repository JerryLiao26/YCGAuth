import { MongoClient, MongoClientOptions, Db } from 'mongodb';
import { DBConfig, DBClientWrap, DataItem } from '@src/types';
import { stripId } from '@src/utils';

export async function init(config: DBConfig): Promise<MongoClientWrap> {
  const userString = config.dbUser ? `${encodeURIComponent(config.dbUser)}:${encodeURIComponent(config.dbPass)}@` : '';
  const connectString = `mongodb://${userString}${config.dbHost}:${config.dbPort}/${config.dbName} `;
  const connectOption: MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

  return new Promise((resolve, _) => {
    MongoClient.connect(connectString, connectOption, (err, db) => {
      if (err) throw err;
      else resolve(new MongoClientWrap(db, config.dbName));
    });
  });
}

class MongoClientWrap implements DBClientWrap {
  private db: MongoClient;
  private connection: Db;

  constructor(db: MongoClient, dbName: string) {
    this.db = db;
    this.connection = db.db(dbName);
  }

  public async add(item: DataItem, field: string) {
    try {
      const result = await this.connection.collection(field).insertOne(item);
      item.id = result.insertedId;
      return Promise.resolve(item);
    } catch (err) {
      throw err;
    }
  }

  public async update(item: DataItem, field: string) {
    try {
      await this.connection.collection(field).updateOne({ _id: item.id }, stripId(item));
      return Promise.resolve(item);
    } catch (err) {
      throw err;
    }
  }

  public async remove(id: string, field: string) {
    try {
      await this.connection.collection(field).remove({ _id: id });
      return Promise.resolve();
    } catch (err) {
      throw err;
    }
  }

  public async count(field: string) {
    try {
      const result = await this.connection.collection(field).countDocuments();
      return Promise.resolve(result);
    } catch (err) {
      throw err;
    }
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
