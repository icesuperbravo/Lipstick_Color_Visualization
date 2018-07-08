import App from './components/App';
import ReactDom from 'react-dom';
import React from 'react';


// A single React root DOM node, all the related react components will be rendered under this API
ReactDom.render(
    <App />,
    document.getElementById("root")
);

