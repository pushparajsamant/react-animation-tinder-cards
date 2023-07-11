import React, {useEffect} from 'react';
import {StyleSheet, View, Animated} from "react-native";

const Ball = () => {
    const position = new Animated.ValueXY({x: 0, y: 0});
    useEffect(() => {

        Animated.spring(position, {
            useNativeDriver: false,
            toValue: {x: 300, y: 500}
        }).start();
    },[]);

    return (
        <Animated.View style={position.getLayout()}>
            <View style={styles.circle}></View>
        </Animated.View>
    );
};

export default Ball;

const styles = StyleSheet.create({
    circle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#000',

    }
})
