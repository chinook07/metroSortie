import { createContext, useState } from "react";

export const MetroContexte = createContext();

const MetroContexteProvider = ({ children }) => {

    const [ligneChoisie, setLigneChoisie] = useState(null);
    const [direction, setDirection] = useState(null);
    const [envers, setEnvers] = useState(false);
    const [destination, setDestination] = useState(null);

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