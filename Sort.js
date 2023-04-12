/* EJERCICIO 9
 *
 * Ordena un arreglo de objetos usando un SELECTION SORT pero con algunas particularidades.
 * Ademas del arreglo a ordenar, la funcion va a recibir como parametro una función que va
 * ser quien va a determinar si un elemento es mayor a otro para determinar su posicion final.
 *
 * Ejemplo:
 * let array = [
 *   {title: 'Comprar tomate', description: 'Ir a la verduleria a comprar tomate', priority: 4, price: 300},
 *   {title: 'Ir al gimnasio', description: 'Ir al gimnasio', priority: 4, price: 200},
 *   {title: 'Comprar harina', description: 'Ir al supermercado a comprar harina', priority: 2, price: 200},
 *   {title: 'Comprar libro', description: 'Ir a la libreria', priority: 2, price: 700}
 * ]
 *
 * orderFunction(array[0], array[1]) -> Devolvera 1 si, la prioridad de array[0] es mayor a la prioridad de array[1].
 *                                      En el caso de que las prioridades sean iguales, el que tiene mayor precio, es mas grande.
 *                                      Por lo tanto array[0] > array[1] ya que array[0].priority === array[1].priority &&
 *                                                                              array[0].price > array[1].price
 *
 *                                   -> Devolvera -1 caso contrario. Es decir, si array[0].priority < array[1].priority
 *                                   => Devolvera 1 si están bien ordenados o -1 si hay que intercambiarlos
 *
 * specialSort(array, orderFunction) -> retornaria el siguiente arreglo
 * [
 *   {title: 'Comprar tomate', description: 'Ir a la verduleria a comprar tomate', priority: 4, price: 300},
 *   {title: 'Ir al gimnasio', description: 'Ir al gimnasio', priority: 4, price: 200},
 *   {title: 'Comprar libro', description: 'Ir a la libreria', priority: 2, price: 700}
 *   {title: 'Comprar harina', description: 'Ir al supermercado a comprar harina', priority: 2, price: 200}
 * ]
 *
 * */

var specialSort = function (array, orderFunction) {
  // Tu código aca:
  for (let i = 0; i < array.length; i++) {
    var min = i;
    for (let j = i + 1; j < array.length; j++) {
      if (orderFunction(array[j], array[min]) === 1) { // orderFunction
        min = j;
      }
    }
    if (min !== i) {
      var aux = array[i];
      array[i] = array[min];
      array[min] = aux;
    }
  }
  return array;
};

  /*
// EJERCICIO 9
// Ordená un arreglo de números usando un bubble sort pero con algunas particularidades.
// El nuevo arreglo debe ser devuelto.
// El algortimo va a recibir un arreglo de objetos de la siguiente forma:
// {
//   name: "Notebook",
//   price: 1200,
//   review: 8
// }
// Esos objetos deben ser ordenados en función de lo que indique los siguientes parámetros
// "firstOrd", "secondOrd" los cuales van a tener alguna de las propiedades del objeto anterior
// para saber cual va a ser la que debemos tomar para el ordenamiento. La "secondOrd" se usa en los
// casos en los cuales para la "firstOrd" tengan el mismo valor.
// var array = [
//   {name: "Notebook", price: 1200, review: 8},
//   {name: "Smartphone", price: 300, review: 9},
//   {name: "TV", price: 800, review: 1},
//   {name: "PS5", price: 1200, review: 7}
// ]
// Ejemplo 1:
// specialSort(array, "price") --> Debería quedar:
// [
//   {name: "Smartphone", price: 300, review: 9},
//   {name: "TV", price: 800, review: 1},
//   {name: "Notebook", price: 1200, review: 8}
//   {name: "PS5", price: 1200, review: 7}
// ]
// Ejemplo 2:
// specialSort(array, "price", "review") --> Debería quedar:
// [
//   {name: "Smartphone", price: 300, review: 9},
//   {name: "TV", price: 800, review: 1},
//   {name: "PS5", price: 1200, review: 7},
//   {name: "Notebook", price: 1200, review: 8}
// ]
// (Siempre el ordenamiento es de menor a mayor sea cual fuera la propiedad indicada para el orden)
*/
var specialSort = function (array) {
  // firstOrd, secondOrd
  // Tu código aca:
  var cambio = true;  // creamos variable para registrar cambios de valores
  while(cambio) {     // mientras haya algun cambio (con while evitamos seguir recorriendo cuando esta ordenado)
    cambio = false;   // comenzamos con el cambio de esta iteracion en falso (aun no hay cambio)
    for (let i = 0; i < array.length - 1; i++) {                    // recorremos el array
      if (array[i][arguments[1]] === array[i + 1][arguments[1]]){   // si por el 1er arg hay igualdad
        if (array[i][arguments[2]] > array[i + 1][arguments[2]]){   // comparamos por el 2do arg
          // hacemos el cambio
          let aux = array[i];
          array[i] = array[i + 1];
          array[i + 1] = aux;
          cambio = true;
        }
      // si no son iguales por 1er arg, vemos si hay que ordenar
      } else if (array[i][arguments[1]] > array[i + 1][arguments[1]]){
        // hacemos el cambio
        let aux = array[i];
        array[i] = array[i + 1];
        array[i + 1] = aux;
        cambio = true;
      }
    }
  }
  return array; // devolvemos el array ordenado
};

