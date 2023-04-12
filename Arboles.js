/*
* EJERCICIO 7
*
* Implemtnar la funcion height dentro del prototype de BinarySearchTree que calcule la altura de un arbol.
*
* Parametros: -
* Valor de retorno: altura del arbol
* 
* Salida:
*   > Altura del arbol 
*
* Pista: funcion auxiliar, calcular la altura de un arbol.[Una forma de resolverlo es pensarlo recursivamente y usando Math.max]
*
*            16             ---> Nivel 1
          /      \
        6         23        ---> Nivel 2
      /  \       /   \
     2    14    17    31    ---> Nivel 3
      \
       5                    ---> Nivel 4

* La funcion devolveria 3
* */

BinarySearchTree.prototype.height = function () {
  let izq = 1; // seteo izquierda en 1
  let der = 1; // seteo derecha en 1
  // si hay arbol izquierdo -> invoco a la recursion y sumo su resultado a cantidad
  if (this.left !== null) izq += this.left.height();
  // idem para el arbol del lado derecho
  if (this.right !== null) der += this.right.height();
  return Math.max(izq, der); // retorno la profundidad maxima de ambas ramas
};

/*
* EJERCICIO 8
*
* Implemtnar la funcion balanced dentro del prototype de BinarySearchTree que determine si el arbol
* se encuentra o no balanceado.
*
* Parametros: -
* 
* Salida:
*   > true: si el arbol esta balanceado
*   > false: si el arbol no esta balanceado
*
*
*            16             ---> Nivel 1
        /      \
      6         23        ---> Nivel 2
    /  \       /   \
   2    14    17    31    ---> Nivel 3
    \
     5                    ---> Nivel 4

* La funcion devolveria true
*
* TIP: Se pueden usar funciones previamente definidas
* */

BinarySearchTree.prototype.balanced = function () {
  let izq; // seteo izq y der para guardar profunidad de cada rama
  let der;
  // si hay arbol izquierdo -> averiguo la profundidad
  if (this.left !== null) izq = this.left.height();
  // idem para el arbol del lado derecho
  if (this.right !== null) der = this.right.height();
  // si son iguales, o con una diferencia de 1, TRUE (math.abs convierte posible negativo en positivo)
  if (izq === der || Math.abs(izq - der) === 1) return true;
  return false;
};

// ----- BST -----

// EJERCICIO 7
// Implementar la función generateBST para que a partir de un array recibido como parametro
// genere un BinarySearchTree. Devolver dicho arbol generado.
// Ejemplo:
//    - array(16,6,23,2,17,31,14,5);
//    - arbol generado:
//             16
//          /      \
//        6         23
//      /  \       /   \
//     2    14    17    31
//      \
//       5
var generateBST = function (array) {
  /* Tu codigo aqui */
  let tree = new BinarySearchTree(array[0]);
  for (let i = 1; i < array.length; i++) {  // recorro el resto del array
    tree.insert(array[i]);
  }
  return tree;
};

// ---------------

// Ejercicio 8
// Dado un arreglo ordenado, encontrar el índice de un elemento específico pasado como parámetro
// utilizando el método conocido como búsqueda binaria. En el caso de que el número buscado no se encuentre
// en el array devolver -1.
// Para mayor información sobre dicho método:
//    - https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
//    - https://en.wikipedia.org/wiki/Binary_search_algorithm
// Ejemplo:
//    array = [1,2,3,4,5,6,7,8,9,10];
//    binarySearch(array, 2) --> Devolvería 1 ya que array[1] = 2
//    [Donde 2 sería el número sobre el cuál queremos saber su posición en el array]

