module.exports = (type) => {
    let result = null;

    switch (type) {
        case 'string':
            result = "";
            break;
        case 'integer':
            result = 0;
            break;
        case 'boolean':
            result = false;
            break;
        case 'array':
            result =  [];
            break;
        case 'object':
            result =  {};
            break;
        default:
            throw Error(type + ' is not a valid type');
    }

    return result;
};