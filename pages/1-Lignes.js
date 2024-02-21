import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import toutesLignes from "../donnees/toutesLignes.json";
import metroLogo from "../assets/metroLogo.jpg";
import remLogo from "../assets/remLogo.jpg";
import { MetroContexte } from '../metroContexte';

export default function Lignes({ navigation }) {
    
    const { setLigneChoisie, setDirection } = useContext(MetroContexte);

    const versPage2 = (ligne, terminus) => {
        setLigneChoisie(ligne.ligne);
        setDirection(terminus);
        navigation.navigate("Stations")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titre}>Titre de l'appli</Text>
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
                                    <Text style={[styles[ligne.couleur], styles.flex1]}>{terminus}</Text>
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
        flexDirection: "column",
        justifyContent: 'center',
        width: "100%"
    },
    titre: {
        backgroundColor: "#363636",
        color: "white",
        textTransform: "uppercase",
        textAlign: "center",
        padding: 10,
        fontSize: 20
    },
    logo: {
        width: 20,
        height: 20
    },
    indicateur: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        padding: 4
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
    texte: {
        flex: 4,
        textAlign: "center",
        fontSize: 17
    },
    direction: {
        flex: 3,
        flexDirection: "row",
        justifyContent: "space-between"
    }
});
