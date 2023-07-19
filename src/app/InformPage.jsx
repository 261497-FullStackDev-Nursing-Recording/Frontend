
import Navbar from "../Component/Navbarbottom";
import "./InformPage.css";

export default function Inform(){
    return(
        <div className="inform-container">


            <form>
            <h3>Name</h3>
            <input type="text" id="name" placeholder="name"></input>
            <input type="text" id="lastname" placeholder="lastname"></input>
            
            
          
            <h3>Identification ID</h3>
            <input type="int" id="identificationid" placeholder=""></input>
            
            
            <h3>ปัญหาและความต้องการ</h3>
            <input type="text" id="a" placeholder="A" color="gray"></input>
            <input type="text" id="o" placeholder="O"></input>
            <input type="text" id="s" placeholder="S"></input>
            

            <h3>กิจกรรมพยาบาล/การประเมิน</h3>
            <input type="text" id="i" placeholder="I"></input>
            <input type="text" id="e" placeholder="E"></input>

            </form>
            
            
            <Navbar />
        </div>
        
    )
}