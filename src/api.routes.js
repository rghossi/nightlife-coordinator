import { Router } from 'express';
import Passport from 'passport';
import * as UserController from './controllers/user.controller';
import * as PlacesController from './controllers/places.controller';

const router = new Router();

router.get("/users/:id", UserController.getUser);
router.put("/users/:id", UserController.updateUser);

router.get("/places/:location", PlacesController.getPlaces);

router.get("/isLoggedIn", UserController.isLoggedIn);
router.get("/login", Passport.authenticate('facebook', { scope : 'email' }));
router.get("/logout", UserController.logout);
router.get("/login/facebook/return*", Passport.authenticate('facebook', {
        successRedirect : '/',
        failureRedirect : '/'
    })
);

export default router;