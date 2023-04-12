/* EJERCICIO 1
*
* Implementar de forma RECURSIVA el método Newton-Raphson. 
Este método es utilizado para aproximar la raiz cuadrada de un número entero positivo.
* 
*
* Parametros:
*   count: cantidad de veces que se requiere iterar
*   x: valor entero positivo al que se le quiere calcular la raiz cuadrada
*
* Formula:
*   y = (valorAnterior + (x/valorAnterior))/2
*   valorAnterior(0) = x/2
* 
* Salida:
*   > -1 si no es invocado con un x positivo (Ejemplo: -4)
*   > -1 si no es invocado con un x entero   (Ejemplo: 4.3)
*   > -1 si no es invocado con un x positivo y entero (Ejemplo: -4.3)
*   > El valor obtenido luego de haber aplicado la formula count veces a x
* 
* Ejemplos:
*   x = 20
*   count = 4
*   valorAnterior(0) = 10
*   y(1) = (10 + (20/10))/2 = 6
*   valorAnterior = 6
*   y(2) = (6 + (20/6))/2 = 4.666
*   valorAnterior = 4.666
*   y(3) = (4.666 + (20/4.666))/2 = 4.476
*   valorAnterior = 4.476
*   y(4) = (4.476+ (20/4.476))/2 = 4.472
*
*   x = 45
*   count = 4
*   valorAnterior(0) = 22.5
*   y(1) = (22.5 + (45/22.5))/2 = 12.25
*   valorAnterior = 12.25
*   y(2) = (12.25 + (45/12.25))/2 = 7.96
*   valorAnterior = 7.96
*   y(3) = (7.96 + (45/7.96))/2 = 6.80
*   valorAnterior = 6.80
*   y(4) = (6.80 + (45/6.80))/2 = 6.70
*
* */
function newtonRaphson(x, count) {
    if(x < 0 || !Number.isInteger(x)) return -1;
    let valAnt = x/2;
    let y =0;
    for(var i=0; i<=count;i++){
     y =(valAnt + (x/valAnt))/2;
    valAnt = y;
    }
  return y;
  
  }
  
  /*
   * EJERCICIO 2
   *   for para recoorer la formula....  asegurar la igualdad ...contar los de entrada y los de cierre
   * A partir de una formula matematica, encontrar y determinar si los parentesis de la misma se encuentran balanceados.
   * Decimos que los parentesis de una formula son balanceados si y solo si, por cada ( hay un ), se debe respetar el orden indicado, es decir, primero ( y luego ), )( no es una combinacion valida.
   *
   *
   * Parametros:
   *   exp: string que describe la expresion matematica a analizar
   *
   * Salida:
   *   > 0: si estan balanceados
   *   > Cualquier otro numero: si no estan balanceados
   *
   * Ejemplos:
   *   exp: "(5+6)-(t+2*9-(a+7)/4+(8+5*2))" ---> 0
   *   exp: "70 + (9/x - 2))" ----------------> !== 0
   *   exp: "(9+10)-6*a/2+(-5)" -------------->  0
   *   exp: "(4))" ---------------------------> !== 0
   *   exp: "))((" ---------------------------> !== 0
   * */
  function balanced(exp) {
    var abre =0;
    var cierra=0;
    for (var i = 0;i < exp.length; i++){
      if(exp[i]=== "(")abre++;
      if(exp[i]===")")cierra++;
      if(cierra > abre) return 1;
    }
    if(abre === cierra) return 0;
    return 1;
  }

  // ----- Recursión -----

