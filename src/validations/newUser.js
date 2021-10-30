import Joi from "joi";
import { pool } from "../db/pool.js";
import { findUser } from "../db/queries/users.js";
import generateErrorMessage from "../factories/validationMessageFactory.js";

async function validateNewUser(userData) {
    const joiValidation = userSchema.validate(userData);
    let validation = { isInvalid: false };

    try {
        if (joiValidation.error) {
            validation = generateErrorMessage(
                400,
                joiValidation.error.details[0].message
            );

            return validation;
        }

        const isUser = await findUser(userData.email);

        if (isUser.rowCount > 0) {
            validation = generateErrorMessage(
                409,
                "This email is already registered."
            );

            return validation;
        }

        return validation;
    } catch (error) {
        validation = generateErrorMessage(500, "Unknown error");

        return validation;
    }
}

const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export { validateNewUser };
