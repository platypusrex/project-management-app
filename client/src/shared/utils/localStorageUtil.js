import { tokenKey, userIdKey } from "../constants/localStorage";
import jwt_decode from 'jwt-decode';
import { withProps } from 'recompose';

export function storeAuthToken (token) {
	if (!token) {
		throw new Error('storeAuthToken: no token provided');
	}

	const tokenBody = jwt_decode(token);
	const { userId } = tokenBody;

	storeUserId(userId.id);
	localStorage.removeItem(tokenKey);
	localStorage.setItem(tokenKey, token);
}

export function storeUserId (userId) {
	localStorage.removeItem(userIdKey);
	localStorage.setItem(userIdKey, userId);
}

export function getAuthToken () {
	const token = localStorage.getItem(tokenKey);

	if (token === 'undefined') {
		return null;
	}

	return token;
}

export function getUserId () {
	const userId = localStorage.getItem(userIdKey);

	if (!userId) {
		return null;
	}

	return parseInt(userId, 10);
}

export const withUserId = withProps(() => {
	const userId = getUserId();
	return {userId};
});