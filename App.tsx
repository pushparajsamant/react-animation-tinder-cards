import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import Welcome from "./components/Welcome";
import {Pet} from "./components/Pet";
import Ball from "./components/Ball";
import CardStack from "./components/CardStack";
import React from "react";
import {Button, Card} from '@rneui/base';
const DATA = [
  { id: 1, text: 'Card #1', uri: 'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4' },
  { id: 2, text: 'Card #2', uri: 'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4' },
  { id: 3, text: 'Card #3', uri: 'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4' },
  { id: 4, text: 'Card #4', uri: 'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4' },
  { id: 5, text: 'Card #5', uri: 'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4' },
  { id: 6, text: 'Card #6', uri: 'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4' },
  { id: 7, text: 'Card #7', uri: 'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4' },
  { id: 8, text: 'Card #8', uri: 'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4' },
];
export default function App() {
  const swipeLeft = () => {

  }
  const renderCard = (item: any): React.ReactElement => {
    return (
        <Card key={item.id}>
          <View style={{position:"relative",alignItems:"center"}}>
            <Image
                style={{width:"100%",height:100}}
                resizeMode="contain"
                source={{ uri: item.uri }}
            />
            <Text>{item.text}</Text>
          </View>
          <Button title={'Tap Here'}></Button>
        </Card>
    )
  }
  const renderNoMoreCards = () => {
    return (
        <Card>
          <View style={{position:"relative",alignItems:"center"}}>
            <Image
                style={{width:"100%",height:100}}
                resizeMode="contain"
                source={{ uri: 'https://www.avac.org/sites/default/files/styles/217wide/public/resources/images/NDNM-Manifesto-thumb.png?itok=EazFkcBw' }}
            />
            <Text>No More Cards</Text>
          </View>
          <Button title={'Tap Here to Load More'}></Button>
        </Card>
    );
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <CardStack data={DATA} renderCard={renderCard} renderNoMoreCards={renderNoMoreCards}/>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 18,
    color: 'green',
    fontWeight: '600',
  }
});
