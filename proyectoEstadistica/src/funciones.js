
//

const Ruta=process.env.INIT_CWD.slice(0,64)+'\datos\\BD.xlsx'
export const leer = () => {
    const reader = require('xlsx')
    // Reading our test file
    const file = reader.readFile(Ruta)
    let data = []
    const sheets = file.SheetNames

    for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
        temp.forEach((res) => {
            data.push(res)
        })
    }
    return data
}
export const edit = (dato, celda) => {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(Ruta)
        .then(function () {
            if (celda != undefined) {
                try {
                    dato = parseFloat(dato)
                    if (!isNaN(dato)) {
                        var worksheet = workbook.getWorksheet('Hoja1');
                        worksheet.getCell(celda).value = dato;
                        return workbook.xlsx.writeFile(Ruta)

                    }
                } catch (error) {

                }
            }
        });
}
export const Delete = (fila) => {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(Ruta)
        .then(function () {
            if (fila != undefined) {
                var worksheet = workbook.getWorksheet('Hoja1');
                worksheet.getCell("C1").value -= 1
                worksheet.spliceRows(fila, 1)
                return workbook.xlsx.writeFile(Ruta)



            }
        });
}
export const crear = (datos) => {
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(Ruta)
        .then(function () {
            var worksheet = workbook.getWorksheet('Hoja1');
            let ultimo = worksheet.getCell("C1").value
            worksheet.getCell(`A${ultimo}`).value = parseInt(datos.empresa1, 10)
            worksheet.getCell(`B${ultimo}`).value = parseInt(datos.empresa2, 10)
            worksheet.addRow()
            worksheet.getCell("C1").value = ultimo + 1
            ultimo += 1
            worksheet.getCell(`A${ultimo}`).value = 0
            worksheet.getCell(`B${ultimo}`).value = 0
            return workbook.xlsx.writeFile(Ruta)

        });
}










