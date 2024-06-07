// Tipos de Datos en TypeScript

// Los tipos de datos primitivos en TypeScript:
// 1. string: Representa secuencias de caracteres.
let myString: string = "Hello, TypeScript";

// 2. number: Representa tanto números enteros como de punto flotante.
let myNumber: number = 42;

// 3. boolean: Representa valores true o false.
let myBoolean: boolean = true;

// Tipos de Datos No Primitivos:
// 1. Arrays: Colecciones de elementos del mismo tipo.
let myArray: number[] = [1, 2, 3, 4, 5];

// También se pueden usar genéricos para declarar arrays.
let myGenericArray: Array<number> = [1, 2, 3, 4, 5];

// 2. Tuplas: Arrays con un número fijo de elementos de tipos específicos.
let myTuple: [string, number] = ["Marcia", 35];

// 3. Sets: Colecciones de valores únicos.
let mySet: Set<number> = new Set([1, 2, 3, 4, 5]);

// 4. Maps: Colecciones de pares clave-valor.
let myMap: Map<string, number> = new Map([["one", 1], ["two", 2]]);

// Enumeraciones en TypeScript:
// Las enumeraciones (enum) permiten definir un conjunto de constantes con nombres descriptivos.
enum Color {
    Red,
    Green,
    Blue
}

let myColor: Color = Color.Green;

// Tipos any y unknown en TypeScript:
// any: Permite asignar cualquier tipo de valor, deshabilitando la verificación de tipos.
let myAnyValue: any = "Hello";
myAnyValue = 42; // No hay error de compilación

// unknown: Permite asignar cualquier tipo de valor, pero requiere verificación de tipo antes de usar.
let myUnknownValue: unknown = "Hello";
if (typeof myUnknownValue === "string") {
    console.log((myUnknownValue as string).toUpperCase());
}

// Tipos de Unión e Intersección en TypeScript:
// Unión: Permite que una variable pueda ser de varios tipos posibles.
let myUnionValue: number | string;
myUnionValue = "Hello";
myUnionValue = 42;

// Intersección: Combina múltiples tipos en uno solo que tiene todas las propiedades de los tipos combinados.
interface Person {
    name: string;
    age: number;
}
interface Employee {
    employeeID: number;
}
type EmployeePerson = Person & Employee;

let newEmployee: EmployeePerson = {
    name: "John",
    age: 30,
    employeeID: 12345
};

// Buenas prácticas para el uso de tipos en TypeScript:
// 1. Evitar el uso de 'any' cuando sea posible.
// 2. Usar 'unknown' en lugar de 'any' cuando no se conoce el tipo exacto.
// 3. Especificar siempre tipos para variables, parámetros y valores de retorno.
// 4. Utilizar enums para valores constantes en lugar de cadenas literales.
// 5. Aplicar tipos literales para limitar valores posibles de una variable.

function greet(name: string): string {
    return `Hello, ${name}`;
}

function add(x: number, y: number): number {
    return x + y;
}

// Uso de tipos en un proyecto real:
// Ejemplo de una función fuertemente tipada para calcular el área de diferentes formas.

type Shape = "circle" | "rectangle";

function calculateArea(shape: Shape, dimensions: { radius?: number; length?: number; width?: number }): number {
    switch (shape) {
        case "circle":
            if (dimensions.radius) {
                return Math.PI * dimensions.radius ** 2;
            } else {
                throw new Error("Circle dimensions must include radius");
            }
        case "rectangle":
            if (dimensions.length && dimensions.width) {
                return dimensions.length * dimensions.width;
            } else {
                throw new Error("Rectangle dimensions must include length and width");
            }
        default:
            throw new Error("Unknown shape");
    }
}

let circleArea = calculateArea("circle", { radius: 5 });
let rectangleArea = calculateArea("rectangle", { length: 10, width: 5 });

console.log(`Circle Area: ${circleArea}`);
console.log(`Rectangle Area: ${rectangleArea}`);
