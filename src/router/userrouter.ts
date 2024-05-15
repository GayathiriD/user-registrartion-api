import express from "express";
import { IUser } from "../model/user";
import { loginUser, createUser } from "../controllers/usercontroller";
import auth, { CustomRequest } from "../middlewear/auth";

const router = express.Router();

router.post("/register", async (req, res) => {
  const userData: Partial<IUser> = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  const registeredUser = await createUser(userData);
  if (registeredUser.error) {
    return res.status(400).json({
      error: registeredUser.error,
    });
  }
  res.status(201).json(registeredUser);
});

router.post("/login", async (req, res) => {
  const userData: Partial<IUser> = {
    email: req.body.email,
    password: req.body.password,
  };
  const loggedInUser = await loginUser(userData);
  if (loggedInUser.error) {
    return res.status(400).json({
      error: loggedInUser.error,
    });
  }
  return res.status(200).json(loggedInUser);
});

//fetch logged in user
router.get("/me", auth, async (req: CustomRequest, res) => {
  return res.status(200).json({
    user: req.user,
  });
});

//
router.post("/logoutall", auth, async (req: CustomRequest, res) => {
  if (req.user) {
    req.user.tokens = [];
    await req.user.save();
  }
  return res.status(200).json({
    message: "User logged out from all devices successfully.",
  });
});

//logout user
router.post("/logout", auth, async (req: CustomRequest, res) => {
  if (req.user) {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
  }
  return res.status(200).json({
    message: "User logged out successfully",
  });
});

export default router;

// logout from all devices
