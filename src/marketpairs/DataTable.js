import React from 'react'
import { Link } from 'react-router-dom'
import BigNumber from 'bignumber.js'

const DataTable = (props) => {

    let rows = [];
    let tickerArray = Object.values(props.ticker);
    let numRows = tickerArray.length;

    for (var i = 0; i < numRows; i++) {
        let symbol = tickerArray[i].symbol;
        if( props.filter.includes(symbol) ){
            rows.push(
                <React.Fragment key={symbol}>
                    <div className="d-none d-sm-inline">
                        <Link className="row table-row small py-1" to={`trade/${symbol}`}>
                            <div className="col">{symbol}</div>
                            <div className="col">{new BigNumber(tickerArray[i].lastPrice).toFormat(null,1)}</div>
                            <div className={tickerArray[i].priceChangePercent < 0 ? 'col text-danger' : 'col text-success'}>{`${new BigNumber(tickerArray[i].priceChangePercent).toFormat(2,1)}%`}</div>
                            <div className="col">{new BigNumber(tickerArray[i].highPrice).toFormat(null,1)}</div>
                            <div className="col">{new BigNumber(tickerArray[i].lowPrice).toFormat(null,1)}</div>
                            <div className="col">{new BigNumber(tickerArray[i].quoteVolume).toFormat(null,1)}</div>
                        </Link>
                    </div>
                    <div className="d-inline d-sm-none">
                        <Link className="row table-row small py-1" to={`trade/${symbol}`}>
                            <div className="col-12">
                                <span className="font-weight-bold">{symbol}</span> <span>{new BigNumber(tickerArray[i].lastPrice).toFormat(null,1)}</span> <span className={tickerArray[i].priceChangePercent < 0 ? 'text-danger' : 'text-success'}>{`${new BigNumber(tickerArray[i].priceChangePercent).toFormat(2,1)}%`}</span>
                            </div>
                            <div className="col-4">
                                <div className="font-weight-light text-muted small">24h High</div> 
                                <span className="small">{new BigNumber(tickerArray[i].highPrice).toFormat(null,1)}</span>
                            </div>
                            <div className="col-4">
                                <div className="font-weight-light text-muted small">24h Low</div> 
                                <span className="small">{new BigNumber(tickerArray[i].lowPrice).toFormat(null,1)}</span>
                            </div>
                            <div className="col-4">
                                <div className="font-weight-light text-muted small">24h Volume</div> 
                                <span className="small">{new BigNumber(tickerArray[i].quoteVolume).toFormat(null,1)}</span>
                            </div>
                        </Link>
                    </div>
                </React.Fragment>
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