import React, { useMemo, useState } from "react";
import Select from "react-select";
import "./App.css";
import image from "./assets/imgWeed.png";
const options = [
  { value: "lemonhaze", label: "Lemon Haze", dominant: "Sativa", thc: 22 },
  {
    value: "gorillacookies",
    label: "Gorilla Cookies",
    dominant: "Sativa",
    thc: 23,
  },
  { value: "tropicana", label: "Tropicana", dominant: "Sativa", thc: 25 },
  { value: "gelatto", label: "Gelatto Gold", dominant: "Indica", thc: 30 },
  {
    value: "gelattoother",
    label: "Other Gelatto Gold",
    dominant: "Indica",
    thc: 35,
  },
];

const dominantList = ["Sativa", "Indica"].map((name) => ({
  value: name,
  label: name,
}));

const thcGradesList = ["Low", "High"].map((name) => ({
  value: name,
  label: name,
}));

export default function App() {
  const [selectedThc, setSelectedThc] = useState(null);
  const [selectedWeedType, setSelectedWeedType] = useState(null);

  console.log({ selectedThc, selectedWeedType });
  const filteredOptions = useMemo(
    () =>
      selectedWeedType || selectedThc
        ? options.filter(({ dominant, thc }) =>
            selectedWeedType
              ? selectedThc
                ? selectedThc?.value === "Low"
                  ? selectedWeedType?.value === dominant && thc < 25
                  : selectedWeedType?.value === dominant && thc >= 25
                : selectedWeedType?.value === dominant
              : selectedThc
              ? selectedThc?.value === "Low"
                ? thc < 25
                : thc >= 25
              : true
          )
        : options,
    [selectedThc, selectedWeedType]
  );

  return (
    <div className="App">
      <Select
        className={"filter"}
        defaultValue={selectedWeedType}
        onChange={setSelectedWeedType}
        options={dominantList}
      />
      <Select
        className={"filter"}
        defaultValue={selectedThc}
        onChange={setSelectedThc}
        options={thcGradesList}
      />
      <div className="cardListContainer">
        <div className="cardList">
          {filteredOptions.map(({ label, dominant, thc }) => (
            <div className="card">
              <div className="card-left">
                <h2>{label}</h2>
                <p>Weed type: {dominant}</p>
                <p>
                  THC: <b>{thc}%</b>
                </p>
              </div>
              <div className="card-right">
                <div className="img-container">
                  <img src={image} alt={label} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <pre>{JSON.stringify(filteredOptions, null, 2)}</pre>
    </div>
  );
}
