import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faPersonRunning, faPersonRays } from '@fortawesome/free-solid-svg-icons';

import { MetroContexte } from '../metroContexte';
import toutesLignes from "../donnees/toutesLignes.json";

export default function Portes({ navigation }) {

    const { ligneChoisie, setLigneChoisie, setDirection, destination, setDestination, envers, setEnvers } = useContext(MetroContexte);
    const [combienVoitures, setCombienVoitures] = useState();
    const [portesConcordia, setPortesConcordia] = useState([]);

    const infoLigne = toutesLignes.find(ligne => ligne.ligne === ligneChoisie);
    const toutesStations = infoLigne.stations;
    const voitures = toutesStations.find(obj => obj.hasOwnProperty(destination))[destination];

    console.log(toutesStations);

    let voiture;
    if (envers) { voiture = voitures[1] } else { voiture = voitures[0] }

    const retour = () => {
        navigation.navigate("Lignes");
        setLigneChoisie(null);
        setDirection(null);
        setDestination(null);
    }

    useEffect(() => {
        if (Array.isArray(voiture)) {
            if (voiture.length > 2) {
                setCombienVoitures(3)
            } else {
                if (Number.isInteger(voiture[0])) {
                    setCombienVoitures(2)
                } else {
                    setCombienVoitures(9)
                    let portesConc = [];
                    voiture.forEach(item => {
                        portesConc.push(item.voiture)
                    });
                    setPortesConcordia(portesConc)
                }
            }
        } else {
            setCombienVoitures(1)
        }
    }, [])
    
    return (
        <View style={styles.container}>
            <View style={styles.graph}>
                <View style={styles.rail}>
                    <View style={styles.rame}>
                        {
                            [...Array(infoLigne.voitures)].map((v, i) =>
                                <View key={i} style={[styles.voit, { backgroundColor: infoLigne.hex[0] }, i === 0 && styles.premier, i === infoLigne.voitures - 1 && styles.dernier]}>
                                    {
                                        combienVoitures === 1 && i + 1 === voiture && <FontAwesomeIcon icon={faPersonRays} style={infoLigne.contraste ? { color: "white" } : { color: "black" }}/>
                                    }
                                    {
                                        (combienVoitures === 2 || combienVoitures === 3) && voiture.includes(i + 1) && <FontAwesomeIcon icon={faPersonRays} style={infoLigne.contraste ? { color: "white" } : { color: "black" }}/>
                                    }
                                    {
                                        combienVoitures === 9 && portesConcordia.includes(i + 1) && <FontAwesomeIcon icon={faPersonRays} style={infoLigne.contraste ? { color: "white" } : { color: "black" }}/>
                                    }
                                </View>
                            )
                        }
                    </View>
                </View>
            </View>
            <View style={styles.panneau}>
                <View style={styles.infos}>
                    {
                        combienVoitures === 1 && <Text style={styles.nuit}>Embarquez dans la voiture {voiture}</Text>
                    }
                    {
                        combienVoitures === 2 && <Text style={[styles.nuit, styles.choix2]}>
                            <Text>Embarquez dans les voitures </Text>
                            {
                                voiture.map((item, index) => {
                                    if (index === 0) {
                                        return (
                                            <Text key={index}>{item}</Text>
                                        )
                                    } else {
                                        return (
                                            <Text key={index}> ou {item}</Text>
                                        )
                                    }
                                })
                            }
                        </Text>
                    }
                    {
                        combienVoitures === 3 && <Text style={[styles.nuit, styles.choix2]}>
                            <Text>Embarquez dans les voitures </Text>
                            {
                                voiture.map((item, index) => {
                                    if (index === voiture.length - 2) {
                                        return (
                                            <Text key={index}>{item}</Text>
                                        )
                                    } else if (index === voiture.length - 1) {
                                        return (
                                            <Text key={index}> ou {item}</Text>
                                        )
                                    } else {
                                        return (
                                            <Text key={index}>{item}, </Text>
                                        )
                                    }
                                    
                                })
                            }
                        </Text>
                    }
                    {
                        combienVoitures === 9 && <>
                            <Text style={styles.nuit}>Attention! Plusieurs sorties sont possibles.</Text>
                            {
                                voiture.map((sortie, index) => {
                                    return (
                                        <View key={index} style={styles.sortie}>
                                            <FontAwesomeIcon icon={faPersonRunning} color='white' />
                                            <Text style={styles.nuit}>Sortie {sortie.sortie} : voiture {sortie.voiture}</Text>
                                        </View>
                                    )
                                })
                            }
                        </>
                    }
                    <Text style={styles.nuit}>Votre destination : {destination}</Text>
                </View>
                <TouchableOpacity onPress={retour} style={styles.retour}>
                    <FontAwesomeIcon icon={ faHouse } color='white' />
                    <Text style={styles.nuit}>Retour</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.nuit}>Attention! Embarquez-vous aux stations?</Text>
                    <Text style={styles.nuit}>Les trains arrivent dans l'autre sens.</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#363636",
        flexDirection: "row",
        flex: 1
    },
    graph: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    rail: {
        borderColor: "white",
        borderStyle: "solid",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        justifyContent: "center",
        width: 30,
    },
    rame: {
        alignItems: "center",
        flex: 1,
        marginTop: 20,
        justifyContent: "center"
    },
    voit: {
        alignItems: "center",
        backgroundColor: "yellow",
        borderBottomWidth: 1,
        borderColor: "white",
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 1,
        height: 60,
        justifyContent: "center",
        width: 35,
    },
    premier: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    dernier: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    panneau: {
        // backgroundColor: "red",
        alignItems: 'center',
        flex: 6,
        justifyContent: "space-evenly",
        paddingRight: 10
    },
    infos: {
        gap: 10
    },
    sortie: {
        alignItems: "center",
        flexDirection: "row",
        gap: 5
    },
    choix2: {

    },
    retour: {
        alignItems: "center",
        borderColor: "white",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: "row",
        gap: 5,
        paddingHorizontal: 15,
        paddingVertical: 7
    },
    nuit: {
        color: "white",
        fontSize: 18
    },
    reverse: {
        color: "white"
    }
});