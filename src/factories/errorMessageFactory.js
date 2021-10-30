export default function generateErrorMessage(errorCode, message) {
    const validation = {
        isInvalid: true,
        errorCode,
        errorMessage: message,
    };

    return validation;
}
