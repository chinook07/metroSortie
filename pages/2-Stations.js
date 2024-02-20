import { useContext, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import toutesLignes from "../donnees/toutesLignes.json";
import { MetroContexte } from '../metroContexte';

export default function Stations({ navigation }) {

    const { ligneChoisie, direction, envers, setEnvers, setDestination } = useContext(MetroContexte);

    useEffect(() => {
        if (direction === donneesLigne.terminus[1]) {
            setEnvers(true);
        } else {
            setEnvers(false);
        }
    }, [])

    const donneesLigne = toutesLignes.find(ligne => ligne.ligne === ligneChoisie);

    const toutesStations = [];
    donneesLigne.stations.forEach(station => {
        let nomStation = Object.keys(station)[0];
        toutesStations.push(nomStation);
    });

    if (envers) toutesStations.reverse();

    const versPortes = (debarquer) => {
        console.log(debarquer);
        setDestination(debarquer);
        navigation.navigate("Portes")
    }
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={[styles.titre, styles[donneesLigne.couleur]]}>Vous débarquez où?</Text>
                {
                    toutesStations.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => versPortes(item)}
                                style={[styles.bouton, index === 0 && styles.inactif]}
                            >
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </ScrollView>
    )

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titre: {
        textAlign: "center",
        fontSize: 20
    },
    bouton: {
        // width: 100%
    },
    verte: {
        backgroundColor: "#008E4F",
        color: "white",
        textAlign: "center"
    },
    orange: {
        backgroundColor: "#EF8122",
        textAlign: "center"
    },
    jaune: {
        backgroundColor: "#FFE300",
        textAlign: "center"
    },
    bleue: {
        backgroundColor: "#0083C9",
        color: "white",
        textAlign: "center"
    },
    inactif: {
        // backgroundColor: 'gray',
        opacity: 0.5
    }
});