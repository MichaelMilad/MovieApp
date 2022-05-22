import { Router, Request, Response } from 'express';
import { ApiRouter } from './api/api.router';

const router: Router = Router();
router.use('/api', ApiRouter);

router.get('/', async (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  });
});

export const IndexRouter: Router = router;
