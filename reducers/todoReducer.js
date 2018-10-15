import {
	GET_ALL_TODOS,
	CREATE_NEW_TODO,
	REMOVE_TODO,
	TOGGLE_TODO
} from '../constants/todoConstants';

const todoReducer = (state = [], action) => {
	switch (action.type) {
		case GET_ALL_TODOS:
			break;
		case CREATE_NEW_TODO:
			state.push(action.payload);
			console.log('REDUCER:', state);
			return state;
			break;
		case REMOVE_TODO:
			break;
		case TOGGLE_TODO:
			break;
		default:
			return state;
	}
};

export default todoReducer;
