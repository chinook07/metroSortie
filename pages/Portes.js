import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Portes() {
    return (
        <View style={styles.container}>
            <View>
                <Text>Ligne 1 – verte</Text>
                <View>
                    <Button title='vers Honoré-Beaugrand'>
                        
                    </Button>
                </View>
                
            </View>
            <View>
                <Text>Ligne 2 – orange</Text>
            </View>
            <View>
                <Text>Ligne 4 – jaune</Text>
            </View>
            <View>
                <Text>Ligne 5 – bleue</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
