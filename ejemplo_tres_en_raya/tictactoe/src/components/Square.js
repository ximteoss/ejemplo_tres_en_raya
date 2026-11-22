// 📌 ESTILOS INLINE EN REACT: Se definen como un objeto JS (propiedades en camelCase y valores entre comillas).
const squareStyle = {
    height: "100px",
    width: "100px"
}

export default function Square(props){

    // 📌 VALIDACIÓN ANTES DE SUBIR EL EVENTO:
    // Solo avisamos al padre (props.boardClick) si la casilla está vacía ("-").
    // Así evitamos que un jugador sobrescriba una casilla que ya tiene "X" o "0".
    function squareClick(){
        if(props.value==="-"){
            props.boardClick(props.rowIndex, props.columnIndex);
        }
        
    }

    // 📌 CLASE CSS DINÁMICA: Ternario en className para cambiar el cursor (pointer vs not-allowed) según si está libre.
    // 📌 onClick={squareClick}: Se pasa la REFERENCIA de la función (sin paréntesis) para que solo se ejecute al hacer clic.
    return <button style={squareStyle} onClick={squareClick} className={props.value==="-" ? "Clickable" : "No_Clickable"} > {props.value}</button>;
}