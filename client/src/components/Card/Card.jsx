import style from './Card.module.css';

const Card = (props) => {

    return(
        <div className={style.card} key={props.id}>

            <div>
                <button className={style.boton}
                    /*onClick={()=>propss.onClose(propss.key)}*/
                    >Close carta {props.id}
                </button>
            </div>
            <div className={style.contImg}>
                <img className={style.imagen} src={props.imagen} alt='' />
            </div>
            <div className = {style.nombre}>
                <h2 className={style.texto}>{props.name}</h2>
            </div>
            <div className={style.tipos}>
                <h3 className={style.texto}>Tipo: </h3>
                <div className={style.types}>
                    { props.tipos.map((element,index) =>(
                        <div key={`${index}`}>
                            <h5 className={style.texto}> 
                            {element.type.name ? element.type.name : element.type}
                            </h5>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Card;