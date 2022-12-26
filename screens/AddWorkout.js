import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import validations from "../common/validations";
import uuid from 'react-native-uuid';



const AddWorkout = ({ route, navigation }) => {
    const { id, email, password } = useSelector(state => state.userReducer);
    const { date, editWorkout } = route.params;
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [validForm, setValidForm] = useState({
        validExercises: {
            error: "*Weight, Sets, and Reps need to be numbers only",
            valid: true
        },
        vaildHours: {
            error: "*The Ending Time must be after the Starting time",
            valid: true
        },
        validLength: {
            error: "*Enter at least one exercise to continue",
            valid: true
        }

    })

    const [workoutTime, setWorkoutTime] = useState({
        start: editWorkout?.start.split(" ")[1] || "Starting time",
        end: editWorkout?.end.split(" ")[1] || "Ending time",
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
        type === "end" ? checkHours() : null
    };
    const [exercise, setExercise] = useState(
        {
            name: {
                value: ""
            },
            weight: {
                value: "",
                validations: {
                    type: "containsOnlyNumbers"
                }
            },
            sets: {
                value: "",
                validations: {
                    type: "containsOnlyNumbers"
                }
            },
            reps: {
                value: "",
                validations: {
                    type: "containsOnlyNumbers"
                }
            },
        }
    )

    const [exercisesArr, setExercisesArr] = useState(editWorkout?.exercises || [])
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
                <View style={{ flexDirection: "row", marginLeft: "8%" }}>
                    <TextInput
                        style={styles.exerciseInput}
                        placeholder="Weight"
                        value={exercise.weight.value}
                        selectionColor={'#FED049'}
                        onChangeText={(text) => setExerciseData("weight", text)}
                        keyboardType='numeric'
                    />
                    <TextInput
                        style={styles.exerciseInput}
                        placeholder="Sets"
                        value={exercise.sets.value}
                        selectionColor={'#FED049'}
                        onChangeText={(text) => setExerciseData("sets", text)}
                        keyboardType='numeric'
                    />
                    <TextInput
                        style={styles.exerciseInput}
                        placeholder="Reps"
                        value={exercise.reps.value}
                        selectionColor={'#FED049'}
                        onChangeText={(text) => setExerciseData("reps", text)}
                        keyboardType='numeric'
                    />
                    <TouchableOpacity
                        style={styles.buttonAddLike}
                        onPress={() => addExercise()}
                    >
                        <Text style={styles.textInsideButton}>Add</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginLeft: "15%", color: "red", fontWeight: "bold" }}>{validForm.validExercises.valid ? "" : validForm.validExercises.error}</Text>
                <Text style={{ marginLeft: "15%", marginVertical: 5, color: "red", fontWeight: "bold" }}>{validForm.validLength.valid ? "" : validForm.validLength.error}</Text>

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
        let valid = false
        for (const field of Object.keys(exercise)) {
            if ("validations" in exercise[field]) {
                if (validations[exercise[field].validations.type](exercise[field].value)) {
                    if (!validForm.validExercises?.valid) {
                        const newValidForm = validForm
                        newValidForm.validExercises.valid = true
                        setValidForm({ ...newValidForm })
                    }
                    valid = true
                } else {
                    const newValidForm = validForm
                    newValidForm.validExercises.valid = false
                    setValidForm({ ...newValidForm })
                    valid = false
                    return
                }
            }
        }
        if (valid) {
            for (const field of Object.keys(exercise)) {
                exerciseToAdd[field] = exercise[field].value
                exercise[field].value = ""
            }
            setExercisesArr(prev => [...prev, exerciseToAdd])

        }


    }
    const editExercise = (exe, index) => {
        for (const field of Object.keys(exe)) {
            exercise[field].value = exe[field]
        }
        deleteExercise(index)
    }

    const deleteExercise = (index) => {
        const newArr = [...exercisesArr]
        newArr.splice(index, 1)
        setExercisesArr([...newArr])
    }
    const checkHours = () => {
        if (workoutTime.start !== "Starting time" && workoutTime.end !== "Ending time") {
            if (validations.checkIfTimeIsBefore(workoutTime.start, workoutTime.end)) {
                if (!validForm.vaildHours?.valid) {
                    const newValidForm = validForm
                    newValidForm.vaildHours.valid = true
                    setValidForm({ ...newValidForm })
                }
            } else {
                const newValidForm = validForm
                newValidForm.vaildHours.valid = false
                setValidForm({ ...newValidForm })
            }
        } else {
            const newValidForm = validForm
            newValidForm.vaildHours.valid = false
            setValidForm({ ...newValidForm })
        }
    }
    const checkExercisesArrLength = () => {
        if (exercisesArr.length >= 1) {
            const newValidForm = validForm
            newValidForm.validLength.valid = true
            setValidForm({ ...newValidForm })
        } else {
            const newValidForm = validForm
            newValidForm.validLength.valid = false
            setValidForm({ ...newValidForm })
        }
    }


    const saveWorkout = () => {
        let valid = false
        checkHours()
        checkExercisesArrLength()
        for (const field of Object.keys(validForm)) {
            if (!validForm[field].valid) {
                valid = false
                return
            }
            valid = true
        }
        if (valid) {
            const savedDate = new Date(Date.parse(date))
            const year = savedDate.getFullYear();
            const month = String(savedDate.getMonth() + 1).padStart(2, "0");
            const day = String(savedDate.getDate()).padStart(2, "0");
            const finalDate = `${year}-${month}-${day}`
            const finalWorkout = {
                id: uuid.v4(),
                start: `${finalDate} ${workoutTime.start}`,
                end: `${finalDate} ${workoutTime.end}`,
                title: "Gym Workout",
                summary: `${exercisesArr.length} exercises was done!`,
                exercises: [...exercisesArr]
            }
            editWorkout ?
                navigation.navigate({
                    name: "Home",
                    params: { workoutEvent: finalWorkout, edit: true, editId: editWorkout?.id },
                    merge: true
                })
                :
                navigation.navigate({
                    name: "Home",
                    params: { workoutEvent: finalWorkout, edit: false },
                    merge: true
                })
        }


    }


    return (
        <View style={styles.container}>
            <Text>{date}</Text>

            <View style={{ flexDirection: "row", marginTop: 80 }}>
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
                    is24Hour
                />
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
                    is24Hour
                />
            </View>
            <Text style={{ color: "red", fontWeight: "bold" }}>{validForm.vaildHours.valid ? "" : validForm.vaildHours.error}</Text>



            {createExercise()}
            <View>
                {exercisesArr.map((exe, index) => {
                    return (
                        <View key={`${exe.name} - ${index}`} style={{ flexDirection: "row", marginVertical: 5 }}>
                            <Text style={styles.exerciseText} onPress={() => editExercise(exe, index)}>{exe.name} : {exe.weight} * {exe.sets} * {exe.reps}</Text>
                            <TouchableOpacity
                                style={styles.buttonEditLike}
                                onPress={() => deleteExercise(index)}

                            >
                                <Text style={styles.textInsideButton}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

                )}
            </View>
            <View style={{ flexDirection: "row", marginVertical: 80 }}>
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
    exerciseText: {
        fontSize: 30,
        fontWeight: "bold"

    },
    buttonEditLike: {
        justifyContent: 'center',
        backgroundColor: '#FED049',
        paddingHorizontal: 10,
        height: 40,
        width: 100,
        borderRadius: 30,
        alignItems: 'center',
        marginLeft: 10
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
        marginVertical: 10,
        justifyContent: 'center',
        backgroundColor: '#FED049',
        paddingHorizontal: 10,
        height: 40,
        width: 100,
        borderRadius: 30,
        alignItems: 'center',
        marginLeft: 10
    },
    buttonLike: {
        marginTop: 16,
        justifyContent: 'center',
        backgroundColor: '#FED049',
        padding: 8,
        height: 50,
        width: 150,
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal: 30
    },
    buttonTimeLike: {
        marginTop: 16,
        justifyContent: 'center',
        backgroundColor: '#FED049',
        padding: 8,
        height: 50,
        width: 150,
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