import { Svg, Path } from 'react-native-svg'
import React from 'react'

const Heart = props => (
    <Svg width={props.width} height={props.height} viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M13 21.25C12.8355 21.2509 12.6724 21.2194 12.5201 21.1572C12.3678 21.095 12.2293 21.0033 12.1125 20.8875L2.39996 11.1625C1.18166 9.93146 0.498291 8.26945 0.498291 6.53749C0.498291 4.80553 1.18166 3.14352 2.39996 1.91249C3.62779 0.688129 5.291 0.000579834 7.02496 0.000579834C8.75892 0.000579834 10.4221 0.688129 11.65 1.91249L13 3.26249L14.35 1.91249C15.5778 0.688129 17.241 0.000579834 18.975 0.000579834C20.7089 0.000579834 22.3721 0.688129 23.6 1.91249C24.8183 3.14352 25.5016 4.80553 25.5016 6.53749C25.5016 8.26945 24.8183 9.93146 23.6 11.1625L13.8875 20.8875C13.7707 21.0033 13.6321 21.095 13.4798 21.1572C13.3275 21.2194 13.1645 21.2509 13 21.25ZM7.02496 2.49999C6.49581 2.49759 5.97144 2.60022 5.48222 2.80191C4.99301 3.0036 4.54868 3.30036 4.17496 3.67499C3.42004 4.43389 2.99626 5.4608 2.99626 6.53124C2.99626 7.60168 3.42004 8.62859 4.17496 9.38749L13 18.225L21.825 9.38749C22.5799 8.62859 23.0037 7.60168 23.0037 6.53124C23.0037 5.4608 22.5799 4.43389 21.825 3.67499C21.0545 2.94713 20.0348 2.54161 18.975 2.54161C17.9151 2.54161 16.8954 2.94713 16.125 3.67499L13.8875 5.92499C13.7713 6.04215 13.633 6.13514 13.4807 6.19861C13.3284 6.26207 13.165 6.29474 13 6.29474C12.8349 6.29474 12.6716 6.26207 12.5192 6.19861C12.3669 6.13514 12.2287 6.04215 12.1125 5.92499L9.87496 3.67499C9.50125 3.30036 9.05692 3.0036 8.5677 2.80191C8.07849 2.60022 7.55412 2.49759 7.02496 2.49999Z" fill={props.fill}/>
    </Svg>
)

export default Heart