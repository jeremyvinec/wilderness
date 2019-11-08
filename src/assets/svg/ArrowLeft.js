import { Svg, Path } from 'react-native-svg'
import React from 'react'

const ArrowLeft = props => (
    <Svg width={props.width} height={props.height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M12.6774 17.4167C12.5405 17.4171 12.4052 17.3869 12.2815 17.3282C12.1577 17.2695 12.0487 17.1839 11.9624 17.0775L7.53495 11.5775C7.40012 11.4135 7.32642 11.2077 7.32642 10.9954C7.32642 10.7831 7.40012 10.5774 7.53495 10.4133L12.1183 4.91333C12.2739 4.72613 12.4975 4.60841 12.7398 4.58606C12.9822 4.56371 13.2236 4.63857 13.4108 4.79417C13.598 4.94976 13.7157 5.17334 13.738 5.41574C13.7604 5.65813 13.6855 5.89947 13.5299 6.08667L9.43245 11L13.3924 15.9133C13.5045 16.0479 13.5757 16.2117 13.5976 16.3855C13.6195 16.5592 13.5912 16.7356 13.516 16.8938C13.4407 17.0519 13.3218 17.1852 13.1732 17.2779C13.0246 17.3706 12.8526 17.4187 12.6774 17.4167Z" fill={props.fill}/>
    </Svg>
)

export default ArrowLeft