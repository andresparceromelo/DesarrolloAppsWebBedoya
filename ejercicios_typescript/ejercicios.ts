
// ===================== EJERCICIO 1 =====================
const estudiantes: string[] = ["Ana", "Luis", "Carlos", "María", "Paula"];

console.log("=== Ejercicio 1: Nombres de estudiantes ===");
for (let i = 0; i < estudiantes.length; i++) {
  console.log(estudiantes[i]);
}

// ===================== EJERCICIO 2 =====================
console.log("\n=== Ejercicio 2: Cantidad de estudiantes ===");
console.log("Hay " + estudiantes.length + " estudiantes en el arreglo.");

// ===================== EJERCICIO 3 =====================
const numeros: number[] = [10, 25, 60, 5, 80, 45, 30, 70, 15, 90];

console.log("\n=== Ejercicio 3: Suma total del array de números ===");
let suma: number = 0;
for (let i = 0; i < numeros.length; i++) {
  suma = suma + numeros[i];
}
console.log("Suma total:", suma);

// ===================== EJERCICIO 4 =====================
const numeros2: number[] = [3, 17, 45, 8, 62, 29, 74, 11, 55, 38, 91, 6, 48, 23, 77];

console.log("\n=== Ejercicio 4: Suma total del array de 15 números ===");
let suma2: number = 0;
for (let i = 0; i < numeros2.length; i++) {
  suma2 = suma2 + numeros2[i];
}
console.log("Suma total:", suma2);

// ===================== EJERCICIO 5 =====================
console.log("\n=== Ejercicio 5: Promedio del array del punto 3 ===");
const promedio: number = suma / numeros.length;
console.log("Promedio:", promedio);

// ===================== EJERCICIO 6 =====================
console.log("\n=== Ejercicio 6: Números mayores a 50 del punto 3 ===");
for (let i = 0; i < numeros.length; i++) {
  if (numeros[i] > 50) {
    console.log(numeros[i]);
  }
}

// ===================== EJERCICIO 7 =====================
interface Persona {
  nombre: string;
  edad: number;
  ciudad: string;
}

const persona: Persona = {
  nombre: "Carlos Pérez",
  edad: 22,
  ciudad: "Medellín",
};

console.log("\n=== Ejercicio 7: Objeto persona ===");
console.log("Nombre:", persona.nombre);
console.log("Edad:", persona.edad);
console.log("Ciudad:", persona.ciudad);

// ===================== EJERCICIO 8 =====================
interface Producto {
  nombre: string;
  precio: number;
}

const productos: Producto[] = [
  { nombre: "Camiseta", precio: 35000 },
  { nombre: "Pantalón", precio: 80000 },
  { nombre: "Zapatos", precio: 120000 },
  { nombre: "Gorra", precio: 25000 },
  { nombre: "Chaqueta", precio: 150000 },
];

console.log("\n=== Ejercicio 8: Array de productos ===");
for (let i = 0; i < productos.length; i++) {
  console.log("Nombre: " + productos[i].nombre + " | Precio: $" + productos[i].precio);
}

// ===================== EJERCICIO 9 =====================
console.log("\n=== Ejercicio 9: Producto con mayor precio ===");
let productoMayor: Producto = productos[0];
for (let i = 1; i < productos.length; i++) {
  if (productos[i].precio > productoMayor.precio) {
    productoMayor = productos[i];
  }
}
console.log("Producto con mayor precio:", productoMayor.nombre, "- $" + productoMayor.precio);

// ===================== EJERCICIO 10 =====================
interface ProductoConUnidades {
  nombre: string;
  precio: number;
  unidades: number;
}

const inventario: ProductoConUnidades[] = [
  { nombre: "Camiseta", precio: 35000, unidades: 10 },
  { nombre: "Pantalón", precio: 80000, unidades: 5 },
  { nombre: "Zapatos", precio: 120000, unidades: 8 },
  { nombre: "Gorra", precio: 25000, unidades: 20 },
  { nombre: "Chaqueta", precio: 150000, unidades: 3 },
];

console.log("\n=== Ejercicio 10: Valor total del inventario ===");
let valorTotal: number = 0;
for (let i = 0; i < inventario.length; i++) {
  valorTotal = valorTotal + inventario[i].precio * inventario[i].unidades;
}
console.log("Valor total del inventario: $" + valorTotal);

// ===================== EJERCICIO 11 =====================
interface Materia {
  nombre: string;
  nota: number;
}

interface Estudiante {
  nombre: string;
  semestre: number;
  materias: Materia[];
}

const listaEstudiantes: Estudiante[] = [
  {
    nombre: "Ana Gómez",
    semestre: 3,
    materias: [
      { nombre: "Matemáticas", nota: 4.2 },
      { nombre: "Física", nota: 3.8 },
      { nombre: "Programación", nota: 4.5 },
    ],
  },
  {
    nombre: "Luis Torres",
    semestre: 5,
    materias: [
      { nombre: "Bases de Datos", nota: 3.0 },
      { nombre: "Redes", nota: 2.9 },
      { nombre: "Software", nota: 3.3 },
    ],
  },
  {
    nombre: "María López",
    semestre: 2,
    materias: [
      { nombre: "Cálculo", nota: 4.8 },
      { nombre: "Álgebra", nota: 4.6 },
      { nombre: "Inglés", nota: 4.0 },
    ],
  },
  {
    nombre: "Pedro Díaz",
    semestre: 4,
    materias: [
      { nombre: "Sistemas Operativos", nota: 3.6 },
      { nombre: "Compiladores", nota: 3.4 },
      { nombre: "IA", nota: 3.9 },
    ],
  },
];

console.log("\n=== Ejercicio 11: Promedio de cada estudiante ===");
let sumaPromedios: number = 0;

for (let i = 0; i < listaEstudiantes.length; i++) {
  let sumaNotas: number = 0;
  for (let j = 0; j < listaEstudiantes[i].materias.length; j++) {
    sumaNotas = sumaNotas + listaEstudiantes[i].materias[j].nota;
  }
  const promedioEstudiante: number = sumaNotas / listaEstudiantes[i].materias.length;
  sumaPromedios = sumaPromedios + promedioEstudiante;
  console.log(listaEstudiantes[i].nombre + " - Promedio: " + promedioEstudiante.toFixed(2));
}

const promedioGeneral: number = sumaPromedios / listaEstudiantes.length;
console.log("Promedio general de todos los estudiantes: " + promedioGeneral.toFixed(2));

// ===================== EJERCICIO 12 =====================
console.log("\n=== Ejercicio 12: Estudiantes con promedio mayor a 3.5 ===");
for (let i = 0; i < listaEstudiantes.length; i++) {
  let sumaNotas: number = 0;
  for (let j = 0; j < listaEstudiantes[i].materias.length; j++) {
    sumaNotas = sumaNotas + listaEstudiantes[i].materias[j].nota;
  }
  const promedioEstudiante: number = sumaNotas / listaEstudiantes[i].materias.length;
  if (promedioEstudiante > 3.5) {
    console.log(listaEstudiantes[i].nombre);
  }
}
