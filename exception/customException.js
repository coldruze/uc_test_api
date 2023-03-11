class CustomException extends Error {
    constructor(value, ...params) {
        super(...params);
        this.value = value;
    }
}

module.exports = CustomException;