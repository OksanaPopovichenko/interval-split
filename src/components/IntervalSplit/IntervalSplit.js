import React, { useState } from "react";
import './IntervalSplit.scss';

export default function IntervalSplit(props) {
    const [periods, setPeriods] = useState([
        { start: 0, end: 100 }
    ]);

    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');


    const split = (event) => {
        event.preventDefault();

        if(start > end) {
            alert('The start number cannot be greater than the end number');
        } else if (start == end) {
            alert('The start number cannot be equal to the end number');
        } else {
            let newArr = periods;

            if(periods.length == 1) {
                newArr.splice(0, 1);
                newArr.push(
                    {start: 0, end: start - 1},
                    {start: parseInt(start), end: parseInt(end)},
                    {start: parseInt(end) + 1, end: 100}
                );
                setPeriods(newArr);

            } else {
                newArr.map((item, i) => {
                    if ((start < item.end) && (end > item.end)) {
                        newArr.splice(i, newArr.length - 1);
                        
                        newArr.push(
                            {start: item.start, end: start - 1},
                            {start: parseInt(start), end: parseInt(end)},
                            {start: parseInt(end) + 1, end: 100}
                        );
                        setPeriods(newArr);
                    } 

                    else if ((start < item.end) && (end < item.end)) {
                        newArr.splice(i, newArr.length - 1);

                        newArr.push(
                            {start: item.start, end: start - 1},
                            {start: start, end: end},
                            {start: parseInt(end) + 1, end: item.end},
                            {start: parseInt(item.end) + 1, end: 100}
                        );
                        setPeriods(newArr);
                    }
                })
            }
        }

        setStart('');
        setEnd('');
    }

    const handleStart = (event) => {
        setStart(event.target.value);
    }

    const handleEnd = (event) => {
        setEnd(event.target.value);
    }

    return (
        <div className='interval-split'>
            <form onSubmit={split}>
                <label>
                    Start: 
                    <input name='start' 
                        type='number' 
                        min='0' 
                        max='100' 
                        value={start}
                        onChange={handleStart}
                    />
                </label>
                <label>
                    End: 
                    <input name='end' 
                        type='number' 
                        min='0' 
                        max='100'
                        value={end}
                        onChange={handleEnd}
                    />
                </label>  
                <button type='submit'>Split</button>
            </form>

            <div className='intervals-blocks'>
                {periods.map((item, key) =>     
                    <div key={key} className="interval" style={{width: `${item.end - item.start}%`}}>
                        <span>{item.start}</span> - <span>{item.end}</span>
                    </div>
                )}
            </div>
        </div>
    )
}
