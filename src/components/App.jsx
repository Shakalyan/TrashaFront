import React from 'react';

import MainContainer from './MainContainer.jsx';
import MessageAlert from './MessageAlert';

class App extends React.Component {

    showMessageAlert = () => {
        console.log("SHOW MESSAGE ALERT");
    }

    render() {
        return (
            <div className="App">
                <MainContainer />
                <MessageAlert />
            </div>
        );
    }

}

export default App;