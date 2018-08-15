import React from 'react';

const Navbar = props => (
    <div>
        <nav>
            <div className="nav-wrapper">
            <a href="" className="brand-logo">Clicky</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="">Score: {props.score}</a></li>
                <li><a href="">Top Score: {props.topScore}</a></li>
            </ul>
            </div>
        </nav>
        
    </div>
);

export default Navbar;