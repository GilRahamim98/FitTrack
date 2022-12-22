import { useEffect, useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity, Pressable, Image } from "react-native"
import { useSelector, useDispatch } from 'react-redux';
import Calendar from '../components/Calendar';



const events = []

const Home = ({ route, navigation }) => {
    const { id, email, password } = useSelector(state => state.userReducer);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        if (route.params?.edit === true) {
            const editIndex = events.find(workout => workout.id === route.params?.editId)
            editIndex ? events.splice(editIndex, 1) : null
            events.push(route.params?.workoutEvent)
            setModalVisible(true)
            setTimeout(() => {
                setModalVisible(false)
            }, 1000)
        } else if (route.params?.workoutEvent) {
            events.push(route.params?.workoutEvent)
            setModalVisible(true)
            setTimeout(() => {
                setModalVisible(false)
            }, 1000)
        }
        // else if (route.params?.deleteWorkout) {
        //     const editIndex = events.find(workout => workout.id === route.params?.deleteWorkout)
        //     editIndex ? events.splice(editIndex, 1) : null
        // }

    }, [route.params?.workoutEvent])


    return (
        <>
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Saved!</Text>

                        </View>
                    </View>
                </Modal>

                <TouchableOpacity style={{ flex: 1 }}>
                    <Image source={require('../assets/avatar.webp')} style={styles.tinyLogo} />
                </TouchableOpacity>
                <View style={{ marginRight: 10 }}>
                    <TouchableOpacity style={styles.settings}>
                        <Text style={styles.textInsideButton}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.calories}>
                        <Text style={styles.textInsideButton}>Calories Burned</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <Calendar events={events} navigation={navigation} />

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    textInsideButton: {
        fontWeight: "bold",
        fontFamily: 'Lato-Regular',

    },
    settings: {

        marginTop: 80,
        backgroundColor: '#FED049',
        padding: 15,
        height: 50,
        width: 150,
        borderRadius: 50,
        alignItems: 'center',
    },
    calories: {
        marginTop: 10,
        backgroundColor: '#FED049',
        padding: 15,
        height: 50,
        width: 150,
        borderRadius: 50,
        alignItems: 'center',
    },
    tinyLogo: {
        marginTop: 80,
        marginLeft: 20,
        width: 120,
        height: 120,
        borderRadius: 100
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})




export default Home