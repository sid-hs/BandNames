import React, { useState, useContext } from 'react';
import { SocketContext } from '../context/SocketContext.js';
import { useSocket } from '../hooks/useSocket.js';

export const BandAdd = ({ crearBanda }) => {

    
    const[valor, setValor] = useState('');
     const {socket} = useContext(SocketContext)

    // const{ socket } = useSocket('http://localhost:8080')

    

    const onSubmit= (ev) => {
        ev.preventDefault();

        if ( valor.trim().length > 0 ){
            //TODO llamar la funcion para emitir el evento
            socket.emit( 'crear-banda', {nombre: valor} );
            setValor('');
        }

    }

    return (
        <>
            <h3> Agregar Banda</h3>

            <form onSubmit={ onSubmit }>
                <input
                className="form-control"
                placeholder="Nuevo nombre de banda"
                value={valor}
                onChange={(ev) => setValor(ev.target.value)}
                />
            </form>
            
        </>
    )
}
