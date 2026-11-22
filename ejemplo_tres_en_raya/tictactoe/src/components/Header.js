// 📌 Importación individual de componente de React-Bootstrap (mejor rendimiento que importar toda la librería)
import Card from 'react-bootstrap/Card';

// Componente presentacional (sin estado): solo pinta el turno que recibe por props.turn
export default function Header(props){
    // 📌 DOBLE LLAVE EN STYLE ({{ ... }}):
    // - Llave externa { }: escapa a JavaScript dentro del JSX.
    // - Llave interna { }: define el objeto literal de CSS.
    return  <Card className="text-center" style={{ width: '18rem', margin: 'auto auto 10px'}}>
                <Card.Body>
                <Card.Title>Cabecera</Card.Title>
                <Card.Text>
                    Turn of {props.turn} 
                </Card.Text>
                </Card.Body>
            </Card>
}