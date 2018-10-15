import React from 'react';
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	TextInput
} from 'react-native';
import Swipeable from 'react-native-swipeable';
import { connect } from 'react-redux';
import { getAllTodos, createNewTodo, removeTodo } from '../actions/todoActions';

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
	},
	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginBottom: 15,
		paddingTop: 10,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderStyle: 'dashed',
		borderColor: 'gray'
	},
	input: {
		flex: 5,
		borderColor: 'gray',
		borderWidth: 1,
		paddingLeft: 4,
		marginLeft: 8
	},
	inputBtn: {
		flex: 1,
		paddingTop: 15,
		paddingBottom: 15,
		marginRight: 4,
		marginLeft: 4,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'gray',
		backgroundColor: '#0a4784',
		borderRadius: 10
	},
	inputBtnText: {
		textAlign: 'center',
		fontSize: 18,
		color: 'white'
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
	}
});

class TodoList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inputBox: '',
			inputIsActive: false
		};
	}

	componentDidMount() {
		const { getAllTodos } = this.props;
		getAllTodos();
	}

	toggleInput() {
		const { inputIsActive } = this.state;
		this.setState({
			inputIsActive: !inputIsActive,
			inputBox: ''
		});
	}

	addTodoItem(item) {
		const minKey = 1;
		let maxKey = 0;
		this.setState({ inputBox: '' });
		const { createNewTodo, todos } = this.props;

		if (todos.length === 0) {
			createNewTodo(item, minKey.toString());
			return;
		}

		todos.todo.map(todo => {
			if (todo.key > maxKey) {
				maxKey = todo.key;
			}
		});

		createNewTodo(item, (Number(maxKey) + 1).toString());
	}

	deleteToDoItem(item) {
		const { removeTodo } = this.props;
		removeTodo(item.key);
	}

	renderTodoItem = ({ item }) => (
		<Swipeable
			style={styles.todoItemContainer}
			rightButtons={[
				<TouchableOpacity
					onPress={() => this.deleteToDoItem(item)}
					style={styles.rightSwipeItem}>
					<Text style={styles.swipeText}>Delete</Text>
				</TouchableOpacity>
			]}>
			<View style={styles.infoContainer}>
				<Text key={item.key} style={styles.text}>
					{item.description}
				</Text>
			</View>
		</Swipeable>
	);

	renderInput() {
		const { inputIsActive, inputBox } = this.state;
		if (inputIsActive) {
			return (
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder={'What has to be done...'}
						underlineColorAndroid={'rgba(0,0,0,0)'}
						onChangeText={text => this.setState({ inputBox: text })}
						onBlur={() => {
							if (inputBox === '') {
								this.toggleInput();
							}
						}}
						autoFocus={true}
						value={inputBox}
					/>
					<TouchableOpacity
						style={styles.inputBtn}
						onPress={() => {
							if (inputBox != '') {
								this.addTodoItem(inputBox);
								this.toggleInput();
							}
						}}
						activeOpacity={0.5}>
						<Text style={styles.inputBtnText}>Add</Text>
					</TouchableOpacity>
				</View>
			);
		}
		return (
			<TouchableOpacity
				onPress={() => this.toggleInput()}
				style={styles.btn}
				activeOpacity={0.5}>
				<Text style={styles.btnText}>Add new todo item</Text>
			</TouchableOpacity>
		);
	}

	render() {
		const { todo } = this.props.todos;
		return (
			<View style={styles.container}>
				<FlatList
					ListHeaderComponent={
						<Text style={styles.listHeader}>Today's tasks</Text>
					}
					renderItem={this.renderTodoItem}
					data={todo}
					ListFooterComponent={this.renderInput()}
				/>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		todos: state
	};
};

export default connect(
	mapStateToProps,
	{ createNewTodo, getAllTodos, removeTodo }
)(TodoList);
