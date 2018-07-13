import React, {Component} from 'react';

//class will have state and lifecycle etc additional features, compared with function() {}
class ColorCard extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div id={this.props.id} className="ColorCard">
                <p style={{backgroundColor: this.props.color}}>{this.props.hsv}</p>
            </div>);
    }

}
export default ColorCard;