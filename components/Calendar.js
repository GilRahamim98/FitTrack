import { useCallback } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from "react-native"
import { useSelector, useDispatch } from 'react-redux';
import EventCalendar from '../components/EventCalendar'


let { width, height } = Dimensions.get('window')
const calendarHeight = 2480
const leftMargin = 50 - 1

const Calendar = ({ events, addWorkoutEvent, navigation }) => {
    const { id, email, password } = useSelector(state => state.userReducer);

    return (
        <EventCalendar
            events={events}
            width={width}
            eventTapped={(e) => navigation.navigate('Workout', {
                workout: e
            })}
            style={styles}
            navigation={navigation}
            addWorkoutEvent={addWorkoutEvent}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
    },
    contentStyle: {
        backgroundColor: '#ffff',
        height: calendarHeight + 10
    },
    header: {
        paddingHorizontal: 30,
        height: 50,
        marginTop: 40,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E6E8F0',
        backgroundColor: '#F5F5F6',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 16
    },
    arrow: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    event: {
        position: 'absolute',
        backgroundColor: '#F0F4FF',
        opacity: 0.8,
        borderColor: '#DDE5FD',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 4,
        minHeight: 25,
        flex: 1,
        paddingTop: 5,
        paddingBottom: 0,
        flexDirection: 'column',
        alignItems: 'flex-start',
        overflow: 'hidden',
    },
    eventTitle: {
        color: '#615B73',
        fontWeight: '600',
        minHeight: 15,
    },
    eventSummary: {
        color: '#615B73',
        fontSize: 12,
        flexWrap: 'wrap',
    },
    eventTimes: {
        marginTop: 3,
        fontSize: 10,
        fontWeight: 'bold',
        color: '#615B73',
        flexWrap: 'wrap',
    },
    line: {
        height: 1,
        position: 'absolute',
        left: leftMargin,
        backgroundColor: 'rgb(216,216,216)',
    },
    lineNow: {
        height: 1,
        position: 'absolute',
        left: leftMargin,
        backgroundColor: 'red',
    },
    timeLabel: {
        position: 'absolute',
        left: 15,
        color: 'rgb(170,170,170)',
        fontSize: 10,
        fontFamily: 'Lato-Regular',
        fontWeight: '500',
    }
})





export default Calendar