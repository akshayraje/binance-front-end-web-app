import React from 'react'
import BigNumber from 'bignumber.js'

const OrderRow = (props) => (
    <li className="list-group-item small py-0" key={`${props.i}:${props.ba[0]}:${props.ba[1]}`}>
        <div className="row">
            <div className="col">{props.label}</div>
            <div className="col">{new BigNumber(props.ba[0]).toFormat(null,1)}</div>          
            <div className="col">{new BigNumber(props.ba[1]).toFormat(null,1)}</div>
        </div>
    </li>     
)

const OrderBook = (props) => {
    let bids = [];
    let asks = [];
    let numRowsBid = Math.min(20, props.bids.length);
    let numRowsAsk = Math.min(20, props.asks.length);
    for (var b = 0; b < numRowsBid; b++) {
        bids.push(
            <OrderRow i={b} ba={props.bids[b]} label="Bid" />         
        )
    }
    for (var a = 0; a < numRowsAsk; a++) {
        asks.unshift(
            <OrderRow i={a} ba={props.asks[a]} label="Ask" />         
        )
    }
    return (
        <div className="card my-2 w-100 order-book">
            <div className="card-header">Order Book <span className="text-muted small">Bid-Ask Spread</span></div>
            <ul className="list-group list-group-flush">
                {asks}
                {bids}
            </ul>
        </div>
    )
}

export default OrderBook;