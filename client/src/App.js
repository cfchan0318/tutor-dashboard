import React from "react";
import Button from "@mui/material/Button";
import Dashboard from "./components/Layout/dashboard/dashboard.component";
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

      <Dashboard title="Users">
       
        <h1>{data}</h1>
        <Button variant="contained">Hello World</Button>
      </Dashboard>

    </div>
  );
}

export default App;