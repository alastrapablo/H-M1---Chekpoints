//closures

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

/* EJERCICIO 10
 *
 *
 *
 * Implementar la funcion closureTrip cuya finalidad es determinar a que ciudades o paises puede llegar
 * una persona en funcion de la cantidad de millas y ciudad origen.
 *
 * Parametros:
 *   - flights: un arreglo en donde cada elemento esta compuesto por dos propiedades
 *               airport y destinations, donde destination es un arreglo, y cada elemento
 *               posee una propiedad city y otra miles.
 *
 *
 * Salida:
 *   > un arreglo con el nombre de las ciudades a los cuales puede llegar la persona
 *
 * Ejemplo:
 *
 * let flights = [{origin: 'BUE', destinations:[{city: 'FRANCIA', miles: 500}, {city: 'ITALIA', miles: 200},
 *               {city: 'ALEMANIA', miles: 400}]}, {origin: 'ITALIA', destinations: [{city: 'FRANCIA', miles: 30}]},
 *               {origin: 'BUE', destinations: [{city: 'MENDOZA', miles: 30}, {city: 'CORDOBA', miles: 700},
 *               {city: 'SALTA', miles: 200}]}]
 *
 * let user = {
 *   name: 'Martina',
 *   miles: 450,
 *   origin: 'BUE'
 * }
 *
 *
 * closureTrip(flights)(user) => [ 'ITALIA', 'ALEMANIA', 'MENDOZA', 'SALTA' ]
 *
 * */

function closureTrip(flights) {
    return function(persona) {
      let resultado = [];
      for (keys in flights) {
        if (flights[keys].origin === persona.origin) {
          for (keys2 in flights[keys].destinations) {
            if (flights[keys].destinations[keys2].miles <= persona.miles) {
              resultado.push(flights[keys].destinations[keys2].city);
            }
          }
        }
      }
      // recorrer los objetos del array y por cada uno ve si las millas son menores a las de la persona
      // ir pusheando las ciudades o paises a un array
      // devolver el array
      return resultado;
    };
  }


  // ----- Closures -----

// EJERCICIO 5

// Enunciado:

// Implementar la función mayorMenorOIgual que recibe un parámetro
// (numFijo) y que debe retornar otra función con otro (parametro)
// En caso de que la suma de ambos parámetros sea menor a 10 retorna un string --> "la suma es menor a 10",
// en caso de que sea mayor a 10 retorna un string --> "la suma es menor a 10"
// en caso de que sea igual a 10 retorna 10
// y si el parametro numFijo es igual a null o undefined debe retornar un arreglo vacio.


function mayorMenorOIgual(numFijo) {
  // Tu código aca:
  return function (parametro){
    if(numFijo + parametro < 10) return "la suma es menor a 10"
    if(numFijo + parametro > 10) return "la suma es mayor a 10"
    if(numFijo + parametro === 10) return 10
    else if (numFijo === null || numFijo === undefined) return []
  }
}


// ----- Closures -----

// EJERCICIO 1
// Implementar la funcion 'exponencial' que recibe un parametro entero 'exp'
// y retorna una una funcion, nos referiremos a esta ultima como funcion hija,
// y a 'exponencial' como la funcion padre, la funcion hija debe de recibir 
// un parametro y retornar dicho parametro elevado al parametro 'exp' de 
// la funcion padre original 'exponencial'
// Ejemplo:
// > var sqrt = exponencial(2);
// > sqrt(2);
// < 4
// > sqrt(3);
// < 9
// > sqrt(4);
// < 16

function exponencial(exp) {
  // return function (base) {
  //     return base ** exp
  //Retornamos una funcion
  return function (base) {
      return Math.pow(base, exp);
  }}


// ----- Closures -----
// EJERCICIO 6
// Implementar la función passport que recibe como parámetro:
//  - Una edad mínima para que las personas puedan ingresar a un país
//  - El país en cuestión
// La función passport retorna una función isAllowed, la cual recibirá un arreglo de personas que quieren ingresar al país, 
//y retornará un nuevo arreglo con los admitidos (aquellos que cumplan con la edad requerida).
function passport(minAge, country) {
  // Tu código aca:
  if (minAge < 18) return false
 
    return function isAllowed (arreglo) {
    var nuevoArreglo = [];
    for (let i = 0 ; i < arreglo.length ; i ++) {
      if (arreglo[i].age >= minAge && arreglo[i].allowed.includes(country)) {
        nuevoArreglo.push(arreglo[i])
      }
    } 
    if (nuevoArreglo.length === 0) return false 
 return nuevoArreglo;
}
}


// EJERCICIO 10
// Implementar la función closureSum que recibe un parámetro (numFijo) y que debe retornar otra función
// que también debe recibir un parámetro y debe devolver la suma de este últimom parámetro con numFijo.
// Ejemplo 1:
//    var sumaCinco = closureSum(5);
//    sumaCinco(2);  --> Devolverá 7 (Ya que 2 + 5 = 7)
//    sumaCinco(11); --> Devolverá 16 (Ya que 11 + 5 = 16)
// Ejemplo 2:
//    var sumaDiez = closureSum(10);
//    sumaDiez(2);  --> Devolverá 12 (Ya que 2 + 10 = 12)
//    sumaDiez(11); --> Devolverá 21 (Ya que 11 + 10 = 21)

