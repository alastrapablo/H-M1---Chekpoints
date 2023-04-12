//Linked LIst

/*
* EJERCICIO 3
*
* Implementar el método compressList dentro del prototype de LinkedList que deberá DEVOLVER UNA NUEVA LISTA
* en donde cada elemento se obtiene de aplicar la funcion a dos nodos consecutivos. Si la lista tiene un unico
* elemento, debe devolver la lista con dicho elemento.
*
*
* Parametros:
*   func : funcion a aplicar
*
* Salida: 
*   > una nueva lista con las caracteristicas mencionadas
*
* Ejemplos:
* lista:  -> 5 -> 4 -> 9 -> 1 -> 2 -> null
* func = function(a,b) return a+b; 
* lista.compressList(func): -> 9 -> 10 -> null

* ¿Por que? 
*   - Toma el 5 y el 4 -> func(5, 4) -> retorna 9 => nuevo nodo con 9 
*   - Toma el 9 y el 1 -> func (9, 1) -> retorna 10 => nuevo nodo con 10, consecutivo al nodo previamente creado
*   - Toma el 2, no tiene un proximo elemento para aplicar la funcion, se deshecha 
*   => Se obtiene una nueva lista que es:  -> 9 -> 10 -> null 
*
* lista: -> 2 -> 2 -> null
* func = function(a,b) return a+b; 
* lista.compressList(func): -> 4 -> null
* 
* ¿Por que? 
*   - Toma el 2 y el 2 -> func(2, 2) -> retorna 4 => nuevo nodo con 4
*   - No tengo mas nodos para aplicar la funcion 
*   => Se obtiene una nueva lista que es: -> 4 -> null 

*
* lista: -> 2 -> null
* func = function(a,b) return a+b; 
* lista.compressList(func): -> 2 -> null
* 
* ¿Por que? 
*   - La lista inicial tiene un UNICO nodo, por lo tanto no le aplicaremos funcion ni reduccion
*   - No se puede reducir 
*   - Devuelve una nueva lista igual a la provista  
*   => Se obtiene una nueva lista que es: -> 2 -> null 
* 
* */
LinkedList.prototype.compressList = function (func) {
    // Tu código aca:
    // creo una nueva lista para guardar los nuevos valores 
    let nuevaLista = new LinkedList();
    let nodoActual = this.head;
    if(!nodoActual.next){   //lo primero es q si no hay otros nodos tengo que devolver y agregar el q este
      nuevaLista.add(nodoActual.value);
      return nuevaLista;
    }
    while(nodoActual.next !== null){
      nuevaLista.add(func(nodoActual.value, nodoActual.next.value));
      if(!nodoActual.next.next)break;
        nodoActual = nodoActual.next.next;
      
    }
    return nuevaLista;
  
  
  }
  
  /*
   * EJERCICIO 4
   *
   * Implementar el método removeFrom dentro del prototype de LinkedList que deberá MODIFICAR la lista
   * de forma tal que el elemento en el indice indicado (recibido por parametro) sea eliminado de la misma.
   *
   * Parametros:
   *   index: describe el indice del elemento que debe ser eliminado [el head, es la posicion 0]
   *
   * Ejemplos:
   *   lista: -> 5 -> 2 -> 4 -> 6 -> null
   *   lista(0) = 5
   *   lista.removeFrom(2): -> 5 -> 2 -> 6 -> null
   *
   *   lista: -> 5 -> 2 -> 4 -> 6 -> null
   *   lista(0) = 5
   *   lista.removeFrom(1): -> 5 -> 4 -> 6 -> null
   * */
  
  LinkedList.prototype.removeFrom = function (index) {
    // Tu código aca:
    if(!this.head) return undefined; //si no hay head
    let nodoActual = this.head;
    if(nodoActual === null) return null;   //si el head esta vacio pero no undefned
    
    if (index === 0){  //si el index pasado por parametro el 0
      this.head = nodoActual.next;  // elimino el head y paso su valor al sig
      return; 
    }
  
    while(nodoActual.next !== null && index -1 > 0){ //mientras el nodo actual . next tenga algo y el indice sea + a 0 (no igual porq 0 es el head)
      nodoActual= nodoActual.next;    //cambio el nodo actual y lo paro donde esta el index
      index--; // me paro con el index un nodo antes para poder eliminar el nodoactual.next
    }
    nodoActual.next = nodoActual.next.next;  // remplazo el nodoact.next por el q le sigue y asi ese se borra
  };
  
  /*
   * EJERCICIO 5
   *
   * Implementar el método insertInOrder dentro del prototype de LinkedList que deberá agregar un elemento
   * a la lista ordenada (MAYOR a MENOR).
   *
   *
   * Parametros:
   *   value: valor a ingresar
   *
   * Ejemplos:
   *   lista: -> 5 -> 4 -> 2 -> null
   *   lista.insertInOrder(3): -> 5 -> 4 -> 3 -> 2 -> null
   *
   * */
  
  LinkedList.prototype.insertInOrder = function (value) {
    // Tu código aca:
    let nuevoNodo = new Node(value);
    let nodoActual = this.head;
    
    if(!nodoActual){                  //si en ek head no hay nada lo seteo
      this.head = nuevoNodo;   //seteo nuevo nodo y los devuelvo
      return;
    }
  
    let aux = nodoActual;
    if (value > nodoActual.value){
      this.head = nuevoNodo;
      nuevoNodo.next = aux;
      return;
    }
    let insert = false;
    while(nodoActual.next !== null && !insert){
      if(value> nodoActual.next.value){
        aux = nodoActual.next;
        nodoActual.next= nuevoNodo;
        nuevoNodo.next = aux;
        insert = true;
      }
      nodoActual = nodoActual.next;
    } if (!insert){
      nodoActual.next = nuevoNodo; 
    }
       
  
  };

  // ----- LinkedList -----

