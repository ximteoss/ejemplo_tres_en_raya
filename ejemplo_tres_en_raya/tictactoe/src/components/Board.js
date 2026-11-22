import Square from './Square';

// 📌 EXAMEN (Renderizado de tablas/matrices 2D):
// Recibe props.values (array de 3 filas, cada fila con 3 columnas) y props.appClick (callback del padre).
export default function Board(props){
    return <div>
        {
          // 1º .map(): Recorre las FILAS (rowValues = ["-", "-", "-"], rowIndex = 0, 1, 2)
          props.values.map((rowValues, rowIndex)=>{
            // 2º .map(): Recorre las COLUMNAS de esa fila (value = "-", "X" o "0", columnIndex = 0, 1, 2)
            let row = rowValues.map((value, columnIndex)=>{
              // 📌 KEY ÚNICA: Obligatoria en listas. Al ser matriz 2D combinamos fila y columna ("0-0", "0-1", etc.).
              // 📌 PROP DRILLING: Board no usa appClick, solo se lo pasa hacia abajo a Square renombrado como 'boardClick'.
              return <Square rowIndex={rowIndex} columnIndex={columnIndex} boardClick={props.appClick} key={rowIndex + "-" + columnIndex} value={value}/>
            });
            // Cada fila se envuelve en un <div> con su propia 'key' única ("row0", "row1", "row2")
            return <div key={"row" + rowIndex} >{row}</div>
          })
        }
    </div>
}