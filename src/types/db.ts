export interface DBConfig {
  type: 'MongoDB' | 'MySQL';
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUser: string;
  dbPass: string;
}

export interface DBConfigSafe {
  type: 'MongoDB' | 'MySQL';
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUser: string;
}

export interface DataItem {
  id?: string;
  [key: string]: any;
}

export interface DBClientWrap {
  add: (item: DataItem) => Promise<DataItem>;
  update: (item: DataItem) => Promise<DataItem>;
  remove: (id: string) => Promise<void>;
  count: () => Promise<number>;
}
