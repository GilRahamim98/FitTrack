import { View, Text } from "react-native"

const Workout = ({ route, navigation }) => {
    const { workout } = route.params;
    return (
        <View>
            <Text>{JSON.stringify(workout.title)}</Text>
        </View>
    )
}

export default Workout