var binarySearch = function (array, elemento) {
  /* Tu codigo aqui */
  // resuelto sin metodos de arrays
  // chequeo si el elemnto existe en el array
  let existe = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === elemento) {
      existe = true;
      break;
    }
  }
  // funcion interna recursiva para encontrar el indice
  function encontrar(array, elemento) {
    if (!existe) return -1;
    if (array.length === 1) {                 // corte de la recursion, unico elemento existente en el array
      if (array[0] === elemento) return 0;    // si es el elemento devuelve 0
      return -1;
    }
    let indice = Math.floor(array.length / 2);  // elijo indice para dividir en dos el array
    // si no es el final de la recursion, hago recursion
    let izq = array.slice(0, Math.floor(array.length / 2));
    let der = array.slice(-Math.ceil(array.length / 2));
    if (elemento === array[indice]) {
      return indice;
    } else if (elemento < array[indice]) {                // si el elemento esta del lado izquierdo del indice
      return binarySearch(izq, elemento);  // recurso con esa parte del array
    } else if (elemento > array[indice]) {                                // si esta del lado derecho
      return izq.length + binarySearch(der, elemento);    // recurso con esa parte del array
    }
  }
  return encontrar(array, elemento);
};

// ---- Arboles Binarios ----

// EJERCICIO 6

// Implementar la función searchMaxTwo que busque en nuestro arbol binario los dos valores maximos
// y los retorne en un array.
// Ejemplo:
//             16
//          /      \
//        6         23
//      /  \       /   \
//     2    14    17    31
//    / \                 \
//       5                44
//
//  Debería retornarnos 44 y 31.

BinarySearchTree.prototype.searchMaxTwo = function () {
  // tu código acá:
  let pila = [];      // nodos a visitar
  let visitados = []; // nodos visitados
  let current = this;
  pila.push(current);

  while (pila.length != 0) {
    current = pila.pop();
    // Agrego el nodo a la lista de nodos visitados
    visitados.push(current.value);
    // Si hay hijo izquierdo, lo agrego a la pila para visitar
    if (current.right) pila.push(current.right);
    // Idem para derecho
    if (current.left) pila.push(current.left);
  }
  // Ordeno el array de mayor a menor
  visitados.sort((a, b) => (a < b ? 1 : -1));
  // Dejo solo los dos primeros items del array
  let arrayFinal = visitados.splice(0, 2);
  return arrayFinal;
};

// Implementar el método insertWord en el prototype de BinarySearchTree
// El método será similar al método insert ya implementado, pero en lugar
// de agregar valores numéricos al árbol, se encargará de insertar palabras
// que tomarán posición basándose en la cantidad de caracteres que posean.
//
// EJEMPLO:
//
// Iniciando con el árbol llamado arbolDePalabras:
//
//                          "Palabra"
//                            /    \
//
// Ejecutamos el método arbolDePalabras.insertWord("Perro")
//
//                          "Palabra"
//                            /    \
//                       "Perro"
//
// La palabra "Perro" se insertó en el nodo de la izquierda por tener una cantidad
// de caracteres menor a "Palabra".
//
// Ejecutamos el método arbolDePalabras.insertWord("Murciélago")
//
//                          "Palabra"
//                            /    \
//                       "Perro"  "Murciélago"
//
// Siguiendo la misma lógica, la palabra se insertó a la derecha por tener una
// cantidad de caracteres mayor.
//
// RESPUESTAS!:
// ✔️ Si el método recibe un string vacío, debe retornar false
// ✔️ Si el método recibe una palabra de tamaño igual a una palabra
// ya existente, debe retornar false.
// ✔️ La palabra debe insertarse en el lugar correspondiente y, de ser así,
// retornar el string que ha sido insertado

BinarySearchTree.prototype.insertWord = function (palabra) {
  // Tu código acá
  if (palabra === '' || palabra.length === this.value.length) return false;
  if (palabra.length < this.value.length) {
    if (this.left === null) {
      var newTree = new BinarySearchTree(palabra);
      this.left = newTree;
    } else {
      this.left.insertWord(palabra);
    }
  } else if (palabra.length > this.value.length) {
    if (this.right === null) {
      var newTree = new BinarySearchTree(palabra);
      this.right = newTree;
    } else {
      this.right.insertWord(palabra);
    }
  }
  return palabra;
};


