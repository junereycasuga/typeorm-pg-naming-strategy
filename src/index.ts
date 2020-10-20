import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';
import pluralize from 'pluralize';

export default class PgNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  tableName(className: string, customName: string): string {
    return customName ? customName : snakeCase(className);
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    return (
      snakeCase(embeddedPrefixes.concat('').join('_')) +
      (customName ? customName : snakeCase(propertyName))
    );
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(`${relationName}_${referencedColumnName}`);
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
    secondPropertyName: string,
  ): string {
    return snakeCase(firstTableName + '_' + pluralize(secondTableName));
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName: string,
  ): string {
    return snakeCase(
      tableName + '_' + (columnName ? columnName : propertyName),
    );
  }

  primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
    if (tableOrName instanceof Table) {
      return snakeCase(
        tableOrName.name + '_' + columnNames.join('_') + '_pkey',
      );
    }
    return snakeCase(tableOrName + '_' + columnNames.join('_') + '_pkey');
  }

  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath?: string,
    referencedColumnNames?: string[],
  ): string {
    if (tableOrName instanceof Table) {
      return snakeCase(
        tableOrName.name + '_' + columnNames.join('_') + '_fkey',
      );
    }
    return snakeCase(tableOrName + '_' + columnNames.join('_') + '_fkey');
  }

  uniqueConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
  ): string {
    if (tableOrName instanceof Table) {
      return snakeCase(tableOrName.name + '_' + columnNames.join('_') + '_key');
    }
    return snakeCase(tableOrName + '_' + columnNames.join('_') + '_key');
  }
}
