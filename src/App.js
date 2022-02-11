import {Fragment} from "react";
import './App.css';
import 'rsuite/styles/index.less';
import 'rsuite/dist/rsuite.min.css';
import Tickets from "./components/Tickets";


function App() {
  return (
    <Fragment>
      <header className="App App-header">
        Ticket Master
      </header>
        <Tickets/>
    </Fragment>
  );
}

export default App;