// EJERCICIO 7
// Implementar la función generateBST para que a partir de un array recibido como parametro
// genere un BinarySearchTree. Devolver dicho arbol generado.
// Ejemplo:
//    - array(16,6,23,2,17,31,14,5);
//    - arbol generado:
//             16
//          /      \
//        6         23
//      /  \       /   \
//     2    14    17    31
//      \
//       5

var generateBST = function (array) {
  /* Tu codigo aqui */
  let tree = new BinarySearchTree(array[0]);
  for (let i = 1; i < array.length; i++) {
    // recorro el resto del array
    tree.insert(array[i]);
  }
  return tree;
};

// ---------------

// EJERCICIO 8
// Implementar el metodo 'toArray' en el prototype del BinarySearchTree
// que devuelva los valores del arbol en una array ordenado
// Ejemplo:
//     32
//    /  \
//   8   64
//  / \
// 5   9
// resultado:[5,8,9,32,64]

BinarySearchTree.prototype.toArray = function (current = this, arry = []) {
  //
  if (!current) return []
  this.toArray(current.left, arry)
  arry.push(current.value)
  this.toArray(current.right, arry)

  return arry;
}

// ---- Arboles Binarios ----
// EJERCICIO 4
// Implementar la función searchMin que busque en nuestro arbol binario, el valor minimo.
// Ejemplo:
//             16
//          /      \
//        6         23
//      /  \       /   \
//     2    14    17    31
//      \
//       5
//  Debería retornarnos 2

BinarySearchTree.prototype.searchMin = function () {
  var puntero = this
  while (puntero.left) {
    puntero = puntero.left
  } return puntero.value;
}

// 8️⃣ ***** EJERCICIO 8 ***** - searchMax() 8️⃣
// Implementar la función searchMax dentro del prototipo de BynarySearchTree, que nos servirá para buscar el precio
// máximo que se encuentra dentro de un BinarySearchTree que contendrá números que representan a los precios de una
// de las góndolas de Henry Market.
//
// EJEMPLO:
//  - En caso de que nuestro árbol de precios sea el siguiente:
//
//             17
//          /      \
//        7         24
//      /  \       /   \
//     3    15    18    32
//    / \                 \
//       4                45
//
// Deberá retornar 45.

BinarySearchTree.prototype.searchMax = function () {
  // Tu código aquí:
  var puntero = this
  while (puntero.right) {
    puntero = puntero.right
  } return puntero.value;
};

// EJERCICIO 5
// Implementar la función createBST para que a partir de un array recibido como parametro
// genere un BinarySearchTree.
// Ejemplo:
//    - Array[16,6,23,2,17,31,14,5];
//             16
//          /      \
//        6         23
//      /  \       /   \
//     2    14    17    31
//      \
//       5
function createBST(array) {
  // Tu código aca:
  var tree = new BinarySearchTree(array[0]);
  for (var i = 1; i < array.length; i++) {
    tree.insert(array[i]);
  }
  return tree;
};




