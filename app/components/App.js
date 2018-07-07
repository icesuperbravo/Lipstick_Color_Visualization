import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {

    constructor() {
        super();
        this.state = {
            id: []
        };
    }

    componentDidMount() {

        axios
            .get('http://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick')
            .then(response => {
                console.log(response);
                const lipstickInfo = {
                    id: response.data.map(item => {
                        //let color="product_colors";
                        return item.id;
                           // color: item[color][],
                           // name: item.products.colour_name
                    })
                };
                const newState = Object.assign({}, this.state, lipstickInfo);
                console.log(newState);
                this.setState(newState);
                //console.log("hey!");
            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {
        return (
            <div>
                {this.state.id}
            </div>
        );
    }
}

export default App;

