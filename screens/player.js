
import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert, Text } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";


const Player = ({route}) => {
  const [playing, setPlaying] = useState(false);

  const playerRef = useRef()

  const {vidId} = route.params;

  const onStateChange = useCallback((state) => {
    

    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View>
      <YoutubePlayer
      ref={playerRef}
        height={300}
        play={playing}
        videoId={vidId}
        onChangeState={onStateChange}
        //allowWebViewZoom={true}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
      
    </View>
  );
}

export default Player
