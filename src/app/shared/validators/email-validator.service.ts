import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator{
    
    //!Primera v1 de funcion de validadores asincronas
    // validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
    //      const email = control.value;
    //     console.log(email);
    //      return of({
    //         emailTaken : true
    //      }).pipe(
    //         delay(2000)
    //      )
    // }


    //!Validacion de correo que si existe Con servicio 
    //     validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
    //         const email = control.value;
    //         console.log(email);
            
    //         return this.http.get<string>(`https://miserviciodeemailvalidar`)
    //         .pipe(
    //             map(res => {
    //                 return (resp.length === 0) ? null : {emailTaken:true}
    //             })
    //         )
    //    }

    //! Validaciones asincronas
    validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
        const email = control.value;
        const httpCallObservable = new Observable<ValidationErrors|null>((subscriber) => {
            console.log(email);
            if(email === 'rodrigo@gmail.com'){
                subscriber.next({emailTaken:true});
                subscriber.complete();      
                // return; //?Opcional por que el complete termina la subcription  
            }
            subscriber.next(null);
            subscriber.complete();            
        }).pipe(
            delay(3000)
        )
        return httpCallObservable;
    }
}