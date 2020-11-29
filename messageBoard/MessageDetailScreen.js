import { TouchableOpacity, TextInput, FlatList, View, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

function MessageDetails({ route }) {
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState(route.params.item);
    const [userComment, setUserComment] = useState("");
    const random = Math.floor(Math.random() * 1000) + 1;

    async function getComments() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments?postId=' + message.postId);
            const json = await response.json();
            setComments(json);
            return json;
        }
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getComments()
    }, [])

    function getCommentList() {
        return (
            comments.length == 0 ?
                <View></View>
                :
                <FlatList
                    data={comments}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <View style={styles.cardview}>
                            <Text style={styles.title}> {item.name}</Text>
                            <Text> {item.body}</Text>
                        </View>
                    }
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                />
        )
    }

    function postComment() {
        if (userComment != null || userComment.length != 0) {
            setComments(
                comments.concat({
                    "postId": random + 1,
                    "id": random,
                    "body": userComment,
                    "name": "Test User",
                    "email": "testUser@test.com"
                }))
            setUserComment("")
        }
    }
    return (
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <View style={{ margin: 10 }}>
                <Text style={styles.title, { fontSize: 25 }}> {message.userName}</Text>
                <Text>{message.postBody}</Text>
            </View>
            {getCommentList()}
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Place your comment"
                    placeholderTextColor="#841584"
                    onChangeText={(text) => { setUserComment(text) }}
                    value={userComment}
                />
                <TouchableOpacity
                    style={styles.postButton}
                    onPress={
                        () => postComment()
                    }>
                    <Text style={{ color: 'white' }}> Post </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const width_proportion_70 = '70%';

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
        margin: 10,
        borderRadius: 4,
        padding: 10
    },
    input: {
        width: width_proportion_70,
        margin: 10,
        height: 40,
        borderColor: '#841584',
        borderWidth: 1
    },
    postButton: {
        backgroundColor: '#841584',
        padding: 10,
        margin: 10,
        height: 40
    }
});
export default MessageDetails
