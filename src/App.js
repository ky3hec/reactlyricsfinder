import "./App.css";
import Navbar from "./components/layout/Navbar";
import Index from "./components/layout/Index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
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
  );
}

export default App;
