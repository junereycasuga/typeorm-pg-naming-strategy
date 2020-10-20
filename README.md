# TypeORM Postgres Naming Strategy

This pakcage provides a custom Postgres naming strategy. It alterates the name of columns, relations, and other fields in database.

## Installation

```bash
npm install typeorm-pg-naming-strategy --save
```

## Usage

```typescript
import { createConnection } from 'typeorm';
import PgNamingStrategy from 'typeorm-pg-naming-strategy';

await createConnection({
  ...
  namingStrategy: new PgNamingStrategy()
});
```
