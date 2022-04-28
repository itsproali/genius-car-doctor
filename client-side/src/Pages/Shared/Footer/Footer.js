import React from "react";

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();
    return (
        <footer className="text-center position-static bottom-0 start-0 end-0 mt-3">
            <p>
                <small>copyright @ {year} </small>
            </p>
        </footer>
    );
};

export default Footer;