// EJERCICIO 3
// Implementar el método size dentro del prototype de LinkedList que deberá retornar el tamaño actual de
// la LinkedList. En el caso de que la lista se encuentre vacía deberá retornar cero.
// Ejemplo:
//    var lista = new LinkedList();
//    lista.size(); --> 0
//    lista.add(1);
//    lista.size(); --> 1
//    lista.add(2);
//    lista.add(3);
//    lista.size(); --> 3

LinkedList.prototype.size = function () {
  if(!this.head) return 0;
  let nodoActual = this.head;
  let size = 1;
  while(nodoActual.next !== null){
    nodoActual = nodoActual.next;
    size++;
  
  }
  return size;
  };
  


  // EJERCICIO 5
// Implementar el método removeFromPos dentro del prototype de LinkedList que deberá remover un elemento de
// la posición indicada ("pos" será la posición del elemento a remover).
// En el caso de que la posición en la que se quiera hacer el remove no sea válida (Supere el tamaño de
// la lista actual o sea un número negativo) debe devolver false.
// Si el nodo fue removido correctamente devolver el valor del nodo.
// Aclaración: la posición cero corresponde al head de la LinkedList
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> [2] --> [3] --> [4]
//    lista.removeFromPos(2);
//    Ahora la lista quedaría: Head --> [1] --> [2] --> [4] y la función debería haber devuelto el valor 3
// Ejemplo 2:
//    Suponiendo que se pide una posición inválida: removeFromPos(8) --> false

LinkedList.prototype.removeFromPos = function (pos) {
  // Tu código aca:
  if (pos >= this.size()) return false;  // si la posicion es mayor que el tamaño de la lista
  let current = this.head;              // fijo el current
  if (pos === 0) {                      // para el caso de sacar el primer elemento
    let aux = current;
    this.head = current.next;
    return aux.value; // devuelve el valor
  }

  let contador = 1;   // pongo un contador para llegar a la posicion
  while (current.next !== null && contador < pos) { // recorro la lista hasta la posicion
    current = current.next;
    contador++;
  }
  // hago el cambio
  let aux = current.next; // auxiliar para hacer el cambio
  current.next = current.next.next;
  return aux.value; // devuelve el valor
};

/*
  EJERCICIO 1
   Agregar el método sortList al prototipo de LinkedList. 
   Este método deberá ordenar los elementos de nuestra lista enlazada de mayor a menor.
   Si la lista está vacía, debe retornar false;
   Ejemplo:
     Suponiendo que la lista actual es: Head --> [8] --> [12] --> [3] --> [16]
     LinkedList.sortList();
     Ahora la lista quedaría: Head --> [16] --> [12] --> [8] --> [3]
*/

