"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./Footer.css");
const Footer = () => {
    return (<footer>
            <div className="footer-top">
                <img className="logo" src="./logo.png" alt="Logo"/>
            </div>

            <div className="footer-bottom">
                <a href="#" className="icon"><img src="path-to-twitter-icon.png" alt="Twitter"/></a>
                <a href="#" className="icon"><img src="path-to-facebook-icon.png" alt="Facebook"/></a>
                <a href="#" className="icon"><img src="path-to-instagram-icon.png" alt="Instagram"/></a>
                <a href="#" className="icon"><img src="path-to-your-icon.png" alt="Some Icon"/></a>
                <a href="#" className="icon"><img src="path-to-behance-icon.png" alt="Behance"/></a>
            </div>
        </footer>);
};
exports.default = Footer;
