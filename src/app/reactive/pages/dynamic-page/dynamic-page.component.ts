import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {
  public myForm:FormGroup = this.fb.group({
    name:['',[Validators.required,  Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear',Validators.required],
      ['Death stranding',Validators.required],
    ])
  })

  public newFavorite:FormControl = new FormControl('',[Validators.required])

  constructor(private fb:FormBuilder){

  }

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites(){
    if(this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value
    this.favoriteGames.push(this.fb.control(newGame,Validators.required))
    this.newFavorite.reset()
  }

  isVlidField( field:string) {
    return this.myForm.controls[field].errors
    &&  this.myForm.controls[field].touched
  }

  getFieldError(field:string){
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};

    for(const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return 'Este campo es requerido.'
        case 'minlength':
          console.log('minlength')
          return `El minimo de caracteres son ${errors['minlength'].requiredLength}.`
      }
    }
    return null
  }

  isValidFiedlInArray(formArray:FormArray, index:number){
    return formArray.controls[index].errors
    &&  formArray.controls[index].touched
  }

  onSubmit():void{
    if (this.myForm.invalid){
      this.myForm.markAllAsTouched()
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }

  onDeleteFavorite(index:number):void{
    this.favoriteGames.removeAt(index)
  }

}
