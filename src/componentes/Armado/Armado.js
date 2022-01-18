import { useEffect, useState } from "react";
import "./Armado.css"
import axios from "axios"

const Armado = () => {

    const[ingredientes, setIngredientes] =useState([])
    const[cliente, setCliente] = useState([])
    const[total, setTotal] = useState(0)


        const getIngredientes = async () => {
            const response = await axios.get("https://apipdtc.herokuapp.com/bulldog/ingredientes")
            setIngredientes(response.data)
        }



        const pedido = (ingre) =>{
            setCliente([...cliente, ingre ])
        }
        // primero crear la funcion sumar y dentor declarar la variable| hacemos funcion de sumar con variable que parte desde 350, hacemos un map ?????
       const sumar = () => {
           let sumaPedido = 350
           cliente.map(ing =>(
                setTotal(sumaPedido+=ing.precio)
           ))
       }

       const eliminar = (id) =>{
        setCliente(cliente.filter(agregado =>(
            agregado.id !== id
        )))  
        setTotal(total-id.precio) 
        
        
       }



    useEffect(() =>{
        sumar()
    },[cliente] )



    useEffect(() =>{
        getIngredientes()
      },[])
    
    
    return (

        <div>
           {ingredientes.length>0 ? 
            ingredientes.map(ingre =>(
                <div key={ingre.id} className="mt-2">   
                   
                    <button disabled={cliente.find(element=> element.id === ingre.id)? true : false  } type="button" style={{width:"400px", display:"flex", justifyContent:"space-between", alignItems:"center"}} className="btn btn-outline-success boton" onClick={() =>pedido({...ingre})}>
                        <img src={require(`../../assets/img/ingredientes/${ingre.imagen}.png`)} width={50} className=""/>
                        <div className="w-100" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                            <p>{ingre.nombre}</p> 
                            <p>${ingre.precio}</p>
                            
                        </div> </button>
                </div> 
                ))

                :
                <p>Cargando</p>}

                <div>
                    <p>
                    <img src={require(`../../assets/img/ingredientes/Carne.png`)} width={50} className=""/>
                        Carne $350</p>
                   
                    {cliente.map (itemsito => (
                        <div key={itemsito.id} className="fondoCliente"><img src={require(`../../assets/img/ingredientes/${itemsito.imagen}.png`)} width={50} className="" /> {itemsito.nombre} {itemsito.precio}
                        <button className="ms-5" onClick={() => eliminar(itemsito.id)}>eliminar</button>               
                        </div>
                         ))}
                            {total} 
                </div>
        </div>
        


      );
}
 
export default Armado;