// EJERCICIO 1
// Implementar la función objContains: debe buscar dentro de un objeto anidado un par {clave: valor}
// especifico. Tanto el objeto como el nombre de la propiedad y su valor serán recibidos por parámetro.
// En el caso de que encuentre el valor indicado en cualquier nivel del objeto debe devolver true,
// de lo contrario, devolver false.
// Aclaraciones:
//   - Un objeto anidado es un objeto que dentro tiene uno o más objetos.
//     Ej:
//        const user = {
//            id: 6,
//            email: 'homero@maxpower.com',
//            infoPersonal: {
//                nombre: 'Homero Simpson',
//                direccion: {
//                    calle: 'Avenida Siempreviva',
//                    numero: 742,
//                    barrio: 'Springfield',
//                    estado: 'Massachusetts'
//                }
//            }
//        }
//   - Caso que devuelve true  --> objContains(user, "barrio", "Springfield");
//   - Caso que devuelve false --> objContains(user, "empleo", "Empleado en planta nuclear");
// Pista: utilizar typeof para determinar si el valor de una propiedad es un objeto para aplicar
// allí la recursión
var objContains = function (obj, prop, value) {
  /* Tu codigo aqui */
  for (let clave in obj) {                    // recorro el objeto
    if (typeof obj[clave] === 'object') {     // si hay un objeto, hago recursion
      if (objContains(obj[clave], prop, value) === true) return true; // si estan prop y value, devuelve true
    }
    if (obj[prop] === value) return true; // si no es un objeto me fijo si es prop y value
  }
  return false; // si nada de lo anterior se cumple, es porque no estan prop y value
};

// EJERCICIO 2
// 
//Secuencia inventada: f(n) = (f(n-1) + f(n-2) + f(n-3)) x 2


// Donde las primeras tres posiciones son dadas por el array recibido por parametro y a partir de
// la siguiente se calcula como la suma de los 3 números anteriores multiplicados por dos.

// recorrer array---> pasar string a numero y dejar num igual (array tiene 3 posiciones)
//la 4 posicion tiene que ser la suma de las posiciones x 2 



//array es un arreglo de 3 posiciones que puede contener números o strings, aquellas posiciones que
// sean números debemos dejarlas tal cual están pero las que tengan strings debemos calcular su cantidad
// de caracteres para usarlos en la secuencia.
// Por ejemplo si recibimos: ["Franco", 1, "Henry"] deberíamos tener los siguientes 3 valores iniciales
// de la secuencia f(0) = 6, f(1) = 1 y f(2) = 5 (Ya que "Franco" tiene 6 caracteres y "Henry", 5)
// A partir de ahí la cuarta posición sería  (6 + 1 + 5) * 2 = 24 y así sucesivamente
// La función secuenciaHenry debe devolver el enésimo numero de la serie, por ejemplo para el array
// antes mencionado:
// secuencia: 6, 1, 5, 24, 60, 178, 524
// secuenciaHenry(0) // 6  ya que el elemento de la posición 0 es cero
// secuenciaHenry(1) // 1 ya que el elemento de la posición 1 es 1
// secuenciaHenry(6) // 524 ya que el elemento de la posición 6 es 524
// Para números negativos de n debe devolver false
function secuenciaHenry(array, n) {
  // Tu código aca:
 if (n < 0) return false;
  
  for(let i = 0; i< array.length; i++){
    if (typeof array[i]=== "string") array[i] = array[i].length;
    }
for(let j = 3; j <= n ;j++) { 
 array[j] = ((array[j-1] + array[j-2] + array[j-3]) * 2);
}

return array[n];
 
}

// ---- Recursión ----
// EJERCICIO 9                sumar todos los num del array anidado y restarle la cantidad de arrays
// Implementar la función restArray: a partir de un array en el cual cada posición puede ser un único
// número u otro array anidado de números, determinar la suma de todos los números contenidos en el array.
// El array será recibido por parámetro.
// Ejemplo:
//    const array = [3, [7, [5,6]], [9,6], 4];
//    countArray(array); --> Debería devolver 40 y al resultado lo restas por la cantidad de arrays, sin contar al padre.
// Ejemplo:
//      40-3 = 37
// Pista: utilizar el método Array.isArray() para determinar si algun elemento de array es un array anidado
// [Para más información del método: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/isArray]

var restArray = function (array) {
  // Tu código acá
  let suma= 0;
  let sumaArr= 0;
  for (var i = 0; i<array.length; i++){
    if(Array.isArray(array[i])){
      sumaArr += 1;
      suma += restArray(array[i]);
    } else{
      suma += (array[i]);
    }

  } return suma - sumaArr;
 
};


// ---- Recursión ----
// EJERCICIO 10                           bucle for para recoorer el arr +   if   Array.inArray() para recorrer los arr internos
// La función countDeep recibe por parámetro un arreglo que contiene numbers, strings, booleanos, undefined y/o arreglos 
// (este ultimo contienen, a su vez, más numbers, strings, booleanos, undefined y/o arreglos).

// debemos separar los dif tipos de elementos dentro del arr y contarlos 
//cant arrays    numbers
//strings        booleans
//undefined

