import {
  GET_ALL_TODOS,
  CREATE_NEW_TODO,
  REMOVE_TODO,
  TOGGLE_TODO
} from '../constants/todoConstants'

export const getAllTodos = () => {
  return {
    type: GET_ALL_TODOS,
    payload: []
  }
}

export const createNewTodo = (todoItem, key, timeStamp) => {
	return {
		type: CREATE_NEW_TODO,
		payload: { todoItem, key, timeStamp }
	};
};

export const removeTodo = todoItemKey => {
  return {
    type: REMOVE_TODO,
    payload: todoItemKey
  }
}

export const toggleTodo = todoItemKey => {
  return {
    type: TOGGLE_TODO,
    payload: todoItemKey
  }
}
