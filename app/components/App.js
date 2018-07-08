import React, {Component} from 'react';
import axios from 'axios';
import ColorCard from "./ColorCard";

//ES6 to define an isolated component, state is only available to class
class App extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    componentDidMount() {

        axios
            .get('http://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick')
            .then(response => {
                console.log(response);
                let lipArray=[];
                for (let item in response.data)
                {
                    let colorValue=response.data[item]['product_colors'].map(subItem => {return subItem.hex_value});
                    // console.log(colorValue);
                    let newLipArray = colorValue.map(colorHex => {
                        return {id: response.data[item].id+colorHex, color: colorHex, name: response.data[item].name};
                    });
                    //console.log(newLipArray);
                    lipArray = lipArray.concat(newLipArray);
                    //console.log(lipArray);
                }
                const lipstickInfo = {

                    data: lipArray
                    //     response.data.map(item => {
                    //     const colorValue=item['product_colors'].map(subItem => {return subItem.hex_value});
                    //     return colorValue.map(colorHex => {
                    //         return {id: item.id+colorHex, color: colorHex, name: item.brand+' '+item.name};
                    //     });
                    //     return {id: colorValue.map(colorHex => {return item.id+colorHex}), color: item['product_colors'].map(item => {return item.hex_value}), name:item.brand+' '+item.name };
                    // })
                };
                const newState = Object.assign({}, this.state, lipstickInfo);
                console.log(newState);
                this.setState(newState);
            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {

        return (
            <div>
                {this.state.data.map((item) => {
                    return <ColorCard id = {item.id} color={item.color} />
                })
                }
            </div>
        )
    }
}

export default App;

