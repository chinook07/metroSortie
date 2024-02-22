import { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faPersonRunning } from '@fortawesome/free-solid-svg-icons';

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
            <View style={styles.infos}>
                {
                    Array.isArray(voiture)
                        ? <>
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
                        : <Text style={styles.nuit}>Embarquez dans la voiture {voiture}</Text>
                }
                <Text style={styles.nuit}>Prochaine station : {destination}</Text>
            </View>
            <TouchableOpacity onPress={retour} style={styles.retour}>
                <FontAwesomeIcon icon={ faHouse } color='white' />
                <Text style={styles.nuit}>Retour</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: "#363636",
        flex: 1,
        justifyContent: "space-evenly"
    },
    infos: {
        gap: 10
    },
    sortie: {
        alignItems: "center",
        flexDirection: "row",
        gap: 5
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