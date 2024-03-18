import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
// import { cantBeStrider } from 'src/app/shared/validators/validators';
import * as customValidators from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required,Validators.pattern(this._validatorsService.firstNameAndLastnamePattern)]],  
    //?Las expresiones regulares tienen que ser con pattern (!sd3)
    // email: ['', [Validators.required, Validators.email, Validators.pattern(this._validatorsService.emailPattern)],[new EmailValidatorService()]],  //?Validacion asincrona
    email: ['', [Validators.required, Validators.email, Validators.pattern(this._validatorsService.emailPattern)],[this._emailValidator]],  //?Validacion asincrona
    username: ['', [Validators.required, this._validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  },{
    //?VALIDACION DE PASSWORD
    validators:[  //!Tenemos acceso a todos los campos de formControl validators
      this._validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });

  constructor(
    private fb: FormBuilder,
    private _validatorsService:ValidatorsService,
    private _emailValidator:EmailValidatorService
    ) {}

  //TODO: Obtener validacion desde un servicio
  isValidField(field:string){
    return this._validatorsService.isValidField(this.myForm, field)
  }

  onSubmit():void{
    if(this.myForm.invalid) return this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }
}
