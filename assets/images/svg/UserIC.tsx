import * as Svg from 'react-native-svg';
import React from 'react'

export default function UserIC({width,height,...props}) {
  return (
    <Svg.Svg width={width} height={height} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Svg.G id="user">
    <Svg.Path id="Vector" d="M4.14448 7.58752C3.4511 8.00038 1.63311 8.8434 2.74039 9.89833C3.28129 10.4136 3.88371 10.7822 4.6411 10.7822H8.9629C9.7203 10.7822 10.3227 10.4136 10.8636 9.89833C11.9709 8.8434 10.1529 8.00038 9.45952 7.58752C7.83357 6.61933 5.77044 6.61933 4.14448 7.58752Z" stroke={props.stroke || "#999999"} fill={ props.fill || 'none'} strokeWidth="0.735148" strokeLinecap="round" strokeLinejoin="round"/>
    <Svg.Path id="Vector_2" d="M9.00757 3.18564C9.00757 4.40367 8.02017 5.39109 6.80213 5.39109C5.58409 5.39109 4.59668 4.40367 4.59668 3.18564C4.59668 1.96761 5.58409 0.980194 6.80213 0.980194C8.02017 0.980194 9.00757 1.96761 9.00757 3.18564Z" stroke={props.stroke || "#999999"} fill={ props.fill || 'none'}  strokeWidth="0.735148"/>
    </Svg.G >
    </Svg.Svg>
    
  )
}
