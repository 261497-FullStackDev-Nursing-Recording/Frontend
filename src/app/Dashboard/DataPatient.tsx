// import { useEffect, useState } from 'react';
// import axios from 'axios';

// type User = {
//   id: string;
//   username: string;
//   role: string;
//   created_at: string;
// };

// const UserList: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get<User[]>('http://localhost:5001/users/');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>User List</h1>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             Username: {user.username} | Role: {user.role} | Created At: {user.created_at}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;

import { useEffect, useState } from 'react';
import axios from 'axios';

const PatientCount: React.FC = () => {
  const [patientCount, setPatientCount] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/patient/get_all');
      const data = response.data;
      setPatientCount(data.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      {patientCount}
    </div>
  );
};

export default PatientCount;


