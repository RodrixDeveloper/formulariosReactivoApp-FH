import { FormControl, ValidationErrors } from '@angular/forms';


// //?Validaciones el nombre y apellido (Que tenga dos palabras)
// export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

// //?Validaciones de correo
// export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


// //?Validacion que no sea el username Strider
// export const cantBeStrider = (control: FormControl):ValidationErrors | null => {
//   const value: string = control.value.trim().toLowerCase();
//   if (value === 'strider') {
//     return {
//       noStrider: true,
//     };
//   }
//   return null;
// };