// 6️⃣ ***** EJERCICIO 6 ***** - agregarProductos 6️⃣
// Implementar la función agregarProductos(producto) al prototipo de BinarySearchTree, que nos servirá para
// agregar LOS NOMBRES de los productos en una góndola de supermercado en base a las comparacionesde sus precios,
// siguiendo la siguiente tabla:
//
//    ┌─────────┬────────┐
//    │Productos│ Precios│
//    ├─────────┼────────┤
//    │  Leche  │  100   │
//    │  Queso  │  150   │
//    │   Pan   │   50   │
//    │ Frutas  │  110   │
//    │  Arroz  │   40   │
//    │  Jugo   │   80   │
//    └─────────┴────────┘
//
//  EJEMPLO:
//
//  Si partimos del árbol inicial llamado "arbolDeProductos" con un solo nodo:
//
//                                              Leche
//                                              /    \
//
//    arbolDeProductos.agregarProductos(Queso)
//
//                                              Leche
//                                              /    \
//                                                   Queso
//
// El producto "Queso" se insertó a la derecha, ya que su precio (150), es mayor que el precio Leche (100).
//
//    arbolDeProductos.agregarProductos(Pan)
//
//                                             Leche
//                                             /    \
//                                          Pan      Queso
//
// El producto "Pan" se insertó a la izquierda, ya que su precio (50), es menor que el precio Leche (100).
//
//    arbolDeProductos.agregarProductos(Frutas)
//
//                                             Leche
//                                            /     \
//                                         Pan       Queso
//                                                  /
//                                               Frutas
//
// El producto "Frutas" en la posición correspondiente, ya que su precio (110), supera al de Leche (100) y
// es menor que precio de Queso (150).
//
// CONSIGNAS:
//  🟢 En caso de querer insertar un producto que ya se encuentra en el árbol, debe retornar
//    el string "Ya existe el producto".
//  🟢 En caso de querer insertar un producto que no se encuentra en la tabla de precios, debe retornar
//    el string "Producto inexistente".
//  🟢 El método debe insertar el producto en la posición correspondiente, basando su ubicación en el
//    precio del producto. (Ver ejemplos)
//  🟢 En caso de insertar el producto correctamente, debe retornar el nuevo nodo que ha sido insertado.
//
//
// IMPORTANTE! La lista de productos se encuentra en el objeto productos a continuación:
//⚠️ NO MODIFICAR NADA POR DEBAJO DE ESTA LÍNEA ⚠️
BinarySearchTree.prototype.agregarProductos = function (nombreProducto, productos) {
  if (!productos[nombreProducto]) return "Producto inexistente";
  if (this.value === nombreProducto) return "Ya existe el producto";
  if (productos[this.value] < productos[nombreProducto]) {   // productos ---> lista nombres clave ---precio valor
    if (this.right === null) {
      return this.right = new BinarySearchTree(nombreProducto);
    } else {
      return this.right.agregarProductos(nombreProducto, productos);

    }
    //--> precios
  }
  if (productos[this.value] > productos[nombreProducto]) {   // productos ---> lista nombres clave ---precio valor
    if (this.left === null) {
      return this.left = new BinarySearchTree(nombreProducto);
    } else {
      return this.left.agregarProductos(nombreProducto, productos);
    }

  }
}

/*
  // Tu código aquí:
  if(productos[nombreProducto]===undefined){
    return "Producto inexistente";
  }else if(nombreProducto === this.value){
    return "Ya existe el producto";
  }else if(productos.nombreProducto < this.value){
    if(this.left){
      return this.left.agregarProductos(nombreProducto,productos);
    }
  }else if(this.right){
    return this.right.agregarProductos(nombreProducto,productos;)
  }
  if(productos[nombreProducto]<productos[this.value]){
    var newTree = new BinarySearchTree(nombreProducto);
    this.left = newTree;
    return newTree
  }else{
    return this.left.agregarProductos(nombreProducto, productos);
  }
  
};*/





/*
 Implementar la clase BinarySearchTree, definiendo los siguientes métodos recursivos:
  - size: retorna la cantidad total de nodos del árbol
  - insert: agrega un nodo en el lugar correspondiente
  - contains: retorna true o false luego de evaluar si cierto valor existe dentro del árbol
  - depthFirstForEach: recorre el árbol siguiendo el orden depth first (DFS) en cualquiera de sus variantes, según se indique por parámetro ("post-order", "pre-order", o "in-order"). Nota: si no se provee ningún parámetro, hará el recorrido "in-order" por defecto.
  - breadthFirstForEach: recorre el árbol siguiendo el orden breadth first (BFS)

  El ábrol utilizado para hacer los tests se encuentra representado en la imagen bst.png dentro del directorio homework.
*/

