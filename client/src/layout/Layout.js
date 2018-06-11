import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from "./Navbar/Navbar";
import { Content } from "./Content/Content";

export const Layout = (props) => (
	<div className="layout" style={{height: '100%'}}>
		<Navbar/>

		<Content>
			{props.children}
		</Content>
	</div>
);

Layout.propTypes = {
	children: PropTypes.node
};