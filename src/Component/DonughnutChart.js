import{Chart as ChartJS,ArcElement,Tooltip,Legend} from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import "../Component/DoughnutChart.css";

export default function Chart(){

    ChartJS.register(
        ArcElement,
        Tooltip,
        Legend
    )

    const data={
        labels:['ใช้เครื่องช่วยหายใจ', 'ใช้เครื่องให้ออกซิเจน', 'ใกล้ชิด', 'รอกลับบ้าน'],
        datasets:[{label:'status',
        data:[5,4,1,1],
        backgroundColor:[
        // 'rgba(255, 99, 132, 0.2)',
        // 'rgba(255, 206, 86, 0.2)',
        // 'rgba(75, 192, 192, 0.2)',
        // 'rgba(54, 162, 235, 0.2)',
        '#949DEB',
        '#65EB89',
        '#EBD071',
        '#EB6569',
    ],
        bordercolor :[
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        ],hoverOffset: 5}]
    }

    const options={
    }
    return(
        <div className="chart-container">
            <div className='chart-wrapper'>
                <Doughnut data={data} options={options} ></Doughnut>
            </div>
        </div>
    )
 }