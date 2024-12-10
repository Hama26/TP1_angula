// unique-cin.validator.ts
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { CvService } from '../services/cv.service';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, catchError } from 'rxjs/operators';

export function uniqueCinValidator(cvService: CvService): AsyncValidatorFn {
  return (control: AbstractControl): any => {
    if (!control.value) {
      // If no value, no need to check
      console.log('No value, skipping validation');
      return of(null);
    }

    return of(control.value).pipe(
      debounceTime(500),          // Wait 500ms after user stops typing
      distinctUntilChanged(),     // Only proceed if value changed since last check
      switchMap(cin => cvService.selectByCin(cin)),
      map(isUnique => (isUnique ? null : { cinTaken: true })),
      catchError(() => of(null))  // In case of error, treat as unique or handle differently
    );
  };
}
