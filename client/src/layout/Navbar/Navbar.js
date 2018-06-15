import React from 'react';
import { UserMenu } from "./components/UserMenu";
import '../../styles/layout/Navbar.css';

export const Navbar = () => (
	<nav className="navbar">
		<div className="navbar__logo-wrapper">
			<h3 className="navbar__logo" style={{color: '#3ddb93'}}>motus</h3>
		</div>

    <UserMenu/>
	</nav>
);
