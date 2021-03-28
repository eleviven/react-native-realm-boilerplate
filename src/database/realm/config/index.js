import Realm from 'realm';
import {TodoSchema} from '../schemas/todo.schema';

const databaseOptions = {
  path: 'todo-db.realm',
  schema: [TodoSchema],
  schemaVersion: 12,
};

export const openDatabase = async () => await Realm.open(databaseOptions);
export const realm = new Realm(databaseOptions);
