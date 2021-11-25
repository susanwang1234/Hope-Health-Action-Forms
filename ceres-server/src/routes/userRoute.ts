import express from 'express';
import controller from '../controllers/userController';
import authorize from '../middlewares/authorization.mw';
import roles from '../shared/userRoles';

const router = express.Router();

router.get('', authorize(roles.hhaAdmin), controller.getUsers);
router.post('', controller.createUser);
router.put('/:id', controller.editUserById);
router.delete('/:id', controller.deleteUserById);
router.delete('', controller.deleteUsers);

export = router;
