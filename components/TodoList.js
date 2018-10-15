import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getAllTodos } from '../actions/todoActions';

import ListItem from './ListItem';
import ListInput from './ListInput';

const styles = StyleSheet.create({
	container: {
		marginTop: 18,
		backgroundColor: '#fff'
	},
	listHeader: {
		marginTop: 14,
		fontSize: 32,
		textAlign: 'center',
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderColor: 'gray'
	}
});

class TodoList extends React.Component {
	componentDidMount() {
		const { getAllTodos } = this.props;
		getAllTodos();
	}

	render() {
		const { todo } = this.props.todos;
		return (
			<View style={styles.container}>
				<FlatList
					ListHeaderComponent={
						<Text style={styles.listHeader}>Today's tasks</Text>
					}
					renderItem={({ item }) => <ListItem item={item} />}
					data={todo}
					ListFooterComponent={() => <ListInput />}
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
	{ getAllTodos }
)(TodoList);
