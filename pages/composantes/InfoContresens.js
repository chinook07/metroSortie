import { StyleSheet, View, Text } from 'react-native';

export default function InfoContresens({ quaiContresens }) {
    
    return (
        <View style={styles.gap}>
            {
                quaiContresens.length === 1 &&
                <Text style={styles.nuit}>Attention! Embarquez-vous à la station {quaiContresens[0]}?</Text>
            }
            {
                quaiContresens.length > 1 &&
                <>
                    <Text style={styles.nuit}>Attention! Embarquez-vous aux stations suivantes?</Text>
                    {
                        quaiContresens.map((item, index) => {
                            return (
                                <Text key={index} style={styles.liste}>{item}</Text>
                            )
                        })
                    }
                </>
            }
            <Text style={styles.nuit}>Les trains arrivent dans l'autre sens.</Text>
        </View>
    )
    
}

const styles = StyleSheet.create({
    nuit: {
        color: "white",
        fontSize: 18
    },
    liste: {
        color: "white",
        textAlign: "center"
    }
})