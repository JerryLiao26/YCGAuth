export interface DBConfigSafe {
  type: DBType;
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUser: string;
}

export interface DBConfig extends DBConfigSafe {
  dbPass: string;
}

export type DBType = 'MongoDB' | 'MySQL' | 'MariaDB';

export interface DataItem {
  id?: string;
  [key: string]: any;
}

export interface DBClientWrap {
  add: (item: DataItem, field: string) => Promise<DataItem>;
  update: (item: DataItem, field: string) => Promise<DataItem>;
  remove: (id: string, field: string) => Promise<void>;
  count: (field: string) => Promise<number>;
  stop: () => Promise<void>;
}
