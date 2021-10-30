import Joi from "joi";
import generateErrorMessage from "../factories/errorMessageFactory.js";

function validateNewEntry(entryData) {
    const joiValidation = newEntrySchema.validate(entryData);
    let validation = { isInvalid: false };

    if (joiValidation.error) {
        validation = generateErrorMessage(
            400,
            joiValidation.error.details[0].message
        );
    }

    return validation;
}

const newEntrySchema = Joi.object({
    description: Joi.string().min(3).required(),
    amount: Joi.number().required(),
    date: Joi.date(),
    type: Joi.string().valid("expense", "income").required(),
});

export { validateNewEntry };
