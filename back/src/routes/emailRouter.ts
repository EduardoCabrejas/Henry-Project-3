import {Router} from 'express';
import { emailController } from '../controller/emailController';

const router: Router = Router();

router.post('/email', emailController);

export default router;