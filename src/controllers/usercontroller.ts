import User from "../model/user";

import { IUser } from "../model/user";

export const createUser = async (user: Partial<IUser>) => {
  const { firstName, middleName, lastName, email, password } = user;
  if (!firstName || !lastName || !email || !password) {
    return {
      error: "Please provide all the required fields",
    };
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return {
      error: "User with email already exists",
    };
  }
  const newUser = new User({
    firstName,
    middleName,
    lastName,
    email,
    password,
  });
  await newUser.save();
  const token = await newUser.generateAuthToken();
  return {
    user: newUser,
    token,
  };
};

export const loginUser = async (user: Partial<IUser>) =>  {
    const { email, password } = user
    if( !email || !password) {
        return {
            error: 'please provide all required fields'
        }
    }
    const existingUser = await User.findByCredentials(email, password)
    if(!existingUser) {
        return {
            error: ' Invalid credentials'
        }

    }
    const token = await existingUser.generateAuthToken()
    return {
        user: existingUser,
        token,

    }
}
