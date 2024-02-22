import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { isValidCron } from 'cron-validator'
export function cronExpressionValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        return !isValidCron(value,{seconds: true}) ? {cronExpressionValid: true} : null;


        // const hasUpperCase = /[A-Z]+/.test(value);

        // const hasLowerCase = /[a-z]+/.test(value);

        // const hasNumeric = /[0-9]+/.test(value);

        // const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

        // return !passwordValid ? {passwordStrength:true}: null;
    }
}