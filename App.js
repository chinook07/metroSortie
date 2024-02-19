import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Lignes from "./pages/Lignes";
import Stations from "./pages/Stations";
import Portes from "./pages/Portes";
import Provider from "./metroContexte";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Lignes" component={Lignes} />
                    <Stack.Screen name="Stations" component={Stations} />
                    <Stack.Screen name="Portes" component={Portes} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
        
    );
}