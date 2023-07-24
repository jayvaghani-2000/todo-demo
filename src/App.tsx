import "./App.css";
import store from "./store/store";
import { Provider } from "react-redux";
import AddTodo from "./components/addTodo";
import Todos from "./components/todos";
import useLocalStorage from "./hooks/useLocalStorage";
import { todo } from "./store/slices/todoSlice";

function App() {
  const setLocalStore = useLocalStorage<todo[]>("todo", []);

  return (
    <Provider store={store}>
      <div className="App">
        <AddTodo setLocalStore={setLocalStore} />
        <Todos setLocalStore={setLocalStore} />
      </div>
    </Provider>
  );
}

export default App;
