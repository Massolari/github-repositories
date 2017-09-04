import React from 'react'
import { Text, FlatList, View, Modal, ActivityIndicator } from 'react-native'

const List = ({data}) => {
  if (data.loading) {
    return <ActivityIndicator size='large' />
  }
  if (data.repositoryOwner == null) {
    return <Text>Username not found!</Text>
  }
  // const ar = data.repositoryOwner.repositories.nodes.map((item => <Text key={item.id}>{item.name}</Text>))
  // return <View>{ar}</View>
  return <FlatList  data={data.repositoryOwner.repositories.nodes} keyExtractor={item => item.id} renderItem={({item}) => <Text>{item.name}</Text>} />
}
export default List