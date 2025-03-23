function isPositiveInteger(number) {
    return Number.isInteger(number) && number > 0;
}

function isNotPresentOrNumber(number) {
    return number === undefined || number === null || (Number.isFinite(number) && number >= 0);
}

export {isPositiveInteger, isNotPresentOrNumber};