import { combineReducers } from 'redux'

const MarketPairs = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_MARKET_PAIRS':
            return Object.assign({}, action.data)      
        case 'UPDATE_MARKET_PAIRS':
            return Object.assign({}, state, action.data)
        default:
            return state
    }
}

const ActiveMarket = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_MARKET':
            return Object.assign({}, action.data)
        default:
            return state
    }
}

const Ticker = (state = {}, action) => {
    switch (action.type) {
        case 'SET_TICKER':
            return Object.assign({}, action.data)
        default:
            return state
    }
}

const Trades = (state = {}, action) => {
    switch (action.type) {
        case 'SET_TRADES':
            return action.data
        default:
            return state
    }
}

const Depth = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DEPTH':
            return Object.assign({}, action.data)
        default:
            return state
    }
}

export default combineReducers({
    market_pairs: MarketPairs,
    active_market: ActiveMarket,
    ticker: Ticker,
    trades: Trades,
    depth: Depth
})