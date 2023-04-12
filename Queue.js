// ----- QUEUE -----

// EJERCICIO 6
// Implementar la función controlAcces: a partir de una Queue que va a recibir como paráemtro que tiene
// en cada posición un objeto que va a representar a una persona y tiene la siguiente forma:
// {
//   fullname: "Franco Etcheverri",
//   age: 26,
//   ticket: {
//     number: 1,
//     event: "Tomorrowland"
//   }
// }
// La idea es ir verificando uno a uno si la primer persona de la cola tiene los requisitos necesarios para
// ingresar al evento correspondiente (también recibido por parámetro). Los requisitos que debe cumplir son:
// - Ser mayor de 18 años (18 inclusive es válido)
// - Tener un ticket que corresponda con el evento (prop event de ticket)
// - Que no haya ingresado ya otra persona al evento con ese mismo número de ticket
// Finalmente la función debe devolver un arreglo con todos los nombres de las personas que pudieron ingresar
// Importante!: Aquellas personas que no cumplan con los requisitos para ingresar deben ser removidos de la cola

var controlAcces = function (queue, event) {
    // Tu código aca:
    let ticketsUsados = []; // array temporal para tickets usados
    let ingresos = [];      // personas que pueden ingresar
  
    while (queue.size() > 0) {  // mientras que la fila tenga elementos
      if (queue.array[0].age >= 18 && queue.array[0].ticket.event === event && !ticketsUsados.includes(queue.array[0].ticket.number)) {
        ticketsUsados.push(queue.array[0].ticket.number); // agrego el ticket a los usados
        ingresos.push(queue.dequeue().fullname);          // agrego la persona a ingreso y saco de la fila
      } else {
        queue.dequeue();   // saco de la fila porque no cumple condiciones para entrar
      }
    }
    return ingresos; // retorno el array
  };


  // EJERCICIO 6
// Implementar la función cardGame: a partir de dos Queue que va a recibir como paráemtros tiene
// que determinar quién será el ganador del juego de cartas. Las reglas de dicho juego son las siguientes:
//    - Cada jugador tendrá un mazo con cartas numeradas del 1 al 12
//    - Estos mazos estarán implementados a partir de la estructura de Queue utilizada en el homework
//    - En cada turno del juego, cada jugador lanzará la carta que se encuentre primero en su mazo (Queue)
//    - El jugador que tenga el número más alto en el turno ganará dicho turno
//    - El jugador que gane dicho turno se quedará con ambas cartas agregándolas al final del mazo (Primero
//    la suya y luego la de su contrincante)
//    - En el caso de que haya empate ambos pierden las cartas y no se agregan a ningún mazo
//    - El ganador del juego será quien deje a su oponente sin cartas en su mazo
// Aclaración: la función cardGame debe retornar "A wins!" en el caso de que el ganador sea el jugador A o
// "B wins!" en caso contrario. [Puede ocurrir que haya empate, en dicho caso retornat "Game tie!"]
// Ejemplo:
//    - mazoUserA = [4,2,10,11]
//    - mazoUserB = [6,9,10,3]
//    Primer mano:
//     A --> 4  vs  6 <-- B [6 > 4 entones gana la mano B y pone ambas cartas en su mazo, colocando primero la suya]
//    - mazoUserA = [2,10,11]
//    - mazoUserB = [6,9,10,3,6,4]

var cardGame = function (mazoUserA, mazoUserB) {
    while (mazoUserA.size() !== 0 && mazoUserB.size() !== 0) {
      let cartaUserA = mazoUserA.dequeue();
      let cartaUserB = mazoUserB.dequeue();
      if (cartaUserA > cartaUserB) {
        mazoUserA.enqueue(cartaUserA);
        mazoUserA.enqueue(cartaUserB);
      } else if (cartaUserB > cartaUserA) {
        mazoUserB.enqueue(cartaUserB);
        mazoUserB.enqueue(cartaUserA);
      }
    }
    if (mazoUserA.size() === 0 && mazoUserB.size() === 0) return 'Game tie!'
    if (mazoUserB.size() === 0) return 'A wins!';
    return 'B wins!';
  };
  /*
  let mazoUserA = new Queue(); let mazoUserB = new Queue();
  mazoUserA.enqueue(4); mazoUserA.enqueue(2); mazoUserA.enqueue(10); mazoUserA.enqueue(11);
  mazoUserB.enqueue(6); mazoUserB.enqueue(9); mazoUserB.enqueue(10); mazoUserB.enqueue(3);
  console.log(cardGame(mazoUserA, mazoUserB));
  */

  // ----- QUEUE -----

