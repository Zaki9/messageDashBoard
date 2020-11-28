import { FlatList, View, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

function MessageDetails({ route }) {
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState(route.params.item);
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
    return (
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <View style={{ margin: 10 }}>
                <Text style={styles.title, { fontSize: 25 }}> {message.userName}</Text>
                <Text>{message.postBody}</Text>
            </View>
            {getCommentList()}
        </View>
    );
}

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
    }
});
export default MessageDetails