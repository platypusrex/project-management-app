import React from 'react';
import { Link } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';
import { withState } from "../../shared/containers/withState";
import { FormGroup } from "../../shared/components/FormGroup";
import { Input } from "../../shared/components/Input";
import { Button } from "../../shared/components/Button";
import { withRegister } from "../../api/auth/withRegister";
import { storeAuthToken } from "../../shared/utils/localStorageUtil";
import '../../styles/routes/Auth.css';
import {AuthContext} from "../../shared/containers/withAuth";
import {placeholder} from "../../shared/constants/authConstants";

const initialState = {
	username: '',
	email: '',
	password: '',
	isSubmitting: false,
	errors: {}
};

const RegisterComponent = (props) => {
	const { setState, state } = props;
	const { username, email, password } = state;

	return (
		<div className="auth">
			<div className="auth__content-wrapper">
				<div className="auth__form-wrapper">
					<h1 className="auth__form-header">Register</h1>

					<form>
						<FormGroup label="Username">
							<Input
								value={username}
								placeholder={placeholder.username}
								onChange={username => setState(ss => ({...ss, username}))}
							/>
						</FormGroup>

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
									<Button type="primary" onClick={e => props.handleRegister(e, setAuthStatus)}>
										Register
									</Button>
								)}
							</AuthContext.Consumer>
						</FormGroup>
					</form>

					<div className="auth__auth-link-wrapper">
						<Link className="auth__auth-link" to="/">Login</Link>
					</div>
				</div>
			</div>

			<div className="auth__bg"/>
		</div>
	);
};

export const Register = compose(
	withRegister,
	withState(initialState),
	withHandlers({
		handleRegister: (props) => async (e, setAuthStatus) => {
			e.preventDefault();
			const { setState, state } = props;
			const { username, email, password } = state;

			if (state.isSubmitting) {
				return;
			}

			try {
				setState(ss => ({...ss, isSubmitting: true}));
				const response = await props.registerUser({username, email, password});
				const token = response.data.register;

				storeAuthToken(token);
				setAuthStatus(true);
				props.history.push('/home');
				console.log('token', token);
			} catch (err) {
				setState(ss => ({...ss, isSubmitting: false}));
				console.log(`handleRegister: ${err}`);
			}
		}
	})
)(RegisterComponent);
