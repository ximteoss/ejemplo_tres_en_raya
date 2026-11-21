import Square from './Square';

export default function Board(props){
    return <div>
        {
          props.values.map((rowValues, index)=>{
            let row = rowValues.map((value, columIndex)=>{
              return <Square key={index + "-" + columIndex} value={value}/>
            });
            return <div key={"row" + index} >{row}</div>
          })
        }
    </div>
}