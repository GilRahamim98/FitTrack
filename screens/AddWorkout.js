import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const AddWorkout = ({ route, addWorkoutEvent, navigation }) => {
    const { id, email, password } = useSelector(state => state.userReducer);
    const { date } = route.params;
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    console.log(route)

    const [workoutTime, setWorkoutTime] = useState({
        start: "Choose Starting time",
        end: "Choose Ending time",
        date: ""
    })

    const showStartPicker = () => {
        setStartTimePickerVisibility(true);
    };

    const hideStartPicker = () => {
        setStartTimePickerVisibility(false);
    };
    const showEndPicker = () => {
        setEndTimePickerVisibility(true);
    };

    const hideEndPicker = () => {
        setEndTimePickerVisibility(false);
    };
    const handleConfirm = (dateTime, type) => {
        const date = new Date(dateTime)
        const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        const currentInput = workoutTime
        currentInput[type] = `${hour}:${minutes}:00`
        setWorkoutTime({ ...workoutTime })
        type === "start" ? hideStartPicker() : hideEndPicker();
    };
    const [exercise, setExercise] = useState(
        {
            name: {
                value: ""
            },
            weight: {
                value: ""
            },
            sets: {
                value: ""
            },
            reps: {
                value: ""
            },
        }
    )

    const [exercisesArr, setExercisesArr] = useState([])
    const setExerciseData = (name, value) => {
        const currentInput = exercise[name]
        currentInput.value = value
        setExercise({ ...exercise })
    }

    const createExercise = () => {
        return (
            <View>
                <TextInput
                    style={styles.exerciseNameInput}
                    placeholder="Exercise Name"
                    value={exercise.name.value}
                    selectionColor={'#FED049'}
                    onChangeText={(text) => setExerciseData("name", text)}

                />
                <View style={{ flexDirection: "row" }}>

                    <TextInput
                        style={styles.exerciseInput}
                        placeholder="Weight"
                        value={exercise.weight.value}
                        selectionColor={'#FED049'}
                        onChangeText={(text) => setExerciseData("weight", text)}

                    />
                    <TextInput
                        style={styles.exerciseInput}
                        placeholder="Sets"
                        value={exercise.sets.value}
                        selectionColor={'#FED049'}
                        onChangeText={(text) => setExerciseData("sets", text)}

                    />
                    <TextInput
                        style={styles.exerciseInput}
                        placeholder="Reps"
                        value={exercise.reps.value}
                        selectionColor={'#FED049'}
                        onChangeText={(text) => setExerciseData("reps", text)}
                    />
                    <TouchableOpacity
                        style={styles.buttonAddLike}
                        onPress={() => addExercise()}
                    >
                        <Text style={styles.textInsideButton}>Add</Text>
                    </TouchableOpacity>


                </View>
            </View>

        )
    }
    const addExercise = () => {
        const exerciseToAdd = {
            name: "",
            weight: "",
            sets: "",
            reps: ""
        }
        for (const field of Object.keys(exerciseToAdd)) {
            exerciseToAdd[field] = exercise[field].value
            exercise[field].value = ""
        }
        setExercisesArr(prev => [...prev, exerciseToAdd])


    }
    const saveWorkout = () => {
        const savedDate = new Date(Date.parse(date))
        const year = savedDate.getFullYear();
        const month = String(savedDate.getMonth() + 1).padStart(2, "0");
        const day = String(savedDate.getDate()).padStart(2, "0");
        const finalDate = `${year}-${month}-${day}`
        const finalWorkout = {
            start: `${finalDate} ${workoutTime.start}`,
            end: `${finalDate} ${workoutTime.end}`,
            title: "Gym Workout",
            summary: `${exercisesArr.length} exercises was done!`
        }
        addWorkoutEvent(finalWorkout)
        navigation.navigate("Home")

    }


    return (
        <View style={styles.container}>
            <Text>{date}</Text>

            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                    style={styles.buttonTimeLike}
                    onPress={showStartPicker}
                >
                    <Text style={styles.textInsideButton}>{workoutTime.start}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isStartTimePickerVisible}
                    mode="time"
                    onConfirm={(date) => handleConfirm(date, "start")}
                    onCancel={hideStartPicker}
                    is24Hour />
                <TouchableOpacity
                    style={styles.buttonTimeLike}
                    onPress={showEndPicker}
                >
                    <Text style={styles.textInsideButton}>{workoutTime.end}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isEndTimePickerVisible}
                    mode="time"
                    onConfirm={(date) => handleConfirm(date, "end")}
                    onCancel={hideEndPicker}
                    is24Hour />
            </View>

            {createExercise()}
            <View>
                {exercisesArr.map((exe, index) => {
                    return (
                        <Text key={`${exe.name} - ${index}`}>{exe.name} : {exe.weight} * {exe.sets} * {exe.reps}</Text>
                    )
                }

                )}


            </View>


            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                    style={styles.buttonLike}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={styles.textInsideButton}>Discard</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonLike}
                    onPress={() => saveWorkout()}

                >
                    <Text style={styles.textInsideButton}>Save</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#F1F6F5'
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 30,

    },
    exerciseNameInput: {
        marginLeft: 5,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 30,
    },
    exerciseInput: {
        width: '20%',
        marginLeft: 5,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 30,
    },
    textInsideButton: {
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: 'Lato-Regular',

    },
    buttonAddLike: {
        marginTop: 16,
        justifyContent: 'center',
        backgroundColor: '#FED049',
        padding: 8,
        height: 50,
        width: 100,
        borderRadius: 20,
        alignItems: 'center',
        marginLeft: 10
    },
    buttonLike: {
        marginTop: 16,
        justifyContent: 'center',
        backgroundColor: '#FED049',
        padding: 8,
        height: 50,
        width: 200,
        borderRadius: 20,
        alignItems: 'center',
        marginLeft: 10
    },
    buttonTimeLike: {
        marginTop: 16,
        justifyContent: 'center',
        backgroundColor: '#FED049',
        padding: 8,
        height: 50,
        width: 250,
        borderRadius: 20,
        alignItems: 'center',
        marginLeft: 10
    },
    tinyLogo: {
        marginTop: 130,
        width: 200,
        height: 200,
    }
})


export default AddWorkout