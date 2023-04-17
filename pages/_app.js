import { func } from 'prop-types';
import Navbar from '../component/Navbar';
import { setService } from '../redux/ServiceSlice';
import { store } from '../store';
import '../styles/globals.css'
import { Provider, useDispatch } from "react-redux";
import Footer from '../component/Footer';
import Lottie from 'lottie-react';
import lottiefile from '../assets/lottie.json'

export default function App ( { Component, pageProps } )
{

  return (
    <Provider store={ store }>
      <Navbar />
      <div className="backS"></div>


      <Component { ...pageProps } />

    </Provider> )
}


