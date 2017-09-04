import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import SearchForm from './SearchForm'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider, gql, graphql } from 'react-apollo'
import List from './List'

const networkInterface = createNetworkInterface({
  uri: "https://api.github.com/graphql"
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    req.options.headers.authorization = "Bearer 7b2992d0d5136f6618022d5d8d4ce8de881c944a"
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface
})

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ""
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(name) {
    this.setState({
      text: name
    })
  }

  render() {  

    const ListWithData = (this.state.text.length === 0) ? Text : graphql(query, {
      options: {
        variables: {
          name: this.state.text
        }
      }
    })(List)  
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}> 
          <SearchForm onSearch={this.handleSearch} />
          <View style={{height: "50%"}}><ListWithData /></View>
        </View>
      </ApolloProvider>
    );
  }
} 

const query = gql`
  query Repositories($name: String!) {
    repositoryOwner(login: $name) {
      repositories(last: 10) {
        nodes {
          id
          name
        }
      }
    }
  }
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});