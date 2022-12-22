import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import moment from 'moment'


const Workout = ({ route, navigation }) => {
    const [dateAndTime, setDateAndTime] = useState({
        date: "",
        time: ""
    })
    const { workout } = route.params;
    useEffect(() => {
        setDateAndTime(getDate())

    }, [])

    const getDate = () => {
        const date = workout.start.split(" ")[0].split("-")
        const startTime = workout.start.split(" ")[1].split("-")
        const endTime = workout.end.split(" ")[1].split("-")
        let temp = date[0]
        date[0] = date[2]
        date[2] = temp
        return { date: date.join("/"), time: `${startTime} - ${endTime}` }
    }
    const createExerciseList = () => {
        return workout.exercises?.map((exe, index) => <View key={`${exe.name} - ${index}`} style={{ flexDirection: "row", marginVertical: 5 }}>
            <Text style={styles.exerciseText} >{exe.name} : {exe.weight} * {exe.sets} * {exe.reps}</Text>

        </View>)
    }
    return (
        <>
            <TouchableOpacity style={styles.buttonLike} onPress={() => navigation.navigate("Home")}>
                <Image source={require('../assets/back.png')} style={styles.arrow} />
            </TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.exerciseText}>{`${workout.title} ${dateAndTime.date}:`}</Text>
                <Text style={styles.exerciseText}>{dateAndTime.time}</Text>

                {createExerciseList()}
                <TouchableOpacity style={styles.buttonEditLike} onPress={() => navigation.navigate("AddWorkout", {
                    date: moment(workout.start.split(" ")[0]).format('DD MMMM YYYY'),
                    editWorkout: workout
                })}>
                    <Text style={styles.textInsideButton}>Edit</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.buttonEditLike} onPress={() => navigation.navigate("Home", {
                    deleteWorkout: workout.id
                })}>
                    <Text style={styles.textInsideButton}>Delete</Text>
                </TouchableOpacity> */}

            </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    exerciseText: {
        fontSize: 30,
        fontWeight: "bold",
    },
    buttonLike: {
        marginTop: 32,
        justifyContent: 'center',
        backgroundColor: '#FED049',
        padding: 8,
        height: 30,
        width: 30,
        borderRadius: 20,
        alignItems: 'center',
    },
    arrow: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    buttonEditLike: {
        justifyContent: 'center',
        backgroundColor: '#FED049',
        paddingHorizontal: 10,
        height: 40,
        width: 100,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 250,
        marginLeft: 250
    },
    textInsideButton: {
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: 'Lato-Regular',

    },

});


export default Workout
