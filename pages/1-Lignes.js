import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import toutesLignes from "../donnees/toutesLignes.json";
import metroLogo from "../assets/metroLogo.jpg";
import { MetroContexte } from '../metroContexte';

export default function Lignes({ navigation }) {
    
    const { setLigneChoisie, direction, setDirection } = useContext(MetroContexte);

    console.log("direction", direction);

    const versPage2 = (ligne, terminus) => {
        console.log(ligne.ligne);
        setLigneChoisie(ligne.ligne);
        setDirection(terminus);
        navigation.navigate("Stations")
    }

    return (
        <View style={styles.container}>
            {toutesLignes.map((ligne, index) => {
                return (
                    <View key={index} style={styles.flex1} >
                        <View style={[styles.indicateur, styles[ligne.couleur]]}>
                            <Image source={metroLogo} style={[styles.logo]} />
                            <Text style={[styles[ligne.couleur], styles.texte]} >{ligne.ligne}</Text>
                        </View>
                        <View style={[styles.direction, styles.bouton]} >
                            {ligne.terminus.map((terminus, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    onPress={() => versPage2(ligne, terminus)}
                                    style={[styles[ligne.couleur], styles.flex1]}
                                >
                                    <Text title={terminus} style={styles[ligne.couleur]}>{terminus}</Text>
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
    logo: {
        width: 20,
        height: 20
    },
    indicateur: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center"
    },
    flex1: {
        flex: 1
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
    texte: {
        flex: 4,
        textAlign: "center",
        fontSize: 15
    },
    bouton: {
        flex: 3
    },
    direction: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});
