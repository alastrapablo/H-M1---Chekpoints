//stack

/*
 * EJERCICIO 6
 *
 * Utilizando un STACK, y dada una frase invertir palabra por palabra de la misma.
 * NO SE PUEDEN USAR METODOS DE ARRAY.
 *
 * Parametro:
 *   str: string a ser invertido palabra a palabra
 *
 * Salida:
 *  > string de la palabra invertida
 *
 * Ejemplo:
 *   Hello World: olleH dlroW
 *   There is a little monkey: erehT si a elttil yeknom
 * */

function reverseWords(str) {
  let letras = new Stack();         // creo un stack de letras
  Object.assign(letras.array, str); // le paso el string como array (un array de letras)
  let palabras = new Stack();       // creo un stack de palabras
  let palabra = '';                 // variable temporal
  
  // recorro las letras y las voy sumando a una variable temporal hasta encontrar un espacio
  // asi separo en palabras, cada palabra mete en el stack de palabras
  for (let i = 0; i < letras.size() + 1; i++) {
    if (letras.array[i] === ' ' || letras.array[i] === undefined) {
      palabras.push(palabra);
      palabra = '';
    } else {
      palabra += letras.array[i];
    }
  }
  
  let palabrasInvertidas = new Stack();
  // recorro las palabras y las invierto
  for (let j = 0; j < palabras.size(); j++) {
    // por cada palabra recorro desde el final al principio
    let aux = palabras.array[j];
    let fin = '';
    for (let m = palabras.array[j].length ; m >= 0; m--) { 
       if (typeof aux[m] !== 'undefined') fin = fin + aux[m];
    }
    if (j === 0) {
      palabrasInvertidas.push(fin);
    } else {
      palabrasInvertidas.push(' ' + fin);
    }
  }

  let resultado = '';
  // creo el string final recorriendo el stack de palabras invertidas
  for (let k = 0; k < palabrasInvertidas.size(); k++) {
    resultado = resultado + palabrasInvertidas.array[k];
  }
  return resultado;  
}

// Implementar la función crearStack, la cual recibirá por parámetro un string.
// El string recibido tendrá un formato de sucesión de letras y astericos, de la siguiente manera:
// "UN*A*PAL*AB*RA"
// "OTR*A**PAL**ABR*A"
// crearStack debe retornar false en caso de recibir un string vacío.
// Caso contrario, deberá crear un Stack, al que se agregarán y retirarán valores EN ORDEN según la secuencia recibida
// en el string, siguiendo la siguiente lógica:
//  - Una letra (A , B , C) -> Agregar la letra al Stack
//  - Un asterisco (*) -> Retirar un elemento del Stack
// Finalmente, la función deberá retornar el Stack resultante.
// Asimismo, debo prevenir que la función intente retirar un elemento del Stack si el mismo está vacío, en cuyo caso
// la función deberá retornar el string "Stack vacío"
//
// EJEMPLOS:
//   ✔️crearStack("EJ*EMP*LO") => [E,E,M,L,O]
//   ✔️crearStack("OTR**OEJEM***PL*O") => [O,O,E,P,O]
//   ✔️crearStack("") => false
//   ✔️crearStack("RET****ORNA**R*FA*L**SO") => "Stack vacío"

function crearStack(palabra) {

    if (!palabra) return false;

    const stack = new Stack();
    const pal = palabra.split("");

    for (let char of pal) {
        if (char !== "*") stack.push(char);

        if (char === "*") {
            if(stack.size()) {
                stack.pop()
            } else {
                return 'Stack vacío';
            }
        }
    }
    return stack;
}


// 3️⃣ ***** EJERCICIO 3 ***** - apilarCajas() 3️⃣
// Se debe implementar la función apilarCajas, la cual ayudará a los encargados de depósito de
// Henry Market a armar pilas de cajas de productos de forma tal que no supere el peso máximo permitido
// y evitar así que se dañen los productos.
// La función recibirá un array que representará las cajas que se desean apilar, con el nombre del producto
// y el peso total de cada caja, y deberá crear y retornar un STACK con LOS NOMBRES de productos que vaya apilando,
// sin superar el peso máximo permitido.
// En caso de que los productos superen dicho peso máximo, deberá retornar el string "No se puede crear la pila"
// Si el array recibido no contiene cajas, debe retornar el string "Error".

