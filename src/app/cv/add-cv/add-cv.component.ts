import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CvService } from '../services/cv.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from 'src/config/routes.config';
import { Cv } from '../model/cv';
import { CommonModule, JsonPipe } from '@angular/common';
import { uniqueCinValidator } from './unique-cin.validator';
import { cinAgeValidator } from './cin-age.validator';

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, JsonPipe, CommonModule],
})
export class AddCvComponent implements OnInit {
  private cvService = inject(CvService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private formBuilder = inject(FormBuilder);

  // Define a storage key for this form's data
  private STORAGE_KEY = 'cvFormData';

  form = this.formBuilder.group(
    {
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      path: [''],
      job: ['', Validators.required],
      cin: [
        '',
        {
          validators: [Validators.required, Validators.pattern('[0-9]{8}')],
          asyncValidators: [uniqueCinValidator(this.cvService)],
          updateOn: 'blur', // Validation triggered on blur, reducing API calls
        },
      ],
      age: [0, Validators.required],
    },
    { validators: cinAgeValidator() }
  );

  ngOnInit(): void {
    // On init, try to restore form data if available
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    if (savedData) {
      this.form.patchValue(JSON.parse(savedData));
    }

    // Subscribe to form changes and save them
    this.form.valueChanges.subscribe((values) => {
      // Only save if form is valid (according to the requirement)
      if (this.form.valid) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(values));
      }
    });
  }

  addCv() {
    if (!this.form.valid) {
      this.toastr.warning('Le formulaire n’est pas valide');
      return;
    }

    this.cvService.addCv(this.form.value as Cv).subscribe({
      next: (cv) => {
        this.router.navigate([APP_ROUTES.cv]);
        this.toastr.success(
          `Le cv ${cv.firstname} ${cv.name} est ajouté avec succès`
        );

        // Clear the localStorage upon successful submission
        localStorage.removeItem(this.STORAGE_KEY);
      },
      error: (err) => {
        this.toastr.error(
          `Une erreur s'est produite, Veuillez contacter l'admin`
        );
      },
    });
  }

  // Getters for form fields
  get name(): AbstractControl {
    return this.form.get('name')!;
  }
  get firstname() {
    return this.form.get('firstname');
  }
  get age(): AbstractControl {
    return this.form.get('age')!;
  }
  get job() {
    return this.form.get('job');
  }
  get path() {
    return this.form.get('path');
  }
  get cin(): AbstractControl {
    return this.form.get('cin')!;
  }
}
