import React from 'react';
import './InfoBox.css';

class InfoBox extends React.Component {
    constructor(props) {
        super(props);
    };


    render() {
        const disInfo=this.props.disInfo;
        const defInfo="Please click the card to see!";
        return (
            <div className="InfoBox">
                <h3>Click the color card to see more details!</h3>
                <img src={disInfo? ("http:"+disInfo.image) : ""} alt={disInfo? disInfo.brandName : defInfo } align="middle" width="100px"/>
                <p>Name: {disInfo? disInfo.colorName : defInfo}</p>
                <p>Brand: {disInfo? disInfo.brandName : defInfo}</p>
                <p>Price: {disInfo? disInfo.price+'$' : defInfo}</p>
                <p>Description: {disInfo? disInfo.description : defInfo}</p>
            </div>
        )
    };



}
export default InfoBox;
