import express from 'express';
import controller from '../controllers/userController';

const router = express.Router();

router.get('', controller.getUsers);
router.post('', controller.createUser);
router.put('/:id', controller.editUserById);
router.delete('/:id', controller.deleteUserById);
router.delete('', controller.deleteUsers);

export = router;
