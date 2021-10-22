import Joi from "joi";

function validateNewEntry(entryData) {
    const joiValidation = newEntrySchema.validate(entryData);
    const validation = { isInvalid: false, errorCode: null, errorMessage: "" };

    if (joiValidation.error) {
        validation.isInvalid = true;
        validation.errorCode = 400;
        validation.errorMessage = joiValidation.error.details[0].message;
    }

    return validation;
}

const newEntrySchema = Joi.object({
    description: Joi.string().min(3).required(),
    amount: Joi.number().required(),
    date: Joi.date(),
    type: Joi.string().required(),
});

export { validateNewEntry };
