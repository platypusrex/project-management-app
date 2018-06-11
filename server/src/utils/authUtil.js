import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret } from "./config";
import _ from 'lodash';

export async function hashPassword (password) {
	return await bcrypt.hash(password, 12);
}

export function validatePassword (password, hash) {
	return bcrypt.compare(password, hash);
}

export function createToken (user) {
	const userId = _.pick(user, ['id']);

	return jwt.sign({userId}, secret, {expiresIn: '7d'});
}

export const verifyToken = async (req) => {
	const token = req.headers.authorization;

	try {
		const {user} = await jwt.verify(token, secret);
		req.user = user;
	} catch (err) {
		console.log(err);
	}

	req.next();
};