// 📌 IMPORTACIONES:
import logo from '../logo.svg';
import './App.css';
// 📌 REACT-BOOTSTRAP: Obligatorio importar su CSS una vez (en App.js o index.js) para que los estilos de Button/Card funcionen.
import 'bootstrap/dist/css/bootstrap.min.css';
// 📌 HOOKS DE REACT: useState (guardar estado) y useEffect (efectos secundarios como fetch al cargar).
import {useState, useEffect} from "react";
import Header from './Header';
import Board from './Board';
import Reset from './Reset';

// 📌 CONSTANTES GLOBALES: Se definen FUERA del componente para que no se recreen en cada renderizado
// y para evitar errores tipográficos al comparar strings ("Player 1 - Xs").
const PLAYERX= "Player 1 - Xs";
const PLAYER0= "Player 2 - 0s";


function App() {
  // ==========================================================================
  // 1️⃣ ESTADO DE LA APLICACIÓN (Lifting State Up)
  // ==========================================================================
  // 📌 EXAMEN: Todo el estado vive en App.js porque varios hijos lo necesitan:
  // Header necesita 'turn', Board/Square necesitan 'values', App pinta 'moves' y 'loading'.
  const [turn, setTurn] = useState(PLAYERX);
  const [values, setValues] = useState([
    ["-","-","-"],
    ["-","-","-"],
    ["-","-","-"]
  ]);
  
  const [moves, setMoves] = useState(0);
  // 📌 PATRÓN LOADING: Empieza en 'true' mientras llega el fetch; pasa a 'false' al terminar.
  const [loading, setLoading] = useState(true);

  // ==========================================================================
  // 2️⃣ PETICIÓN INICIAL AL SERVIDOR (useEffect + async/await)
  // ==========================================================================
  // 📌 EXAMEN: ¿Dónde se hace un fetch para cargar datos al abrir la app por primera vez? -> En useEffect.
  // 📌 ARRAY DE DEPENDENCIAS VACÍO []: Garantiza que el efecto se ejecute SOLO UNA VEZ al montar el componente.
  //    (Si quitaras el [], haría un bucle infinito de peticiones).
  // 📌 TRUCO ASYNC: El callback de useEffect NO puede ser 'async' directamente.
  //    Por eso se define una función 'async function fetchData()' dentro y se invoca justo debajo.
  useEffect(()=>{
    async function fetchData(){
      const res = await fetch("https://api.npoint.io/c734e05e43c5b87dd971");
      const myjson = await res.json();
      console.log(myjson);
      // Actualizamos todo el estado con los datos recibidos de la API
      setTurn(myjson.turn);
      setValues(myjson.values);
      setMoves(myjson.moves);
      // Desactivamos el mensaje de carga para mostrar el tablero
      setLoading(false);
    }
    fetchData();
  }, []);


  // ==========================================================================
  // 3️⃣ LÓGICA DE JUGADA (Inmutabilidad de Arrays 2D)
  // ==========================================================================
  // Esta función baja como prop (App -> Board -> Square) para que Square avise al padre qué casilla se pulsó.
  function appClick(rowNumber, columnNumber){
    console.log("Click en " + rowNumber + columnNumber);

    // ⚠️ EXAMEN (INMUTABILIDAD — Pregunta trampa clásica):
    // En React NUNCA se modifica el estado directamente (values[r][c] = "X" NO funciona porque mantiene la misma referencia).
    // Al ser un array de arrays (matriz 2D), una copia superficial ([...values]) NO basta porque copiaría las referencias internas.
    // JSON.parse(JSON.stringify(values)) hace una COPIA PROFUNDA (Deep Copy) segura.
    let valuesCopy = JSON.parse(JSON.stringify(values));

    // Operador ternario: decide qué ficha poner según el turno actual
    let newMovement = turn===PLAYERX ? "X" : "0";
    valuesCopy[rowNumber][columnNumber] = newMovement;

    // Alternamos el turno y guardamos la nueva matriz en el estado
    setTurn(turn===PLAYERX ? PLAYER0 : PLAYERX);
    setValues(valuesCopy);

    // 📌 ACTUALIZACIÓN FUNCIONAL: Cuando el nuevo estado depende del anterior,
    // usar (moves => moves + 1) es la mejor práctica para evitar valores desactualizados.
    setMoves(moves => moves + 1);
  }


  // ==========================================================================
  // 4️⃣ LÓGICA DE REINICIO
  // ==========================================================================
  // Restaura todas las variables de estado a sus valores iniciales.
  function resetClick(){
    console.log("RESET");
    setTurn(PLAYERX);
    setValues([
      ["-","-","-"],
      ["-","-","-"],
      ["-","-","-"]
    ]);
    setMoves(0);
  }


  return (
    <div className="App">
      <h2>TicTacToe</h2>
      {/* 📌 RENDERIZADO CONDICIONAL (Operador Ternario):
          Si loading es true -> muestra <h1>LOADING</h1>.
          Si loading es false -> muestra toda la interfaz del juego envuelta en un <div> (regla de nodo raíz único). */}
      {loading ? <h1>LOADING</h1> : <div>
        {/* ⬇️ DATOS BAJAN por props (turn, values) | ⬆️ EVENTOS SUBEN por callbacks (appClick, resetClick) */}
        <Header turn={turn}/>
        <Board values={values} appClick={appClick} />
        <h3>Número de movimientos: {moves} </h3>
        <Reset resetClick={resetClick} /> </div>}
    </div>
  );
}

export default App;