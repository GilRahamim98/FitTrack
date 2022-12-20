import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image } from "react-native"
import { useSelector, useDispatch } from 'react-redux';
import Calendar from '../components/Calendar';



const events = [
    { start: '2022-12-19 00:30:00', end: '2022-12-19 01:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2022-12-19 18:30:00', end: '2022-12-19 18:45:00', title: 'Momo', summary: 'Papa' },
    { start: '2022-12-19 01:30:00', end: '2022-12-19 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2022-12-19 04:10:00', end: '2022-12-19 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2022-12-19 01:05:00', end: '2022-12-19 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2022-12-19 14:30:00', end: '2022-12-19 16:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-08 01:20:00', end: '2017-09-08 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-08 04:10:00', end: '2017-09-08 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-08 00:45:00', end: '2017-09-08 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-08 11:30:00', end: '2017-09-08 12:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-09 01:30:00', end: '2017-09-09 02:00:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-09 03:10:00', end: '2017-09-09 03:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-09 00:10:00', end: '2017-09-09 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' }
]




const Home = ({ navigation }) => {
    const { id, email, password } = useSelector(state => state.userReducer);
    const addWorkoutEvent = (workoutEvent) => {
        events.push(workoutEvent)

    }

    return (
        <>
            <View style={styles.container}>
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

            <Calendar events={events} navigation={navigation} addWorkoutEvent={addWorkoutEvent} />

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
    }
})




export default Home