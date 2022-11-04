const edit = async(datos) => {
    await fetch('http://localhost:3000/edit',
        {
            method: 'PUT', // Method itself
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            body: JSON.stringify(datos)
        }
    )
}
const Delete=async(datos)=>{
    await fetch('http://localhost:3000/borrar',
        {
            method: 'DELETE', // Method itself
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            body: JSON.stringify(datos)
        }
    )
}
const crear=async(datos)=>{
    await fetch('http://localhost:3000/datos',
        {
            method: 'POST', // Method itself
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            body: JSON.stringify(datos)
        }
    )
}