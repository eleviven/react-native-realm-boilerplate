import database from '../index';
import {TODO_SCHEMA} from '../constants';

export const createTodo = async todo => {
  try {
    const newTodo = {
      createdAt: new Date(),
      ...todo,
    };
    const data = await database.create(TODO_SCHEMA, newTodo);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getTodos = async ({sort = 'ASC'} = {}) => {
  try {
    let data = await database.find(TODO_SCHEMA);
    data = data.sorted('createdAt', sort === 'DESC');
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteTodo = async id => {
  try {
    return await database.delete(TODO_SCHEMA, id);
  } catch (err) {
    throw new Error(err);
  }
};

export const subTodos = callback => {
  return database.addListener(TODO_SCHEMA, callback);
};
