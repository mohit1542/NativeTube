import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image , ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import API from "../API/API";

const VideoList = () => {

    const [value, setValue] = useState('')
    const [videoData, setVideoData] = useState([])
    const [loading, setLoading] =useState(false)

    const navigation = useNavigation()

    const fetchData = () => {
        setLoading(true)
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=${API.API_Key}`)
            .then(res => res.json())
            .then(data => {
                //console.log(data.items)
                setLoading(false)
                setVideoData(data.items)
            })
    }

    const RenderCard = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Player',{
                    vidId:item.id.videoId,
                    thumbnail: item.snippet.thumbnails.high.url
                })}
                delayPressIn={100}
                style={styles.mycard}
            >
                <Image
                    source={{ uri: `https://i.ytimg.com/vi/${item.id.videoId}/hqdefault.jpg` }}
                    style={{ width: 100, height: 70, flex:0.3, borderRadius:10 }}
                />
                <View style={{flexDirection:'column', flex:0.7, marginLeft:'3%'}}>
                    <Text>{item.snippet.title}</Text>
                    <Text>{item.snippet.channelTitle}</Text>
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <View style={{ flex: 1 }}>

            <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                    placeholder='Search Video'
                    style={styles.textInput}
                    autoCapitalize='none'
                    value={value}
                    onChangeText={(text) => setValue(text)}
                />
            </View>

            <View style={{ flex: 0.9 }}>

                {loading ? (<ActivityIndicator size ='large' color='blue' />) : null}
                

                <FlatList
                    style={{ height: 100 }}
                    data={videoData}
                    renderItem={({ item }) => <RenderCard item={item} />}
                    keyExtractor={(item) => item.id.videoId}
                />


                <Button title="show data" onPress={fetchData} />
            </View>
        </View>
    )
}

export default VideoList


const styles = StyleSheet.create({
    textInput: {
        //flex:1,
        color: '#05375a',
        paddingLeft: 10,
        width: '95%',
        height: 40,
        borderWidth: 1,
        borderRadius: 12
    },
    mycard: {
        //flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        margin: 3,
        padding: 15,
        borderWidth: 0.2,
        borderBottomColor: "grey",
        borderRadius: 15,
        height: 100,
        flexDirection: 'row'
    },
})