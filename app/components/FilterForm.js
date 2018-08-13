import React, {Component} from 'react';
import './FilterForm.css';

//class will have state and lifecycle etc additional features, compared with function() {}
class FilterForm extends Component {
    constructor(props) {
        super(props);
        this.state={
        };
    }

    render() {
        return (
            <div id={this.props.id} className="FilterForm">
                <form>
                    <h3>Welcome to Lipstick Color Picker!</h3>
                    <label>

                    </label>

                </form>
            </div>);
    }

}
export default FilterForm;