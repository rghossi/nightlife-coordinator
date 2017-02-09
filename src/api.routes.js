import { Router } from 'express';
import Passport from 'passport';
import * as UserController from './controllers/user.controller';

const router = new Router();

router.get("/login", Passport.authenticate('facebook', { scope : 'email' }));
router.get("/logout", UserController.logout);
router.get("/login/facebook/return*", Passport.authenticate('facebook', {
        successRedirect : '/',
        failureRedirect : '/'
    })
);

export default router;