## LipStick_Color_Visualization Plan
## React Framework Learning Diary
1. require() V.S. import/export?
````javascript
import App from './components/App'  //1. From ES6, dynamic loading
var App = require('./components/App');  //2. From Common JS used by Node.js, static loading
//Better to use ES6 method for coding, since it is part of standard.
````

2. How to read data from REST API in React framework?

To kick-off the project, using [axios](https://github.com/axios/axios) as the AJAX broker, since it implements Promise based HTTP client for the browser and node.js
TODO List: 
* add the componentDidMount lifecycle method to the App component.
* import axios from the just installed package
* add the axios GET request to componentDidMount to retrieve the contact data and store it in the App component’s State.
* bind the “contacts” prop of ComponentList to App component’s State to pass the contact data.

3. Array Function
The main purpose to use array function:
* Simplify the grammar for function declaration;
* It does not change the bind of 'this' in the previous situation, e.g. in a closure, this will not redirect to the window object.
````javascript
function Counter() {
  var that = this;
  this.timer = setInterval(() => {
    console.log(this === that);  //print true, this doesn't change
  }, 1000);
}
````
4. Props and States (React.js)

*Props*: data flows from parent to child. Props are immutable (fancy word for it not changing)

*State*: 
State is used for mutable data, or data that will change
When you setState(newState) it updates the state object and then re-renders the component.