// Deberas contar la cantidad de cada uno y realizar las siguientes operaciones para llegar al resultado final.
// la cantidad de arrays (contando el array padre) menos la cantidad de numbers, al resultado multiplicarlo por la cantidad de strings, al resultado dividirlo por la cantidad de booleanos y a ese resultado elevarlo a la cantidad de undefined.

// Ejemplo:
// countDeep( [ 1, 2, 3, ["hi"], [ undefined, "hola", [ true, "bye" ] ], undefined, [ false ], "9"] ) ----> Debería retornar 2
// number = 3, string = 4, boolean = 2, undefined = 2, array = 5:
// la ecuacion quedaria 5-3 = 2, 2*4 = 8, 8/2 = 4, 4^2 ------> resultado = 16
//let arr3 = [ 1, 2, 3, ["hi"], [ undefined, "hola", [ true, "bye" ] ], undefined, [ false ], "9"];
///


function countDeep(arr) {

  function countArray(arr){
    let suma=1;
    for(var i=0; i<arr.length;i++){
      if(Array.isArray(arr[i])) suma += countArray(arr[i]);
    }return suma;
  } 
   

   function countElements(elemento,tipo){
     let suma=0;
   
     if(Array.isArray(elemento)){
       for (var i=0; i< elemento.length;i++) suma += countElements(elemento[i],tipo);
     } else {
       if(typeof elemento === tipo)
       suma++;
     } return suma;
   }
   let elemento= arr.flat();
   return ((((countArray(arr)- countElements(elemento,"number"))* countElements(elemento,"string"))/countElements(elemento,"boolean"))**countElements(elemento,"undefined"));
}


//mismo ejercicio resuelto diferente


    
function countDeep(arr) {
  // Tu código aca:
  let num = 0;
    let str = 0;
    let bol = 0;
    let und = 0;
    let count = 1;

    function countDeepInner(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                count++;
                countDeepInner(arr[i])
            }
            if (typeof arr[i] === "number") num++

            if (typeof arr[i] === "string") str++

            if (typeof arr[i] === "boolean") bol++

            if (arr[i] === undefined)  und++
        }
    }

    countDeepInner(arr);
    
    return Math.pow(((count - num) * str) / bol, und);
} 

// ---- Recursión ----
// EJERCICIO 7
// La función countDeep recibe por parámetro un arreglo que contiene números y/o arreglos (estos últimos contienen, a su vez, más números y/o arreglos), 
// y retorna la cantidad de arreglos que hay en total, incluyendo al padre.
// Ejemplo:
// countDeep( [ 1, 2, 3, [ 4, [ 5, 6 ] ], 7, [ 8 ], 9] ) ----> Debería retornar 4
function countDeep(arr) {
  //  Tu código aca:
    var contador = 1;
    for ( let i = 0 ; i < arr.length ; i++) {
      if (Array.isArray(arr[i])) {
        var contador = contador + countDeep (arr[i])
      }
    } return contador;
  }
   

// EJERCICIO 2      for para iterar    y una let suma para sumar                        
// Implementar la función countArray: a partir de un array en el cual cada posición puede ser un único
// número u otro array anidado de números, determinar la suma de todos los números contenidos en el array.
// El array será recibido por parámetro.
// Ejemplo:
//    const array = [1, [2, [3,4]], [5,6], 7];
//    countArray(array); --> Debería devolver 28 (1 + 2 + 3 + 4 + 5 + 6 + 7)
// Pista: utilizar el método Array.isArray() para determinar si algun elemento de array es un array anidado
// [Para más información del método:
//https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/isArray]

var countArray = function (array) {
  let suma = 0;
  for(var i=0; i < array.length; i++){
    if(Array.isArray(array[i])){
      suma+= countArray(array[i]);
    } else{
      suma+= array[i];
    }
  } return suma;

};



