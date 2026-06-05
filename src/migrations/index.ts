import * as migration_20260605_112321 from './20260605_112321';

export const migrations = [
  {
    up: migration_20260605_112321.up,
    down: migration_20260605_112321.down,
    name: '20260605_112321'
  },
];
