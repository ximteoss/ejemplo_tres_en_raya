import Button from 'react-bootstrap/Button';

// 📌 COMPONENTE STATELESS: No necesita función intermedia porque props.resetClick no requiere parámetros.
// Al hacer clic, dispara directamente el resetClick() definido en App.js.
export default function Reset(props){
    return <Button onClick={props.resetClick} >Reset</Button>
}