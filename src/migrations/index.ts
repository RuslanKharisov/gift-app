import * as migration_20260605_112321 from './20260605_112321';
import * as migration_20260630_124921 from './20260630_124921';
import * as migration_20260630_154229 from './20260630_154229';

export const migrations = [
  {
    up: migration_20260605_112321.up,
    down: migration_20260605_112321.down,
    name: '20260605_112321',
  },
  {
    up: migration_20260630_124921.up,
    down: migration_20260630_124921.down,
    name: '20260630_124921',
  },
  {
    up: migration_20260630_154229.up,
    down: migration_20260630_154229.down,
    name: '20260630_154229'
  },
];
