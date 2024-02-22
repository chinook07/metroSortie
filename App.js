import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Provider from "./metroContexte";
import Lignes from "./pages/1-Lignes";
import Stations from "./pages/2-Stations";
import Portes from "./pages/3-Portes";

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