// Implementar la función insertAndSort que recibe un arreglo y un objeto y retorna
// un arreglo ordenado de menor a mayor con los números del array y con
// los números de los valores del objeto.
// Para el ordenamiento NO usar la función sort de JavaScript. Deben usar alguno de los
// algoritmos de ordenamiento que se vieron en clase.
// Ejemplo:
// insertAndSort([4,8,13], {a:2, b:1, c:5}) ----> Debería retornar [1, 2, 4, 5, 8, 13]

function insertAndSort(array, obj) {
  // Tu código acá
  let temporal; // para hacer los cambios


  // recorro cada posicion del array, de 1 hasta el final (0 no hace falta)
  for (let i = 1; i < array.length; i++) {
    // recorro todo lo de la izquierda enforma descendente, o sea de i hasta 0
    for (let j = i; j > 0; j--) {
      // si posicion anterior es mas grande que posicion actual
      if (array[j - 1] > array[j]) {
        // hago el cambio
        temporal = array[j - 1];
        array[j - 1] = array[j];
        array[j] = temporal;
      }
    }
  }
  
  // paso los valores del objeto a un array y los ordeno de menor a mayor
  let objArray = Object.values(obj);
  for (let i = 1; i < objArray.length; i++) {
    // recorro todo lo de la izquierda enforma descendente, o sea de i hasta 0
    for (let j = i; j > 0; j--) {
      // si posicion anterior es mas grande que posicion actual
      if (objArray[j - 1] > objArray[j]) {
        // hago el cambio
        temporal = objArray[j - 1];
        objArray[j - 1] = objArray[j];
        objArray[j] = temporal;
      }
    }
  }

  // MERGE: uno los arrays anteriores
  // defino el array final, y los posicionadores
  let final = [];
  let i = 0; let j = 0;
  // mientras que el largo del final sea menor a la suma de los dos arrays a mergear
  while(final.length < (array.length + objArray.length)) {
    // evalua indices, y tiene en cuenta si se sale del array (undefined)
    if (array[i] < objArray[j] || (objArray[j] === undefined && array[i] !== undefined)) {
      // pushea al resultado y aumenta el posicionador
      final.push(array[i]); i++;
    } 
    // idem
    if (array[i] > objArray[j] || (objArray[i] === undefined && objArray[j] !== undefined)) {
      // pushea al resultado y aumenta el posicionador
      final.push(objArray[j]); j++;
    }
  }
  return final;
}


//otra forma de hacerlo

function insertAndSort(array, obj) {
  // Tu código acá
  for (const key in obj) {
    array.push(obj[key]);
  }
 

  return quickSort(array);
}

function quickSort(array) {
  if(array.length <= 1) return array;

  let left = [];
  let right = [];
  let pivot = array.pop();
  let ordered = [];

  for(let i = 0; i < array.length; i++){
    if(array[i] < pivot){
      left.push(array[i]);
    }else{
      right.push(array[i]);
    }
  }

  return ordered.concat(quickSort(left), pivot, quickSort(right));
}


//otra forma 


function insertAndSort(array, obj) {
  // Tu código acá
  let arr = [];
  for(let i in obj){
    arr.push(obj[i]);
  }
  let newArray = arr.concat(array);
  for(var i = 1; i < newArray.length ; i++){
    let j = i-1;
    let aux = newArray[i];
    while(j >= 0 && newArray[j] > aux){
      newArray[j+1] = newArray[j];
      j--;
    }
    newArray[j+1] = aux;
  }
  return newArray;
}




// EJERCICIO 9
// Ordená un arreglo de números usando selection sort. El nuevo arreglo debe ser devuelto.
// Para mayor información sobre dicho método:
//    - https://en.wikipedia.org/wiki/Selection_sort
//    - https://www.khanacademy.org/computing/computer-science/algorithms/sorting-algorithms/a/sorting
// Ejemplo:
//     selectionSort([1, 6, 2, 5, 3, 4]) --> [1, 2, 3, 4, 5, 6]

var selectionSort = function (array) {
  for (let i = 0; i < array.length; i++) {
    var min = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) { // orderFunction
        min = j;
      }
    }
    if (min !== i) {
      var aux = array[i];
      array[i] = array[min];
      array[min] = aux;
    }
  }
  return array;
};










// ----- Algoritmos -----

