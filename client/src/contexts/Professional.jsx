import React, { useState } from 'react';

const ProContext = React.createContext();

function ProProvider(props) {
    const [type, setType] = useState("Hello")
    
    return (
        <ProContext.Provider
        value={{type, setType}}
        >
            {props.children}
        </ProContext.Provider>
    );
}

const usePro = () => React.useContext(ProContext);

export { ProProvider, usePro };