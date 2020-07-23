import { DBConfig, DBConfigSafe, DBClientWrap } from '@src/types';
import { init as mongoInit } from './mongo';

export default class AuthDB {
  private db: DBClientWrap;

  private config: DBConfig;
  private safeConfig: DBConfigSafe;

  constructor(config: DBConfig) {
    this.config = config;
    this.safeConfig = config;

    this.connect();
  }

  private async connect(): Promise<void> {
    switch (this.config.type) {
      case 'MongoDB':
        this.db = await mongoInit(this.config);
        break;
    }
  }

  public introduce(): string {
    return JSON.stringify(this.safeConfig);
  }
}
