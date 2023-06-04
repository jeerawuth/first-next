"use client"
import { useState } from "react";
import SensorModel from "@/app/db/models/SensorModel";
import 'tailwindcss/tailwind.css';

function AddSensorForm({siteId, machineId, sensorId}) {
  
  const [sensorName, setSensorName] = useState('');
  const [sensorPort, setSensorPort] = useState('');
  const [sensorType, setSensorType] = useState('');
  const [sensorUpperLimit, setSensorUpperLimit] = useState('');
  const [sensorLowerLimit, setSensorLowerLimit] = useState('');
  const [sensorReverse, setSensorReverse] = useState(false);
  const [limitError, setLimitError] = useState(null);

  const sensorPorts = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  const sensorTypes = ['Voltage', 'Current', 'Temperature', 'Pressure', 'Other'];
  const sensorObj = new SensorModel();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sensorLowerLimit >= sensorUpperLimit) {
        // setError("Sensor lower limit must be less than sensor upper limit.");
        // return;
        setLimitError(true);
        return;
    }
    const sensorData = {
      sensorName,
      sensorPort,
      sensorType,
      sensorUpperLimit: Number(sensorUpperLimit),
      sensorLowerLimit: Number(sensorLowerLimit),
      sensorReverse,
    };
    await sensorObj.addSensorData(sensorData, siteId, machineId, sensorId);
    setSensorName('');
    setSensorPort('');
    setSensorType('');
    setSensorUpperLimit('');
    setSensorLowerLimit('');
    setSensorReverse(false);
    setLimitError(null);
  };


  // Generate class name based on limitError state
  const inputClassName = `shadow appearance-none border ${limitError ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Add Sensor</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sensorName">
            Sensor Name
          </label>
          <input
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="sensorName"
            type="text"
            placeholder="Sensor name"
            value={sensorName}
            onChange={(e) => setSensorName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sensorPort">
            Sensor Port
          </label>
          <select 
            required
            value={sensorPort} 
            onChange={(e) => setSensorPort(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a port</option>
            {sensorPorts.map((port, index) => (
              <option key={index} value={port}>
                {port}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sensorType">
            Sensor Type
          </label>
          <select 
            required
            value={sensorType} 
            onChange={(e) => setSensorType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a type</option>
            {sensorTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>{limitError && (
            <div>
                Sensor lower limit must be less than sensor upper limit.
            </div>
            )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sensorUpperLimit">
            Sensor Upper Limit
          </label>
          <input
            required
            // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            className={inputClassName}
            id="sensorUpperLimit"
            type="number"
            placeholder="Sensor upper limit"
            value={sensorUpperLimit}
            onChange={(e) => setSensorUpperLimit(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sensorLowerLimit">
            Sensor Lower Limit
          </label>
          <input
            required
            className={inputClassName}
            id="sensorLowerLimit"
            type="number"
            placeholder="Sensor lower limit"
            value={sensorLowerLimit}
            onChange={(e) => setSensorLowerLimit(e.target.value)}
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            id="sensorReverse"
            type="checkbox"
            className="mr-2"
            checked={sensorReverse}
            onChange={(e) => setSensorReverse(e.target.checked)}
          />
          <label className="block text-gray-700 text-sm font-bold" htmlFor="sensorReverse">
            Sensor Reverse
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Add Sensor
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSensorForm;
