import React from "react";
import * as Svg from 'react-native-svg';
export default function PhoneIC({width, height, ...props}) {
  return (
    <Svg.Svg
      width={width}
      height={height}
      viewBox="0 0 13 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Svg.G id="smart-phone-01">
        <Svg.Path
          id="Vector"
          d="M3.37134 4.125C3.37134 2.61258 3.37134 1.85637 3.87375 1.38652C4.37616 0.916668 5.18479 0.916668 6.80203 0.916668C8.41926 0.916668 9.22787 0.916668 9.73032 1.38652C10.2327 1.85637 10.2327 2.61258 10.2327 4.125V6.875C10.2327 8.38741 10.2327 9.14361 9.73032 9.6135C9.22787 10.0833 8.41926 10.0833 6.80203 10.0833C5.18479 10.0833 4.37616 10.0833 3.87375 9.6135C3.37134 9.14361 3.37134 8.38741 3.37134 6.875V4.125Z"
          stroke={props.stroke || "#999999"}
          stroke-width="0.6875"
          stroke-linecap="round"
        />
        <Svg.Path
          id="Vector_2"
          d="M6.31201 8.70833H7.29221"
          stroke={props.stroke || "#999999"}
          strokeWidth="0.6875"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Svg.Path
          id="Vector_3"
          d="M5.33179 0.916668L5.37541 1.16143C5.46994 1.69184 5.5172 1.95705 5.71171 2.11844C5.91461 2.28678 6.20225 2.29167 6.80208 2.29167C7.40192 2.29167 7.68956 2.28678 7.89246 2.11844C8.08698 1.95705 8.13422 1.69184 8.22876 1.16143L8.27238 0.916668"
          stroke={props.stroke || "#999999"}
          strokeWidth="0.6875"
          strokeLinejoin="round"
        />
      </Svg.G>
    </Svg.Svg>
  );
}
