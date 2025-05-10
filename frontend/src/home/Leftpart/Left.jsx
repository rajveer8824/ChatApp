import React from 'react';
import Users from './Users';
import Search from './Search';
import Logout from './Logout';

function Left() {
  return (
    <div className="w-[30%] bg-slate-900 text-gray-300 flex flex-col h-full">
      <Search />
      <div
        className=" flex-1  overflow-y-auto"
        style={{ minHeight: "calc(84vh - 10vh)" }}
      >
        <Users />
      </div>
      <Logout />
    </div>
  );
}

export default Left;