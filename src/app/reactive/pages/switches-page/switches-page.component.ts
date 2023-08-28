import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {
  public myForm: FormGroup = this.fb.group({
    gender: ['F', Validators.required],
    wantNotifications: [true, [Validators.required]],
    termAndConditions: [false, [Validators.requiredTrue]],
  })
  public person = {
    gender: 'F',
    wantNotifications: false
  }
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.myForm.reset(this.person)
  }

  isVlidField(field: string) {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }

  getFieldError(field: string) {
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido.'
        case 'minlength':
          console.log('minlength')
          return `El minimo de caracteres son ${errors['minlength'].requiredLength}.`
      }
    }
    return null
  }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return
    }

    // cuando queremos q termAndConditions no quede en el newPerson
    const {termAndConditions, ...newPerson}=this.myForm.value

    this.person = newPerson
    console.log(this.myForm.value)
    console.log(this.person)

  }

}