function BinarySearchTree(value) {
  this.value = value;
  this.right = null;
  this.left = null;
}
BinarySearchTree.prototype.insert = function (value) {
  if (value > this.value) {   // si el valor de parametro es mayoy al del root
    if (!this.right) {   // y si en la derecha no hay ningun nodo nuevo
      this.right = new BinarySearchTree(value); // entonces agrego un nuevo nodo a la derecha
    } else {                                     //con el valor recibido por param
      this.right.insert(value);                 // si ya tenia nodo dcho entonces llamo a la func insert y le agrego el value a la derecha
    }
  } else {
    if (!this.left) {                              // idem izquierda
      this.left = new BinarySearchTree(value);
    } else {
      this.left.insert(value);
    }
  }
}
BinarySearchTree.prototype.size = function () {         // 12 -- 9---7
  if (!this.left && !this.right) return 1;

  if (!this.left) return 1 + this.right.size();
  if (!this.right) return 1 + this.left.size();

  return 1 + this.left.size() + this.right.size();
}
BinarySearchTree.prototype.size = function () {

  if (!this.left && !this.right) { // si solo esta el root
    return 1;
  }
  if (!this.right) return 1 + this.left.size(); // si del lado dcho no hay nada entonces me devulve 1 q es el padre
  // mas todo lo que haya del lado izq usando recursion
  if (!this.left) return 1 + this.right.size();  // idem lado derecho

  return 1 + this.right.size() + this.left.size();// si hay de ambos lados retorno el root 1+
  // el arbol izq y el dcho en todo su tamaño
}

BinarySearchTree.prototype.contains = function (value) { // recibe por param el valor a buscar
  if (value === this.value) return true; //si es igual al root retorno true
  if (value > this.value) { // si es mayor lo buscp a la derecha
    if (!this.right) { // si en la dcha no hay nada devuelve falso
      return false;
    } else {     // si en la derecha hay nodos aplica recursion 
      return this.right.contains(value); // la recursion va a buscar e valor en la rama derecha
    }
  } else {
    if (!this.left) {
      return false;
    } else {
      return this.left.contains(value);
    }
  }
}



BinarySearchTree.prototype.depthFirstForEach = function (cb, order) { //xq el test me dice q recibo una funcion
  if (!order || order === 'in-order') {//in order si me lo pasan o si no me pasan ninuno es por defecto

    //in order de izq a dcha
    if (this.left) this.left.depthFirstForEach(cb, order);// si tengo nodos a la izq le pido q los recorra
    //no retorna nada xq ejecuta una cb
    cb(this.value);              //ejecuta el cb en el root luego nde recorrer la izq
    if (this.right) this.right.depthFirstForEach(cb, order); //idem lado dcho  
  } else if (order === 'pre-order') { //si me pasan en pre order primero se recorre a si mismo
    cb(this.value);
    if (this.left) this.left.depthFirstForEach(cb, order);
    if (this.right) this.right.depthFirstForEach(cb, order);
  } else {
    if (this.left) this.left.depthFirstForEach(cb, order);
    if (this.right) this.right.depthFirstForEach(cb, order);
    cb(this.value);
  }


}

BinarySearchTree.prototype.breadthFirstForEach = function (cb, array = []) {
  cb(this.value); //primero recorro el root

  if (this.left) array.push(this.left); //aca le pido q si hay nodos en el lado izq los pushee al array
  if (this.right) array.push(this.right);//idem lado derecho

  let nodo = array.shift(); // creo un nodo que vaya retirando de a uno los valores del array q ya rcorri
  if (nodo) nodo.breadthFirstForEach(cb, array);

}



// ⚠️ NO MODIFICAR NADA POR ENCIMA DE ESTA LÍNEA ⚠️

