import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log(username, password);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'oops server went down' });
  }
});

export = router;
