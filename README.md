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

5. var, let and const
* var: suggest not to use in ES6,the function scope is within a function;
````javascript
for(var i = 0; i<10; i++) {
  console.log(i) 
}
console.log(i)
//print 1,2,...,10
````
* let: use this to declare a variable that might change later on, the function scope is within the bracket {}
````javascript
for(let i = 0; i<10; i++) {
  console.log(i)
}
console.log(i)
//print 1,2, ...,9
//The last console.log(i) will report error
````
* const: use to declare a variable that will not change later on, however, const is not strictly immutable!
````javascript
const dog={
  age: 3
}
dog.age = 5  //dog.age actually changed!
dog = { name: 'biko'} //report an error
````

6. Sorting colors by hex;
* Some Basic Theories on Color:
A color is determined by 3 main factors(HSV/L): hue(色相), saturation（饱和度）, value/luminosity（明度）;

HUE: the basic color;

SATURATION: Intensive to washed away;

Value: Brightness, if adding more white into certain color, the brightness will be enhanced and vice versa, if putting more black, the color is getting darker;

* My rough idea on the color sorting
1. transform the hexvalue to HSV space;
2. Sort the color by hue(X) and value(Y)?


Ref: 
http://vis.baidu.com/chartcolor/basis/
https://blog.csdn.net/yongjiankuang/article/details/79279754

7. How to Style React Component: 
* Flexbox Layout:
    * use case: when defining a layout for dynamic or even unknown screen sizes ;

https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
