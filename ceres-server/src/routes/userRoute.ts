import express from 'express';
import controller from '../controllers/userController';

const router = express.Router();

router.get('', controller.getUsers);
// router.get('', controller.editUser);
// router.get('', controller.createUser);
// router.get('', controller.deleteUser);
// router.get('', controller.deleteUsers);

export = router;
