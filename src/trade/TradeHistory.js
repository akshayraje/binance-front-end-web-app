import React from 'react'
import BigNumber from 'bignumber.js'

const TradeHistory = (props) => {
    let currentp = new BigNumber(0);
    let rows = [];
    let numRows = props.trades.length;
    for (var i = 0; i < numRows; i++) {
        let newp = new BigNumber(props.trades[i].p);
        rows.unshift(
            <li className="list-group-item small py-0" key={`${i}:${props.trades[i].p}:${props.trades[i].q}:${props.trades[i].T}`}>
                <div className="row">
                    <div className="col"><span className={newp.gte(currentp) ? 'text-success' : 'text-danger'}>{newp.toFormat(null,1)}</span></div>          
                    <div className="col">{new BigNumber(props.trades[i].q).toFormat(null,1)}</div>
                    <div className="col text-muted">{new Date(props.trades[i].T).toLocaleTimeString()}</div>
                </div>
            </li>            
        )
        currentp = new BigNumber(props.trades[i].p);
    }
    return (
        <div className="card my-2 w-100 trade-history">
            <div className="card-header">Trade History</div>
            <ul className="list-group list-group-flush">
                {rows}
            </ul>
        </div>
    )
}

export default TradeHistory;