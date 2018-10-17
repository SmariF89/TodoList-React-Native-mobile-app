import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Swipeable from 'react-native-swipeable';
import { removeTodo } from '../actions/todoActions';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
	todoItemContainer: {
		flex: 1,
		flexDirection: 'row',
		paddingTop: 10,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderColor: 'gray'
	},
	todoItemContainerOverDue: {
		flex: 1,
		flexDirection: 'row',
		paddingTop: 10,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderColor: 'gray',
		backgroundColor: '#f2baba'
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
});

class ListItem extends React.Component {
	deleteToDoItem(item) {
		const { removeTodo } = this.props;
		removeTodo(item.key);
	}

	render() {
		const { item } = this.props;
		const dueTime = new Date(item.timeStamp);
		const overDue = new Date() > dueTime;
		return (
			<Swipeable
				style={
					overDue
						? styles.todoItemContainerOverDue
						: styles.todoItemContainer
				}
				rightButtons={[
					<TouchableOpacity
						onPress={() => this.deleteToDoItem(item)}
						style={styles.rightSwipeItem}>
						<Text style={styles.swipeText}>Delete</Text>
					</TouchableOpacity>
				]}>
				<View style={styles.infoContainer}>
					<Text key={item.key} style={styles.text}>
						{`${item.description} - ${dueTime.toLocaleString()}`}
					</Text>
				</View>
			</Swipeable>
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
	{ removeTodo }
)(ListItem);
