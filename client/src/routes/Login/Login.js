import React from 'react';
import { Link } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';
import { withState } from "../../shared/containers/withState";
import { FormGroup } from "../../shared/components/FormGroup";
import { Input } from "../../shared/components/Input";
import { Button } from "../../shared/components/Button";
import { withLogin } from "../../api/auth/withLogin";
import { storeAuthToken } from "../../shared/utils/localStorageUtil";
import '../../styles/routes/Auth.css';
import {AuthContext} from "../../shared/containers/withAuth";
import {placeholder} from "../../shared/constants/authConstants";

const initialState = {
	email: '',
	password: '',
	isSubmitting: false,
	errors: {}
};

const LoginComponent = (props) => {
	const { state, setState } = props;
	const { email, password } = state;

	return (
		<div className="auth">

			<div className="auth__content-wrapper">

				<div className="auth__form-wrapper">
					<h1 className="auth__form-header">Login</h1>

					<form>
						<FormGroup label="Email">
							<Input
								type="email"
								placeholder={placeholder.email}
								value={email}
								onChange={email => setState(ss => ({...ss, email}))}
							/>
						</FormGroup>

						<FormGroup label="Password">
							<Input
								type="password"
								placeholder={placeholder.password}
								value={password}
								onChange={password => setState(ss => ({...ss, password}))}
							/>
						</FormGroup>

						<FormGroup>
							<AuthContext.Consumer>
								{({setAuthStatus}) => (
									<Button type="primary" onClick={e => props.handleLogin(e, setAuthStatus)}>
										Login
									</Button>
								)}
							</AuthContext.Consumer>
						</FormGroup>
					</form>

					<div className="auth__auth-link-wrapper">
						<Link className="auth__auth-link" to="/register">Register</Link>
					</div>
				</div>
			</div>

			<div className="auth__bg"/>
		</div>
	);
};

export const Login = compose(
	withLogin,
	withState(initialState),
	withHandlers({
		handleLogin: (props) => async (e, setAuthStatus) => {
			e.preventDefault();
			const { setState, state } = props;
			const { email, password } = state;

			if (state.isSubmitting) {
				return;
			}

			try {
				setState(ss => ({...ss, isSubmitting: true}));
				const response = await props.loginUser({email, password});
				const token = response.data.login;

				storeAuthToken(token);
				setAuthStatus(true);
				props.history.push('/home');
			} catch (err) {
				setState(ss => ({...ss, isSubmitting: false}));
				console.log(`handleLogin: ${err}`);
			}
		}
	})
)(LoginComponent);
