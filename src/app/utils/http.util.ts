import { HttpHeaders } from '@angular/common/http';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function getHeaders(): HttpHeaders {
  return new HttpHeaders({
    'Content-Type': 'application/json',
  });
}

export function twoDigitValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valid = /^[0-9]{1,2}$/.test(control.value);
    return valid ? null : { twoDigit: { value: control.value } };
  };
}