// EJERCICIO 7
// Implementar la funcion multiCallbacks:
// la funcion multiCallbacks recibe dos arrays de objetos cuyas propiedades son dos,
// 'cb' que es una funcion, y 'time' que es el tiempo estimado de ejecucion de dicha funcion 
// este ultimo representado con un integer como se muestra acontinuacion:
// let cbsExample = [
//     {cb:function(){}, time: 2},
//     {cb:function(){}, time: 3}
// ]
// De manera que lo que nuestra funcion 'multiCallbacks' debe de ir ejecutando las funciones 
// sin pasarle parametros pero debe ir alternando las funciones de cbs1 y cbs2 
// segun cual de estas se estima que tarde menos, retornando un arreglo de resultados
// de las mismas en el orden que fueron ejecutadas
// Ejemplo:
// > let cbs1 = [
//       {cb:function(){return '1-1'}, time: 2},
//       {cb:function(){return '1-2'}, time: 3}
//   ];
// > let cbs2 = [
//       {cb:function(){return '2-1'}, time: 1},
//       {cb:function(){return '2-2'}, time: 4}
//   ];
// > multiCallbacks(cbs1, cbs2);
// < ["2-1", "1-1", "1-2", "2-2"];

function multiCallbacks(cbs1, cbs2){
  //Guardamos en una nueva variable, el resultado concadetano y sorteado.
  let callbacks = cbs1.concat(cbs2).sort(function(a, b) {
      return a.time - b.time;
  })
  //Iteramos con FOR por cada obj y lo vamos pusheando.
  let results = []
  for (let i = 0; i < callbacks.length; i++) {
      results.push(callbacks[i].cb())
  }
  // let results = callbacks.map(function(valor){
  //     return valor.cb()
  // })
  return results

}


// EJERCICIO 9
// Implementar la función cardGame: a partir de dos Queues que va a recibir como paráemtro que
// van a representar mazos de cartas de dos jugadores debemos determinar quien va a ser el ganador
// de este juego que va a tener la siguiente dinámica:
// - Los jugadores tendrán que defender su "Castillo" que contiene un total de 100 puntos de resistencia
// - Cada carta tendrá puntos de ataque (attack) y puntos de defensa (defense)
// - Ambos jugadores van a sacar las dos primeras cartas de su mazo
//      * La primera carta será su carta asignada para atacar
//      * La segunda carta será su carta asignada para defender
// - La carta asignada para atacar del jugador uno se enfrentará contra la carta asignada para defender
//   del jugador dos y viceversa. Si el ataque supera los puntos de defensa el daño sobrante será aplicado
//   sobre el castillo.
// - El juego finaliza cuando alguno de los dos castillos se quede sin puntos de resistencia o cuando los mazos
//   se acaben. En este último caso ganará aquel jugador que tenga mayor cantidad de puntos de resistencia
//   restantes en su castillo.
// La función deberá devolver un string indicando al ganador: 'PLAYER ONE' o 'PLAYER TWO' (Respetar mayúsculas) o
// 'TIE' en el caso de empate
// NOTA: Ambos mazos contienen la misma cantidad de cartas
//
// Ejemplo:
// Los jugadores levantan 2 cartas cada uno.
// La primera carta del jugador uno va a atacar a la segunda carta del jugador dos
// La primer carta del jugador dos va a atacar a la segunda carta del jugador uno
//
// Primer carta del jugador 1 (ATAQUE) vs Segunda carta del jugador 2 (DEFENSA):
// {attack: 5, defense: 5} vs {attack: 5, defense: 26}
// Ataque 5 vs Defensa 20 --> 5 no supera 20 --> No hay daño sobre el castillo
//
// Primer carta del jugador 2 (ATAQUE) vs Segunda carta del jugador 1 (DEFENSA):
// {attack: 20, defense: 26} vs {attack: 15, defense: 10}
// Ataque 20 vs Defensa 10 --> 20 supera a 10 --> Como hay 10 puntos de diferencia esa cantidad de daño es aplicada
// al castillo del jugador 1
//
// Una vez terminada la ronda, se procede a repetir lo mismo con las siguientes 2 cartas de cada jugaodr hasta
// finalizar el juego.
function cardGame(playerOneCards, playerTwoCards) {
  // Tu código aca:
  var vidaCastillo1 = 100;
  var vidaCastillo2 = 100;
  var cantidadDeManos = Math.floor(playerOneCards.size() / 2)

  while(cantidadDeManos > 0 && vidaCastillo1 > 0 && vidaCastillo2 > 0) {
    
    cantidadDeManos --
    let carta1P1 = playerOneCards.dequeue();
    let carta2P1 = playerOneCards.dequeue();
    let carta1P2 = playerTwoCards.dequeue();
    let carta2P2 = playerTwoCards.dequeue();

    if(carta1P1.attack > carta2P2.defense) {
      var num = carta1P1.attack - carta2P2.defense;
      vidaCastillo2 = vidaCastillo2 - num
    }
    if(carta2P1.defense < carta1P2.attack) {
      var num = carta1P2.attack - carta2P1.defense;
      vidaCastillo1 = vidaCastillo1 - num
    }
  } if (vidaCastillo1 === vidaCastillo2) return "TIE";
    if (vidaCastillo1 > vidaCastillo2) return "PLAYER ONE";
    return "PLAYER TWO";}


    function cardGame(playerOneCards, playerTwoCards) {
      // Tu código aca:
      let castillo1 = 100;
      let castillo2 = 100;
      while (castillo1 > 0 && castillo2 > 0) {
        let ataque1 = playerOneCards.dequeue();
        let defensa1 = playerOneCards.dequeue();
        let ataque2 = playerTwoCards.dequeue();
        let defensa2 = playerTwoCards.dequeue();
        let ataqueC1 = defensa2.defense - ataque1.attack;
        let ataqueC2 = defensa1.defense - ataque2.attack;
        if (ataqueC1 < 0) castillo2 = +ataqueC1;
        if (ataqueC2 < 0) castillo1 = +ataqueC2;
      }
      //console.log();
      if (castillo1 === castillo2) return "TIE";
      if (castillo1 <= 0) return "PLAYER TWO";
      if (castillo2 <= 0) return "PLAYER ONE";
    }

    // 1️⃣ ***** EJERCICIO 1 ***** - henryParty() 1️⃣
