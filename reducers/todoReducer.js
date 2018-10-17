import {
  GET_ALL_TODOS,
  CREATE_NEW_TODO,
  REMOVE_TODO,
  TOGGLE_TODO
} from '../constants/todoConstants'

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_TODOS:
      return state
    case CREATE_NEW_TODO:
      return [
        ...state,
        {
          key: action.payload.key,
          description: action.payload.todoItem,
          done: false
        }
      ]
    case REMOVE_TODO:
      return state.filter(todoItem => todoItem.key !== action.payload)
    case TOGGLE_TODO:
      return state.map(todoItem => {
        console.log(todoItem)
        if (todoItem.key == action.payload) {
          return Object.assign({}, todoItem, {
            done: !todoItem.done
          })
        }
        return todoItem
      })

    default:
      return state
  }
}

export default todoReducer
