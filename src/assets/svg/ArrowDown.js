import { Svg, Path } from 'react-native-svg'
import React from 'react'

const ArrowDown = props => (
    <Svg width={props.width} height={props.height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M11 14.6667C10.7858 14.6671 10.5782 14.5925 10.4133 14.4559L4.9133 9.87255C4.7261 9.71696 4.60838 9.49337 4.58603 9.25098C4.56368 9.00859 4.63854 8.76725 4.79413 8.58005C4.94973 8.39285 5.17331 8.27513 5.4157 8.25278C5.6581 8.23043 5.89944 8.30529 6.08663 8.46088L11 12.5675L15.9133 8.60755C16.0071 8.53141 16.115 8.47454 16.2308 8.44023C16.3466 8.40592 16.468 8.39483 16.5881 8.40761C16.7082 8.42039 16.8246 8.45678 16.9306 8.51469C17.0366 8.5726 17.1302 8.65088 17.2058 8.74505C17.2897 8.8393 17.3533 8.94988 17.3926 9.06984C17.4318 9.18981 17.4458 9.31659 17.4338 9.44223C17.4217 9.56787 17.3838 9.68967 17.3225 9.8C17.2612 9.91032 17.1778 10.0068 17.0775 10.0834L11.5775 14.5109C11.4078 14.6259 11.2045 14.6808 11 14.6667V14.6667Z" fill={props.fill}/>
    </Svg>
)

export default ArrowDown