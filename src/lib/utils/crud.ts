import { type QueryResult } from 'tauri-plugin-sql-api';
import { loadDb, loadEntities } from './db';
import Entity from './Entity';

const db = await loadDb();
const entities = await loadEntities();

async function all<T extends Entity>(entityName: string): Promise<T[]> {
    return await db.select(`SELECT * FROM ${entityName.toLowerCase()}`);
}

async function create(entityName: string, json: string): Promise<number> {
    const object = JSON.parse(json);
    const keys = getEntityKeys(entityName);
    const values = keys.map(key => object[key]);

    const { lastInsertId: id } = await db.execute(
        `INSERT INTO ${entityName.toLowerCase()} (${keys.join(', ')}) VALUES (${keys.map((_, i) => `$${i + 1}`).join(', ')})`,
        values
    );
    return id;
}

async function update(entityName: string, id: number, json: string): Promise<boolean> {
    const object = JSON.parse(json);
    const keys = getEntityKeys(entityName);
    const values = keys.map(key => object[key]);

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    values.push(id);

    const result: QueryResult = await db.execute(
        `UPDATE ${entityName.toLowerCase()} SET ${setClause} WHERE id = $${keys.length + 1}`,
        values
    );
    return result.rowsAffected > 0 ? true : false;
}

async function remove(entityName: string, id: number): Promise<boolean> {
    const result: QueryResult = await db.execute(`DELETE FROM ${entityName.toLowerCase()} WHERE id = $1`, [id]);
    return result.rowsAffected > 0 ? true : false;
}

// TEST PURPOSES
async function fixtures(entityName: string): Promise<QueryResult> {
    let values = [];
    const keys = getEntityKeys(entityName);
    keys.splice(keys.indexOf('id'), 1);

    const entityClass = entities[entityName];
    const entity = new entityClass();

    for (let i = 0; i < 20; i++) {
        let value = '(';
        keys.forEach(key => {
            switch (typeof entity[key]) {
                case 'string':
                    value += `"${key}${i}",`;
                    break;
                case 'number':
                    value += `"${i}",`;
                    break;
                case 'object':
                    value += '"1970-01-01",';
                    break;
            }
        });
        value = value.slice(0, -1) + ')';
        values.push(value);
    }
    const sql = `INSERT INTO ${entityName.toLowerCase()} (${keys.join(', ')}) VALUES `+ values.join();

    return await db.execute(sql);
}

// TEST PURPOSES
async function deleteAll(entityName: string): Promise<QueryResult> {
    return await db.execute(`DELETE FROM ${entityName.toLowerCase()}`);
}

function getEntityKeys(entityName: string): string[] {
    const entityClass = entities[entityName];
    if (!entityClass) throw new Error(`Entity ${entityName} not found`);

    return Object.keys(new entityClass());
}

export default {
    all,
    create,
    update,
    remove,
    fixtures,
    deleteAll,
};
