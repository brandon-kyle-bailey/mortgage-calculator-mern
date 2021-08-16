import React, { useEffect, useState } from 'react';

import './MortgageCalculatorComponent.css';

import FormInputComponent from '../FormInputComponent/FormInputComponent';
import MortgageMetricsComponent from '../MortgageMetricsComponent/MortgageMetricsComponent';

const MortgageCalculatorComponent = () => {
    const [propertyPrice, setPropertyPrice] = useState(100000);
    const [downPayment, setDownPayment] = useState(30000);
    const [annualInterestRate, setAnnualInterestRate] = useState(5);
    const [amortizationPeriod, setAmortizationPeriod] = useState(30);
    const [schedule, setSchedule] = useState('accelerated-bi-weekly');
    const [mortgageData, setMortgageData] = useState([[],[],[]]);
    const [schedulePayment, setSchedulePayment] = useState(0);

    const fetchApiData = async () => {
        const response = await fetch(`/api/v1/calculate/${propertyPrice}/${downPayment}/${annualInterestRate}/${amortizationPeriod}/${schedule}`);
        const data = await response.json();
        console.log(propertyPrice, downPayment, annualInterestRate, amortizationPeriod, schedule);
        console.log(response.status);
        console.log(data.message);
        return [response.status, data.message];
    }

    const buildLineSeries = (data) => {
        const interest = [];
        const principle = [];
        const endingBalance = [];
        for(const row of data) {
          interest.push({
            x: row['schedule'],
            y: row['interest']
          });
          principle.push({
            x: row['schedule'],
            y: row['principle']
          });
          endingBalance.push({
            x: row['schedule'],
            y: row['ending_balance']
          });
        }
        return [interest, principle, endingBalance];
    }

    const generateMortgageData = async () => {
      const [status, data] = await fetchApiData();
      if(status===400) {
        const errors = Object.values(data).reduce((accumulator, currentValue) => accumulator += Object.values(currentValue));
        console.log(errors);
        alert(data);
        return;
      }
      setMortgageData(buildLineSeries(data));
      const { interest, principle } = data[0];
      setSchedulePayment((interest + principle).toFixed(2));
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      generateMortgageData();
    }

    useEffect(() => {
      generateMortgageData();
    }, []);

    return (
        <div className="container">
            <div 
                className="mortgage-form-container">
                <h1>Welcome</h1>
                <h3>Let's calculate your mortgage!</h3>
                <p>{schedule} payments of ${schedulePayment} for {amortizationPeriod} years.</p>
                <form 
                className="mortgage-form" onSubmit={handleSubmit}>
                    <FormInputComponent className={"input"} type={"number"} value={propertyPrice}  id={"propertyPriceInput"} name={"propertyPrice"} min={1} max={Number.MAX_VALUE} step={1} onChange={e => setPropertyPrice(e.target.value)} placeholder={"Property Price"}/>
                    <FormInputComponent className={"input"} type={"number"} value={downPayment}  id={"downPaymentInput"} name={"downPayment"} min={1} max={Number.MAX_VALUE} step={1} onChange={e => setDownPayment(e.target.value)} placeholder={"Down Payment"}/>
                    <FormInputComponent className={"input"} type={"number"} value={annualInterestRate}  id={"annualInterestRateInput"} name={"annualInterest"} min={1} max={Number.MAX_VALUE} step={1} onChange={e => setAnnualInterestRate(e.target.value)} placeholder={"Annual Interest Rate"}/>
                    <FormInputComponent className={"input"} type={"number"} value={amortizationPeriod}  id={"amortizationPeriodInput"} name={"amortizationPeriod"} min={5}  max={30}  step={5} onChange={e => setAmortizationPeriod(e.target.value)} placeholder={"Amortication Period (In Years)"}/>
                <select className="input" id="scheduleInput" name="schedule" onChange={e => setSchedule(e.target.value)} >
                    <option value="accelerated-bi-weekly">Accelerated bi-Weekly</option>
                    <option value="bi-weekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
                <input className="submit" type="submit" value="Calculate!" />
                </form>
            </div>
            <MortgageMetricsComponent mortgageData={mortgageData} amortization={amortizationPeriod}/>
        </div>
    );   
}

export default MortgageCalculatorComponent;