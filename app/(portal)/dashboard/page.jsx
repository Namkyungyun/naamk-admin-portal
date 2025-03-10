"use client";
import "@/app/globals.css";

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <span className="font-medium text-sky-500">The Anti-Patterns</span>
        <span
          aria-hidden="true"
          className="inline-block size-5 translate-x-0 transform rounded-full bg-black shadow transition duration-200 ease-in-out"
        ></span>
      </div>
    </div>
  );
};

export default Dashboard;
