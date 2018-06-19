var React=require('react');
var ReactDom=require('react-dom');
var App = require('./components/App');
if (typeof window !== 'undefined') {
    ReactDom.render(
        <App />,
        document.getElementById('app'),
    );
}
