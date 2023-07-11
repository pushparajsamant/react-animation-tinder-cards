import React, {useEffect, useState} from 'react';
import {Animated, Dimensions, PanResponder, View, Text, StyleSheet, LayoutAnimation, UIManager} from "react-native";
import {Card} from "@rneui/base";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;


type CardStackProps = {
    data: Array<any>,
    renderCard: (item: any) => {},
    swipeLeft?: () => {},
    swipeRight?: () => {},
    renderNoMoreCards: () => {}

}
function CardStack({data, renderCard, swipeLeft, swipeRight, renderNoMoreCards}: CardStackProps) {

    const [indexVisible, setIndexVisible] = useState(0);
    const position = new Animated.ValueXY();
    useEffect(() => {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();

    }, [indexVisible]);

    function resetPosition() {
        Animated.spring(position, {
            useNativeDriver: false,
            toValue: {x: 0, y: 0}
        }).start();
    }

    function swipeCard(direction: string) {
        const x = direction == 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(position, {
            useNativeDriver: false,
            toValue: {x, y: 0}
        }).start(() => {
            if(direction == 'left') {
                swipeLeft();
            } else if(direction == 'right') {
                swipeRight();
            }
            setIndexVisible(prevState => prevState + 1);
        })
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
            //console.log(gesture);
            position.setValue({x: gesture.dx, y: gesture.dy});
        },
        onPanResponderRelease: (event, gesture) => {
            if(gesture.dx > SWIPE_THRESHOLD) {
                swipeCard('right');
            } else if(gesture.dx < -SWIPE_THRESHOLD) {
                swipeCard('left');
            } else {
                resetPosition();
            }

        }
    })

    const getStyle = () => {
        const rotate = position.x.interpolate({
            inputRange: [-500, 0, 500],
            outputRange: ['-120deg', '0deg', '120deg']
        })
        return {...position.getLayout(), transform: [{rotate: rotate}]};
    }
    const renderCards = (items: Array<any>) => {
        if(indexVisible >= data.length) {
            console.log('No more cards');

            return renderNoMoreCards();
        }
        return data.map((item:any, index) => {
            if(index == indexVisible) {
                return (
                    <Animated.View style={[getStyle(), styles.cardLocationStyle]}{...panResponder.panHandlers}>
                        {renderCard(item)}
                    </Animated.View>
                )
            } else if(index < indexVisible) {
                console.log(indexVisible);
                return null;
            }
            //Sending animated view coz if View is changed to Animated View the components inside are re-rendered causing a flashing of the image inside the card
            //We use index - indexVisible since we want to move the card only that many times as its far from the top card at the moment.
            return (<Animated.View key={item.id} style={[styles.cardLocationStyle, { top: 10 * (index - indexVisible)}]}>{renderCard(item)}</Animated.View>);
        }).reverse();
    }
    return (
        <View>
            {renderCards()}
        </View>
    );
}
CardStack.defaultProps = {
    swipeLeft: () => {},
    swipeRight: () => {},
    renderNoMoreCards: () => {}
}
export default CardStack;

const styles = StyleSheet.create({
    cardLocationStyle: {position: 'absolute',width: SCREEN_WIDTH}
});

