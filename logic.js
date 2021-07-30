const botonStart = document.getElementById("BotonStart");
const file = document.getElementById("textfile");
const buttonFile = document.getElementById("custom-button");
const realFile = document.getElementById("real-file");
const textCustom = document.getElementById("custom-text");
const startButton = document.getElementById("starProgram");

// Permite cargar archivo txt
buttonFile.addEventListener("click", function(){
    realFile.click();
});

// Cambiar texto si el archivo un archivo es cargado
realFile.addEventListener("change", function(){
    if (realFile.value) {
        textCustom.innerHTML = realFile.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    }
    else {
        textCustom.innerHTML = "No se ha elegido archivo todavia"

    }
})

// Function para leer el archivo txt
// recibe $num segun si es mostrar habitacion(1) o posicionar bombillos(2)
function loadFileAsText(num){
    let fileToLoad = document.getElementById("real-file").files[0];
  
    let fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        let textFromFileLoaded = fileLoadedEvent.target.result;
        StartProgram(textFromFileLoaded, num);

    };
  
    fileReader.readAsText(fileToLoad, "UTF-8");
  }

  // Funcion para crear la habitacion y asignar los bombillos segun el num entrante
  // Recibe la $matriz que se pasara a habitacion
  // Recibe $num segun si es mostrar habitacion(1) o posicionar bombillos(2)
  function tableCreate(matrix, num){
    let body = document.body;
    if (num){
        const newText = document.getElementById("text-hidden");
        newText.innerHTML = "No se han asignado los bombillos";
    }
    try{
        const oldTable = document.getElementById("matrix");
        body.removeChild(oldTable);
    }
    catch{
        console.error("Not fount table")
    }    
    
    tbl  = document.createElement('table');
    tbl.setAttribute('id','matrix');
    
    for(let i = 0; i < matrix.length; i++) {
        let tr = tbl.insertRow();
        for(let j = 0; j < matrix[i].length; j++) {
            let wall = new Image;
            wall.src = 'images/wall.jpg';
            

            let lamp = new Image;
            lamp.src = 'images/lamp.png';
            
                
            let td = tr.insertCell();
            if (num === 1){
                if (matrix[i][j] === 1){
        
                    td.appendChild(wall);
                    td.style.textAlign = 'center';
                }
                else if (matrix[i][j] === 0){
                    td.appendChild(document.createTextNode(matrix[i][j]));
                    td.style.textAlign = 'center';
                }
                else if (matrix[i][j] === "-"){
                    td.appendChild(document.createTextNode(matrix[i][j]));
                    td.style.textAlign = 'center';
                    td.style.backgroundColor = '#F2be5c';
                }
                else{
                    td.appendChild(document.createTextNode(matrix[i][j]));
                }
            }else{

                if (matrix[i][j] === 1){
        
                    td.appendChild(wall);
                    td.style.textAlign = 'center';
                }
                else if (matrix[i][j] === "*"){
                    td.appendChild(lamp);
                    td.style.textAlign = 'center';
                    td.style.backgroundColor = '#F2be5c';
        
                }
                else if (matrix[i][j] === "-"){
                    td.appendChild(document.createTextNode(matrix[i][j]));
                    td.style.textAlign = 'center';
                    td.style.backgroundColor = '#F2be5c';
                }
            
                    
            }
        }
    }
    body.appendChild(tbl);
}

// Funcion que convierte la informacionel archivo txt a una matriz
// $file cargado al programa
// $num segun si es mostrar habitacion(1) o posicionar bombillos(2)
function StartProgram(file, num){
    
    let items = file.split(/\r?\n/).map( pair => pair.split(/\s+/).map(Number) );
    matrizGenerator(items, num)
}

