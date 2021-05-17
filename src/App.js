import React, { useEffect, useState} from 'react';
import { io } from 'socket.io-client';
import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';

const connectSocketServer = () => {
  const socket = io.connect('http://localhost:8080',{
    enabledTransports: ['ws', 'wss'],
    transports: ['websocket']
  });
  return socket;
}

function App() {
  const [socket] = useState(connectSocketServer());
  const [ online, setOnLine] = useState(false);
  const [ bands, setBands ] = useState([]);


  useEffect(() => {
    console.log(socket);
    setOnLine(socket.connected);
  }, [socket])

  useEffect( () => {
    socket.on('connect', () => {
      setOnLine( true );
    })

  }, [socket])

  useEffect( () => {
    socket.on('disconnect', () => {
      setOnLine( false );
    })

  }, [socket])
 
 useEffect(() => {
   socket.on('current-bands', (bands) =>{
     console.log(bands);
     setBands(bands);
   })
   
 }, [socket])

const votar = ( id ) => {
  socket.emit( 'votar-banda', id );
}

const borrar = ( id ) => {
   socket.emit( 'borrar-banda', id );
}

const cambiarNombre = ( id, nombre ) => {
  socket.emit( 'cambiar-nombre-banda', {id, nombre} );
}





  return (
    <div className="container">
      <div className="alert">
        <p> Service status:
          {
            online
              ? <span className="text-success"> Online</span>
              : <span className="text-danger"> Offline</span>
          }
          
          
        </p>

      </div>

      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList
          borrar={borrar} 
          data={bands}
          votar={ votar }
          cambiarNombre={cambiarNombre}
            />
        </div>
        <div className="col-4">
          <BandAdd />
        </div>
      </div>

    </div>
  

  );
}

export default App;
