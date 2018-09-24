import React from 'react'
import { Link } from 'react-router-dom'
import Binance from './Binance.svg'

const AppHeader = () => (
    <header>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">
                <img src={Binance} height="25" alt="Binance Logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <span className="small text-white-50">Order books and trade history viewer web app</span>
            </div>
        </nav>
    </header>
);  
  
export default AppHeader;