//Funcion para calcular la cantidad cuadros que puede alumbrar un bombillo
// $mat es la matriz
// $column posicion en la columna de la matriz
// $row posicion en la fila de la matriz
// $operation (1)si es crear habitacion, (2)si es posicionar bombillos
function RoomGenerator(mat, column, row, operation){

    let tmpCol = column;
    let tmpRow = row;
    let axis = 0;
    let sum = 0;
    let escape = false;

    while(axis != 4){
        try{
            if (operation == 0){

                if (row === tmpRow && column === tmpCol && escape === true){
                    sum = sum - 1;
                }
                if (mat[tmpCol][tmpRow] === 0 && mat[column][row] === 0)
                {
                    sum = sum + 1;
                    escape = true;
                }
                else
                {
                    axis = axis + 1;
                    tmpCol = column;
                    tmpRow = row;
                }
            }
            else if (operation == 1){
               
                mat[column][row] = "*";
                
                if (mat[tmpCol][tmpRow] === 0 || mat[tmpCol][tmpRow] === "*" || mat[tmpCol][tmpRow] === "-") {
                    mat[tmpCol][tmpRow] = "-";
                }
                else {
                    axis = axis + 1;
                    tmpCol = column;
                    tmpRow = row;
                }
            }
            
        }
        catch (e) {
            axis = axis + 1;
            tmpCol = column;
            tmpRow = row;
        }
        if (axis == 0){
            tmpCol = tmpCol - 1;
        }
        else if (axis == 1){
            tmpCol = tmpCol + 1;
        }
        else if (axis == 2)
        {
            tmpRow = tmpRow - 1;
        }
        else if (axis == 3){
            tmpRow = tmpRow + 1;
        }
        else if (axis == 4)
        {
            break;
        }
    }
    if (operation == 0) {
        
        return sum;
    }else if (operation === 1) {
        return mat;
    }

}

// Obtener el valor maximo en una matriz y retornar posiciones del maximo
// $matriz Matriz en la cual se buscara el valor maximo
// $matrizChanged matriz en donde se va generando la habitacion
function getMax(matriz, matrizChanged){

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

    for (let i = 0; i <matriz.length; i++){
        
        for (let j = 0; j <matriz[i].length; j++){
            arriba = 0;
            abajo = 0;
            der = 0;
            izq = 0;
            data = 0;
            if (matriz[i][j] >= big && matriz[i][j] !== 0){
                contador = 1;
                while((i - contador) >= 0){

                    if (matriz[i - contador][j] > 0){
                        arriba = arriba + 1;
                    }
                    if (matriz[i - contador][j] === 0 && matrizChanged[i - contador][j] === 1){
                        break;
                    }
                    contador = contador + 1;
                }
                contador = 1;
                while ((i + contador) < matriz.length){
                    if (matriz[i + contador][j] > 0 ){
                        abajo = abajo + 1;
                    }
                    if (matriz[i + contador][j] === 0 && matrizChanged[i + contador][j] === 1){
                        break;
                    }
                    
                    contador = contador + 1;
                }
                contador = 1;
                while ((j + contador) < matriz[i].length){

                    if (matriz[i][j + contador] > 0){
                        der = der + 1;
                    }
                    if (matriz[i][j + contador] === 0 && matrizChanged[i][j + contador] === 1){
                        break;
                    }
                    
                    contador = contador + 1;

                }
                contador = 1;
                while ((j - contador) >= 0){
                    if (matriz[i][j - contador] > 0){
                        izq = izq + 1;
                    }
                    
                    if (matriz[i][j - contador] === 0 && matrizChanged[i][j - contador] === 1){
                        break;
                    }
                    contador = contador + 1;
                }
                data = arriba + abajo + der + izq;
                big = matriz[i][j]
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
};

// Calcular los bombillos minimos en una habitacion con paredes
// $matriz Matriz a generar habitacion
// $num segun si es mostrar habitacion(1) o posicionar bombillos(2)
function matrizGenerator(matrix, num){

    let verification = [1,0,0];
    let count = 0;
    let matrizTmp = new Array(matrix.length).fill("").map(() => new Array(matrix[0].length).fill(""));
    let matrizChanged = new Array(matrix.length).fill(0).map(() => new Array(matrix[0].length).fill(0));

    if (num === 1){

        tableCreate(matrix, 1);
    }

    while(verification[0] > 0){

        for (let i = 0; i < matrix.length; i++)
        {
            for (let j = 0; j < matrix[i].length; j++){
                matrizTmp[i][j] = RoomGenerator(matrix, i, j, 0);
            }
        }
        verification = getMax(matrizTmp, matrix);

        if (verification[0] === 0){
            break;
        }

        matrizChanged = RoomGenerator(matrix, verification[1], verification[2],1);
        count = count + 1;
    }

    if (num === 2){
        tableCreate(matrizChanged, 2);
        const newText = document.getElementById("text-hidden");
        newText.innerHTML = "El numero de bombillas es: "+ count;
    }
}