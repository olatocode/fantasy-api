/** @format */

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db';

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    // Check for existing username or email
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
    if (existingUser) {
      let conflictField =
        existingUser.username === username ? 'username' : 'email';
      return res
        .status(409)
        .json({ message: `A user with this ${conflictField} already exists.` });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    res
      .status(201)
      .json({
        message: 'Registration successfuly',
        data: user.id,
        username: user.username,
        email: user.email,
      });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d',
      }
    );
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err });
  }
};
