import Joi from "joi";
import { pool } from "../db/pool.js";

async function validateNewUser(userData) {
    const joiValidation = userSchema.validate(userData);
    const validation = { isInvalid: false, errorCode: null, errorMessage: "" };

    try {
        if (joiValidation.error) {
            validation.isInvalid = true;
            validation.errorCode = 400;
            validation.errorMessage = joiValidation.error.details[0].message;

            return validation;
        }

        const isUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [userData.email]
        );

        if (isUser.rowCount > 0) {
            validation.isInvalid = true;
            validation.errorCode = 409;
            validation.errorMessage = "This email is already registered.";

            return validation;
        }

        return validation;
    } catch (error) {
        console.log(error);
        validation.isInvalid = true;
        validation.errorCode = 500;
        validation.errorMessage = "Unknown error";

        return validation;
    }
}

const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export { validateNewUser };
