import axios from "axios"
import { useParams } from "react-router-dom"
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import style from './Detail.module.css';


export default function Detail () {
    console.log("////////////////////////////////// DETAIL ////////////////////////////////////");
    const {id} = useParams();
    const [pok, setPok] = useState(null);
    async function detail (id) {
        try{
            const {data} = await axios(`http://localhost:3001/api/pokemons/${id}`)
            //console.log("data es: ", data)
            if (data.name) {
                setPok(data);
              } else {
                window.alert('No hay personajes con ese ID');
              }
        }catch(error){
            console.log(error.message);
            window.alert(error.message);
        }
     }

    useEffect(() => {
        detail(id);
    }, []);

     
     console.log("pok antes del return es: ",pok)
    return(
        <div className={style.centro}>
            <Link to={"/home"}>
                <button>Volver a home</button>
            </Link>
            {pok && pok.name && (
                <div className= {style.detail}> 
                    <div className={style.cont}>
                        <img className={style.img} src={pok.imagen} alt='' />
                    </div>
                    <div className={style.card}>
                        <h1>Detail:</h1>
                        <h3>ID: {pok.id}</h3>
                        <h3>Nombre: {pok.name}</h3>
                        <h3>Vida: {pok.Vida}</h3>
                        <h3>Ataque: {pok.Ataque}</h3>
                        <h3>Defensa: {pok.Defensa}</h3>
                        <h3>Altura: {pok.Altura}</h3>

                        <div className={style.types}>
                        <h3>type:</h3>
                        {pok.types && pok.types.map((element, index) => (
                            <h5 className={style.texto} key={index}>
                                {element.type}
                            </h5>
                        ))}
                        {pok.type && pok.type.map((element, index) => (
                            <h5 className={style.texto} key={index}>
                                {element.type.name}
                            </h5>
                        ))}
                        </div>
                    </div>
                </div>          
            )}
        </div>
    )
}