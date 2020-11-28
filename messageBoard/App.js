/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  FlatList,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MessageDetails from './MessageDetailScreen'
const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const [count, setMessageList] = useState([]);
  const [user, setUserDetail] = useState([]);

  useEffect(() => {
    getMoviesFromApi()
  }, [])

  getMoviesFromApi = async () => {
    try {
      const userResponse = await fetch('https://jsonplaceholder.typicode.com/users');
      const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
      const jsonUser = await userResponse.json();
      const jsonPost = await postResponse.json();
      jsonPost.sort((a, b) => a.id - b.id);
      newobj = jsonPost.map(
        post => (
          {
            postId: post.id,
            postTitle: post.title,
            postBody: post.body,
            userName: jsonUser.filter(
              user => (post.userId == user.id)
            )[0].name
          }
        )
      )
      setMessageList(newobj);
    }
    catch (error) {
      console.error(error);
    }
  }

  getListViewItem = (item, navigation) => {
    return (
      <TouchableHighlight
        underlayColor="#DDDDDD"
        onPress={() =>
          navigation.navigate('MessageDetails', { item, header: item.postTitle })} >
        <View style={styles.cardview}>
          <Text style={styles.title} numberOfLines={1}> {item.userName}</Text>
          <Text numberOfLines={1}> {item.postTitle}</Text>
        </View>
      </TouchableHighlight>)
  }

  function getHomeScreen({ navigation }) {
    return (
      count.length == 0 ?
        <View><Text>Loading Messages....</Text></View>
        :
        <FlatList
          data={count}
          keyExtractor={item => item.postId.toString()}
          renderItem={({ item }) =>
            getListViewItem(item, navigation)
          }
          contentContainerStyle={{
            flexGrow: 1,
          }}
        />
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MessageBoard" component={getHomeScreen} />
        <Stack.Screen name="MessageDetails" component={MessageDetails} options={({ route }) => ({ title: route.params.header })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: 'black'
  },
  cardview: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    elevation: 3,
    maxHeight: 200,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 4,
    padding: 10
  }
});

export default App;