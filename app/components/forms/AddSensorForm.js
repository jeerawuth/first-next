"use client"
import { useState } from "react";
import SensorModel from "@/app/db/models/SensorModel";
import 'tailwindcss/tailwind.css';
import Spinner from "../Spinner";

function AddSensorForm({siteId, machineId, portNumber, sensorId}) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [sensorName, setSensorName] = useState('');
  const [sensorType, setSensorType] = useState('');
  const [sensorUpperLimit, setSensorUpperLimit] = useState('');
  const [sensorLowerLimit, setSensorLowerLimit] = useState('');
  const [sensorReverse, setSensorReverse] = useState(false);
  const [limitError, setLimitError] = useState(null);
  
  const sensorTypes = ['Voltage', 'Current', 'Temperature', 'Pressure', 'Other'];
  const sensorObj = new SensorModel();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(sensorLowerLimit) >= Number(sensorUpperLimit)) {
        // setError("Sensor lower limit must be less than sensor upper limit.");
        // return;
        setLimitError(true);
        console.log('limit eroor');
        return;
    }
    const sensorData = {
      sensorId,
      sensorName,
      sensorPort: portNumber,
      sensorType,
      sensorUpperLimit: Number(sensorUpperLimit),
      sensorLowerLimit: Number(sensorLowerLimit),
      sensorReverse,
    };
    setIsLoading(true);
    await sensorObj.addSensorData(sensorData, siteId, machineId, portNumber, sensorId);
    setSensorName('');
    setSensorType('');
    setSensorUpperLimit('');
    setSensorLowerLimit('');
    setSensorReverse(false);
    setLimitError(null);
    setIsLoading(false);
  };

  if(isLoading) {
    return (
        <div className="flex flex-col items-center justify-center align-middle text-gray-700">
            <Spinner />
        </div>
    )
  }

  // Generate class name based on limitError state
  const inputClassName = `shadow appearance-none border ${limitError ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;

  return (
    <div className="flex flex-col items-center text-gray-700">
  <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
    <h1 className="text-2xl font-bold mb-4 text-center">Edit Sensor</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="text-sm font-medium block text-gray-700" htmlFor="sensorId">
          Sensor Id
        </label>
        <input
          disabled
          className="text-sm mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          id="sensorId"
          type="text"
          placeholder="Sensor Id"
          value={sensorId}
        />
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium block text-gray-700" htmlFor="sensorName">
          Sensor Name
        </label>
        <input
          required
          className="text-sm mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          id="sensorName"
          type="text"
          placeholder="Sensor name"
          value={sensorName}
          onChange={(e) => setSensorName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium block text-gray-700" htmlFor="sensorType">
          Sensor Type
        </label>
        <select 
          required
          value={sensorType} 
          onChange={(e) => setSensorType(e.target.value)}
          className="text-sm mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        >
          <option value="">Select a type</option>
          {sensorTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      {limitError && (
        <div className="text-sm mb-4 text-red-600">
          Sensor lower limit must be less than sensor upper limit.
        </div>
      )}
      <div className="mb-4">
        <label className="text-sm font-medium block text-gray-700" htmlFor="sensorUpperLimit">
          Sensor Upper Limit
        </label>
        <input
          required
          className={`${inputClassName} text-sm mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
          id="sensorUpperLimit"
          type="number"
          placeholder="Sensor upper limit"
          value={sensorUpperLimit}
          onChange={(e) => setSensorUpperLimit(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium block text-gray-700" htmlFor="sensorLowerLimit">
          Sensor Lower Limit
        </label>
        <input
          required
          className={`${inputClassName} text-sm mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
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
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          checked={sensorReverse}
          onChange={(e) => setSensorReverse(e.target.checked)}
        />
        <label className="ml-2 block text-sm text-gray-900" htmlFor="sensorReverse">
          Sensor Reverse
        </label>
      </div>
      <div className="flex items-center justify-between">
        <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" type="submit">
          Edit Sensor
        </button>
      </div>
    </form>
  </div>
</div>
  )
}

export default AddSensorForm;
