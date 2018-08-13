import React, {Component} from 'react';
import axios from 'axios';
import ColorCard from "./ColorCard.js";
import "./App.css";
import FilterForm from "./FilterForm";

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
            // console.log(data)
            // data = Object.assign([], data);
            // data.sort((a, b) => {
            //    return a.colorModel.lum - b.colorModel.lum;
            // });
            // const grpNum = 5;
            // const clusterNum = Math.ceil(data.length/grpNum);
            // let sorted=[];
            // for (let i=0; i<(grpNum); i++)
            // {
            //     //console.log(i);
            //
            //     const a = clusterNum * i;
            //     //const b = clusterNum * (i + 1);
            //     let b;
            //     if (i != (grpNum-1) )  b = clusterNum * (i + 1);
            //     else  b = data.length;
            //     sorted = sorted.concat(clusterColor(data.slice(a, b)));
            //     //console.log(sorted);
            //     console.log(b-a);
            //     //console.log(b);
            // }
            const toSort=clusterColor(data);
            let sorting=[new Array()];
            let sorted=[];
            for (let b in toSort)
            {
                if (toSort[b].dist >= 17)
                {
                    sorting.push(new Array(toSort[b]));
                }
                else sorting[sorting.length-1].push(toSort[b]);
            }
            sorting.sort( (a, b) =>
            {
                return a[0].colorModel.lum - b[0].colorModel.lum;
            });
            for (let b in sorting)
            {
                sorted = sorted.concat(sorting[b]);
            }


            // const sortIndex = clusterColor(sorting.map(item => {
            //     return item[0];
            // }));
            // for (let a in sortIndex)
            // {
            //     for (let b in sorting)
            //     {
            //         if (sortIndex[a]===sorting[b][0]) sorted = sorted.concat(sorting[b]);
            //     }
            // }
            // console.log(sorted);
            return sorted;
        };

        const clusterColor = data => {
            data = Object.assign([], data);
            const clustered = [data.shift()];

            while(data.length) {
                const a = data.shift(), c = { d: Infinity };
               // const a = clustered[0], c = { d: Infinity };
               // console.log (a);

                for(let [i, b] of Object.entries(clustered)) {
                    //The Object.entries() method returns an array of a given object's own enumerable property [key, value] pairs, in the same order as that provided by a for...in loop
                    // for... of... iterating all the key-value pairs in Object.entries(sorted)
                    const average = Math.floor((
                            Math.abs(a.colorModel.r - b.colorModel.r) +
                            Math.abs(a.colorModel.g - b.colorModel.g) +
                            Math.abs(a.colorModel.b - b.colorModel.b)
                        ) / 3);
                    if( average < c.d ) {
                        Object.assign(c, { d: average, i: i });
                    }
                }
                // let newItem = data.splice(c.i, 1)[0];
                // newItem.dist=c.d;
                //clustered.push(newItem);
                a.dist=c.d;
                clustered.splice(c.i, 0, a);
            }
            console.log(clustered);

           // return clustered;
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

        const formatColorName = (colorName) => {
           let newName = "";
           for (let i=0; i<colorName.length; i++)
           {

               if (i === 0) newName+=colorName[i].toUpperCase();
               else if (/\s/.test(colorName[i]) && i != colorName.length-1)
               {
                   newName+=" "+colorName[i+1].toUpperCase();
                   i++;
               } else newName+=colorName[i].toLowerCase();
           }
           return newName;
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
                        return {hexColor:subItem.hex_value, colorName: subItem.colour_name};
                    });
                    // console.log(colorValue);
                    colorValue.map(colorHex => {
                        hexValueArray.push(colorHex);
                        lipArray.push({
                            id: response.data[item].id + colorHex.hexColor,
                            hexColor: colorHex.hexColor,
                            colorName: formatColorName(colorHex.colorName),
                            colorModel:hex2RGBHSV(colorHex.hexColor),
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
            <div className="row">
                <div className="filterFormContainer">
                    <FilterForm/>
                </div>
                <div className="colorCardContainer">
                    {
                        this.state.data.map(item => {
                            return <ColorCard key={item.id} id={item.id} color={item.hexColor} name={item.colorName}/>

                        })
                    }
                </div>
            </div>
        )
    }
}

export default App;

