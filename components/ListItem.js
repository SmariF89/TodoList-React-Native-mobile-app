import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  CheckBox
} from 'react-native'
import Swipeable from 'react-native-swipeable'
import { removeTodo, toggleTodo } from '../actions/todoActions'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  todoItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  swipeText: {
    fontSize: 18,
    color: 'white'
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 8,
    backgroundColor: '#b20e0e',
    borderRadius: 10,
    height: 40
  },
  infoContainer: {
    paddingLeft: 8,
    justifyContent: 'space-around',
    flex: 1
  },
  text: {
    fontSize: 24
  }
})

class ListItem extends React.Component {
  deleteToDoItem (item) {
    const { removeTodo } = this.props
    removeTodo(item.key)
  }

  setToggle (key) {
    console.log(key)
    const { toggleTodo } = this.props
    toggleTodo(key)
  }

  render () {
    const { item } = this.props
    return (
      <Swipeable
        style={styles.todoItemContainer}
        rightButtons={[
          <TouchableOpacity
            onPress={() => this.deleteToDoItem(item)}
            style={styles.rightSwipeItem}
          >
            <Text style={styles.swipeText}>Delete</Text>
          </TouchableOpacity>
        ]}
      >
        <View styles={styles.infoContainer}>
          <CheckBox
            key={item.key}
            onValueChange={() => this.setToggle(item.key)}
            value={item.done}
          />
          <Text style={styles.text}>
            {item.description}
          </Text>
        </View>
      </Swipeable>
    )
  }
}

const mapStateToProps = state => {
  return {
    todos: state
  }
}

export default connect(mapStateToProps, { removeTodo, toggleTodo })(ListItem)
