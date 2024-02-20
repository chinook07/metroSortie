import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import { MetroContexte } from '../metroContexte';
import toutesLignes from "../donnees/toutesLignes.json";

export default function Portes({ navigation }) {

    const { ligneChoisie, destination, envers } = useContext(MetroContexte);
    console.log(destination);

    const toutesStations = toutesLignes.find(ligne => ligne = ligneChoisie).stations;
    const voitures = toutesStations.find(obj => obj.hasOwnProperty(destination))[destination];

    let voiture;
    if (envers) { voiture = voitures[1] } else { voiture = voitures[0] }
    console.log(voiture);
    
    return (
        <View style={styles.container}>
            {
                Array.isArray(voiture)
                    ? <>
                        <Text>Attention! Plusieurs sorties sont possibles.</Text>
                        {
                            voiture.map((sortie, index) => {
                                return (
                                    <Text key={index}>Sortie {sortie.sortie} : voiture {sortie.voiture}</Text>
                                )
                            })
                        }
                    </>
                    : <Text>Embarquez dans la voiture {voiture}</Text>
            }
            <Text>pour débarquer à {destination}</Text>
            <TouchableOpacity>
                <Text>Retour</Text>
            </TouchableOpacity>
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
