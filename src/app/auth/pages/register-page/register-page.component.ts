import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import * as customValidators from 'src/app/shared/validators/validators';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {
  public myForm:FormGroup = this.fb.group({
    name:['',[Validators.required,Validators.pattern(customValidators.firstNameAndLastnamePattern)]],
    email:['',[Validators.required,Validators.pattern(customValidators.emailPattern)],[this.emailValidator]],
    userName:['',[Validators.required,customValidators.canBeStrider],],
    password:['',[Validators.required,Validators.minLength(6)]],
    password2:['',[Validators.required]],
  },{
    validators:[
      this.validatorsService.isFieldOneEqualFiedlTwo('password','password2')
    ]
  })
  constructor(
    private fb:FormBuilder,
    private validatorsService:ValidatorsService,
    private emailValidator:EmailValidator
    ){}

  isValidField(field:string){
    return this.validatorsService.isValidFied(this.myForm,field)
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }
}
