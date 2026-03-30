import { useState,useRef } from "react";
import "./Client.css";
import useDebounce from "../../Hooks/useDebounce";
import useOutsideClick from "../../Hooks/useOutsideClick";
let clientData =[
    { id:1, name: "Akira Lim", phone: "+65 7345 6789" },
    { id:2, name: "Akira Chua", phone: "+65 6456 7890" },
    { id:3, name: "Akira Wong", phone: "+65 5567 8901" },
    { id:4, name: "Akira Lee", phone: "+65 4678 9012" },
  ]
export default function Client({setUserData}) {
  const [open, setOpen] = useState(false);
  const [clients, setclients] = useState(clientData);
  const ref = useRef();
    const handle = useDebounce((e) => {
        const filteredClients = clientData.filter(value => value.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setclients(filteredClients);
        console.log(e.target.value,'search input value'); //--- IGNORE ---
    },300)
    
    useOutsideClick(ref, () => {
        setOpen(false);
    });

  return (
    <div className="container" ref={ref}>

      {/* INPUT */}
       <div className="search-box">
          <input className="input" placeholder="Search or create client"  onFocus={() => setOpen(true)} onKeyUp={(e)=> handle(e)}/>
          <span className="plus">＋</span>
        </div>

      {/* DROPDOWN */}
      {open && (
        <div className="dropdown">

          {clients.map((c, i) => (
            <div key={i} className="item" onClick={() => {
               setUserData(c) //--- IGNORE ---
                setOpen(false);
            }}>
              <div className="name">
                <span className="highlight">
                  {c.name.split(" ")[0]}
                </span>{" "}
                {c.name.split(" ")[1]}
              </div>
              <div className="phone">{c.phone}</div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}