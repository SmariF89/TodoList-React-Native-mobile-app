import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/reducers';
import { StyleSheet, View } from 'react-native';

import TodoList from './components/TodoList';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
});

export default class App extends React.Component {
	render() {
		return (
			<Provider store={createStore(reducers)}>
				<View style={styles.container}>
					<TodoList />
				</View>
			</Provider>
		);
	}
}
