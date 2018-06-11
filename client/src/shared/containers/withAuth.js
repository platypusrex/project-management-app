import React, { createContext } from 'react';
import { compose } from 'recompose';
import { withState } from "./withState";
import { getAuthToken } from "../utils/localStorageUtil";

export const AuthContext = createContext();

const initialState = {
	isAuthenticated: !!(getAuthToken())
};

const AuthProviderComponent = (props) => {
	const { state, setState, children } = props;

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: state.isAuthenticated,
				setAuthStatus: (isAuthenticated) => setState(ss => ({...ss, isAuthenticated}))
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const AuthProvider = compose(
	withState(initialState)
)(AuthProviderComponent);