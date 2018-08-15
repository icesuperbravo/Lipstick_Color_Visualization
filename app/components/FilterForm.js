import React, {Component} from 'react';
import './FilterForm.css';

//class will have state and lifecycle etc additional features, compared with function() {}
class FilterForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            colorName:'',
            price:50
        };
        this.handleChange =this.handleChange.bind(this);
        // ES6 Class does not auto-bind this in the context;
        // How to bind this: https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    }

    handleChange(event) {

        //console.log(event.target.name);

        switch (event.target.name) {
            case "colorName":
                this.setState({colorName:event.target.value,});
                break;
            case "priceRange":
                this.setState({price: event.target.value});
                break;
        }
        //console.log(this.state);

    }

    handleSubmit(event) {
        event.preventDefault();
    }

    /*Rewrite event functions in React:
      onSubmit: Fires when the form is submitted, usually by pressing enter.
      onChange: Fires on each keystroke, not only on lost focus.
      value field in input element: show the changed state value in the input interface
      */

    render() {
        return (
            <div id={this.props.id} className="FilterForm">
                <form onSubmit={this.handleSubmit}>
                    <h3>Welcome to Lipstick Color Picker!</h3>
                    <div className="colorNameSearch">
                        <label>色号名字：</label>
                        <input type="text" name="colorName" value={this.state.colorName} onChange={this.handleChange} placeholder="e.g. Dior 999"/>
                    </div>
                    <div className="priceRangeSearch">
                        <label>The range of price:</label>
                        <input type="range" name="priceRange" min="0" max={this.props.max} placeholder="50" value={this.state.price} onChange={this.handleChange}/>
                        {this.state.price}
                    </div>
                    <div className="submitSearch">
                        <input type="submit" value="submit"/>
                    </div>
                </form>
            </div>);
    }

}
export default FilterForm;