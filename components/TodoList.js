import React from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  CheckBox
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    backgroundColor: '#fff'
  },
  todoItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  infoContainer: {
    paddingLeft: 8,
    justifyContent: 'space-around',
    flex: 1
  },
  text: {
    fontSize: 24
  },
  listHeader: {
    marginTop: 14,
    fontSize: 32,
    textAlign: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  btn: {
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'gray'
  },
  btnText: {
    paddingTop: 12,
    paddingBottom: 12,
    textAlign: 'center',
    fontSize: 24
  }
})

export default class TodoList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      checked: true
    }
    this.tempTodoItems = [
      {
        key: '1',
        description: 'Brush teeth',
        done: false
      },
      {
        key: '2',
        description: 'Take out the trash',
        done: false
      },
      {
        key: '3',
        description: 'Finish essay',
        done: false
      },
      {
        key: '4',
        description: 'Feed the fishes',
        done: false
      },
      {
        key: '5',
        description: 'Buy coffee',
        done: false
      },
      {
        key: '6',
        description: 'Save the world',
        done: false
      }
    ]
  }

  componentDidMount () {
    console.log('TodoList mounted!')
  }

  renderTodoItem = ({ item }) => (
    <View style={styles.todoItemContainer}>
      <View style={styles.infoContainer}>
        <CheckBox key={item.key} title={item.description} checked='true' />
      </View>
    </View>
  )

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <Text style={styles.listHeader}>Today's tasks</Text>
          }
          renderItem={this.renderTodoItem}
          data={this.tempTodoItems}
          ListFooterComponent={
            <TouchableOpacity style={styles.btn} activeOpacity={0.5}>
              <Text style={styles.btnText}>
                Add new todo item
              </Text>
            </TouchableOpacity>
          }
        />
      </View>
    )
  }
}
