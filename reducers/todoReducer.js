import {
	GET_ALL_TODOS,
	CREATE_NEW_TODO,
	REMOVE_TODO,
	TOGGLE_TODO
} from '../constants/todoConstants';

const todoReducer = (state = [], action) => {
	switch (action.type) {
		case GET_ALL_TODOS:
			return state;
		case CREATE_NEW_TODO:
			return [
				...state,
				{
					key: action.payload.key,
					description: action.payload.todoItem,
					done: false
				}
			];
		case REMOVE_TODO:
			break;
		case TOGGLE_TODO:
			break;
		default:
			return state;
	}
};

export default todoReducer;
