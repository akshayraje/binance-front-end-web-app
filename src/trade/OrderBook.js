import React from 'react'
import BigNumber from 'bignumber.js'

const OrderRow = (props) => (
    <li className="list-group-item small py-0" key={`${props.i}:${props.ba[0]}:${props.ba[1]}`}>
        <div className="row">
            <div className="col">
                <div className="order-book progress">
                    <div className={`progress-bar ${props.class}`} role="progressbar" style={{width: `${new BigNumber(props.diff).minus(props.ba[0]).div(props.max).multipliedBy(100).toFormat(2)}%`}}></div>
                </div>
            </div>
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
    let maxBid = BigNumber.maximum(props.bids.map(bid => bid[0])).toFormat()
    let minAsk = BigNumber.minimum(props.asks.map(ask => ask[0])).toFormat()
    let minBid = new BigNumber(maxBid).minus(BigNumber.minimum(props.bids.map(bid => bid[0]))).toFormat()
    let maxAsk = new BigNumber(minAsk).minus(BigNumber.maximum(props.asks.map(ask => ask[0]))).toFormat()
    for (var b = 0; b < numRowsBid; b++) {
        bids.push(
            <OrderRow i={b} ba={props.bids[b]} diff={maxBid} max={minBid} class="bg-success" />         
        )
    }
    for (var a = 0; a < numRowsAsk; a++) {
        asks.unshift(
            <OrderRow i={a} ba={props.asks[a]} diff={minAsk} max={maxAsk} class="bg-danger" />         
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