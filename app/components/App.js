import React, {Component} from 'react';
import axios from 'axios';
import ColorCard from "./ColorCard.js";
import "./App.css";

//ES6 to define an isolated component, state is only available to class
class App extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    componentDidMount() {

        const sortColor = data => {
            data = Object.assign([], data);
            data.sort((a, b) => {
               return a.colorModel.lum - b.colorModel.lum;
            });
            const clusterNum = Math.floor(data.length/5);
            let sorted=[];
            for (let i=0; i<5; i++)
            {
                //console.log(i);

                const a = clusterNum * i;
                const b = clusterNum * (i + 1);
                sorted = sorted.concat(clusterColor(data.slice(a, b)));
                console.log(a);
                console.log(b);
            }

            return sorted;
        };

        const clusterColor = data => {
            data = Object.assign([], data);
            const clustered = [data.shift()];

            while(data.length) {
                const a = data.shift(), c = { d: Infinity };

                for(let [i, b] of Object.entries(clustered)) {
                    //The Object.entries() method returns an array of a given object's own enumerable property [key, value] pairs, in the same order as that provided by a for...in loop
                    // for... of... iterating all the key-value pairs in Object.entries(sorted)
                    const average = Math.floor((
                            Math.abs(a.colorModel.r - b.colorModel.r) +
                            Math.abs(a.colorModel.g - b.colorModel.g) +
                            Math.abs(a.colorModel.b - b.colorModel.b)
                        ) / 3);
                   // const aveV = Math.abs(a.colorModel.lum - b.colorModel.lum);
                    if( average < c.d ) {
                        Object.assign(c, { d: average, i: i });
                    }
                }
               // a.dist=c.d;
                clustered.splice(c.i, 0, a);
            }


            return clustered.reverse();
        };

        const hex2RGBHSV = (hex) => {
            const r = parseInt(hex.substring(1, 3), 16) / 255;
            const g = parseInt(hex.substring(3, 5), 16) / 255;
            const b = parseInt(hex.substring(5), 16) / 255;
            const luminosity =Math.sqrt(.241 * r + .691 * g + .068 * b );
            //Hexvalue to RGB（Decimal）
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            //console.log(max);
            //console.log(min);
            let s=0;
            let h=null;
            //console.log(h);
            //calculate s
            if (max != 0) s = (1 - min / max);
            //calculate h
            switch (max) {
                //the order of case really matters!
                case min:
                {
                    h = 0;
                    //console.log(h);
                    break;
                }
                case r:
                {
                    if (g >= b) h = 60 * (g - b) / (max - min);
                    else h = 60 * (g - b) / (max - min) + 360;
                    //console.log(h);
                    break;
                }
                case g:
                    h = 60 * (g - b) / (max - min) + 120;
                    //console.log(h);
                    break;
                case b:
                    h = 60 * (g - b) / (max - min) + 240;
                    //console.log(h);
                    break;
            }
            return {h: Math.round(h),  s:Math.round(s*100), v: Math.round(max*100), r: r*255,  g: g*255,  b: b*255, lum:Math.round(luminosity*100)};
        };

        axios
            .get('http://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick')
            .then(response => {
                console.log(response);
                let lipArray=[];
                let hexValueArray=[];
                for (let item in response.data)
                {
                    let colorValue = response.data[item]['product_colors'].map(subItem => {
                        return subItem.hex_value;
                    });
                    // console.log(colorValue);
                    colorValue.map(colorHex => {
                        hexValueArray.push(colorHex);
                        lipArray.push({
                            id: response.data[item].id + colorHex,
                            hexColor: colorHex,
                            colorModel:hex2RGBHSV(colorHex),
                            name: response.data[item].name
                        });
                    });
                }

                const lipstickInfo = {
                    data: sortColor(lipArray)
                    //data: sort(lipArray)
                };
                const newState = Object.assign({}, this.state, lipstickInfo);
                //console.log(newState);
                this.setState(newState);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="flexContainer">
                  {
                      this.state.data.map(item => {
                              return <ColorCard key = {item.id} id= {item.id}  color={item.hexColor} hsv = {"("+item.colorModel.b+', '+item.colorModel.lum+
                              // item.colorModel.r+", "+item.colorModel.g+", "+item.colorModel.b+", "+
                              ")"}/>;

                      })
                  }

            </div>
        )
    }
}

export default App;

