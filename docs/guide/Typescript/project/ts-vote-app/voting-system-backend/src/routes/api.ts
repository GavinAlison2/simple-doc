import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { VoteController } from '../controllers/VoteController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';
import { asyncWrapper } from '../middlewares/asyncWrapper';

const router = Router();

router.get('/index', (req, res, next) => {
    res.send('Hello World!');
});
router.get('/users', asyncWrapper(UserController.getUsers));
router.post('/register', UserController.register);
router.post('/login', asyncWrapper(UserController.login));
router.use(asyncWrapper(authMiddleware));
router.post('/votes', VoteController.createVote);
router.get('/votes', VoteController.getVotes);

export default router;
