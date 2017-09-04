import React, { Component } from 'react'
import { StyleSheet, TextInput, Button, View, Text } from 'react-native'

export default class SearchForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			text: ''
		};
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(text) {
		this.setState({
			text: text
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput style={styles.input} placeholder="Username"  onChangeText={this.handleChange}/>
				<Button title="Browse repositories" onPress={() => this.props.onSearch(this.state.text)} />
			</View>
		)
	}
}  
 
const styles = StyleSheet.create({
  container: {
  	width: '70%',
  	height: '30%'
  },
  input: {
  	height: '20%',
  	textAlign: 'center'
  }
});