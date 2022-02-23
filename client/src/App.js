import React from "react";
import AppNavbar from "./components/navbar/navbar.component";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <AppNavbar/>
      <h1>{data}</h1>
    </div>
  );
}

export default App;