import { useContext, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faElevator } from '@fortawesome/free-solid-svg-icons';

import { MetroContexte } from '../metroContexte';
import toutesLignes from "../donnees/toutesLignes.json";

export default function Stations({ navigation }) {

    const { ligneChoisie, direction, envers, setEnvers, setDestination } = useContext(MetroContexte);

    useEffect(() => {
        setEnvers(direction === donneesLigne.terminus[0]);
    }, [])

    const donneesLigne = toutesLignes.find(ligne => ligne.ligne === ligneChoisie);

    let stationsAccessibles = [];
    donneesLigne.ascenseur.forEach(station => {
        stationsAccessibles.push(Object.keys(station)[0])
    })

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
        <ScrollView contentContainerStyle={styles.container} endFillColor={"#363636"}>
            <Text style={[styles.titre, styles[donneesLigne.couleur]]}>Vous débarquez où?</Text>
            <View style={styles.choix}>
                {
                    toutesStations.map((item, index) => {
                        if (index === 0) {
                            return (
                                <View
                                    key={index}
                                    style={[styles.bouton, styles.inactif]}
                                >
                                    <View style={[styles.carre, styles[donneesLigne.couleur]]}>
                                        <View style={styles.cercle}></View>
                                    </View>
                                    <View style={styles.nomStation}>
                                        <Text style={styles.nomStationTexte}>{item}</Text>
                                    </View>
                                    {
                                        stationsAccessibles.includes(item) && <View>
                                            <FontAwesomeIcon icon={faElevator} style={styles.lift} />
                                        </View>
                                    }
                                </View>
                            )
                        } else return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => versPortes(item)}
                                style={styles.bouton}
                            >
                                <View style={[styles.carre, styles[donneesLigne.couleur]]}>
                                    <View style={styles.cercle}></View>
                                </View>
                                <View style={styles.nomStation}>
                                    <Text style={styles.nomStationTexte}>{item}</Text>
                                </View>
                                {
                                    stationsAccessibles.includes(item) && <View>
                                        <FontAwesomeIcon icon={faElevator} style={styles.lift} />
                                    </View>
                                }
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
        backgroundColor: "#363636",
        justifyContent: 'center'
    },
    titre: {
        flex: 1,
        fontSize: 20,
        padding: 10,
        textAlign: "center"
    },
    choix: {
        flex: 5
    },
    bouton: {
        alignItems: "center",
        flexDirection: "row",
        gap: 10
    },
    carre: {
        alignItems: "center",
        flexDirection: "row",
        height: 50,
        justifyContent: "center",
        width: 30
    },
    cercle: {
        backgroundColor: "white",
        borderRadius: 10,
        height: 20,
        width: 20
    },
    nomStation: {
        justifyContent: "center"
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
    nomStationTexte: {
        color: "white",
        fontSize: 16
    },
    lift: {
        color: "white"
    }
});
