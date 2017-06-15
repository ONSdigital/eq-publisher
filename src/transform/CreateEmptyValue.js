module.exports = (prop) => {
    let result = null;

    if (prop.hasOwnProperty('type')) {
        switch (prop.type) {
            case 'string':
                result = "";
                break;
            case 'integer':
                result = 0;
                break;
            case 'boolean':
                result = new Boolean();
                break;
            case 'array':
                result =  [];
                break;
            case 'object':
                result =  {};
                break;
        }
    } else if (prop.hasOwnProperty('enum') && prop.enum.length > 0) {
        result = prop.enum[0];
    }

    return result;
};