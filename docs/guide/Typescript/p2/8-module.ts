export interface Validator {
    isValid(s: string): boolean;
}

interface LengthValidator extends Validator {
    minLength: number;
    maxLength: number;
}
export { LengthValidator as lengthValidator };


