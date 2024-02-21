import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import { MetroContexte } from '../metroContexte';
import toutesLignes from "../donnees/toutesLignes.json";

export default function Portes({ navigation }) {

    const { ligneChoisie, setLigneChoisie, setDirection, destination, setDestination, envers, setEnvers } = useContext(MetroContexte);

    const toutesStations = toutesLignes.find(ligne => ligne.ligne === ligneChoisie).stations;
    const voitures = toutesStations.find(obj => obj.hasOwnProperty(destination))[destination];

    let voiture;
    if (envers) { voiture = voitures[1] } else { voiture = voitures[0] }

    const retour = () => {
        navigation.navigate("Lignes");
        setLigneChoisie(null);
        setDirection(null);
        setDestination(null);
    }
    
    return (
        <View style={styles.container}>
            {
                Array.isArray(voiture)
                    ? <>
                        <Text style={styles.nuit}>Attention! Plusieurs sorties sont possibles.</Text>
                        {
                            voiture.map((sortie, index) => {
                                return (
                                    <Text key={index} style={styles.nuit}>Sortie {sortie.sortie} : voiture {sortie.voiture}</Text>
                                )
                            })
                        }
                    </>
                    : <Text style={styles.nuit}>Embarquez dans la voiture {voiture}</Text>
            }
            <Text style={styles.nuit}>pour débarquer à {destination}</Text>
            <TouchableOpacity onPress={retour} style={styles.retour}>
                <FontAwesomeIcon icon={ faHouse } color='white' />
                <Text style={styles.nuit}>Retour</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#363636",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    retour: {
        flexDirection: "row",
        gap: 5
    },
    nuit: {
        color: "white"
    }
});
