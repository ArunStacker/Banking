
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <span style={{ fontSize: '1.8rem' }}>🏦</span>
                NeoBank
            </div>
            <div className="nav-links">
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Home
                </NavLink>
                <NavLink to="/create-account" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Create Account
                </NavLink>
                <NavLink to="/banking" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Banking
                </NavLink>
                <NavLink to="/loan" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Loan
                </NavLink>
                <NavLink to="/statement" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Statement
                </NavLink>
                <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Admin
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
