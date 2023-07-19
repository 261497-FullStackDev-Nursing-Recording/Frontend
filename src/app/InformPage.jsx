
import Navbar from "../Component/Navbarbottom";
import "./InformPage.css";
// import "../Component/textarea.js" ;

export default function Inform(){
    return(
        <div className="inform-container">


            <form>
            <h3>Name</h3>
            <div className="name">
            <input type="text" id="name" placeholder="name" size="14" tabindex="2"></input>
            <input type="text" id="lastname" placeholder="lastname"  size="14" tabindex="2"></input>
            </div>
            
          
            <h3>Identification ID</h3>
            <input type="int" id="identificationid" placeholder=""></input>
            
            
            <h3>ปัญหาและความต้องการ</h3>
            <textarea type="text" id="my-text" placeholder="A" ></textarea>
            <textarea type="text" id="my-text" placeholder="O" ></textarea>
            <textarea type="text" id="my-text" placeholder="S"></textarea>
            
            

            <h3>กิจกรรมพยาบาล/การประเมิน</h3>
            <textarea type="text" id="my-text" placeholder="I"></textarea>
            <textarea type="text" id="my-text" placeholder="E"></textarea>

            
            </form>
            
            
           
            <Navbar />
            
        </div>
        
        
       
    )
}