// El array recibido tendrá, por ejemplo, la siguiente forma:
//
// [
//  {nombre: arroz, peso: 10},
//  {nombre: fideos, peso: 15},
//  {nombre: cafe, peso: 5},
//  {nombre: arroz, peso: 10},
//  {nombre: azucar, peso: 20}
// ]
//
// TIPs:
//  - El array recibido es una ARRAY DE OBJETOS
//  - El array puede contener productos repetidos
//
//                     ********* El peso máximo permitido para cada STACK es de 50 kg! ***********
//
// EJEMPLOS:
//  - apilarCajas( [{nombre: arroz, peso: 10},
//                  {nombre: fideos, peso: 15},
//                  {nombre: cafe, peso: 5}] ) => Stack [arroz, fideos, cafe]
//                  * El peso total (30), no supera el máximo (50)
//
//  - apilarCajas( [{nombre: leche, peso: 30},
//                  {nombre: fideos, peso: 15},
//                  {nombre: cafe, peso: 5}] ) => Stack [leche, fideos, cafe]
//                  * El peso total (50), no supera el máximo (50)
//
//  - apilarCajas( [{nombre: leche, peso: 30},
//                  {nombre: fideos, peso: 15},
//                  {nombre: fideos, peso: 15},
//                  {nombre: cafe, peso: 5}] ) => "No se puede crear la pila"
//                  * El peso total (65), excede el peso máximo permitido (50)
//
//  - apilarCajas( [] ) => "Error"
//
// REQUISITOS:
//  🟢 La función debe crear y retornar el Stack creado con las cajas de productos recibidas en el array
//  🟢 El Stack que retorna debe ser una instancia de la clase Stack
//  🟢 En caso de exceder el peso máximo permitido, debe retornar en string "No se puede crear la pila"
//  🟢 En caso de recibir un array vacío, debe retornar el string "Error"
//
// ATENCIÓN! Las respuestas en strings son case sensitive!
//

function apilarCajas(arr) {

  // Tu código aquí
  var suma = 0;
  let aux = [];
  var stack = new Stack();
  if(!arr.length)return "Error";
  
  
  for(var i=0; i < arr.length; i++){
    aux.push(arr[i].peso);
    stack.push(arr[i].nombre);
  }
  //var x = aux.reduce((a,b)=> a +=b);  //la a es acumulador y el b es el indice y se va sumando (se puede hacer con for)
  for(var i = 0; i < aux.length; i++){
  suma += aux[i];
  }
  if(suma > 50) return "No se puede crear la pila";
  return stack;
  
}

/*function apilarCajas(arr) {
  // Tu código aquí
  const pila = new Stack();
  if(arr.length === 0 ) return 'Error';
  var pesos = 0;
  for(let i = 0; i < arr.length; i++){
    pesos += arr[i].peso;
    pila.push(arr[i].nombre);
  }
  if(pesos > 50) return "No se puede crear la pila";
  return pila;

}*/


//
// 5️⃣ ***** EJERCICIO 5 ***** - tipologiasSeparadas() 5️⃣
// En este ejercicio debemos implementar la funcion tipologiasSeparadas() la cual va a recibir por parametro un array con el numeros de tipologias en el orden que se van a construir.
// Supongamos que tenemos un barrio en donde la construccion de casas pueden ser de distintos tipos de tipologias en una misma manzana.
// Pero hay una limitacion, que no puede haber 2 tipologias iguales una al lado de la otra.
// Nuestro objetivo es utilizar el STACK para poder detectar si cuando nos pasan el array de como se van a construir las casas necesitamos separar las tipologias que se repiten.
//                  j
// EJEMPLOS:     i   
// let arr = [1, 2, 2, 3, 3, 6, 4, 5, 2]
// tipologiasSeparadas(arr) => [1, 2, 3, 6, 4, 5, 2, 3]
//
// REQUISITOS:
// 🟢 La función debe crear y retornar el Stack creado con las casas de forma correcta sin tipologias repetidas.
// 🟢 El Stack que retorna debe ser una instancia de la clase Stack.
// 🟢 En caso de que no hayan tipologias repetidas o que ya las recibamos separadas correctamente, debe retornar "No hay tipologias repetidas".
// 🟢 En caso de recibir un array vacio debe retornar "Tipologias inexistentes".

function tipologiasSeparadas(arr) {
  // Tu código aquí:
  let stack1 = new Stack();
  if (arr.length === 0) return "Tipologias inexistentes";

  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1]) {
      newArr.push(arr[i]);
    } else {
      stack1.push(arr[i]);
    }
  }
  for (var j = 0; j < newArr.length; j++) {
    stack1.push(newArr[j]);
  }
  if (newArr.length === 0) return "No hay tipologias repetidas";
    
    return stack1;
}