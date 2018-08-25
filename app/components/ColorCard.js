import React, {Component} from 'react';
import './ColorCard.css';

//class will have state and lifecycle etc additional features, compared with function() {}
class ColorCard extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }
    handleClick (event) {
        console.log(this.props.datum);
        this.props.onDisplayInfo(this.props.datum);
    }


    render() {
        const datum=this.props.datum;
        return (
            <div id={datum.id} className="ColorCard" onClick={this.handleClick} >
                <div className="ColorBackground" style={{backgroundColor: datum.hexColor}}>
                    <div className="ColorName">{datum.colorName}</div>
                </div>
            </div>);
    }

}
export default ColorCard;