// Ejercicio 9
// Implementar la funcion 'primalityTest' que dado un valor numerico entero
// debe de retornar true or false dependiendo de si este es primo o no.
// Puede que este es un algoritmo que ya hayan implementado pero entenderan
// que es un algoritmo que segun la implementacion puede llegar a ser muy costoso
// para numeros demasiado grandes, asi que vamos a implementarlo mediante un metodo
// derivado de Trial Division como el que se muestra aca:
// https://en.wikipedia.org/wiki/Primality_test
// Si bien esta no es la mejor implementacion existente, con que uds puedan 
// informarse sobre algoritmos, leerlos de un pseudocodigo e implemnterlos alcanzara

function primalityTest(num) {
  if (num <= 3) return num > 1;
  if ((num % 2 === 0) || (num % 3 === 0)) return false;
  
  let count = 5;
  
  while (Math.pow(count, 2) <= num) {
  if (num % count === 0 || num % (count + 2) === 0) return false;
      count += 6;
  }
  
  return true;
}

  // ---- Algoritmos ----
// EJERCICIO 10
// Ordená un arreglo de objetos usando un bubble sort pero con algunas particularidades.
// Además del arreglo a ordenar la función va a recibir como parámetro una función
// que va a retornar 1 sí no hay que ordenarlo y -1 en el caso de que si haya que ordenarlo.
// Ejemplo:
// var array = [
//   {name: 'Cristian', age: 26, height: 1.85},
//   {name: 'Dylan', age: 30, height: 1.75},
//   {name: 'Joaquin', age: 25, height: 1.77},
// ]
// specialSort(array, swapFunction) --> Retornaría el siguiente array:
// [
//   {name: 'Cristian', age: 26, height: 1.77},
//   {name: 'Joaquin', age: 25, height: 1.85},
//   {name: 'Dylan', age: 30, height: 1.75},
// ]
function specialSort(array, swapFunction) {
  // Tu código aca:
  for (var i = 0; i < array.length; i++) {
    // Last i elements are already in place
    for (var j = 0; j < array.length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      if (swapFunction(array[j],array[j + 1]) === -1) {
        // If the condition is true then swap them
        var temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }
  return array
}



// 7️⃣ ***** EJERCICIO 7 ***** - ordenarPrecios() 7️⃣
// Implementar la función ordenarPrecios, la cual recibirá un array que representa una lista desordenada
// de precios de Henry Market y, a través de alguno de los métodos de ordenamiento vistos en el módulo (a elección),
// deberá retornar un array con los precios ordenados de menor a mayor.
// Asímismo, en caso de que la función se encuentre con algún precio 0 (cero) dentro del array, debe desestimar
// el ordenamiento, y retornar false.
//
// EJEMPLOS:
//  - ordenarPrecios([20,15,45,10,5]) => [5,10,15,20,45]
//  - ordenarPrecios([20,15,0,10,5]) => false

// CONSIGNAS:
//  🟢 En caso de recibir un 0 (cero) dentro del array, la función debe retornar false
//  🟢 Caso contrario, debe retornar un array con los precios ordenados, utilizando alguno de los método de ordenamiento
//    estudiados. NO SE PUEDE USAR EL MÉTODO SORT() DE ARRAY.

function ordenarPrecios(arr) {
  // Tu código aquí:
  let swap = true;
  while(swap){
    swap=false;
    for(var i = 0; i < arr.length ; i++){
      if(arr[i]===0) return false;
      if(arr[i]>arr[i+1]){
        let numI = arr[i+1];
        arr[i+1]= arr[i];
        arr[i]= numI;
        swap = true;
      
    }
    }
  } return arr;

}


// 6️⃣ ***** EJERCICIO 6 ***** - sortPrimeHouses() 6️⃣
// 
// Implementar un algoritmo de ordenamiento, que además de ordenar un array de menor a mayor,
// retorne false si un número dentro del array no es primo
// EJEMPLOS:
// Dado el siguiente array:
// [25, 3, 6, 8, 5, 12, 9, 18, 11, 7]
// sortPrimeHouses() retorna => false (porque 25 por ejemplo, no es primo)
//
// Dado este otro array:
// [61, 7, 13, 11, 29, 3]
// sortPrimeHouses() retorna => [3, 7, 11, 13, 29, 61]
//⚠️ ATENCION ⚠️
// NO utilizar el método sort() de Array!
// REQUISITOS:
//  🟢 Aplicar un algoritmo de ordenamiento de menor a mayor
//  🟢 Si numuero dentro del array no es primo, retornar false

function sortPrimeHouses(array) {
  // Tu código aquí:
  for(let i=0;i<array.length;i++){
    for(let j=2;j<array[i];j++){
      if(array[i]%j===0) return false
    }

  }
  let swap = true;
  while(swap){
    swap=false;
    for(var i = 0; i < array.length ; i++){
      if(array[i]>array[i+1]){
        let numI = array[i+1];
        array[i+1]= array[i];
        array[i]= numI;
        swap = true;
      }
    }
  } return array;
}
