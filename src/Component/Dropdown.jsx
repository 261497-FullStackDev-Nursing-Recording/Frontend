import "daisyui/dist/full.css";


export default function Dropdown (){
    return (
        <div class="dropdown">
        <label tabindex="0" class="btn m-1">เลือกกลุ่มโรค</label>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-3 shadow bg-base-100 rounded-box w-60">
          <li><h1>decease1</h1></li>
          <li><h1>deacease2</h1></li>
          <li><h1>decease3</h1></li>
          <li><h1>deacease4</h1></li>
          <li><h1>decease5</h1></li>
          <li><h1>deacease6</h1></li>
        </ul>
      </div>
    )
}