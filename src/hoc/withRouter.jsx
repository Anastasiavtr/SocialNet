import React from "react";
import {useParams} from 'react-router-dom'

  


export const withRouter = (Component) => {
    let ComponentWithRouter = (props) => {
            return <Component {...props} params={useParams()} />
        }
        return ComponentWithRouter
    }
