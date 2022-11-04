let data = []
let empresa1 = []
let empresa2 = []
const llenarTabla = async () => {
    let response = await fetch("http://localhost:3000/datos")
    response = await response.json()
    let tabla = document.getElementById("tabla")
    tabla.innerHTML = ""
    data = response
    data.pop()
    for (let i = 0; i < response.length; i++) {
        let element = response[i]
        tabla.innerHTML += `
        <center><td>${i + 1}</td></center>
        <center><td id="1${i}" ondblclick="EditForm(this)"><input class="form-control" type="number" value="${element.Empresa1}"  id="i1${i}" disabled></td></center>
        <center><td id="2${i}" ondblclick="EditForm(this)"><input class="form-control" type="number" value="${element.Empresa2}"  id="i2${i}" disabled></td></center>
        <center><td><a><img id="${i}" onclick="borrar(this)" style=cursor:pointer src="img/delete.png" width="30"></a></td></center>
        `
    }
}
const borrar = async (object) => {
    let fila = parseInt(object.id, 10) + 2
    await Delete({ fila })
}
const guardar = async () => {
    let inputs = document.getElementsByTagName("input")
    for (let i = 0; i < inputs.length; i++) {

        if (inputs[i].id[0] == "i") {
            if (inputs[i].disabled == false) {
                let celda = ""

                if (inputs[i].id[1] == "1") {
                    celda += "A"
                } else {
                    celda += "B"
                }
                let fila = parseInt(inputs[i].id[2], 10) + 2
                celda += fila.toString()
                let dato = inputs[i].value
                if(dato!="e"){
                    let datos = {
                        celda,
                        dato
                    }
                    await edit(datos)
                    llenarTabla()
                }
                
            }
            inputs[i].disabled = true
        }

    }

}
const EditForm = (object) => {
    let input = document.getElementById("i" + object.id)
    input.disabled = false
    input.focus()
}
const registrar = () => {
    try {
        let empresa1 = document.getElementById("empresa1").value
        let empresa2 = document.getElementById("empresa2").value
        if (empresa1 != "" && empresa2 != ""&&empresa1 != "e" && empresa2 != "e") {
            crear({ empresa1, empresa2 })
        }   
    } catch {
        console.log("ingrese algo")
    }

}
function ordenar() {
    for (let i = 0; i < data.length; i++) {
        empresa1.push(data[i].Empresa1)
        empresa2.push(data[i].Empresa2)
    }
    empresa1.sort(function (a, b) {
        return a - b;
    });
    empresa2.sort(function (a, b) {
        return a - b;
    });
}

function media() {
    cont1 = 0
    cont2 = 0
    for (let i = 0; i < data.length; i++) {
        cont1 += data[i].Empresa1
        cont2 += data[i].Empresa2
    }
    cont1 /= data.length
    cont2 /= data.length
    let resul = [cont1, cont2]
    return resul
}

function mediana() {
    let resul1 = 0
    let resul2 = 0
    if ((data.length) % 2 == 0) {
        resul1 = (empresa1[((data.length) / 2) - 1] + empresa1[((data.length) / 2)]) / 2
        resul2 = (empresa2[((data.length) / 2) - 1] + empresa2[((data.length) / 2)]) / 2
        let resul = [resul1, resul2]
        return resul
    } else {
        resul1 = empresa1[((data.length) / 2) - 0.5]
        resul2 = empresa2[((data.length) / 2) - 0.5]
        let resul = [resul1, resul2]
        return resul
    }
}

const busqueda = (arreglo, callback) => {
    let variable = 0;
    let contador = 0;
    let cuenta = 0;
    arreglo.map(p => {
        cuenta = 0
        arreglo.map(x => {
            if (p == x) { cuenta++ }
        })
        if (cuenta > contador) {
            contador = cuenta;
            variable = p;
        }
    });
    callback(`valor mas repetido:${variable}, numero de veces contada: ${contador}`)
}

function variaza() {
    let resul1 = 0
    let resul2 = 0
    for (let i = 0; i < data.length; i++) {
        resul1 += (empresa1[i] - mediaTotal[0]) * (empresa1[i] - mediaTotal[0])
        resul2 += (empresa2[i] - mediaTotal[1]) * (empresa2[i] - mediaTotal[1])
    }
    resul1 /= ((empresa1.length) - 1)
    resul2 /= ((empresa2.length) - 1)
    let resul = [resul1, resul2]
    return resul
}

llenarTabla().then(() => {
    ordenar()
    mediaTotal = media()
    medianaTotal = mediana()
    variazaTotal = variaza()
    desEstandar = [Math.sqrt(variazaTotal[0]), Math.sqrt(variazaTotal[1])]
    let moda1;
    let moda2;
    busqueda(empresa1, (respuesta) => {
        moda1 = respuesta
    });
    busqueda(empresa2, (respuesta2) => {
        moda2 = respuesta2
    });
    let contenido = document.getElementById("contenido")
    contenido.innerHTML += `
         
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Variable 1:</th>
                        <th>Variable 2:</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>Media</th>
                        <td>${mediaTotal[0]}</td>
                        <td>${mediaTotal[1]}</td>
                    </tr>
                    <tr>
                        <th>Mediana</th>
                        <td>${medianaTotal[0]}</td>
                        <td>${medianaTotal[1]}</td>
                    </tr>
                    <tr>
                        <th>Moda</th>
                        <td>${moda1}</td>
                        <td>${moda2}</td>
                    </tr>
                    <tr>
                        <th>Varianza</th>
                        <td>${variazaTotal[0]}</td>
                        <td>${variazaTotal[1]}</td>
                    </tr>
                    <tr>
                        <th>Desviación</th>
                        <td>${desEstandar[0]}</td>
                        <td>${desEstandar[1]}</td>
                    </tr>
                </thead>
                
            </table>

    `


})
