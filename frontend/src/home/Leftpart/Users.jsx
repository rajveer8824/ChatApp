import React from 'react';
import User from './User';
import userGetAllUsers from '../../context/useGetAllUsers';
function Users() {
  const [allUsers, setAllUsers] = userGetAllUsers();
  console.log(allUsers);
  return (
    <div className="p-4 bg-slate-900 min-h-screen overflow-y-auto">
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md mb-4">Messages</h1>
    <div className="flex-grow overflow-y-auto space-y-2" >
     {allUsers.map((user,index) => (
        <User key={index} user={user} />
      ))}
    </div>
      </div>
  )
}

export default Users;
