import express from 'express';
import { register, login, updateProfile, logOut } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();

router.route('/register').post(singleUpload, register);
router.route('/login').post(login);
router.route('/logout').post(logOut)
router.route('/profile/update').post(isAuthenticated, updateProfile);


export default router;
