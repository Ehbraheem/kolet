import React from "react";
import * as Svg from "react-native-svg";

export default function MailIc({width, height, ...props}) {
  return (
    <Svg.Svg
      width={width}
      height={height}
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Svg.G id="mail-01">
        <Svg.Path
          id="Vector"
          d="M1.90112 2.94059L5.28919 4.8603C6.53824 5.56801 7.06598 5.56801 8.31505 4.8603L11.7031 2.94059"
          stroke={props.stroke|| "#999999"}
          strokeWidth="0.735148"
          strokeLinejoin="round"
        />
        <Svg.Path
          id="Vector_2"
          d="M1.90885 6.60438C1.94089 8.10683 1.95691 8.858 2.51128 9.41451C3.06564 9.97097 3.83718 9.99033 5.38025 10.0291C6.33128 10.053 7.27295 10.053 8.22399 10.0291C9.76707 9.99033 10.5386 9.97097 11.093 9.41451C11.6473 8.858 11.6634 8.10683 11.6954 6.60438C11.7057 6.12129 11.7057 5.64109 11.6954 5.158C11.6634 3.65558 11.6473 2.90437 11.093 2.3479C10.5386 1.79142 9.76707 1.77204 8.22399 1.73327C7.27295 1.70937 6.33127 1.70937 5.38025 1.73326C3.83718 1.77203 3.06564 1.79142 2.51127 2.34789C1.95691 2.90437 1.94089 3.65558 1.90885 5.158C1.89855 5.64109 1.89855 6.12129 1.90885 6.60438Z"
          stroke={props.stroke|| "#999999"}
          strokeWidth="0.735148"
          strokeLinejoin="round"
        />
      </Svg.G>
    </Svg.Svg>
  );
}
