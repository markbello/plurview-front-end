import React from 'react';
import MeasureAndRender from "./measureAndRender";
import Panel from './panel';


export default () => {

  // const gridStyles = {
  //   position: "relative",
  //   display: "grid",
  //   gridTemplateColumns: "90vw",
  //   gridTemplateRows: "90vh",
  // };

  const stroke = 1;
  const offset = 0;

  return (
      <div style={{ position: "relative"}}>
        <MeasureAndRender stretch={true} debounce={1}>
          {bounds => {
            const path = `
                    M${bounds.width - stroke},${stroke}
                    L${stroke},${stroke}
                    L${stroke},${bounds.height - stroke}
                    L${bounds.width - 77 - offset},${bounds.height - stroke}
                    L${bounds.width - 47 - offset},${bounds.height - 30}
                    L${bounds.width - stroke},${bounds.height - 30}
                    Z`;

            return <Panel bounds={bounds} path={path} />
          }}
        </MeasureAndRender>
      </div>
  )
}
