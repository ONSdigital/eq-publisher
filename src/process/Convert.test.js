const Convert = require('./Convert');

describe('Convert', () => {

    let mockGenerator;
    let mockValidator;
    let mockPerformTransforms;

    beforeAll(() => {
        mockGenerator = {
            generate: jest.fn()
        };
        mockValidator = {
            validate: jest.fn()
        };
        mockPerformTransforms = jest.fn();

    });

    describe('constructor', () => {


        it('should accept a generator', () => {
            const convert = new Convert(mockGenerator, mockValidator, mockPerformTransforms);
            expect(convert.schemaGenerator).toBe(mockGenerator);
        });

        it('should accept a validator', () => {
            const convert = new Convert(mockGenerator, mockValidator, mockPerformTransforms);
            expect(convert.schemaValidator).toBe(mockValidator);
        });

        it('should accept a performTransforms function', () => {
            const convert = new Convert(mockGenerator, mockValidator, mockPerformTransforms);
            expect(convert.performTransforms).toBe(mockPerformTransforms);
        });

    });

    describe('behaviour', () => {

        it('should generate a minimal eQ schema', () => {
            mockValidator.validate.mockReturnValue({ valid: true })

            const convert = new Convert(mockGenerator, mockValidator, mockPerformTransforms);
            const mockAuthorJSON = {};

            convert.convert(mockAuthorJSON);

            expect(mockGenerator.generate).toHaveBeenCalled();
        });

        it('should call performTransforms function', () => {
            mockValidator.validate.mockReturnValue({ valid: true })

            const convert = new Convert(mockGenerator, mockValidator, mockPerformTransforms);
            const mockAuthorJSON = {};

            convert.convert(mockAuthorJSON);

            expect(mockGenerator.generate).toHaveBeenCalled();
        });

    });



});