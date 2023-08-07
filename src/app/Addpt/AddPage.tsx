import Navbar from "../../Component/Navbarbottom";
import "./AddPage.css";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function Addpt() {
  const DuplicateBoxes = (count: number) => {
    const boxes = [];
    for (let i: number = 0; i < count; i++) {
      boxes.push(
        <div className="Box">
          <div className="PText">
            <div className="PName">
              <span className="NameTitle">นาย </span>
              <span className="PNameText">ณัฐพล สายทอง</span>
            </div>
            <div className="PID">
              <span className="IDText">ID </span>
              <span className="IDNo">XXXXXXXXXX</span>
            </div>
          </div>
          <button
            className="AddButton"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 46 46"
              fill="none"
            >
              <path
                d="M43.4444 25.5556H2.55556C1.15852 25.5556 0 24.397 0 23C0 21.603 1.15852 20.4444 2.55556 20.4444H43.4444C44.8415 20.4444 46 21.603 46 23C46 24.397 44.8415 25.5556 43.4444 25.5556Z"
                fill="#292D32"
              />
              <path
                d="M23 46C21.603 46 20.4445 44.8415 20.4445 43.4444V2.55554C20.4445 1.1585 21.603 -1.52588e-05 23 -1.52588e-05C24.3971 -1.52588e-05 25.5556 1.1585 25.5556 2.55554V43.4444C25.5556 44.8415 24.3971 46 23 46Z"
                fill="#292D32"
              />
            </svg>
          </button>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-1 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    {/* <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Modal Title</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div> */}
                    {/*body*/}
                    <div className="relative p-8 flex-auto">
                      <p className="my- text-slate-500 text-lg text-center leading-relaxed">
                        ต้องการเพิ่มคนไข้?
                      </p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        ยกเลิก
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        ตกลง
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      );
    }
    return boxes;
  };

  const [showModal, setShowModal] = useState(false);

  return (
    // <div className="container">
    <div>
      <div className="flex justify-center my-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 158 158"
          fill="none"
        >
          <path
            d="M99.8349 157.938H56.2706C16.8449 157.938 0 141.093 0 101.668V58.1033C0 18.6776 16.8449 1.83273 56.2706 1.83273H70.792C73.7689 1.83273 76.2375 4.30138 76.2375 7.27827C76.2375 10.2552 73.7689 12.7238 70.792 12.7238H56.2706C22.7987 12.7238 10.8911 24.6314 10.8911 58.1033V101.668C10.8911 135.14 22.7987 147.047 56.2706 147.047H99.8349C133.307 147.047 145.214 135.14 145.214 101.668V87.1462C145.214 84.1693 147.683 81.7006 150.66 81.7006C153.637 81.7006 156.105 84.1693 156.105 87.1462V101.668C156.105 141.093 139.261 157.938 99.8349 157.938Z"
            fill="#292D32"
          />
          <path
            d="M52.6354 121.2C48.2064 121.2 44.1404 119.602 41.1635 116.698C37.6057 113.14 36.081 107.985 36.8796 102.54L40.0018 80.685C40.5826 76.4738 43.3417 71.0283 46.3186 68.0514L103.533 10.8366C117.981 -3.61221 132.648 -3.61221 147.097 10.8366C155.011 18.7508 158.569 26.8102 157.843 34.8696C157.189 41.4042 153.704 47.7937 147.097 54.3283L89.8825 111.543C86.9056 114.52 81.4601 117.279 77.2489 117.86L55.3945 120.982C54.4506 121.2 53.5067 121.2 52.6354 121.2ZM111.229 18.533L54.0149 75.7477C52.6354 77.1273 51.038 80.322 50.7476 82.2098L47.6255 104.065C47.3351 106.17 47.7707 107.913 48.8598 109.002C49.9489 110.091 51.6915 110.527 53.7971 110.236L75.6515 107.114C77.5393 106.824 80.8066 105.226 82.1136 103.847L139.328 46.632C144.047 41.9125 146.516 37.7013 146.879 33.7805C147.315 29.061 144.846 24.0511 139.328 18.4604C127.711 6.84323 119.724 10.1106 111.229 18.533Z"
            fill="#292D32"
          />
          <path
            d="M135.046 64.1283C134.538 64.1283 134.029 64.0557 133.594 63.9104C114.498 58.5375 99.3233 43.3626 93.9503 24.2669C93.1517 21.3626 94.8216 18.3857 97.7259 17.5145C100.63 16.7158 103.607 18.3857 104.406 21.29C108.762 36.7554 121.033 49.026 136.498 53.3824C139.402 54.1811 141.072 57.2306 140.274 60.1349C139.62 62.6035 137.442 64.1283 135.046 64.1283Z"
            fill="#292D32"
          />
        </svg>
      </div>

      <div className="mb-10">
        <div className="Text">Identification ID</div>
        <div className="searchBar">
          <input className="input" id="identificationid"></input>
          <button className="button">
            <SearchIcon />
          </button>
        </div>
        <div className="Text">Name</div>
        <div className="searchBar">
          <input className="input" id="name"></input>
          <button className="button">
            <SearchIcon />
          </button>
        </div>
      </div>

      {/* <div className="Box">
        <div>
          <div className="PName">
            <span className="NameTitle">นาย </span>
            <span className="PNameText">ณัฐพล สายทอง</span>
          </div>
          <div className="PID">
            <span className="IDText">ID </span>
            <span className="IDNo">XXXXXXXXXX</span>
          </div>
        </div>
        <button className="AddButton">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 46 46"
            fill="none"
          >
            <path
              d="M43.4444 25.5556H2.55556C1.15852 25.5556 0 24.397 0 23C0 21.603 1.15852 20.4444 2.55556 20.4444H43.4444C44.8415 20.4444 46 21.603 46 23C46 24.397 44.8415 25.5556 43.4444 25.5556Z"
              fill="#292D32"
            />
            <path
              d="M23 46C21.603 46 20.4445 44.8415 20.4445 43.4444V2.55554C20.4445 1.1585 21.603 -1.52588e-05 23 -1.52588e-05C24.3971 -1.52588e-05 25.5556 1.1585 25.5556 2.55554V43.4444C25.5556 44.8415 24.3971 46 23 46Z"
              fill="#292D32"
            />
          </svg>
        </button>
      </div> */}
      {DuplicateBoxes(1)}
    </div>
  );
}
