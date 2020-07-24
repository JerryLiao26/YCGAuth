import { DBConfig, DBConfigSafe, DBClientWrap } from '@src/types';
import { init as mongoInit } from './mongo';
import { init as mysqlInit } from './mysql';
import { init as mariadbInit } from './mariadb';
import { stripDBPass } from '@src/utils';

export default class AuthDB {
  private db: DBClientWrap;

  private config: DBConfig;
  private safeConfig: DBConfigSafe;

  constructor(config: DBConfig) {
    this.config = config;
    this.safeConfig = stripDBPass(config);
  }

  public async connect(): Promise<void> {
    try {
      if (this.db) await this.disconnect();

      switch (this.config.type) {
        case 'MongoDB':
          this.db = await mongoInit(this.config);
          break;
        case 'MySQL':
          this.db = await mysqlInit(this.config);
          break;
        case 'MariaDB':
          this.db = await mariadbInit(this.config);
          break;
        default:
          throw new Error(`Unknown DB type: ${this.config.type}`);
      }

      await this.initAdminAccount();

      return Promise.resolve();
    } catch (err) {
      throw err;
    }
  }

  public async disconnect(): Promise<void> {
    return this.db.stop();
  }

  public introduce(): string {
    return JSON.stringify(this.safeConfig);
  }

  private async initAdminAccount() {
    const count = await this.db.count('admin');
    if (!count) {
      await this.db.add(
        {
          name: 'root',
        },
        'admin',
      );
    }
  }
}
