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
        function hex2HSV(hex) {
            const r = parseInt(hex.substring(1, 3), 16) / 255;
            const g = parseInt(hex.substring(3, 5), 16) / 255;
            const b = parseInt(hex.substring(5), 16) / 255;
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
            return {h: Math.round(h),  s:Math.round(s*100), v: Math.round(max*100)};
        }

        axios
            .get('http://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick')
            .then(response => {
                console.log(response);
                let lipArray=[];
                //let hexValueArray=[];
                for (let item in response.data)
                {
                    let colorValue = response.data[item]['product_colors'].map(subItem => {
                        return subItem.hex_value;
                    });
                    // console.log(colorValue);
                    colorValue.map(colorHex => {
                        //hexValueArray.push(colorHex);
                        lipArray.push({
                            id: response.data[item].id + colorHex,
                            hexcolor: colorHex,
                            HSV:hex2HSV(colorHex),
                            name: response.data[item].name
                        });
                    });
                }
                //sort the color by the key h, s, v;
                lipArray.sort((a, b) => {
                    const diff = a.HSV.h - b.HSV.h;
                    if (diff!=0)  return diff;
                    else if  ((a.HSV.s - b.HSV.s)!=0) return a.HSV.s - b.HSV.s;
                    else return a.HSV.v - b.HSV.v;

                });
                //console.log(hexValueArray);

                const lipstickInfo = {

                    data: lipArray
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
            <div className="flexContainer">
                {this.state.data.map((item) => {
                    return <ColorCard key = {item.id} id= {item.id}  color={item.hexcolor} hsv = {"("+item.HSV.h+", "+item.HSV.s+"%, "+item.HSV.v+"%)"}/>
                })
                }
            </div>
        )
    }
}

export default App;