// Tenemos complicaciones! 
// Se esta organizando una fiesta para inagurar las nuevas casas pero hay gente desconocida que intenta ingresar
// La función recibirá por parámetro un array que representa en orden la fila de personas que intentan ingresar
// necesitamos que solo ingresen los que tienen los ticket:"VIP" y que sean conocidos!
// ingresa las personas validas a una nueva QUEUE, donde iremos filtrando los invitados para que solo queden los invitados correctos.
//
// El array de movimientos tendrá la siguiente forma:
//
// [{name:"Carol", ticket:"FALSO", estado: "Desconocido"},
// {name:"Gonzalo", ticket:"VIP",estado: "Conocido"},
// {Name: "Micaias", ticket:"VIP", estado: "Desconocido"}], donde ticket y estado, representan el ingreso 
// de un persona al nuevo QUEUE.
// Finalmente, la función debe retornar la QUEUE que representa los invitados validos para ingresar
//
// EJEMPLOS:
//
// - henryParty([{name:"Carol", ticket:"FALSO", estado: "Desconocido"},⚠️
// {name:"Gonzalo", ticket:"VIP", estado: "Conocido"}, 🟢
// {Name: "Micaias", ticket:"VIP", estado: "Desconocido"}] ⚠️
// ) => Queue [name:"Gonzalo", ticket:"VIP",estado: "Conocido"}]

// REQUISITOS:
//  🟢 La función debe retornar la QUEUE resultante de procesar los movimientos.
//  🟢 Si la función intenta retirar a una persona cuando la Queue se encuentra vacía,
//    debe retornar false
//  🟢 La QUEUE que retorna la función debe ser una instancia de la clase QUEUE.

function henryParty(arr) {
  // Tu código aquí:
  let Invitados = new Queue();

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].ticket === "VIP" && arr[i].estado === "Conocido") {
      Invitados.enqueue(arr[i]);
    }
  }
  if (Invitados.size() < 1) return false;
  return Invitados;
}

