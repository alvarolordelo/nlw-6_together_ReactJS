import { Route, BrowserRouter } from 'react-router-dom';
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { AuthContextProvider } from './context/AuthContext';


function App() {


  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/rooms/new" component={NewRoom}></Route>
      </AuthContextProvider>

    </BrowserRouter>

  );
}
export default App;