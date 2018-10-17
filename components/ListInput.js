import React from 'react';
import {
	TouchableOpacity,
	View,
	Text,
	TextInput,
	StyleSheet
} from 'react-native';
import { createNewTodo } from '../actions/todoActions';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
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
});

class ListInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inputBox: '',
			inputIsActive: false
		};
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

	render() {
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
							if (inputBox === '' || /^\s*$/.test(inputBox)) {
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
}

const mapStateToProps = state => {
	return {
		todos: state
	};
};

export default connect(
	mapStateToProps,
	{ createNewTodo }
)(ListInput);
