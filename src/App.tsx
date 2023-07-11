import './App.css';
import store from "./store/store";
import { Provider } from "react-redux";
import AddTodo from './components/addTodo';
import Todos from './components/todos';

function App() {

  return (
    <Provider store={store}>
    <div className="App">
      <AddTodo />
      <Todos />
    </div>
    </Provider>
  );
}

export default App;
