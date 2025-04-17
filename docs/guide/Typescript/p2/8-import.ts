import { Validator as validato } from "./8-module";

class EmailValidator implements validato {
    isValid(s: string): boolean {
        return /\S+@\S+\.\S+/.test(s);
    }
}
export default { EmailValidator };