
import './App.css';
import React from "react";

function App() {
  return (
      // Main Container to contain all components
      <div className="container">

        {/*History Div Hovering*/}
        <div className={"history"}>
          <div className={"close_history"}>
            <button>Close</button>
          </div>
          <div className={"history_items"}></div>
        </div>

        {/*Text Field to show answer*/}
        <div className="text-area">
          <div className={"show_history"}>
            <span>No History</span>
            <button>History</button>
          </div>
          <input type={"text"} className={"prev_inp"} disabled/>
          <input type={"text"} className={"inp_num"} disabled/>

        </div>

        {/*Button Area Structure*/}
        <div className={"button-area"}>
          <table>

            <tbody>
            <tr>
              <td><button>%</button></td>
              <td><button>CE</button></td>
              <td><button>C</button></td>
              <td><button>&lt;-</button></td>
            </tr>

            <tr>
              <td><button>7</button></td>
              <td><button>8</button></td>
              <td><button>9</button></td>
              <td><button>X</button></td>
            </tr>

            <tr>
              <td><button>4</button></td>
              <td><button>5</button></td>
              <td><button>6</button></td>
              <td><button>-</button></td>
            </tr>

            <tr>
              <td><button>1</button></td>
              <td><button>2</button></td>
              <td><button>3</button></td>
              <td><button>+</button></td>
            </tr>

            <tr>
              <td><button>0</button></td>
              <td><button>.</button></td>
              <td><button>=</button></td>
              <td><button>/</button></td>
            </tr>

            </tbody>

          </table>

        </div>

      </div>

  );
}

export default App;
