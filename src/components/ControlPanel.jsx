import React, {Component} from 'react';
import { connect } from 'react-redux';

class ControlPanel extends Component {

    render() {

        const chosenDictionary = this.props.chosenDictionary;

        return (
            <div className="ControlPanel">
                <h1 className="HomeButton" >Trasha</h1>
                <h2 className="ChosenDictionaryField">{(chosenDictionary == null) ? "Choose dictionary" : `Chosen dictionary: ${chosenDictionary.name}`}</h2>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        chosenDictionary: state.chosenDictionary
    }
}

export default connect(mapStateToProps)(ControlPanel);