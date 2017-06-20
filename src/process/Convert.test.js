const getAuthorData = require('../api/MockGraphQLApi').getAuthorData;

const Convert = require('./Convert');

describe('Convert', () => {

    describe('constructor', () => {

        it('expects a schema validator', () => {
            expect(() => new Convert()).toThrow()
        });

        it('should set schema validator as property', () => {
            const mockSchemaValidator = jest.fn();
            const convert = new Convert(mockSchemaValidator);

            expect(convert.schemaValidator).toBe(mockSchemaValidator);
        });

    });

    describe('behaviour', () => {

        it('should validate result against schema', () => {

            const mockSchemaValidator = {
                validate: jest.fn()
            };

            mockSchemaValidator.validate.mockReturnValue({ valid: true })

            const convert = new Convert(mockSchemaValidator);
            convert.convert(getAuthorData(1).data);


            expect(mockSchemaValidator.validate).toBeCalled();

        });


        it('should error if resulting json is invalid', () => {

            const mockSchemaValidator = {
                validate: jest.fn()
            };

            mockSchemaValidator.validate.mockReturnValue({ valid: false })

            const convert = new Convert(mockSchemaValidator);

            expect( () => convert.convert(getAuthorData(1).data)).toThrow();

        });
    });

});