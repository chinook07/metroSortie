import { useContext, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
                                <Text style={styles.nuit}>{item}</Text>
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
        alignItems: "stretch",
        backgroundColor: "#363636",
        flex: 1,
        gap: 10,
        justifyContent: 'center'
    },
    titre: {
        textAlign: "center",
        fontSize: 20,
        padding: 10
    },
    bouton: {
        justifyContent: 'center',
        padding: 10
    },
    verte: {
        backgroundColor: "#008E4F",
        color: "white",
    },
    orange: {
        backgroundColor: "#EF8122",
    },
    jaune: {
        backgroundColor: "#FFE300",
    },
    bleue: {
        backgroundColor: "#0083C9",
        color: "white",
    },
    lime: {
        backgroundColor: "#85BE00",
    },
    inactif: {
        opacity: 0.5
    },
    nuit: {
        color: "white"
    }
});
