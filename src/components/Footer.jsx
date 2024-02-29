import React from "react";
import {Link} from "react-router-dom";

/**
 * @returns {JSX.Element}
 * @constructor
 */
const Footer = () => {
    return (
        <footer className={"shadow"}>
            <div className="container flex ac sb wrap g-20">
                <Link to={"/"}>Books</Link>
            </div>
        </footer>
    );
};

export default Footer;