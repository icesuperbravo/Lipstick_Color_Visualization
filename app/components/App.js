import React, {Component} from 'react';
import axios from 'axios';
import ColorCard from "./ColorCard.js";
import FilterForm from "./FilterForm.js";
import "./App.css";

//ES6 to define an isolated component, state is only available to class
//<div> is a DOM element, however, <Div> is a React Component;
//props is read-only in React, but state is writable;
class App extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            searchKeywords:'',
            searchPrice:0
        };
        this.handleSearchingSubmit=this.handleSearchingSubmit.bind(this);
        //Use Arrow Function does not need to bind this context;
    }


    handleSearchingSubmit (filteringCon)
    {
        this.setState({
            searchKeywords: filteringCon.keyword,
            searchPrice: filteringCon.price,
            changeColorCards: true
        });
    }

    //在正则表达式中添加变量，使用构造函数！
    // https://www.cnblogs.com/season-huang/p/3544873.html
    searchColorCards (data, searchWord, searchPrice)
    {
        return data.filter((item) => {
            const pattern =new RegExp(searchWord, "i");
            const price=parseInt(item.price);
            return pattern.test(item.brandName+" "+item.colorName) && (price < searchPrice);
        });
    };

    componentDidMount() {

        const sortColor = data => {

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
                            //name: response.data[item].name,
                            brandName: response.data[item].brand+" "+response.data[item].name,
                            price: response.data[item].price,
                            price_sign: response.data[item].price_sign
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
        const displayData = (this.state.searchKeywords!=false || this.state.searchPrice!=0)? this.searchColorCards(this.state.data, this.state.searchKeywords, this.state.searchPrice):this.state.data;
        return (
            <div className="row">
                <div className="filterFormContainer">
                    <FilterForm onSearchingSubmit={this.handleSearchingSubmit}/>
                </div>
                <div className="colorCardContainer">
                    {
                        displayData.map(item => {
                            return <ColorCard key={item.id} id={item.id} color={item.hexColor} name={item.colorName}/>
                        })
                    }
                </div>
            </div>
        )
    }
}



export default App;

