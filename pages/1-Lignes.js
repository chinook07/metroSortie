import { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import { MetroContexte } from '../metroContexte';
import toutesLignes from "../donnees/toutesLignes.json";
import metroLogo from "../assets/metroLogo.jpg";
import remLogo from "../assets/remLogo.jpg";

export default function Lignes({ navigation }) {
    
    const { setLigneChoisie, setDirection } = useContext(MetroContexte);

    const versPage2 = (ligne, terminus) => {
        setLigneChoisie(ligne.ligne);
        setDirection(terminus);
        navigation.navigate("Stations")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titre}>Métro express</Text>
            {toutesLignes.map((ligne, index) => {
                return (
                    <View key={index} style={styles.flex1} >
                        <View style={[styles.indicateur, styles[ligne.couleur]]}>
                            {
                                ligne.couleur === "lime"
                                    ? <Image alt='logo du REM' source={remLogo} style={[styles.logo]} />
                                    : <Image alt='logo du métro' source={metroLogo} style={[styles.logo]} />
                            }
                            <Text style={[styles[ligne.couleur], styles.texte]} >{ligne.ligne}</Text>
                        </View>
                        <View style={styles.direction} >
                            {ligne.terminus.map((terminus, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    onPress={() => versPage2(ligne, terminus)}
                                    style={[styles[ligne.couleur], styles.boutonDirection]}
                                >
                                    <Text style={[styles[ligne.couleur], styles.flex1]}>vers</Text>
                                    <Text style={[styles[ligne.couleur], styles.flex1, styles.terminus]}>{terminus}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        flex: 1,
        justifyContent: 'center',
        width: "100%"
    },
    titre: {
        backgroundColor: "#363636",
        color: "white",
        fontSize: 20,
        padding: 10,
        textAlign: "center",
        textTransform: "uppercase"
    },
    indicateur: {
        flexDirection: "row",
        flex: 1,
        gap: 10,
        justifyContent: "center",
        padding: 4
    },
    logo: {
        height: 20,
        objectFit: "contain",
        width: 20
    },
    texte: {
        textAlign: "center",
        fontSize: 17
    },
    flex1: {
        flex: 1
    },
    boutonDirection: {
        flex: 1,
        justifyContent: 'center'
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
    lime: {
        backgroundColor: "#85BE00",
        textAlign: "center"
    },
    direction: {
        flex: 3,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    terminus: {
        fontSize: 17,
        textTransform: "uppercase",
    }
});