// 9️⃣ ***** EJERCICIO 9 ***** - searchPrice() 9️⃣
// Implementar la función searchPrice dentro del prototipo de BynarySearchTree, que nos servirá para buscar un precio
// recibido por parámetro dentro de un BinarySearchTree que contendrá números que representan a los precios de una de
// las góndolas de Henry Market.
// 🟢 En caso de encontrar el precio recibido por parámetro, debe retornar true.
// 🟢 En caso de no encontrar dicho precio, debe retornar false.
// 🟢 En caso de recibir por parámetro un precio igual o menor a 0 (cero), debe retornar el string "Error"
//
// EJEMPLOS:
//  - En caso de que nuestro árbol de precios sea el siguiente:
//
//             17
//          /      \
//        7         24
//      /  \       /   \
//     3    15    18    32
//    / \                 \
//       4                45
//
// arbolDePrecios.searchPrice(24) => true
// arbolDePrecios.searchPrice(4) => true
// arbolDePrecios.searchPrice(50) => false
// arbolDePrecios.searchPrice(1) => false
// arbolDePrecios.searchPrice(0) => "Error"
// arbolDePrecios.searchPrice(-10) => "Error"

BinarySearchTree.prototype.searchPrice = function (precio) {
  // Tu código aquí
  if (precio <= 0) return "Error";
  if (precio === this.value) return true; //si es igual al root retorno true
  if (precio > this.value) { // si es mayor lo buscp a la derecha
    if (!this.right) { // si en la dcha no hay nada devuelve falso
      return false;
    } else {     // si en la derecha hay nodos aplica recursion 
      return this.right.searchPrice(precio); // la recursion va a buscar e valor en la rama derecha
    }
  } else {
    if (!this.left) {
      return false;
    } else {
      return this.left.searchPrice(precio);
    }
  }
};


// 9️⃣ ***** EJERCICIO 9 ***** - BinarySearchTree.getHouseValues() 9️⃣ 
// Agregar al prototype de BinarySearchTree la función getHouseValues(), que servirá para obtener el valor total de una casa
// dependiendo del parámetro que recibas.
// Si recibes el parámetro "left", debes retornar la suma de todos los valores que estén a la izquierda del árbol.
// Si recibes el parámetro "right", debes retornar la suma de todos los valores que estén a la derecha.
// EJEMPLOS:
// Dado el siguiente árbol:
//                13
//             /      \
//           7         24
//         /          /   \
//        6         16     27
//      /                    \
//     3                     45
//      \
//       4
// BinarySearchTree.getHouseValues("left") Devuelve => 16
// BinarySearchTree.getHouseValues("right") Devuelve => 96
// REQUISITOS:
//  🟢 La función debe retornar un numero representando la suma total de las ramas, dependiendo del orden pedido
//  🟢 El valor del nodo raíz no debe ser incluido

BinarySearchTree.prototype.getHouseValues = function (side, total = 0) {
  // Tu código aquí:

  if (side === "left") {
    if (this.left) total += this.left.getHouseValues(side, total = this.left.value);
    return total;
  }
  if (this.right) total += this.right.getHouseValues(side, total = this.right.value);
  return total;
}


// 🔟 ***** EJERCICIO 10 ***** - BinarySearchTree.spotHousePrices() 🔟 
// Agregar al prototype de BinarySearchTree el método spotHouseValues(), el cual deberá retornar un array con los
// valores del árbol que sean mayores al número recibido por parámetros.
//
// EJEMPLOS:
//
// Dado el siguiente árbol: 
//                6
//             /      \
//           4         8
//         /  \       /  \
//        3    5     7    9
//
// nuevaCasa.spotHousePrices(6, []) => [8, 7, 9]
// nuevaCasa.spotHousePrices(4, []) => [6, 5, 8, 7, 9]
//
//⚠️ ATENCION ⚠️
// - Para solucionar el ejercicio, deben recorrer el arbol de manera depth-first/pre-order
//   (o sea, lo recorren de izquierda a derecha)
// - El array sera provisto via parametros
//
// REQUISITOS:
//  🟢 Devolver un array con los numeros mayores al recibido por parametros
//  🟢 Recorrer el arbol de manera depth-first pre-order
BinarySearchTree.prototype.spotHousePrices = function (num, arr = []) {
  // Tu código aquí:

  arr.push(this.value);
  if (this.left) this.left.spotHousePrices(num, arr);
  if (this.right) this.right.spotHousePrices(num, arr);
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {   //  return arr.filter((a)=>a >num);
    if (num < arr[i]) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}