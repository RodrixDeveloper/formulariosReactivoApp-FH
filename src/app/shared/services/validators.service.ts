import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  constructor() {}

  //?Validaciones el nombre y apellido (Que tenga dos palabras)
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

  //?Validaciones de correo
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  //?Validacion que no sea el username Strider
  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();
    if (value === 'strider') {
      return {
        noStrider: true,
      };
    }
    return null;
  };


  public isValidField(form:FormGroup, field:string):boolean | null{
    return (
        form.controls[field].errors && form.controls[field].touched
    );
  }

  /**
   *  Validacion de passwords
   * @param field1 Ingresa en pass1
   * @param field2 ingresa en pass2
   * @returns retorna un boolean (true o null) , si pass1 !== a pass2  return true; pero si pass1 === pass2 return true
   */
  public isFieldOneEqualFieldTwo(field1:string, field2:string){
    return (formGroup: AbstractControl) :ValidationErrors|null =>{
        const fieldValue1 = formGroup.get(field1)?.value;
        const fieldValue2 = formGroup.get(field2)?.value;

        if(fieldValue1 !== fieldValue2){
            formGroup.get(field2)?.setErrors({notEqual:true})  //?Seteamos el error en el pass2
            return {notEqual:true}  //?Devolvemos true que la validacion que el pass1 y pass2 son diferentes
        }

        formGroup.get(field2)?.setErrors(null)  //?Si todo sale bien y pass1 === pass2 mandamos null para que pase la validacion

        return null;
    }
  }
}
