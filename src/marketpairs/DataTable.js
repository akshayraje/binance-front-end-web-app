import React from 'react'
import { Link } from 'react-router-dom'
import BigNumber from 'bignumber.js'

const Row = (props) => (
    <React.Fragment>
        <div className="d-none d-sm-inline">
            <Link className="row table-row small py-1" to={`trade/${props.symbol}`}>
                <div className="col">{props.symbol}</div>
                <div className="col">{new BigNumber(props.lastPrice).toFormat(null,1)}</div>
                <div className={props.priceChangePercent < 0 ? 'col text-danger' : 'col text-success'}>{`${new BigNumber(props.priceChangePercent).toFormat(2,1)}%`}</div>
                <div className="col">{new BigNumber(props.highPrice).toFormat(null,1)}</div>
                <div className="col">{new BigNumber(props.lowPrice).toFormat(null,1)}</div>
                <div className="col">{new BigNumber(props.quoteVolume).toFormat(null,1)}</div>
            </Link>
        </div>
        <div className="d-inline d-sm-none">
            <Link className="row table-row small py-1" to={`trade/${props.symbol}`}>
                <div className="col-12">
                    <span className="font-weight-bold">{props.symbol}</span> <span>{new BigNumber(props.lastPrice).toFormat(null,1)}</span> <span className={props.priceChangePercent < 0 ? 'text-danger' : 'text-success'}>{`${new BigNumber(props.priceChangePercent).toFormat(2,1)}%`}</span>
                </div>
                <div className="col-4">
                    <div className="font-weight-light text-muted small">24h High</div> 
                    <span className="small">{new BigNumber(props.highPrice).toFormat(null,1)}</span>
                </div>
                <div className="col-4">
                    <div className="font-weight-light text-muted small">24h Low</div> 
                    <span className="small">{new BigNumber(props.lowPrice).toFormat(null,1)}</span>
                </div>
                <div className="col-4">
                    <div className="font-weight-light text-muted small">24h Volume</div> 
                    <span className="small">{new BigNumber(props.quoteVolume).toFormat(null,1)}</span>
                </div>
            </Link>
        </div>
    </React.Fragment>    
)

const DataTable = (props) => {

    let rows = [];
    let tickerArray = Object.values(props.ticker);
    let numRows = tickerArray.length;

    for (var i = 0; i < numRows; i++) {
        if( props.filter.includes(tickerArray[i].symbol) ){
            rows.push(
                <Row {...tickerArray[i]} key={tickerArray[i].symbol} />
            )
        }
    }
    return (
        <React.Fragment>
            <div className="d-none d-sm-inline">
                <div className="row table-header small font-weight-bold py-1">
                    <div className="col">Pair</div>
                    <div className="col">Last Price</div>
                    <div className="col">24h Change</div>
                    <div className="col">24h High</div>
                    <div className="col">24h Low</div>
                    <div className="col">24h Volume</div>
                </div>
            </div>
            {rows}
        </React.Fragment>
    );
}

export default DataTable;