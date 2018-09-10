import { FormGroup } from '@angular/forms';
export class GolobalValid {
    static mailFormat(result: any = { fomat: true }) {
        return (control: FormGroup) => {
            var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

            if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
                return result;
            }
            return null;
        }
    }

    static required(result: any = { required: true }) {
        return (control: FormGroup) => {
            if (control.value == "") {
                return result;
            }
            return null;
        }
    }

    static phone(result: any = { phone: true }) {
        return (control: FormGroup) => {
            var TEL_REGEXP = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;

            if (control.value != "" && !TEL_REGEXP.test(control.value)) {
                return result;
            }
            return null;
        }
    }
}
