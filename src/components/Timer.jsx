import { useState, useEffect } from "react";

export default function Timer({ running }) {
  const [tenths, setTenths] = useState(0); 

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTenths((prev) => prev + 1);
      }, 100); // toutes les 100 ms
    }

    return () => clearInterval(interval);
  }, [running]);

  const seconds = (tenths / 10).toFixed(1);

  return (
    <div style={{ fontSize: "2rem", textAlign: "center", marginBottom: "1rem" }}>
      ⏱️ Temps écoulé : {seconds}s
    </div>
  );
}
