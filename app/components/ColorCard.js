import React, {Component} from 'react';
import './ColorCard.css';

//class will have state and lifecycle etc additional features, compared with function() {}
class ColorCard extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div id={this.props.id} className="ColorCard">
                <div style={{backgroundColor: this.props.color, height: '100%', width: '100%'}}>{this.props.hsv}</div>
            </div>);
    }

}
export default ColorCard;