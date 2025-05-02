import { ValidatorFn } from '@angular/forms';

export const sameValue =
    (key1: string, key2: string): ValidatorFn =>
    (control) => {
        const controlValue1 = control.get(key1)?.value || control.parent?.get(key1)?.value;
        const controlValue2 = control.get(key2)?.value || control.parent?.get(key2)?.value;

        if (controlValue1 === controlValue2) {
            return null;
        }
        return { sameValue: true };
    };