LinkedList.prototype.sortList = function () {
  // Tu código aca:
  if (this.head === null) return false; // retorna false si la lista esta vacia

  // defino array para usar en forma temporal y el current
  let array = [];
  let current = this.head;
  
  // Primero pusheo el head al array temporal
  array.push(current);
  // luego recorro los nodos para guardarlos en el array temporal
  while (current.next) {
    current = current.next;
    array.push(current);
  }

  // ordeno el array temporal por los valores de los nodos
  array.sort((a, b) => (a.value < b.value ? 1 : -1));
  
  // asigno a la lista el primer nodo del array temporal
  this.head = array[0];
  var actual = this.head;
  
  // recorro el array ordenado y reasigno los next de cada nodo
  for (let i = 1; i < array.length + 1; i++) {		// OJO CON EL +1 VER SI EL ULTIMO NODO QUEDA NULL
    actual.next = array[i];
    actual = actual.next;
  }
  return;
};

/*
EJERCICIO 2
Agregar el método simplifyList al prototipo de LinkedList. Este método deberá filtrar 
los elementos repetidos de nuestra lista enlazada y crear una nueva lista con los elementos 
extraídos para finalmente reemplazar la lista original.
Si la lista está vacía, debe retornar false
Ejemplo:
    Suponiendo que la lista actual es: Head --> [2] --> [5] --> [1] --> [5] --> [7] --> [2] --> null
    lista.simplifyList();
    Ahora la lista resultante es: Head --> [2] --> [5] --> [1] --> [7] --> null
ACLARACIÓN: Se debe reemplazar la lista original por la nueva.
Pista: Podes usar el metodo search() ya incorporado dentro del prototype de LinkedList
  */
 
LinkedList.prototype.simplifyList = function () { 
  // Tu código aca:
  if (this.head === null) return false; // retorna false si la lista esta vacia

  // defino array para usar en forma temporal y el current
  let array = [];
  let current = this.head;
  
  // Primero pusheo el valor del head al array temporal
  array.push(current.value);
  // luego recorro los nodos para guardarlos en el array temporal
  while (current.next) {
    current = current.next;
    array.push(current.value);
  }
  let setLimpio = [...new Set(array)];

  // asigno a la lista el primer nodo del array temporal
  
  this.head = null;
  this.add(setLimpio[0])
  let actual = this.head;
  
  // recorro el array sin duplicados y reasigno los next de cada nodo
  for (let i = 1; i < setLimpio.length; i++) {
    this.add(setLimpio[i])
  }
  return;
}


// ---------------------

// ----- LinkedList -----

// EJERCICIO 3
// Implementar el método size dentro del prototype de LinkedList que deberá retornar el tamaño actual de
// la LinkedList. En el caso de que la lista se encuentre vacía deberá retornar cero.
// Ejemplo:
//    var lista = new LinkedList();
//    lista.size(); --> 0
//    lista.add(1);
//    lista.size(); --> 1
//    lista.add(2);
//    lista.add(3);
//    lista.size(); --> 3

LinkedList.prototype.size = function () {
  /* Tu codigo aqui */
  if (!this.head) return 0;
  let current = this.head;
  let size = 1;
  while (current.next !== null) {
    size ++;
    current = current.next;
  }
  return size;
};

// EJERCICIO 4
// Implementar el método addInPos dentro del prototype de LinkedList que deberá agregar un elemento en
// la posición indicada. Ambos datos serán brindados como parámetro (pos, value). Donde "pos" será la
// posición en la cual se deberá agregar el valor "value". En el caso de que la posición en la que se
// quiera hacer la inserción no sea válida (Supere el tamaño de la lista actual) debe devolver false.
// Si el nodo fue agregado correctamente devolver true.
// Aclaración: la posición cero corresponde al head de la LinkedList
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> [2] --> [4]
//    lista.addInPos(2, 3);
//    Ahora la lista quedaría: Head --> [1] --> [2] --> [3] --> [4]
// Ejemplo 2:
//    Suponiendo que la lista está vacía: Head --> null
//    lista.addInPos(2, 3); --> Debería devolver false ya que no es posible agregar en la posición 2
//    sin antes tener cargada la posición 0 y 1.

