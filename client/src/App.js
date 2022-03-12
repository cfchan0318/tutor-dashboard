import React from "react";
import Button from "@mui/material/Button";
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
      <Button variant="contained">Hello World</Button>
        <h1>{data}</h1>
      
    </div>
  );
}

export default App;