#!/usr/bin/nodejs

let fs = require("fs");

let orignal = [
    [0,0,0,1,0,1,1,1],
    [0,1,0,0,0,0,0,0],
    [0,1,0,0,0,1,1,1],
    [0,1,1,1,1,0,0,0],
    [0,1,0,0,1,0,0,0],
    [0,1,0,0,1,0,1,0],
    [0,1,0,1,1,0,1,0],
    [0,0,0,0,1,0,0,0],
    [0,1,1,0,1,1,0,1],
    [0,0,0,0,1,0,0,0],
    [1,0,0,1,0,0,1,1],
    [0,0,1,0,0,0,0,0],


]

let all = fs.readFileSync('matrix.txt', 'utf-8');
var items = all.split(/\r?\n/).map( pair => pair.split(/\s+/).map(Number) );
generarMatrix(items)

//Calcular la cantidad cuadros que puede alumbrar un bombillo
function test(mat, columna, fila, operacion){
    let tmpCol = columna;
    let tmpFil = fila;
    let eje = 0;
    let sum = 0;
    //arriba
    let escapa = false;
    while(eje != 4){
        try{
            if (operacion == 0){

                if (fila === tmpFil && columna === tmpCol && escapa === true){
                    sum = sum - 1;
                }
                if (mat[tmpCol][tmpFil] === 0 && mat[columna][fila] === 0)
                {
                    sum = sum + 1;
                    escapa = true;
                }
                else
                {
                    eje = eje + 1;
                    tmpCol = columna;
                    tmpFil = fila;
                }
            }
            else if (operacion == 1){
               
                mat[columna][fila] = "*";
                
                if (mat[tmpCol][tmpFil] === 0 || mat[tmpCol][tmpFil] === "*" || mat[tmpCol][tmpFil] === "-") {
                    mat[tmpCol][tmpFil] = "-";
                }
                else {
                    eje = eje + 1;
                    tmpCol = columna;
                    tmpFil = fila;
                }
            }
            
        }
        catch (e) {
            eje = eje + 1;
            tmpCol = columna;
            tmpFil = fila;
        }
        if (eje == 0){
            tmpCol = tmpCol - 1;
        }
        else if (eje == 1){
            tmpCol = tmpCol + 1;
        }
        else if (eje == 2)
        {
            tmpFil = tmpFil - 1;
        }
        else if (eje == 3){
            tmpFil = tmpFil + 1;
        }
        else if (eje == 4)
        {
            break;
        }
    }
    if (operacion == 0) {
        
        return sum;
    }else if (operacion === 1) {
        return mat;
    }

}

//Obtener el valor maximo en una matriz
function getMax(a, newnew){

    let big = 0;
    let suma = 0;
    let arriba = 0;
    let abajo = 0;
    let der = 0;
    let izq = 0;
    let iPosition = 0;
    let jPosition = 0;
    let data = 0;
    let contador = 0

    for (let i = 0; i <a.length; i++){
        
        for (let j = 0; j <a[i].length; j++){
            arriba = 0;
            abajo = 0;
            der = 0;
            izq = 0;
            data = 0;
            if (a[i][j] >= big && a[i][j] !== 0){
                contador = 1;
                while((i - contador) >= 0){

                    if (a[i - contador][j] > 0){
                        arriba = arriba + 1;
                    }
                    if (a[i - contador][j] === 0 && newnew[i - contador][j] === 1){
                        break;
                    }
                    contador = contador + 1;
                }
                contador = 1;
                while ((i + contador) < a.length){
                    if (a[i + contador][j] > 0 ){
                        abajo = abajo + 1;
                    }
                    if (a[i + contador][j] === 0 && newnew[i + contador][j] === 1){
                        break;
                    }
                    
                    contador = contador + 1;
                }
                contador = 1;
                while ((j + contador) < a[i].length){

                    if (a[i][j + contador] > 0){
                        der = der + 1;
                    }
                    if (a[i][j + contador] === 0 && newnew[i][j + contador] === 1){
                        break;
                    }
                    
                    contador = contador + 1;

                }
                contador = 1;
                while ((j - contador) >= 0){
                    if (a[i][j - contador] > 0){
                        izq = izq + 1;
                    }
                    
                    if (a[i][j - contador] === 0 && newnew[i][j - contador] === 1){
                        break;
                    }
                    contador = contador + 1;
                }
                data = arriba + abajo + der + izq;
                big = a[i][j]
                if (data > suma || suma === 0 && data === 0){
                    suma = data;
                    iPosition = i;
                    jPosition = j;
                }
            }
        }
    }
    let concatenado = [big, iPosition, jPosition, suma];
    return concatenado;
    //return Math.max(...a.map(e => Array.isArray(e) ? getMax(e) : e));
};

//calcular los bombillos minimos en una habitacion con paredes
function generarMatrix(matrix){

    let verification = [1,0,0];
    let count = 0;
    let otro = new Array(matrix.length).fill("").map(() => new Array(matrix[0].length).fill(""));
    let newnew = new Array(matrix.length).fill(0).map(() => new Array(matrix[0].length).fill(0));
    console.table(matrix);
    while(verification[0] > 0){
        

        for (let i = 0; i < matrix.length; i++)
        {
            for (let j = 0; j < matrix[i].length; j++){
                otro[i][j] = test(matrix, i, j, 0);
            }
        }
        verification = getMax(otro, matrix);

        if (verification[0] === 0){
            break;
        }

        newnew = test(matrix, verification[1], verification[2],1);
        count = count + 1;
    }
    console.log("TABLA CON BOMBILLOS:");
    console.table(newnew);
    
    console.log("El numero total de bombillos es de: ",count);
}

