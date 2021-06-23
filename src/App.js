import "./App.css";
import Navbar from "./components/layout/Navbar";
import Index from "./components/layout/Index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "./context";
import Lyrics from "./components/tracks/Lyrics";

function App() {
  return (
    <Provider>
      <Router>
        <>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" component={Index} exact />
              <Route path="/tracks/lyrics/:id" component={Lyrics} exact />
            </Switch>
          </div>
        </>
      </Router>
    </Provider>
  );
}

export default App;
