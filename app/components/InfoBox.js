import React from 'react';
import './InfoBox.css';

class InfoBox extends React.Component {
    constructor(props) {
        super(props);
    };


    render() {
        const disInfo = this.props.disInfo;
        const rendering = function (disInfo) {
            if (disInfo) {
                return (
                    <div className="InfoSession">
                        <div className="ImageBox">
                            <img src={ ("http:" + disInfo.image)} align="middle"/>
                        </div>
                        <p>Name: {disInfo.colorName}</p>
                        <p>Brand: {disInfo.brandName}</p>
                        <p>Price: {disInfo.price + '$'}</p>
                        <p>Description: {disInfo.description}</p>
                    </div>
                );
            }
            else
                return (
                    <div className="initInfoSession">
                        <p>Please click the color card to see more details!</p>
                    </div>
                );
        };

        return (
            <div className="InfoBox">
                <h3>Color Card InfoBox</h3>
                {rendering(disInfo)}
            </div>
        )
    };


}
export default InfoBox;