// EJERCICIO 2
// Crear la funcion 'direcciones':
// La funcion debe retornar un string de los movimientos Norte(N), Sur(S), Este(E), Oeste(O)
// que se deben realizar, para llegar al destino de un laberinto dado.
//
// Ejemplo: dado el siguiente laberinto:
// let laberintoExample = { // direccion = ""
//     N: 'pared',
//     S: { // direccion = "S"
//         N: 'pared',
//         S: 'pared',
//         E: { // direccion = "SE"
//             N: 'destino', // direccion = "SEN"
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         },
//         O: { // direccion = "SO"
//             N: 'pared',
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         }
//     },
//     E: 'pared',
//     O: 'pared'
// }
// El retorno de la funcion 'direcciones' debe ser 'SEN', ya que el destino se encuentra
// haciendo los movimientos SUR->ESTE->NORTE
// Aclaraciones: el segundo parametro que recibe la funcion ('direccion') puede ser pasado vacio (null)

// Recibe dos argumentos
function direcciones(laberinto, direccion = '') {
  // Validamos si no tiene un laberinto
  if (!laberinto) return direccion;
  // Recorremos cada key del obj laberinto
  for (let prop in laberinto) {
      //Primer condicion, validando si es el 'destino'
      if(laberinto[prop] === 'destino'){
      return direccion + prop;
      }
      //Validamos si la key es un objeto
      //En caso de serlo, devolvemos el laberinto y dirección actual de manera recursiva.
      if (typeof laberinto[prop] === 'object') {
          direccion += prop;
          return direcciones(laberinto[prop], direccion);
      }
  }
  //Retornamos dirección final
  return direccion;

}


// EJERCICIO 3
// Crea la funcion 'deepEqualArrays':
// Dado que las comparaciones en javascript aveces son un problema como con el siguiente ejemplo:
// [0,1,2] === [0,1,2] => false // puede probarlo en la consola
// con objetos o arrays identicos surge la necesidad de comparar en 'profundidad' arrays u objetos
// en este caso la funcion solo va a ser pensada para recibir arrays,
// pero estos pueden tener multiples niveles de anidacion, y la funcion deepEqualArrays debe
// comparar cada elemento, sin importar la profundidad en la que este
// Ejemplos: 
// deepEqualArrays([0,1,2], [0,1,2]) => true
// deepEqualArrays([0,1,2], [0,1,2,3]) => false
// deepEqualArrays([0,1,[[0,1,2],1,2]], [0,1,[[0,1,2],1,2]]) => true

function deepEqualArrays(arr1, arr2) {
  //Valida si inicialmente los arrys son distintos
  if (arr1.length !== arr2.length) return false;
  //Iteramos sobre cada elemento
  for (let i = 0; i < arr1.length; i++) {
      //Validamos si es un Array el arr1, y valimos el arr2
      if (arr1[i] instanceof Array && Array.isArray(arr2[i])) {
          //Lllamos de manera negada y recursivamente
          if (!deepEqualArrays(arr1[i], arr2[i])) return false;
          // Validamos si son distintos en la misma posición
      }   else if (arr1[i] !== arr2[i]) return false;
  }
  //Si es igual, true
  return true;
}




  
  
  // EJERCICIO 8
  // Implementar la función isAncestor: debe determinar si dado dos nombres de personas las mismas
  // son parientes o no (La primera debe ser ancestro de la segunda). La función recibira un objeto
  // que va a representar sólo la parte femenina del "arbol genealogico" familiar y será de la siguiente forma:
  // const genealogyTree = {
  //   "Mona Simpson": [],
  //   "Marge Simpson": ["Lisa Simpson", "Maggie Simpson"],
  //   "Jacqueline Bouvier": [ "Patty Bouvier", "Marge Simpson", "Selma Bouvier"],
  //   "Patty Bouvier": [],
  //   "Selma Bouvier": ["Ling Bouvier"],
  //   "Edwina": ["Abigail Simpson"],
  //   "Lisa Simpson": [],
  //   "Maggie Simpson": [],
  //   "Ling Bouvier": []
  // }
  // Ejemplo:
  //  - Caso que devuelve true --> isAncestor(genealogyTree, "Jacqueline Bouvier", "Maggie Simpson")
  //  - Caso que devuelve false --> isAncestor(genealogyTree, "Jacqueline Bouvier", "Abigail Simpson")
  //  [Observar los tests para otros casos]
  var isAncestor = function (genealogyTree, ancestor, descendant) {
    // Tu código aca:
    for (let i=0 ; i<genealogyTree[ancestor].length ; i++) {
    if (genealogyTree[ancestor][i]===descendant) return true
    var resultado = isAncestor(genealogyTree,genealogyTree[ancestor][i],descendant);
    if (resultado) return resultado;
    }
    return false;
  };


   // 2️⃣ ***** EJERCICIO 2 ***** - calcularImpuestos() 2️⃣
