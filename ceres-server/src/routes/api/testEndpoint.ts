import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'test endpoint!' });
});

export default router;
