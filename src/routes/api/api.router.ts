import { Router, Request, Response } from 'express';
import * as users from '../../controllers/users';
import * as movies from '../../controllers/movies';
import * as reviews from '../../controllers/reviews';
import { isLoggedIn } from '../../middlewares';
import passport from 'passport';

const router: Router = Router();

router.get('/', async (_req: Request, res: Response) => {
  res.json({
    message: '/api'
  });
});

//users
router.route('/login').post(
  passport.authenticate('local', {
    failureRedirect: '/login'
  }),
  users.login
);
router.route('/logout').get(users.logout);
router.route('/users').post(users.create);

//movies
router.route('/movies').get(movies.showAll).post(movies.create);
router.route('/movies/:id').get(movies.showOne);

//reviews
router.route('/movies/:id/reviews').post(isLoggedIn, reviews.create).get();

router.route('/check').get((req, res) => {
  console.log(req);
  console.log(req.user);
  return res.send('LoG');
});

export const ApiRouter: Router = router;
