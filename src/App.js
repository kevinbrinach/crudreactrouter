import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Productos from './components/Productos';
import AgregarProducto from './components/AgregarProducto';
import EditarProducto from './components/EditarProducto';
import Producto from './components/Producto';
import Header from './components/Header';
import axios from 'axios'


function App() {

  const [ productos, guardarProductos ] = useState([]);
  const [ recargarProductos, guardarRecargarProductos ] = useState(true);

  useEffect(() => {
    if(recargarProductos) {
        const consultarAPI = async () => {
        //consultar la api de json-server
        const resultado = await axios.get('http://localhost:4000/restaurant');
        
        //console.log(resultado)
  
        guardarProductos(resultado.data);
      }
      consultarAPI();

      //cambiar a false la recarga de la api
      guardarRecargarProductos(false);
    }
  })

  return (
        <Router>
          <Header />
          <main className="container mt-5">
              <Switch>
                  <Route exact path="/productos" 
                    //si se le va a pasar props a un componente hay que usar render en vez de component, si no se le pasa nada se usa component
                         render={() => (
                            <Productos
                              productos={productos}
                              guardarRecargarProductos={guardarRecargarProductos}
                          />
                        )}
                  />
                   
                  <Route exact path="/nuevo-producto" 
                         render={() => (
                            <AgregarProducto 
                              guardarRecargarProductos={guardarRecargarProductos}
                            />
                          )}
                  />
                  
                  <Route exact path="/productos/:id" component={Producto}/>
                  <Route exact path="/productos/editar/:id" 
                         render={props => {
                           //tomar el id del producto
                           const idProducto = parseInt(props.match.params.id)

                           //el producto que se pasa al state
                           const producto = productos.filter(producto => producto.id === idProducto);

                           return (
                             <EditarProducto 
                                producto={producto[0]}
                                guardarRecargarProductos={guardarRecargarProductos}
                             />
                           )
                         }}
                  />
              </Switch>
            </main>

            <p className="mt-4 p2 text-center">Todos los Derechos Reservados</p>
        </Router>
  );
}

export default App;
