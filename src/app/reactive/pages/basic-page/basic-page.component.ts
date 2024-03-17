import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

const rtx5090 = {
  name: 'RTX5090',
  price: '2500',
  inStorage: '6',
};
@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.css'],
})
export class BasicPageComponent implements OnInit {
  //?Implementacion de manera normal sin la ID (inyeccion de dependecias), en el constructor
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  //?Implementacion de formControl con el constructor
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.myForm.reset(rtx5090);  //? Reseteamos el formulario con los valores de la constante
  }

  /**
   * 
   * @param field el nombre del formControlName de myForm
   * @returns Todos los errores como required y minLength
   */
  isValidField(field: string):boolean | null{
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

/**
 * 
 * @param field el nombre del formControlName de myForm
 * @returns el mensaje de validacion para el <span/>
 */
  getFieldError(field: string): string | null{
    if(!this.myForm.controls[field]) return null; //?Si el formulario no tiene el valor del control lo retorno como null
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch(key){
        case 'required':
          // return `El campo ${field} es requerido`;
          return 'Este campo es requerido';
        case 'minlength':
        return `Minimo ${errors['minlength'].requiredLength} caracteres.`;
      }
    }
    return null;
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched(); //?Marca como si todos los campos fueron tocados
      return; //?Si el formulario es invalido no pasara y devolvera un return
    }
    console.log(this.myForm.value);
    this.myForm.reset({ price: 120, inStorage: 0 }); //!Solo se reseteara cuando el valor con el formulario cuando se haga match
  }
}
