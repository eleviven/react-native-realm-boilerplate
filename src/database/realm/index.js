import {openDatabase, realm as Realm} from './config/index';
import {TodoListSchema, TodoSchema} from './schemas/todo.schema';

class RealmDB {
  constructor() {
    this.databaseOptions = {
      path: 'app.realm',
      schema: [TodoListSchema, TodoSchema],
      schemaVersion: 0,
    };
    this.listeners = [];
    this.db = openDatabase();
  }
  create(schema, data) {
    return new Promise((resolve, reject) => {
      this.db
        .then(realm => {
          realm.write(() => {
            realm.create(schema, data);
            resolve(data);
          });
        })
        .catch(error => {
          reject({error});
        });
    });
  }
  update(schema, data) {
    return new Promise((resolve, reject) => {
      this.db
        .then(realm => {
          realm.write(() => {
            let object = realm.objectForPrimaryKey(schema, data.id);
            object = {...data};
            resolve(object);
          });
        })
        .catch(error => {
          reject({error});
        });
    });
  }
  find(schema) {
    return new Promise((resolve, reject) => {
      this.db
        .then(realm => {
          let data = realm.objects(schema);
          resolve(data);
        })
        .catch(error => {
          reject({error});
        });
    });
  }
  delete(schema, id) {
    return new Promise((resolve, reject) => {
      this.db
        .then(realm => {
          realm.write(() => {
            const data = realm.objectForPrimaryKey(schema, id);
            realm.delete(data);
            resolve(id);
          });
        })
        .catch(error => {
          reject({error});
        });
    });
  }
  addListener(schema, callback) {
    const collection = Realm.objects(schema);
    collection.addListener(callback);
    this.listeners.push({schema, callback});
    return {
      remove: () => {
        this.listeners = this.listeners?.filter(
          i => i?.schema !== schema && i?.callback !== callback,
        );
        collection.removeListener(callback);
      },
    };
  }
}

export default RealmDB;
