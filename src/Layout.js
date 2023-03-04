import React, {useState } from "react";
import { Navigate } from "react-router-dom"
import "./Layout.css";

const Layout = () => {

  /// We are using Here UseState Hook to Store the Size of Rows and Cols
  const [m, setM] = useState(6); /// Declaration of size of Rows
  const [n, setN] = useState(5); /// Declaration of Size of Columns

  const [bestHouse, setBestHouse] = useState([]); /// Storing the index of Best House that our findBestHouse() Function will return


  /// We declared another useState hook named Data initially We store  the empty 2d array contining Null string


  const [data, setData] = useState(() =>
    Array(m)
      .fill()
      .map(() => Array(n).fill(""))
  );

  

  ///// When User will Select the Value in Plot. We provide 4 Choice to the user on Every Plot and When user Choose the type of Plot
  ///we trigger a another Event onClick and Run a function handleInput and the arguments is indexes of Row and col and what user selected and this function will store the value on given index and update the matrix;

  const handleInput = (e, i, j) => {
    const newData = [...data];

    /// Converting 2d array into 1d array to check the previous house store in Our grid ;
    const houseData = newData.flat().filter((curele) => {
      return curele.includes("House");
    }).length;

    
    const ishouseexit = newData[i][j].slice(-1); /// we get number here number

  
    // we put a condition here if plot contain a house so we cannot change the value of House
    if (!Number(ishouseexit) && e.target.value === "House") {
      newData[i][j] = e.target.value + (houseData + 1);
    } else if (e.target.value !== "House") {
      newData[i][j] = e.target.value;
    }

    setData(newData); /// Update the matrix
  };




  /// Using Formula distance between two points to find the distance
  const calculateDistance = ([x1, y1], [x2, y2]) => {
    const xDistance = x2 - x1;
    const yDistance = y2 - y1;

    return Math.sqrt(xDistance ** 2 + yDistance ** 2);
  };

  ////  This is Our Main function for calculating the nearest house . initally we Created a four array and store the separate indexs on their Example house array contain the indexes of House and gym array will contain the index of gym....and so on                                        After storing the index. We run a for loop on House array and find the distance of gym , Resturant, Hospital and  Compare with previous distance if new Distance is less then previous we update the distance 

  //// The loop will take Time complexity: o(n2);
  
  const findBestHouse = (grid) => {
    const gyms = [];
    const restaurants = [];
    const hospitals = [];
    const houses = [];

    // Find the locations of all the gyms, restaurants, hospitals, and houses
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        console.log("Abcd", grid[row][col]);

        if (/House/i.test(grid[row][col])) {
          houses.push([row, col]);
        }
        switch (grid[row][col]) {
          case "Gym":
            gyms.push([row, col]);
            break;
          case "Resturant":
            restaurants.push([row, col]);
            break;
          case "Hospital":
            hospitals.push([row, col]);
            break;
          default:
            break;
        }
      }
    }

    if(houses.length===0 || gyms.length===0 || hospitals.length===0 || restaurants.length===0 )
    {
      alert("Please Initiliaze a Plot at least one House ,gyms, resturants and Hospitals");
      window.location.reload(false);

    }

    let minDistance = Number.MAX_SAFE_INTEGER;
    let bestHouse = null;

    // Calculate the distance between each house and the nearest gym, restaurant, and hospital
    for (let i = 0; i < houses.length; i++) {
      let distance = 0;
      for (let j = 0; j < gyms.length; j++) {
        if(gyms.length)
        distance += calculateDistance(houses[i], gyms[j]);
      }
      for (let j = 0; j < restaurants.length; j++) {
        distance += calculateDistance(houses[i], restaurants[j]);
      }
      for (let j = 0; j < hospitals.length; j++) {
        distance += calculateDistance(houses[i], hospitals[j]);
      }

      if (distance < minDistance) {
        minDistance = distance;
        bestHouse = houses[i];
      }
    }

    console.log(bestHouse);
    setBestHouse(bestHouse);
  };
  console.log(data);



  return (
    <>
      <div className="heading mt-4">
        <h1>House Recommendation</h1>
      </div>

      <div className="result mb-3 mt-4">
       {bestHouse.length && <p> <mark>{data[bestHouse[0]][bestHouse[1]]}</mark> is Best</p>}
      </div>
  

      {/* /// Tabel Code///// */}
      <div class="table-responsive-lg">
        <table className="table">
          <tbody>
            {Array(m)
              .fill()
              .map((_, i) => (
                <tr key={i}>
                  {Array(n)
                    .fill()
                    .map((_, j) => (
                      <td key={j}>
                        <div className="box1">
                          <div className="select-box">
                            <div className="value">
                              <p>{data[i][j]}</p>
                            </div>
                            <form action="">
                              <label htmlFor="selectvalue"></label>

                              <select
                                className="slection__type"
                                name="selectValue"
                                id="selectValue"
                                onClick={(e) => handleInput(e, i, j)}
                              >
                                <option
                                  className="sort__selection"
                                  value="None"
                                >
                                  Choose Plot
                                </option>
                                <option
                                  className="sort__selection"
                                  value="House"
                                >
                                  House
                                </option>
                                <option
                                  className="sort__selection"
                                  value="Resturant"
                                >
                                  Resturant
                                </option>
                                <option className="sort__selection" value="Gym">
                                  Gym
                                </option>
                                <option
                                  className="sort__selection"
                                  value="Hospital"
                                >
                                  Hospital
                                </option>
                              </select>
                            </form>
                          </div>
                        </div>
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>



      <div className="result mb-3 mt-4">
       {bestHouse.length && <p> <mark>{data[bestHouse[0]][bestHouse[1]]}</mark> is Best</p>}
      </div>


      {/* when user will click on this button , I invoked a Onclik Event and when button  clicked and findBestHouse function will execute and this function  will Suggest a Best House */}

      <div className="btnn">
        <button
          onClick={() => {
            findBestHouse(data);
          }}
          className="button-5"
        >
          Check Best House
        </button>


      </div>
    </>
  );
};

//                       />
export default Layout;
