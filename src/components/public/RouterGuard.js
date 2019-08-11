import React, { Component } from 'react'
import Loadable from 'react-loadable'

class RouterGuard extends Component{
    constructor(props){
        super()
    }
   render(){
    let { component } = this.props;
    console.log(component)
    const LoadableComponent = Loadable({
        loader: () => import(`../../views/${component}`),
        loading: () => (
          <span>2345</span>
        )
      })
       return(
         <div> 
         <LoadableComponent {...this.props}></LoadableComponent>
         </div>
       )
   }
}

export default RouterGuard;


