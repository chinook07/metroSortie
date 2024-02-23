import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faPersonRunning } from '@fortawesome/free-solid-svg-icons';

import { MetroContexte } from '../metroContexte';
import toutesLignes from "../donnees/toutesLignes.json";
import GraphRame from './composantes/GraphRame';
import InfoContresens from './composantes/InfoContresens';

export default function Portes({ navigation }) {

    const { ligneChoisie, setLigneChoisie, setDirection, destination, setDestination, envers, setEnvers } = useContext(MetroContexte);
    const [combienVoitures, setCombienVoitures] = useState();
    const [portesConcordia, setPortesConcordia] = useState([]);

    const infoLigne = toutesLignes.find(ligne => ligne.ligne === ligneChoisie);
    const toutesStations = infoLigne.stations;
    const voitures = toutesStations.find(obj => obj.hasOwnProperty(destination))[destination];

    let voiture;
    if (envers) { voiture = voitures[1] } else { voiture = voitures[0] }

    const retour = () => {
        navigation.navigate("Lignes");
        setLigneChoisie(null);
        setDirection(null);
        setDestination(null);
    }

    let quaiContresens = [];
    let nomsStations = Object.keys(Object.assign({}, ...toutesStations));
    if (envers) {
        const destinationIndex = nomsStations.length - 1 - nomsStations.indexOf(destination);
        nomsStations.reverse().forEach((station, index) => {
            if (infoLigne.mauvaisSens[1].includes(station) && index < destinationIndex) {
                quaiContresens.push(station)
            }
        })
    } else {
        const destinationIndex = nomsStations.indexOf(destination);
        nomsStations.forEach((station, index) => {
            if (infoLigne.mauvaisSens[0].includes(station) && index < destinationIndex) {
                quaiContresens.push(station)
            }
        })
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
            <GraphRame
                combienVoitures={combienVoitures}
                infoLigne={infoLigne}
                portesConcordia={portesConcordia}
                voiture={voiture}
            />
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
                {
                    quaiContresens.length > 0 &&
                    <InfoContresens
                        quaiContresens={quaiContresens}
                    />
                }
                {
                    infoLigne.ligne === "A1 – Brossard" && envers &&
                    <Text style={styles.nuit}>Les deux quais sont utilisés à Brossard. La train peut ne pas arriver « dans le bon sens ».</Text>
                }
                {
                    infoLigne.ligne === "A1 – Brossard" && !envers &&
                    <Text style={styles.nuit}>Les deux quais sont utilisés à la Gare Centrale. La train peut ne pas arriver « dans le bon sens ».</Text>
                }
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
    gap: {
        gap: 10
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
    }
});