import {TODO_SCHEMA} from '../../constants';

export const TodoSchema = {
  name: TODO_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: {type: 'string'},
    description: {type: 'string'},
    createdAt: {type: 'date'},
  },
};
