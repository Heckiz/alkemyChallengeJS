import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

axios.defaults.baseURL='http://localhost:8080/'
axios.defaults.headers.common['Authorization']= 'Bearer ' + localStorage.getItem('token');
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
