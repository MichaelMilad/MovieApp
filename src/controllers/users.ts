import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import Movie from '../models/movie';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, age, name, movies } = req.body;
    const user = new User({ email, age, name });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
    });
    async () => {
      for (const movie of movies) {
        const newMovie = new Movie(movie);
        console.log(newMovie);
        await newMovie.save();
      }
    };
    return res.json({
      state: req.user ? 'Logged In' : 'Logged Out',
      message: 'User Created'
    });
  } catch (e) {
    next(e);
  }
};

const login = (req: Request, res: Response) => {
  res.redirect('/api');
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.logout();
    return res.redirect('/api');
  } catch (error) {
    next(error);
  }
};

const viewSecret = (req: Request, res: Response) => {
  return res.send('SECRET VIEWED');
};

export { login, create, logout, viewSecret };
