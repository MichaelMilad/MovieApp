import { Request, Response, NextFunction } from 'express';
import Movie from '../models/movie';

const showAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const allMovies = await Movie.find();
    console.log(allMovies);
    return res.json({
      Movies: allMovies
    });
  } catch (err) {
    next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newMovie = new Movie(req.body.movie);
    await newMovie.save();
    return res.json({
      state: 'Success',
      message: 'Movie Saves',
      data: newMovie
    });
  } catch (error) {
    next(error);
  }
};

const showOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (movie) {
      return res.json({
        state: req.user ? 'Logged In' : 'Logged Out',
        message: 'Movie Found',
        data: movie
      });
    } else {
      return res.json({
        state: req.user ? 'Logged In' : 'Logged Out',
        message: 'Movie Was Not Found'
      });
    }
  } catch (error) {
    next(error);
  }
};

export { showAll, create, showOne };
