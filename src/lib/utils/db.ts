import Database from 'tauri-plugin-sql-api';

let cached: Database | null = null;

export async function loadDb() {
  cached ??= await Database.load('sqlite:test.db');
  return cached;
}

export async function loadEntities() {
  const modules = import.meta.glob('$lib/entity/*.ts', {import: 'default'});
  const entities: Record<string, any> = {};

  for (const path in modules) {
      const entityClass = await modules[path]();
      const entityName = path.split('/').pop()?.replace('.ts', '');
      if (entityName) {
          entities[entityName] = entityClass;
      }
  }

  return entities;
}
