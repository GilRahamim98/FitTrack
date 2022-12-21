import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import { Store } from './redux/store';

import Connect from './screens/Connect';
import Login from './screens/Login';
import Home from './screens/Home';
import Register from './screens/Register';
import Workout from './screens/Workout';
import AddWorkout from './screens/AddWorkout';


const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
}

const App = () => {
  const { id } = useSelector(state => state.userReducer);


  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={id ? 'Home' : 'Connect'}>
        <Stack.Screen name='Connect' component={Connect} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Workout' component={Workout} />
        <Stack.Screen name='AddWorkout' component={AddWorkout} />



      </Stack.Navigator>
    </NavigationContainer>

  );
}

const AppWrapper = () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  )
}
export default AppWrapper;

