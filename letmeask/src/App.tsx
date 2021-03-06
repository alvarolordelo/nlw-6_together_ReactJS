import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { AuthContextProvider } from './context/AuthContext';
import { Room } from './pages/Room';


function App() {


  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact={true} component={Home}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/rooms/new" component={NewRoom}></Route>
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>

    </BrowserRouter>

  );
}
export default App;