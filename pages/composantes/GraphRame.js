import { StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPersonRays, faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function GraphRame({ combienVoitures, infoLigne, portesConcordia, voiture }) {
    
    return (
        <View style={styles.graph}>
            <View style={styles.rail}>
                <View style={styles.rame}>
                    <FontAwesomeIcon icon={faArrowUp} color='white' size={30} />
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
    )
}

const styles = StyleSheet.create({
    graph: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    rail: {
        alignItems: "center",
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
    }
})