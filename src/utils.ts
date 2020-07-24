import { DBConfig, DBConfigSafe, DataItem } from './types';

export function stripDBPass(config: DBConfig): DBConfigSafe {
  const obj = Object.keys(config).reduce((prev, curr) => {
    if (curr !== 'dbPass') (prev as any)[curr] = (config as any)[curr];
    return prev;
  }, {});

  return obj as DBConfigSafe;
}

export function stripId(item: DataItem): DataItem {
  const obj = Object.keys(item).reduce((prev, curr) => {
    if (curr !== 'id') (prev as any)[curr] = (item as any)[curr];
    return prev;
  }, {});

  return obj;
}
