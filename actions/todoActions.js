import {
	GET_ALL_TODOS,
	CREATE_NEW_TODO,
	REMOVE_TODO,
	TOGGLE_TODO
} from '../constants/todoConstants';

export const getAllTodos = () => {
	return {
		type: GET_ALL_TODOS,
		payload: []
	};
};

export const createNewTodo = todoItem => {
	console.warn('ACTION:', todoItem);
	return {
		type: CREATE_NEW_TODO,
		payload: todoItem
	};
};

export const removeTodo = todoItem => {
	return {
		type: REMOVE_TODO,
		payload: todoItem
	};
};

export const toggletodo = todoItem => {
	return {
		type: TOGGLE_TODO,
		payload: todoItem
	};
};
