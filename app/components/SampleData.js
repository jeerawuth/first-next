"use client"

import { useState } from "react";
import { app } from "../db/firebase";
import TransactionModel from "../db/models/TransactionModel";
import Spinner from "./Spinner";
import { Timestamp } from "firebase/firestore";

export default function SampleData() {
    const transactionObj = new TransactionModel(app);
    const [isLoading, setIsLoading] = useState(false);

    async function clickHandler() {
        setIsLoading(true);
        const data = Math.round(Math.random() * 10);
        const timestamp = Timestamp.now()
        await transactionObj.addDataTransaction(data, timestamp, 'siteA', 'machineA', 'sensorA');
        setIsLoading(false);
    }

    if( isLoading ) {
        return (
            <div className="container">
                <Spinner />
            </div>
        )
    }
  return  (
    <div className="container">
        <button onClick={clickHandler}>Add</button>
    </div>
  )

}
