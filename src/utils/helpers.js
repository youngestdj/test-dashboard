/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

const { TEMP_JWT_SECRET, JWT_SECRET } = process.env;

export const generateTempToken = (id, expiresIn = '24h') =>
  jwt.sign({ id }, TEMP_JWT_SECRET, { expiresIn });

export const generateToken = (id, expiresIn = '24h') =>
  jwt.sign({ id }, JWT_SECRET, { expiresIn });
