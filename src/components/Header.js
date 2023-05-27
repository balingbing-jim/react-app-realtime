import React, { useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import "./Header.css";

const Header = () => {
    const [activeTab, setActiveTab] = useState("Items");
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === "/") {
            setActiveTab("Items");
        }   else if (location.pathname === "/add") {
            setActiveTab("AddItem");
        }
    }, [location]);
    return (
        <div className="header">
            <p className="logo">Fitness Plan</p>
            <div className="header-right">
                <Link to="/">
                    <p
                    className={`${activeTab === "Items"}? "active" : ""`}
                    onClick={() => setActiveTab("Items")}
                    >
                        Workouts
                    </p>
                </Link>
                <Link to="/add">
                    <p
                    className={`${activeTab === "AddItem"}? "active" : ""`}
                    onClick={() => setActiveTab("AddItem")}
                    >
                        New Plan
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default Header;