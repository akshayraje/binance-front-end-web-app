import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Loading from '../common/Loading'
import Ticker from './Ticker'
import TradeHistory from './TradeHistory'
import OrderBook from './OrderBook'

class Trade extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
        this.tradesCount = 100;
        this.streams = ['@ticker','@depth20','@trade'];
    }

    _connectSocketStreams(streams) {
        streams = streams.join('/');
        let connection = btoa(streams);
        this[connection] = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
        this[connection].onmessage = evt => { 
            let eventData = JSON.parse(evt.data);
            if(eventData.stream.endsWith('@ticker')){
                eventData.data.lastc = this.state.ticker ? this.state.ticker.c : 0
                this.props.dispatch({
                    type: 'SET_TICKER',
                    data: eventData.data
                })     
                this.setState({
                    loadedTicker: true
                })   
            }
            if(eventData.stream.endsWith('@trade')){
                if(this.props.trades && Object.keys(this.props.trades).length > 0){
                    let trades = this.props.trades;
                    trades.push(eventData.data);
                    trades = trades.slice(-1*this.tradesCount);
                    this.props.dispatch({
                        type: 'SET_TRADES',
                        data: trades
                    }) 
                    this.setState({
                        loadedTrades: true
                    }) 
                }              
            }
            if(eventData.stream.endsWith('@depth20')){
                this.props.dispatch({
                    type: 'SET_DEPTH',
                    data: eventData.data
                }) 
                this.setState({
                    loadedDepth: true
                }) 
            }
            this.setState({
                isLoaded: true
            })  
        };
        this[connection].onerror = evt => {
            console.error(evt);
        }
    }

    _disconnectSocketStreams(streams){
        streams = streams.join('/');
        let connection = btoa(streams);
        if (this[connection].readyState === WebSocket.OPEN) {
            this[connection].close();
        }
    } 

    componentDidMount() {

        let symbol = this.props.match.params.symbol.toLowerCase();
        this._connectSocketStreams(this.streams.map(i => `${symbol}${i}`));

        axios({
            method: 'get',
            url: `https://cors-anywhere.herokuapp.com/https://www.binance.com/api/v1/aggTrades?limit=${this.tradesCount}&symbol=${this.props.match.params.symbol}`
        })
        .then(response => {
            this.props.dispatch({
                type: 'SET_TRADES',
                data: response.data
            }) 
            this.setState({
                isLoaded: true,
                loadedTrades: true
            }) 
        })
        .catch(error => {
            this.setState({
                isLoaded: false,
                error: error
            })
        });
    }

    componentWillUnmount() {
        let symbol = this.props.match.params.symbol.toLowerCase();
        this._disconnectSocketStreams(this.streams.map(i => `${symbol}${i}`))
    }

    render() {
        const { error, isLoaded, loadedDepth, loadedTicker, loadedTrades } = this.state;
        if (error) {
          return <div className="alert alert-danger">{error.message}</div>;
        }
        if (!isLoaded) {
          return <Loading />;
        }
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">{loadedTicker ? <Ticker {...this.props.ticker} /> : <Loading />}</div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-6">{loadedTrades ? <TradeHistory trades={this.props.trades}/> : <Loading />}</div>
                    <div className="col-12 col-sm-6">{loadedDepth ? <OrderBook bids={this.props.depth.bids} asks={this.props.depth.asks} /> : <Loading />}</div>
                </div>
            </React.Fragment>    
      )
    }

}

export default connect(
    state => state
)(Trade)