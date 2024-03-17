import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styleUrls: ['./switches-page.component.css'],
})
export class SwitchesPageComponent implements OnInit {
  public myForm: FormGroup = this.fb.group({
    gender: ['', Validators.required],
    wantNotifications: [false, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue], //?Aqui si tiene que ser un valor VERDADERO (true), para pasar la validacion
  });

  public person = {
    gender: 'F',
    wantNotifications: false,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  /**
   *
   * @param field Nombre del formControlName de html
   * @returns Todos los erroes de campo field (requerid, minLeng etc...)
   */
  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  /**
   *
   * @param field el nombre del formControlName de myForm
   * @returns el mensaje de validacion para el <span/>
   */
  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null; //?Si el formulario no tiene el valor del control lo retorno como null
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          // return `El campo ${field} es requerido`;
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres.`;
      }
    }
    return null;
  }

  /**
   * 
   * const: Se utiliza para declarar una variable que no cambiará de valor después de su inicialización.

    { termsAndConditions, ...newPerson }: Esto es un destructuring object. termsAndConditions es una propiedad del objeto this.myForm.value, mientras que ...newPerson es una sintaxis de spread operator que copia todas las demás propiedades del objeto this.myForm.value en un nuevo objeto llamado newPerson.

    this.myForm.value: this.myForm es una referencia a un formulario reactivo en Angular. .value es una propiedad que devuelve un objeto que representa los valores actuales del formulario.
   */
  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched(); //?Marca como si todos los campos fueron tocados
      return; //?Si el formulario es invalido no pasara y devolvera un return
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value; //?Desstructuramos para quitar termsAndConditions , y obtenemos una copia de todos los demas campos de myForm en una nuevo objeto newPerson
    this.person = newPerson; // ? Lo que enviariamos al backEnd para registrar
    console.log(this.myForm.value);
    console.log(this.person);
  }
}
