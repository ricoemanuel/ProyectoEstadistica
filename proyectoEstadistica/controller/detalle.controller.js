import {leer,edit,Delete,crear} from '../src/funciones.js'
export const  controlData=(req,res)=>{
    res.send(leer())
}
export const  editData=(req,res)=>{
    let {dato,celda}=req.body
    
    res.send(edit(dato,celda))
}
export const deleteData=(req,res)=>{
    let {fila}=req.body
    res.send(Delete(fila))
    
}
export const createData=(req,res)=>{
    let datos=req.body
    res.send(crear(datos))
}