LinkedList.prototype.addInPos = function (pos, value) {
  /* Tu codigo aqui */
  if (pos > this.size()) return false;  // si la posicion es mayor que el tamaño de la lista
  let nuevoNodo = new Node(value);      // creo nuevo nodo 
  let current = this.head;              // fijo el current
  if (pos === 0) {                      // para el caso del primer elemento
    let aux = current;
    this.head = nuevoNodo;
    nuevoNodo.next = aux;
    return;
  }

  let contador = 1;   // pongo un contador para llegar a la posicion
  let aux;            // auxiliar para hacer el cambio
  while (current.next !== null && contador < pos) { // recorro la lista hasta la posicion
    current = current.next;
    contador++;
  }
  // hago el cambio
  aux = current.next;
  current.next = nuevoNodo;
  nuevoNodo.next = aux;
  return true; 
};

// EJERCICIO 5
// Implementar el método removeFromPos dentro del prototype de LinkedList que deberá remover un elemento de
// la posición indicada ("pos" será la posición del elemento a remover).
// En el caso de que la posición en la que se quiera hacer el remove no sea válida (Supere el tamaño de
// la lista actual o sea un número negativo) debe devolver false.
// Si el nodo fue removido correctamente devolver el valor del nodo.
// Aclaración: la posición cero corresponde al head de la LinkedList
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> [2] --> [3] --> [4]
//    lista.removeFromPos(2);
//    Ahora la lista quedaría: Head --> [1] --> [2] --> [4] y la función debería haber devuelto el valor 3
// Ejemplo 2:
//    Suponiendo que se pide una posición inválida: removeFromPos(8) --> false

LinkedList.prototype.removeFromPos = function (pos) {
  // Tu código aca:
  if (pos >= this.size()) return false;  // si la posicion es mayor que el tamaño de la lista
  let current = this.head;              // fijo el current
  if (pos === 0) {                      // para el caso de sacar el primer elemento
    let aux = current;
    this.head = current.next;
    return aux.value; // devuelve el valor
  }

  let contador = 1;   // pongo un contador para llegar a la posicion
  while (current.next !== null && contador < pos) { // recorro la lista hasta la posicion
    current = current.next;
    contador++;
  }
  // hago el cambio
  let aux = current.next; // auxiliar para hacer el cambio
  current.next = current.next.next;
  return aux.value; // devuelve el valor
};

// EJERCICIO 5
// Implementar el método reverse dentro del prototype de LinkedList que invierta el orden de la lista
// original y retorne una nueva lista con dichos elementos invertidos de posición.
// Ejemplo:
//    Lista original: Head --> 1 --> 4 --> 10 --> 13 --> null
//    Lista nueva luego de aplicar el reverse: Head --> 13 --> 10 --> 4 --> 1 --> null

LinkedList.prototype.reverse = function () {
  if (this.head === null) return false; // retorna false si la lista esta vacia
    
  // defino array para usar en forma temporal y el current
  let array = [];
  let current = this.head
  
  // Primero pusheo el valor del head al array temporal
  array.push(current.value);
  
  // luego recorro los nodos para guardarlos en el array temporal
  while (current.next) {
    current = current.next;
    array.push(current.value);
  }
  
  // aplico el reverse a la lista de valores
  array.reverse();
  
  // asigno a la lista el primer nodo del array temporal
  this.head = null;
  
  // recorro el array ordenado y reasigno los next de cada nodo
  for (let i = 0; i < array.length; i++) {
    this.add(array[i]);
  }
  return this;
};

  

/*
  EJERCICIO 1
   Agregar el método sortList al prototipo de LinkedList. Este método deberá ordenar los elementos de nuestra lista enlazada de mayor a menor.
   Si la lista está vacía, debe retornar false;
   Ejemplo:
     Suponiendo que la lista actual es: Head --> [8] --> [12] --> [3] --> [16]
     LinkedList.sortList();
     Ahora la lista quedaría: Head --> [16] --> [12] --> [8] --> [3]
*/

LinkedList.prototype.sortList = function () {
  // Tu código aca: //
/* 

function LinkedList() {
  this.head = null;

}*/
let current = this.head;

if (!this.head) {
  return false;
}
 let arr = []
 while (current) {
  arr.push(current.value);
  current = current.next;
 }

 current = this.head;
 arr = arr.sort(function(a, b){return b - a})
 while (current) {
  current.value = arr.shift();
  current = current.next;
 } 
};


