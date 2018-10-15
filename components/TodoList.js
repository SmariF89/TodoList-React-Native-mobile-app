import React from 'react';
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	TextInput
} from 'react-native';
import { connect } from 'react-redux';

import { getAllTodos, createNewTodo } from '../actions/todoActions';

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
		flex: 1,
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 4,
		paddingLeft: 4
	},
	inputBtn: {
		marginBottom: 15,
		paddingTop: 10,
		paddingBottom: 10,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'gray',
		backgroundColor: '#4286f4',
		borderRadius: 10
	},
	inputBtnText: {
		textAlign: 'center',
		fontSize: 18
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
			createNewTodo(item, minKey);
			return;
		}

		todos.todo.map(todo => {
			if (todo.key > maxKey) {
				maxKey = todo.key;
			}
		});

		createNewTodo(item, maxKey + 1);
	}

	renderTodoItem = ({ item }) => (
		<View style={styles.todoItemContainer}>
			<View style={styles.infoContainer}>
				<Text key={item.key} style={styles.text}>
					{item.description}
				</Text>
			</View>
		</View>
	);

	renderInput() {
		const { inputIsActive, inputBox } = this.state;
		if (inputIsActive) {
			return (
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder={'What has to be done...'}
						onChangeText={text => this.setState({ inputBox: text })}
						/* onBlur={() => {
							setTimeout(() => {
								this.toggleInput();
							}, 250);
						}} */
						autoFocus={true}
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
		createNewTodo: state.createNewTodo,
		todos: state
	};
};

export default connect(
	mapStateToProps,
	{ createNewTodo, getAllTodos }
)(TodoList);
