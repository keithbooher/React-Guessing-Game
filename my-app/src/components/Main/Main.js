import React from 'react';

const Main = props => (
    <div className={`row ${props.shake}`}>
        {props.children}
    </div>
);

export default Main;