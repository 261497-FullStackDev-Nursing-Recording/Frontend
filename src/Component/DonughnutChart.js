import{Chart as ChartJS,ArcElement,Tooltip,Legend} from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import "../Component/DoughnutChart.css";
import StatusCount from '@/app/Dashboard/GetStatusCount';


export default function Chart({ statusCounts }) {
    // Register Chart.js components (ArcElement, Tooltip, Legend)
    ChartJS.register(
        ArcElement,
        Tooltip,
        Legend
    );

    const data = {
        labels: ['รอกลับบ้าน','ใกล้ชิด', 'ใช้เครื่องให้ออกซิเจน','ใช้เครื่องช่วยหายใจ' ],
        datasets: [{
            label: 'status',
            data: [statusCounts.STATUS_1, statusCounts.STATUS_2, statusCounts.STATUS_3, statusCounts.STATUS_4],
            backgroundColor: [
                '#65EB89',
                '#949DEB',
                '#EBD071',
                '#EB6569',
            ],
            borderColor: [
                '#65EB89',
                '#949DEB',
                '#EBD071',
                '#EB6569',
            ],
            hoverOffset: 5
        }]
    };

    const options = {};

    return (
        <div className="chart-container">
            <div className='chart-wrapper'>
                <Doughnut data={data} options={options}></Doughnut>
            </div>
        </div>
    )
}