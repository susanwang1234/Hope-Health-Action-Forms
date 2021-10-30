import express from 'express';
import controller from '../controllers/userController';

const router = express.Router();

router.get('', controller.getUsers);
// router.get('', controller.editUserById);
// router.get('', controller.createUser);
router.delete('/:id', controller.deleteUserById);
// router.get('', controller.deleteUsers);

export = router;
