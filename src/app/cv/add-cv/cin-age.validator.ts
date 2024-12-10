import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cinAgeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Ensure we have the controls
    const ageControl = control.get('age');
    const cinControl = control.get('cin');

    // If either control is missing, return null (no validation performed)
    if (!ageControl || !cinControl) {
      return null;
    }

    const age = ageControl.value;
    const cin = cinControl.value;

    // If cin or age is not properly set, skip validation
    if (!cin || cin.length !== 8 || age == null) {
      return null;
    }

    // Extract the first two characters of the CIN
    const cinPrefix = parseInt(cin.substring(0, 2), 10);

    // If age >= 60 => prefix between 00 and 19
    if (age >= 60) {
      if (cinPrefix < 0 || cinPrefix > 19) {
        return { cinAgeCorrelation: true };
      }
    } else {
      // If age < 60 => prefix must be greater than 19
      if (cinPrefix <= 19) {
        return { cinAgeCorrelation: true };
      }
    }

    // If all conditions are satisfied
    return null;
  };
}
