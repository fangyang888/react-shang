import React,{ useState, forwardRef, useRef, useImperativeHandle} from 'react'

const Panel = forwardRef((props, ref)  =>{

  console.log(ref)
  const getPanel = () => {
      console.log('123');
  }
  useImperativeHandle(ref, () => {
    return {
     cleanValue: getPanel
    }
 });
  return(
      <div ref={ref}>123</div>
  )

});

export default Panel;