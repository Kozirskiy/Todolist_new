import {useState} from "react";
import {v1} from "uuid";
import {Button} from "./Button.tsx";


export type CarType = {
    id: string
    brand: string
    isDone: boolean
    color: string
}
export type test1_arrayPropsType = CarType & {
    deleteAuto: (carId: string) => void
}

export const Test1 = () => {


    const [test1_array, setTest1_array] = useState<CarType[]>([
        {id: v1(), brand: 'Mersedes', color: 'Green', isDone: false},
        {id: v1(), brand: 'Audi', color: 'White', isDone: false},
        {id: v1(), brand: 'Porshe', color: 'Green', isDone: false},
        {id: v1(), brand: 'Volvo', color: 'Blue', isDone: false},
        {id: v1(), brand: 'Toyota', color: 'Black', isDone: false}
    ])

    const deleteAuto = (carId: string) => {
        const filteredCars = test1_array.filter(car => car.id !== carId)
        setTest1_array(filteredCars)
    }

    return (
        <div style={{border: '1px solid grey', padding: '20px', backgroundColor: '#ededed'}}>
            <h3>Toets een - paar oefening</h3>
            <div>
                <input/>
                {/*<input type='date'/>*/}
                <button style={{
                    margin: '5px',
                    backgroundColor: '#00671e',
                    color: '#ececec',
                    padding: '2px 5px',
                    border: 'none'
                }}>Toevoegen auto
                </button>
            </div>
            {test1_array.length === 0 ? (<p style={{color: 'red'}}>Array is leeg</p>) : (<ul>
                {test1_array.map((car) => {
                    return <li>
                        <span>{car.brand}</span>
                        <input type="checkbox" checked={car.isDone}/>
                        <Button onClick={
                            ()=> deleteAuto(car.id)} title={'Verwijderen deze auto'} style={{
                            color: 'black',
                            background: 'white',
                            margin: '10px',
                            border: '2px solid blue',
                            backgroundColor: 'lightyellow',
                            padding: '5px',
                            borderRadius: '3px',
                            cursor: 'pointer'
                        }}
                        />
                    </li>
                })}
            </ul>)}

            <>
                <Button title={'Alle auto\'s'} style={{
                    backgroundColor: '#454545',
                    color: 'lightyellow',
                    borderRadius: '10px',
                    padding: '2px 5px',
                    marginRight: '10px'
                }}/>

                <Button title={'Auto\'s te koop'} style={{
                    backgroundColor: '#454545',
                    color: 'lightyellow',
                    borderRadius: '10px',
                    padding: '2px 5px',
                    marginRight: '10px'
                }}/>

                <Button title={'Aangekochte auto\'s'} style={{
                    backgroundColor: '#454545',
                    color: 'lightyellow',
                    borderRadius: '10px',
                    padding: '2px 5px'
                }}/>


            </>
        </div>
    );
};