/*
EJERCICIO 2
Agregar el método simplifyList al prototipo de LinkedList. Este método deberá filtrar 
los elementos repetidos de nuestra lista enlazada y crear una nueva lista con los elementos 
extraídos para finalmente reemplazar la lista original.
Si la lista está vacía, debe retornar false
Ejemplo:
    Suponiendo que la lista actual es: Head --> [2] --> [5] --> [1] --> [5] --> [7] --> [2] --> null
    lista.simplifyList();
    Ahora la lista resultante es: Head --> [2] --> [5] --> [1] --> [7] --> null
ACLARACIÓN: Se debe reemplazar la lista original por la nueva.
Pista: Podes usar el metodo search() ya incorporado dentro del prototype de LinkedList
  */
 
LinkedList.prototype.simplifyList = function () { 
  // Tu código aca:
  let current = this.head;
  const values = []; 
  let repe;

  
  if (!current) return false;

  while (current) {      
      values.push(current.value);

      while (current.next && values.includes(current.next.value)) {
          repe = current.next.value; 

          if(current == this.head){ 
              this.head.next = current.next.next 
          }else{
              current.next = current.next.next; 
          }
      }
      current = current.next;
  }
  return repe;
}


/*EJERCICIO 3
Implementar el método count dentro del prototype de LinkedList que deberá retornar la suma de todos los
valores dentro de la lista.
En caso de que la lista esté vacía, retornar 0
Ejemplo:
Dada esta lista: [4] --> [2] --> [7] -- > null
LinkedList.count() --> 13
*/

LinkedList.prototype.count = function() {
// Tu código aca:
let counter = 0; 
let current = this.head;

while(current){      
    counter = counter + current.value ;  
    current = current.next;
}
return counter;
}



// ----- LinkedList -----

// Deben completar la siguiente implementacion 'OrderedLinkedList'(OLL)
// que es muy similar a las LinkedList vistas en clase solo que 
// los metodos son distintos y deben de estar pensados para conservar la lista
// ordenada de mayor a menor.
// ejemplos:
// head --> 5 --> 3 --> 2 --> null
// head --> 4 --> 3 --> 1 --> null
// head --> 9 --> 3 --> -1 --> null
// Las dos clases principales ya van a estar implementadas a continuacion:
function OrderedLinkedList() {
  this.head = null;
}
// notar que Node esta implementado en el archivo DS

// Y el metodo print que permite visualizar la lista:
OrderedLinkedList.prototype.print = function(){
  let print = 'head'
  let pointer = this.head
  while (pointer) {
      print += ' --> ' + pointer.value
      pointer = pointer.next;
  }
  print += ' --> null'
  return print
}


// EJERCICIO 4
// Crea el metodo 'add' que debe agregar nodos a la OLL de forma que la misma se conserve ordenada:
// Ejemplo:
// > LL.print()
// < 'head --> null'
// > LL.add(1)
// > LL.print()
// < 'head --> 1 --> null'
//    2       c
// > LL.add(5)
// > LL.print()
// < 'head --> 5 --> 1 --> null'
// > LL.add(4)
// > LL.print()
// < 'head --> 5 --> 3 --> 1 --> null'
//               4
OrderedLinkedList.prototype.add = function(val){
  // Validamos si el head está vacio
  if (!this.head) {
      this.head = new Node(val)
      return
  }
  // De no estarlo, guardamos el current
  let current = this.head
  //Recorremos la lista, buscando que tenga current.next, y el valor sea mayor al argumento.
  while (current.next && current.value > val) {
      current = current.next
  }
  // Guardamos el resto de la lista de manera auxiliar.
  let aux = current.next
  current.next = new Node(val)
  current.next.next = aux
}


// EJERCICIO 5
// Crea el metodo 'removeHigher' que deve devolver el valor mas alto de la linked list 
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeHigher = function(){
  //Valida si no tiene head
  if (!this.head) return null;
  //Si no tiene siguiente el head, 
  if (!this.head.next) {
      //
      let current = this.head.value
      this.head = null
      return current
  } else {
      let current = this.head.value
      this.head = this.head.next
      return current
  }
}


