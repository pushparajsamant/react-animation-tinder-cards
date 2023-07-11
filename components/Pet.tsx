import {View, Text} from "react-native";
type PetProps = {
    name: string,
}

export const Pet = (props: PetProps) => {
    return (<View><Text>Pet</Text></View>);
}