function closureSum(numFijo) {
  /* Tu codigo aqui */
  return function(val) { return numFijo + val; }
};
 

// EJERCICIO 10
// Implementar la función closureGreeting que recibe un parámetro (prefix) mediante closures debe permitir
// generar nuevas funciones de saludo dejando fijo siempre el prefijo indicado.
// Ejemplo 1:
//    var hiGreeting = closureGreeting("Hi");
//    hiGreeting("Franco");  --> Devolverá "Hi Franco, you are number 1"
//    hiGreeting("Toni"); --> Devolverá "Hi Toni, you are number 2"
// Ejemplo 2:
//    var helloGreeting = closureGreeting("Hello");
//    helloGreeting("Franco");  --> Devolverá "Hello Franco, you are number 1"
//    helloGreeting("Toni"); --> Devolverá "Hello Toni, you are number 2"
// IMPORTANTE: Prestar atención a los espacios, comas y demás caracteres ya que tiene que el string
// debe coincidir en todos sus caracteres para que el test pase correctamente

function closureGreeting(prefix) {

  var counter = 0;
  
  return function(persona) {
    counter ++;
    return `${prefix} ${persona}, you are number ${counter}`;
  }
  

}

// 1️⃣0️⃣  EJERCICIO 10  ingresoEmpleado 1️⃣0️⃣
// Implementar la función ingresoEmpleado que servirá para registrar el ingreso de los empleados del Henry Market,
// apuntando aquellos que hayan llegado a horario.
// IMPORTANTE! Los horarios serán números enteros (9,10,11,12), NO tendrán formato hora (09:00, 10:00, etc)
//
// La función ingresoEmpleado debe retornar la función ingresosHorario, la cual recibirá un arreglo de empleados que ingresan
// al supermercado con la siguiente forma:
// let empleados =  [
//    {nombre:"Jorge", ingresoA: 9}
//    {nombre:"Mora", ingresoA: 8}
//    {nombre:"Mati", ingresoA: 10}
//    {nombre:"Juani", ingresoA: 7}
//  ]
//, y retornará un nuevo arreglo con LOS NOMBRES de aquellos que se hayan presentado antes del horario de ingreso.
//
// Ejemplo 
//  const ingresosHorario =  ingresoEmpleado(9)
//  Si ejecuto ingresosHorario(empleados) me daria de resultado ["Jorge"]

function ingresoEmpleado(horario) {
  // Tu código aquí:
   
   return function ingresoHorario(array){
        var nombreE =[];
        for(var i =0; i< array.length;i++){
            if(horario > array[i].ingresoA) nombreE.push(array[i].nombre);
          }return nombreE;
        }
  
  }


  //
// 4️⃣ ***** EJERCICIO 4 ***** - construccionCasas() 4️⃣
// En este ejercicio debemos implementar la función construccionCasas() la cual nos va a determinar
// cuantas casas se pueden construir segun la cantidad de bolsas de cemento que dispongamos.
// La función recibira por parametro la cantidad de bolsas de cemento que dispongamos y dentro de la misma debe retornar otra funcion pasandole por parametros la cantidad de casas que querramos construir.
//
// INFO:
// 10 bolsas de cemento equivalen a 1 casa
// -Si la cantidad de casas que recibo es 0 o menor debe retornar "Por favor ingresar cuantas casas quieres construir"
// -Si la cantidad de bolsas de cemento no equivalen a 1 casa debe retornar "No se puede construir casas con esa cantidad de bolsas"
// -Si la cantidad de casas sobrepasa la cantidad de bolsas de cemento necesarias para construir esas casas... ej: bolsas de cemento = 10 y casas = 2 debe retornar `Solo puedes construir esta cantidad de casas: 1`
// -Si la cantidad de casas es igual a la cantidad de bolsas de cemento necesarias para construir esas casas debe retornar true
//
// EJEMPLOS:
// let casas = construccionCasas(100)
// casas(10) => 10 me devolveria true
//
// let casas = construccionCasas(0)
//casas(10) => 'No se puede construir casas con esa cantidad de bolsas'
//
// REQUISITOS:
//  🟢

function construccionCasas(bolsas) {
  // Tu código aquí:
   return function canCasas(casas){
     if(casas <= 0)return "Por favor ingresar cuantas casas quieres construir";
     if(bolsas < 10)return "No se puede construir casas con esa cantidad de bolsas";
     if(bolsas%casas ===0)return true;
     return `Solo puedes construir esta cantidad de casas: ${Math.floor(bolsas / 10)}`
     
     
   }

}



/////----------EXTRA CREDIT------------
// Implementar una función que a partir de un String recibido como parámetro
// genere todos los posibles anagramas de ese String y retorne un arreglo con ellos.
// Extra-Extra credit: Sacar las palabras duplicados del array final.
// Ejemplo:
//    const anagrams = allAnagrams('abc');
//    console.log(anagrams); // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]

var allAnagrams = function (string, array, index) {
  if (string.length < 2) {
    return string;
  }
  let arrayAnagramas = [];

  for (let i = 0; i < string.length; i++) {
    let caracter = string[i];
    if (string.indexOf(caracter) != i) continue;
    let faltantes = string.slice(0, i) + string.slice(i + 1, string.length);
    for (let permutas of allAnagrams(faltantes)) {
      arrayAnagramas.push(caracter + permutas);
    }
  }
  return arrayAnagramas;
};
