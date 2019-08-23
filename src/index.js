import React, { useEffect } from "react";
import { render } from "react-dom";
import { jsPlumb } from "jsplumb";
import "./style.css";
function App() {
  return (
    <div>
      <p>Start editing to see some magic happen :)</p>
      <Match />
    </div>
  );
}
const Match = () => {
  const listData = {
    left: ["a", "b", "c", "d", "e", "r", "r"],
    right: ["1", "2", "3", "4"]
  };
  const matchDefaults = {
    isSource: true,
    isTarget: true,
    connector: "Straight",
    endpoint: "Rectangle",
    paintStyle: { fill: "white", outlineStroke: "blue", strokeWidth: 3 },
    hoverPaintStyle: { outlineStroke: "lightblue" },
    connectorStyle: { outlineStroke: "green", strokeWidth: 1 },
    connectorHoverStyle: { strokeWidth: 2 }
  };
  const handleSubmit = () => {
    let a = jsPlumb.getConnections();
    a.forEach(e => {
      console.log(e.sourceId + " Connected " + e.targetId);
    });
  };
  const loadMatch = () => {
    jsPlumb.ready(function() {
      jsPlumb.draggable("matchParent");
      // jsPlumb.draggable("left");
      // jsPlumb.draggable("right");
      Object.entries(listData).forEach(([keyName, keyValue], keyIndex) => {
        keyName === "left"
          ? listData[keyName].forEach(keyValue => {
              jsPlumb.addEndpoint(
                keyValue,
                {
                  anchors: ["Right"]
                },
                matchDefaults
              );
              // console.log(keyValue);
            })
          : listData[keyName].forEach(keyValue => {
              jsPlumb.addEndpoint(
                keyValue,
                {
                  anchors: ["Left"]
                },
                matchDefaults
              );
              console.log(keyValue);
            });
      });
    });
  };
  useEffect(() => loadMatch());
  return (
    <>
      <div id="matchParent">
        {Object.entries(listData).map(([keyName, keyValue], keyIndex) => (
          <div id={keyName}>
            {listData[keyName].map(keyValue => {
              console.log(keyValue);
              return (
                <div id={keyValue} className="item">
                  {keyValue}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <input type="button" value="submit" onClick={handleSubmit} />
    </>
  );
};

render(<App />, document.getElementById("root"));