// En este ejercicio, debemos implementar la función calcularImpuestos, de forma recursiva.
// Debes retornar la suma total con los decimales incluidos.
// La función recibirá boletas/facturas con los impuestos anuales por la casa, aunque pueden haber 
// boletas vacias (por ende no son array), por lo que tendremos que validar eso.
// Sabiendo esto, si la persona no tiene impuestos, debes retornar false, si tiene impuestos debes sumarlos
// y si no es una boleta/factura (array), debes devolver "error"
// si no hay inconvenientes, devolverlos para que sepa el total que debe pagar.
//
//
//
// EJEMPLOS:
// [1,2,3,4,5] => 15
// {} => "Error"
// [] => False
//
//
// REQUISITOS:
//  🟢 La función debe obtener el total hallado de forma recursiva                                 
//  🟢 La función debe retornar el valor numérico correspondiente, contando tambien los decimales. 
//  🟢 Si no tiene impuestos, debes retornar false.                                               
//  🟢 Si factura no es un array, debes retornar "Error".                                              

const calcularImpuestos = (factura, i = 0, acc = 0) => {
  // Tu código aquí:
if (factura.length===0) return false;
if(!Array.isArray(factura)) return "Error";
acc += factura[i];
i++;
if(factura[factura.length] === factura[i]) return acc;
return calcularImpuestos(factura,i,acc);

}

  
// 2️⃣ ***** EJERCICIO 2 ***** - calcularIndice() 2️⃣
// En este ejercicio, debemos implementar la función calcularIndice, la debe retornar
// un valor numérico que es parte de una secuencia de números que representa los índices
// de precios que se aplicarán en Henry Market en cada año de actividad.
// La función recibirá por parámetro el año de actividad del supermercado (valor númérico 0 o mayor),
// y calculará el índice en base a la siguiente secuencia:
//
// - Para el año 0 (n=0) de actividad, el índice es de 15
// - Para el año 1 (n=1) de actividad, el índice es 25
// - A partir del año 2, el índice se calcula con la fórmula f(n-1)+f(n-2)
//
// EJEMPLOS:
// - calcularIndice(0) => 15
// - caluclarIndice(1) => 25
// - calcularIndice(2) => calcularIndice(2-1) + calcularIndice(2-2) => 40
// - calcularIndice(3) => calcularIndice(3-1) + calcularIndice(3-2) => 65
//
// REQUISITOS:
//  🟢 La función debe obtener el índice hallando de forma recursiva el valor correspondiente a n dentro de la secuencia.
//  🟢 La función debe retornar el valor numérico correspondiente a n dentro de la secuencia.
//  🟢 Si el valor de n recibido por parámetro es menor a 0, debe retornar false.

const calcularIndice = (n) => {
  // Tu código aquí:
  if(n < 0) return false;

  if(n === 0)return 15;
  if(n === 1)return 25;
  
  return calcularIndice(n-1)+ calcularIndice(n-2);


}

// 3️⃣ ***** EJERCICIO 3 ***** - casasPorAño() 3️⃣
// En este ejercicio debemos implementar la función casasPorAño(), la cual debe retornar
// cuantas casas por año se construyeron.
// La función recibira por parametro el / los años que se quieren consultar y devolvera
// la cantidad de casas que se pueden construir en base a la siguiente secuencia:
//
// - Si el año es 0 la cantidad de casas por año es de 0
// - Si el año es 1 la cantidad de casas por año es de 30
// - A partir del 2do año, se debe calcular con la siguiente formula: c(n-1) + c(n / n) =>
// debe retornar 60
//
// EJEMPLOS:
// - casasPorAño(0) => 0
// - casasPorAño(1) => 30
// - casasPorAño(2) => 60
//
// REQUISITOS:
// 🟢 La función debe obtener la cantidad de casas por año de forma recursiva.
// 🟢 Si el valor de n recibido por parámetro es menor a 0, debe retornar false.
// 🟢 Si el valor de n recibido por parámetro es 1, debe retornar 30.

function casasPorAño(n) {
  // Tu código aquí:
  if(n<0)return false;
if(n===0)return 0;
if(n===1)return 30;
return casasPorAño(n-1)+casasPorAño(n/n);

}