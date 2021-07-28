#!/usr/bin/nodejs

const { Console } = require("console");

let matrix = [
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
console.table(matrix);

//Calcular la cantidad cuadros que puede alumbrar un bombillo
function test(mat, columna, fila, operacion){
    let tmpCol = columna;
    let tmpFil = fila;
    let eje = 0;
    let sum = 0;
    let newTable = mat;
    //arriba
    let escapa = false;
    while(eje != 4){
        //tmpCol >= 0 && tmpFil >= 0 && tmpFil < matrix[fila].length && tmpCol < matrix.length
        
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
                //console.log("Posicion en mat: "+mat[tmpCol][tmpFil]);
                //console.log("Los valores son:" + tmpCol + " y " + tmpFil);
                //console.log("el eje es:" + eje);

                mat[columna][fila] = "*";
                
                if (mat[tmpCol][tmpFil] === 0 || mat[tmpCol][tmpFil] === "*") {
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
    }else{
        return mat;
    }

}





function getMax(a){
    return Math.max(...a.map(e => Array.isArray(e) ? getMax(e) : e));
};



let verification = 1;
let count = 0;
while(verification > 0){
    let otro = new Array(matrix.length).fill("").map(() => new Array(matrix[0].length).fill(""));

    for (let i = 0; i < matrix.length; i++)
    {
        for (let j = 0; j < matrix[i].length; j++){
            otro[i][j] = test(matrix, i, j, 0);
        }
    }
    console.log("NUEVA TABLA DATOS:")
    console.table(otro);

    verification = getMax(otro);
    if (verification === 0){
        break;
    }
    console.log(verification);
    const roww1 = otro.findIndex(row => row.includes(verification));
    const coll1 = otro[roww1].indexOf(verification);
    console.log(roww1,coll1)
    //console.log(test(matrix, 1, 1));
    let newnew = test(matrix, roww1, coll1, 1);
    console.log("NUEVA de NUEVA TABLA DEFAULT:");
    console.table(newnew);
    count = count + 1;
}

console.log(count);



//let final = new Array(matrix.length).fill("").map(() => new Array(matrix[0].length).fill(""));





