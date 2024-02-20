import { createContext, useState } from "react";

export const MetroContexte = createContext();

const MetroContexteProvider = ({ children }) => {

    const [ligneChoisie, setLigneChoisie] = useState();
    const [direction, setDirection] = useState();
    const [envers, setEnvers] = useState(false);
    const [destination, setDestination] = useState();

    return (
        <MetroContexte.Provider
            value={{
                ligneChoisie,
                setLigneChoisie,
                direction,
                setDirection,
                envers,
                setEnvers,
                destination,
                setDestination
            }}
        >{children}</MetroContexte.Provider>
    )
}

export default MetroContexteProvider;