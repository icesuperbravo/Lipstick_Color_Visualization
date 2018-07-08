import React, {Component} from 'react';

//class will have state and lifecycle etc additional features, compared with function() {}
class ColorCard extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div id={this.props.id}>
                <p style={{color: this.props.color}}>Colour_Visualization</p>
            </div>);
    }

}
export default ColorCard;