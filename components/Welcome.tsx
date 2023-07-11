import {View, Text} from "react-native";
type WelcomeProps = {
    name: string,
    age: number,
    gender: boolean
}
export default function Welcome({name, age, gender}: WelcomeProps) {
    return (<View><Text>Hello {name}</Text></View>)
}
