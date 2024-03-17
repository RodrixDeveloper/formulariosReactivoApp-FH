import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.css'],
})
export class DynamicPageComponent {
  //? Manera con varias instancias de new
  // public myForm2: new FormGroup({
  //   favoriteGames: new FormArray([])
  // }) ;

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Rodrigo', Validators.required],
    ]),
  });

  public newFavorite:FormControl = new FormControl('',[Validators.required])  //!Agrear validaciones a un solo campo o input

  constructor(private fb: FormBuilder) {}

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  /**
   *
   * @param field el nombre del formControlName de myForm
   * @returns Todos los errores como required y minLength
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
   * @param formArray Array de formArray de validaciones
   * @param index El index de nuestro recorrido for del FormArray
   * @returns Los errores de formArray
   */
  isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  onAddToFavorites():void{
    if(this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;
    // this.favoriteGames.push(new FormControl(newGame, Validators.required))  //!Una manera que si NO estarias trabajando con el formBuilder
    this.favoriteGames.push(  //?Agregar newGame en el arrays
      this.fb.control(newGame, Validators.required)
    );

    this.newFavorite.reset();  //?Vaciamos el newFavorite del array
  }

  onDeleteFavorite(index:number):void{
    this.favoriteGames.removeAt(index);  //?Eliminacion de los arreglos
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]);   //?Vaciamos el arrays de favorites games cuando lo enviamos o guardamos
    this.myForm.reset();
  }
}
