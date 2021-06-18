import "./App.css";
import Navbar from "./components/layout/Navbar";
import Index from "./components/layout/Index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "./context";

function App() {
  return (
    <Provider>
      <Router>
        <>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" component={Index} exact />
            </Switch>
          </div>
        </>
      </Router>
    </Provider>
  );
}

export default App;
