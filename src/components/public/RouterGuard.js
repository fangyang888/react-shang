import React, { Component,Suspense, lazy } from 'react'
import Loadable from 'react-loadable'
import { Spin } from 'antd';
class RouterGuard extends Component{
    constructor(props){
        super()
    }
   render(){
    let { component } = this.props;
    console.log(component)
    // const LoadableComponent = Loadable({
    //     loader: () => import(`../../views/${component}`),
    //     loading: () => (
    //       <span>2345</span>
    //     )
    //   })
       const LoadableComponent = lazy(() => import(`../../views/${component}`))
       return(
         <div> 
           <Suspense fallback={<Spin></Spin>}>
             <LoadableComponent {...this.props}></LoadableComponent>
         </Suspense>
         </div>
       )
   }
}

export default RouterGuard;