// EJERCICIO 6
// Crea el metodo 'removeLower' que deve devolver el valor mas bajo de la linked list 
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeLower = function(){
  //Validamos si no tiene head
  if (!this.head) return null;
  //Validamos si es un único elemento
  if (!this.head.next) {
      let current = this.head.value
      this.head = null
      return current
  } else {
      //Caso de no ser un único elemento
      let current = this.head
      while (current.next.next) {
          current = current.next
      }
      //Guardamos ante ultimo valor.
      let aux = current.next.value
      current.next = null
      return aux
  }
}

// ---- Linked List ----
//EJERCICIO 1
// Agregar el método orderList al prototipo de LinkedList. Este método deberá ordenar los elementos de nuestra lista enlazada de menor a mayor.
// Ejemplo:
//     Suponiendo que la lista actual es: Head --> [4] --> [5] --> [1]
//     lista.orderList();
//     Ahora la lista quedaría: Head --> [1] --> [4] --> [5]
// ACLARACIÓN: Se debe ordenar la lista original y no una nueva.
LinkedList.prototype.orderList = function () {
  // Tu código aca:
  var array = [];
  var puntero = this.head;

  while (puntero) {
    array.push(puntero.value);
    puntero = puntero.next;
  }

  array.sort(function(a, b) {
    return a - b;
  });

  this.head = null;

  for ( i = 0 ; i < array.length ; i++) {
    this.add(array[i])
}

  return this;
};

// EJERCICIO 2
// Agregar al prototipo de LinkedList un método reverseLinkedList que invierta el orden de los elementos de la lista.
// Ejemplo:
// let myList = Head --> [1] --> [2] --> [3] --> [4]
// myList.reverseLinkedList()
// myList = Head --> [4] --> [3] --> [2] --> [1]
LinkedList.prototype.reverseLinkedList = function () {
  // Tu código aca:
    let puntero1 = linkedListOne.head;
    let puntero2 = linkedListTwo.head;
    let nuevaLista = new LinkedList();
    while(puntero1){
        nuevaLista.add(puntero1.value)
        nuevaLista.add(puntero2.value)
        puntero1 = puntero1.next
        puntero2 = puntero2.next
    }
    return nuevaLista;
  }



  // 4️⃣ ***** EJERCICIO 4 ***** - devuelveMayores() 4️⃣

// Implementar la función devuelveMayores, que recibe por parámetro una LinkedList con precios
// de productos de una determinada góndola de Henry Market, y un precio máximo a evaluar.
// La función deberá recorrer la LinkedList recibida y retornar la CANTIDAD DE PRECIOS QUE SUPEREN
// el valor de precio máximo que se desea evaluar.
// En caso de que ningún precio supere dicho valor, debe retornar en string "Sin precios"

//  EJEMPLOS:
//
//  listaPrecios1 = 5 => 10 => 8 => 7 => 14 => 20
//  devuelveMayores(listaPrecios1, 10) => 2
//  (2 precios (14 y 20) superan el valor a evaluar (10))
//
//  listaPrecios2 = 99 => 100 => 81 => 74 => 14 => 22
//  devuelveMayores(listaPrecios2, 50) => 4
//  (4 precios (99, 100, 81 y 74) superan el valor a evaluar (50))
//
//  listaPrecios3 = 99 => 80 => 81 => 75 => 15 => 21
//  devuelveMayores(listaPrecios3, 100) => "Sin precios"
//  (Ningún precio de la lista supera el valor a evaluar (100))
//
//  REQUISITOS:
//    🟢 La función debe retornar un valor numérico, que representa la CANTIDAD DE PRECIOS que superen
//      el valor a evaluar.
//    🟢 En caso de que ningún precio supere dicho valor, debe retornar el string "Sin precios"
//
//  ATENCIÓN! Las respuestas en strings son case sensitive!

function devuelveMayores(lista, valor) {
  // Tu código aquí:

  let list=lista.head;
    let temp=[]
    while(list){
      temp.push(list.value);
      list=list.next
    }
    let arr=temp.filter(t=>t>valor)
    return (arr.length===0)?"Sin precios":arr.length;
 
}
/*let arr = [];
let newArr = [];
let aux = lista.head;
while(aux){
  arr.push(aux.value);
  aux = aux.next;
} 
for(var i=0; i<arr.length;i++){
  if(arr[i]> valor){
    newArr.push(arr[i]);
  }
} 
if(newArr.length ===0) return "Sin precios";
return newArr.length;*/



