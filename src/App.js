import MainComponent from "../src/component/MainComponent";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import myStore from "./redux/Store";

function App() {
  return (
    <div className="App">
      <Provider store={myStore}>
        <BrowserRouter>
          <MainComponent />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
