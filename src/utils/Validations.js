import FormValidator from "./FormValidator";

var passwordMatch = (confirmation, state) => (state.password === confirmation);

export const exampleValidator = new FormValidator([
    {
        field: 'phone',
        method: 'isEmpty',
        validWhen: false,
        message: 'Por favor introduce un número telefónico'
    },
    {
        field: 'phone',
        method: 'matches',
        args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/], // args is an optional array of arguements that will be passed to the validation method
        validWhen: true,
        message: 'Este no es un número válido'
    },
    {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'Una contraseña es requerida'
    },
    {
        field: 'password_confirmation',
        method: 'isEmpty',
        validWhen: false,
        message: 'La confirmación de la contraseña es requerida'
    },
    {
        field: 'password_confirmation',
        method: passwordMatch,   // notice that we are passing a custom function here
        validWhen: true,
        message: 'La contraseña y su confirmación no concuerdan'
    },
    {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'Un email es necesario'
    },
    {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'El email ingresado es inválido'
    },
]);

export const defaultValidator = new FormValidator([
    // {
    //     field: 'campoObligatorioInt',
    //     method: 'isEmpty',
    //     validWhen: false,
    //     message: '* Campo obligatorio'
    // },
    // {
    //     field: 'campoObligatorioInt',
    //     method: 'isInt',
    //     validWhen: true,
    //     message: 'Introduce sólo números'
    // },
    {
        field: 'campoObligatorio',
        method: 'isEmpty',
        validWhen: false,
        message: '* Campo obligatorio'
    },
]);

// export const defaultValidator = new FormValidator([
//     {
//         field: 'campoObligatorioInt',
//         method: 'isEmpty',
//         validWhen: false,
//         message: '* Campo obligatorio'
//     },
//     {
//         field: 'campoObligatorioInt',
//         method: 'isInt',
//         validWhen: true,
//         message: 'Introduce sólo números'
//     },
//     {
//         field: 'clave',
//         method: 'isEmpty',
//         validWhen: false,
//         message: '* Campo obligatorio'
//     },
//     {
//         field: 'fechaInicio',
//         method: 'isEmpty',
//         validWhen: false,
//         message: '* Campo obligatorio'
//     },
//     {
//         field: 'fechaVencimiento',
//         method: 'isEmpty',
//         validWhen: false,
//         message: '* Campo obligatorio'
//     },
// ]);

 export function getValidator(state){
     let validations = [];
     console.log("State arrived: " + JSON.stringify(state));

     Object.keys(state).forEach(key => {
        console.log("Key: " + key);
        if (typeof state[key] === 'number') {
            console.log("Is a number");
            validations.push({
                field: key,
                method: 'isEmpty',
                validWhen: false,
                message: '* Campo obligatorio'
            });
            validations.push({
                field: key,
                method: 'isInt',
                validWhen: true,
                message: '* Introduce sólo números'
            });
        }
        else if (typeof state[key] === 'string') {
            if (state[key].includes('/')){
                console.log("Is a date");
                validations.push({
                    field: key,
                    method: 'isEmpty',
                    validWhen: false,
                    message: '* Fecha obligatoria'
                });
            }else if (state[key].includes('@')){
                console.log("Is an email");
                validations.push({
                    field: key,
                    method: 'isEmpty',
                    validWhen: false,
                    message: '* Campo obligatorio'
                });

                validations.push({
                    field: key,
                    method: 'isEmail',
                    validWhen: false,
                    message: '* Introduce un email válido'
                });
            }else {
                console.log("Is a String");
                validations.push({
                    field: key,
                    method: 'isEmpty',
                    validWhen: false,
                    message: '* Campo obligatorio'
                })
            }
        }
        else if (typeof state[key] === 'undefined') {
            console.log("Is undefined")
        }
        else {
            console.log("Is null")
        }

    })
     let validator = new FormValidator(validations);
     console.log("Validator: " + JSON.stringify(validator));
     return validator;
}


