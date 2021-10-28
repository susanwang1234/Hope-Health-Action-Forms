import { Response, Router } from 'express';
import { authorize } from 'passport';
import { ReqUser } from '../../types/indexType';

const router = Router();

router.post('/', authorize('jwt'), (req: ReqUser, res: Response) => {});

export = router;
