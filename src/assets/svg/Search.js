import { Svg, Path } from 'react-native-svg'
import React from 'react'

const Search = props => (
    <Svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M22.8875 21.1125L18.6375 16.875C20.0087 15.1281 20.7528 12.9708 20.75 10.75C20.75 8.77219 20.1635 6.83879 19.0647 5.1943C17.9659 3.54981 16.4041 2.26809 14.5768 1.51121C12.7496 0.754333 10.7389 0.556299 8.7991 0.942152C6.85929 1.328 5.07746 2.28041 3.67894 3.67894C2.28041 5.07746 1.328 6.85929 0.942152 8.7991C0.556299 10.7389 0.754333 12.7496 1.51121 14.5768C2.26809 16.4041 3.54981 17.9659 5.1943 19.0647C6.83879 20.1635 8.77219 20.75 10.75 20.75C12.9708 20.7528 15.1281 20.0087 16.875 18.6375L21.1125 22.8875C21.2287 23.0047 21.367 23.0977 21.5193 23.1611C21.6716 23.2246 21.835 23.2573 22 23.2573C22.165 23.2573 22.3284 23.2246 22.4807 23.1611C22.633 23.0977 22.7713 23.0047 22.8875 22.8875C23.0047 22.7713 23.0977 22.633 23.1611 22.4807C23.2246 22.3284 23.2573 22.165 23.2573 22C23.2573 21.835 23.2246 21.6716 23.1611 21.5193C23.0977 21.367 23.0047 21.2287 22.8875 21.1125ZM3.25 10.75C3.25 9.26664 3.68987 7.8166 4.51398 6.58323C5.33809 5.34986 6.50943 4.38857 7.87988 3.82091C9.25033 3.25325 10.7583 3.10473 12.2132 3.39411C13.668 3.6835 15.0044 4.39781 16.0533 5.4467C17.1022 6.4956 17.8165 7.83197 18.1059 9.28683C18.3953 10.7417 18.2468 12.2497 17.6791 13.6201C17.1114 14.9906 16.1502 16.1619 14.9168 16.986C13.6834 17.8101 12.2334 18.25 10.75 18.25C8.76088 18.25 6.85323 17.4598 5.4467 16.0533C4.04018 14.6468 3.25 12.7391 3.25 10.75Z" fill={props.fill}/>
    </Svg>

)

export default Search