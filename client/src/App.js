import React from "react";
import AppNavbar from "./components/navbar/navbar.component";
import Dashboard  from "./components/Layout/dashboard.component";
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
      <Dashboard>
        <h1>{data}</h1>
      </Dashboard>
    </div>
  );
}

export default App;