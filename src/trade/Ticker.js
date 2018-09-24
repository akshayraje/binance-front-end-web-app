import React from 'react'
import BigNumber from 'bignumber.js'

const Ticker = (props) => (
    <div className="card my-2 w-100">
        <div className="card-body">
            <div className="row">
                <div className="col-12 col-sm-2">
                    <h2>{props.s}</h2>
                </div>
                <div className="col-12 col-sm-2">
                    <div className="font-weight-light text-muted small">Last Price</div> 
                    <span className="font-weight-bold"><span className={new BigNumber(props.c).gte(new BigNumber(props.lastc)) ? 'text-success' : 'text-danger'}>{new BigNumber(props.c).toFormat(null,1)}</span></span>
                </div>  
                <div className="col-12 col-sm-2">
                    <div className="font-weight-light text-muted small">24h Change</div> 
                    <span className="font-weight-bold"><span className={props.p < 0 ? 'text-danger' : 'text-success'}>{`${new BigNumber(props.p).toFormat(null,1)} (${new BigNumber(props.P).toFormat(2,1)}%)`}</span></span>
                </div>        
                <div className="col-12 col-sm-2">
                    <div className="font-weight-light text-muted small">24h High</div> 
                    <span className="font-weight-bold">{new BigNumber(props.h).toFormat(null,1)}</span>
                </div>
                <div className="col-12 col-sm-2">
                    <div className="font-weight-light text-muted small">24h Low</div> 
                    <span className="font-weight-bold">{new BigNumber(props.l).toFormat(null,1)}</span>
                </div>
                <div className="col-12 col-sm-2">
                    <div className="font-weight-light text-muted small">24h Volume</div> 
                    <span className="font-weight-bold">{new BigNumber(props.q).toFormat(2,1)} {props.s.length === 7 ? props.s.slice(-4) : props.s.slice(-3)}</span>
                </div>
            </div>
        </div>
    </div>
)

export default Ticker;