// 🛒 HENRY MARKET 🛒
// En el día de inauguración del nuevo supermercado Henry Market, estamos encargados
// del correcto funcionamiento de los programas de cada una de las computadoras que
// realizan las distintas tareas en el negocio.
//
// Cada uno de los ejercicios nos pedirá implementar una función en la que utilizaremos
// lo aprendido en este módulo.
// Leer atentamente cada uno de los enunciados y guiarse por los ejemplos!
//
//
//
//
// 1️⃣ ***** EJERCICIO 1 ***** - henryParking() 1️⃣
// Implementar la función henryParking, que nos permitirá organizar los movimientos de
// los vehículos del estacionamiento de Henry Market.
// La función recibirá por parámetro un array que representa en orden las entradas
// y salidas de vehículos que se producen en el estacionamiento, y deberá crear
// una QUEUE, donde iremos registrando los ingresos y egresos.
//
// El array de movimientos tendrá la siguiente forma:
//
// [23, 43, "OUT", 65, "OUT", 32, 55, "OUT"] , donde cada número representa el ingreso
// de un vehículo al que se le asigna dicho valor; y cada "OUT" representa la salida
// del vehículo que lleva más tiempo dentro del estacionamiento.
// Finalmente, la función debe retornar la QUEUE que representa el estado del estacionamiento
// al momento de finalizar los eventos del array.
//
// EJEMPLOS:
//
//  - henryParking([23, 43, "OUT", 65]) => Queue [43, 65]
//      - Ingresó vehículo 23. [23] 🔺
//      - Ingresó vehículo 43. [23, 43] 🔺
//      - Egresó vehículo 23.  [43] 🔻
//      - Ingresó vehículo 65. [43, 65] 🔺
//
// REQUISITOS:
//  🟢 La función debe retornar la QUEUE resultante de procesar los movimientos.
//  🟢 Si la función intenta retirar un vehículo cuando la Queue se encuentra vacía,
//    debe retornar false
//  🟢 ATENCIÓN! La QUEUE que retorna la función debe ser una instancia de la clase QUEUE.
//  array 
// 23, 43 , out  


//=== nume estado       push enqueue     dequeue shift   




function henryParking(arr){
  // Tu código aquí:
  
  let estado= new Queue();
  
  for (let i=0;i<arr.length;i++){
    if(arr[i]==='OUT'){
      estado.dequeue();
    }else {
      estado.enqueue(arr[i]);
      
    }
  }
  if(estado.size()===0) return false;
  return estado;}


// 5️⃣ ***** EJERCICIO 5 ***** - cobrarClientes 5️⃣

// Implementar la función cobrarClientes, que recibirá una
// Queue (fila) de clientes que esperan para realizar el pago
// de sus compras del supermercado.
//
// Cada cliente dentro de la fila estará como objeto, y tendrá
// la siguiente estructura:
//
// {
//   nombre: "Jorge",
//   dinero: 1500,
//   precioProductos: 1200
// }
//
// - nombre: Nombre del cliente
// - dinero: Dinero disponible que tiene el cliente
// - precioProductos: Suma de los productos que desea comprar
//
// La función debe evaluar si el primer cliente de la fila poseee dinero suficiente
// para abonar los productos que desea comprar. En caso de ser así, debe remover
// al cliente de la fila.
// En caso de presentarse un cliente que no posee dinero suficiente, debe dejar de
// evaluar los clientes de la fila, y retornar un array con los NOMBRES de los clientes
// que fueron correctamente retirados de la fila.
//
// EJEMPLO:
//
// clientes=[
//  {
//   nombre: "Jorge",
//   dinero: 1500,
//   precioProductos: 1200
//  },
//  {
//   nombre: "Mateo",
//   dinero: 2000,
//   precioProductos: 1900
//  },
//  {
//   nombre: "Mora",
//   dinero: 5000,
//   precioProductos: 5500
//  },
//]
//
// cobrarClientes(clientes) => ["Jorge","Mateo"]
//
// ⚠️ ATENCIÓN ⚠️
// Recuerden que los "clientes" recibidos por parámetro se encuentran
// en una Queue! Por lo cual tendremos que utilizar los métodos que
// tenemos implementados para esta clase.
//
// CONSIGNAS:
//  🟢 Cuando termine de evaluar clientes, la función debe retornar un array con los nombres de los clientes que
//    han abonado correctamente.
//  🟢 En caso de quedarse sin clientes en la fila, la función debe retornar false.

function cobrarClientes(clientes) {
  // Tu código aquí:
  let newArr = [];
  while(clientes.size()!==0){
 if (clientes.array[0].dinero > clientes.array[0].precioProductos){ //es un objeto dentro de un array y como saco la primer posicion siempre mi array va a inicializar en 0
    newArr.push(clientes.dequeue().nombre);
  }else{
    return newArr;
  }
} 
return false;
}



