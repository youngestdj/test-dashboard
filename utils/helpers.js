/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

const { TEMP_JWT_SECRET } = process.env;

export const generateToken = (id, expiresIn = '24h') =>
  jwt.sign({ id }, TEMP_JWT_SECRET, { expiresIn });
