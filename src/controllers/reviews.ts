import { Request, Response, NextFunction } from 'express';
import Movie from '../models/movie';
import Review from '../models/review';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  const review = new Review(req.body.review);
  review
};

export { create };