// 7️⃣ ***** EJERCICIO 7 ***** - LINKEDLIST.mapHouses() 7️⃣ 
// 
// Agregar al prototype de LinkedList el método mapHouses().
// Vas a implementar un método parecido al map() de array, dónde tendrás que modificar todos los valores
// de la lista actual.
// Recibirás un parámetro que podrá recibir cualquier tipo de dato (pueden ser strings, arrays u objetos).
// EJEMPLOS:
//  Nos envían la siguiente Lista:
//   ("Casa Moderna") ---> ("Casa Moderna") ---> ("Casa Moderna") --->
//
// LinkedList.map("Cabaña Antigua")
//
// La lista de inmuebles pasaría a tener el siguiente valor:
//
// ("Cabaña Antigua") ---> ("Cabaña Antigua") ---> ("Cabaña Antigua") --->
//
// ⚠️ ATENCIÓN ⚠️
// Recordar que debe poder mapearse la lista por cualquier tipo de dato!
// No necesitas retornar una nueva lista, tenes que modificar la actual!
// 
// REQUISITOS:
//  🟢 Modificar los valores de la lista actual por lo que recibas por parámetros
//  🟢 Retornar false si la lista está vacía

LinkedList.prototype.mapHouses = function (value) {
  // Tu código aquí:
  var head = this.head;
  if(!this.head) return false;
  while(head){
    head.value = value;
    head = head.next;
  }
}

// 8️⃣ ***** EJERCICIO 8 ***** - LinkedList.sliceRooms() 8️⃣ 
// 
// Agregar al prototype de LinkedList el método sliceRooms().
// Este método también será similar al slice() de array, dónde a partir de 2 índices, deberás
// particionar la lista de habitaciones de una casa.
//
//⚠️ ATENCION ⚠️
// - Documentación explicando Array.slice() --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
// - Los valores que sean iguales a los índices no deben ser incluidos
// - Los indices siempre van a equivaler a un string con el nombre de una habitación
// - Recorda que esta el metodo add() ya incluido en el prototype para agregar nuevos nodos y search() para buscar los existentes
//
// EJEMPLOS:
// Tenemos la siguiente lista:
// ("Cocina") ---> ("Dormitorio") ---> ("Baño") ---> ("Living") ---> ("Garage") --->
//
// LinkedList.sliceRooms("Dormitorio", "Garage") Devuelve => ("Baño") ---> ("Living") --->
//
// REQUISITOS:
//  🟢 Retornar una nueva lista a partir de los índices provistos
//  🟢 Los valores que coincidan con los indices no deben ser incluidos
//  🟢 Si ninguno de los índices se encuentra en la lista, retornar false
//
// Nota: el primer indice siempre sera menor al segundo.

LinkedList.prototype.sliceRooms = function (firstIndex, secondIndex) {
  // Tu código aquí:
  var newList = new LinkedList();
  var newArr = [];
  var arr2 = [];
  var current = this.head;
  if(!this.search(firstIndex)|| !this.search(secondIndex))return false;
  while(current){
    newArr.push(current.value);
    current = current.next;
  }
  for(var i= 0; i < newArr.length; i++){
    if(newArr[i]=== firstIndex || newArr[i]=== secondIndex){
       arr2.push(i);
    }
  }
  var aux= newArr.slice(arr2[0]+1,arr2[1]);
   for(var i=0; i <aux.length; i++){
     newList.add(aux[i]);
   }
   return newList;
}


// ----- LinkedList -----

// EJERCICIO 3
// Implementar el método size dentro del prototype de LinkedList que deberá retornar el tamaño actual de
// la LinkedList. En el caso de que la lista se encuentre vacía deberá retornar cero.
// Ejemplo:
//    var lista = new LinkedList();
//    lista.size(); --> 0
//    lista.add(1);
//    lista.size(); --> 1
//    lista.add(2);
//    lista.add(3);
//    lista.size(); --> 3

LinkedList.prototype.size = function(){
  if (!this.head) return 0;

  let current =  this.head;
  let counter = 1;

  while (current.next) {
    counter ++
    current = current.next;
  }
  return counter;
} 

