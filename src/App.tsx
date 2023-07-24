import "./App.css";
import store from "./store/store";
import { Provider } from "react-redux";
import AddTodo from "./components/addTodo";
import Todo from "./components/todos";
import useLocalStorage from "./hooks/useLocalStorage";
import { todo } from "./store/slices/todoSlice";

function App() {
  const setLocalStore = useLocalStorage<todo[]>("todo", [])[1];

  return (
    <Provider store={store}>
      <div className="App">
        <AddTodo setLocalStore={setLocalStore} />
        <Todo setLocalStore={setLocalStore} />
      </div>
    </Provider>
  );
}

export default App;
