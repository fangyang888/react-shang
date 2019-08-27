import React,{useState,useEffect,useRef} from 'react'

const useSimpleTable = (list,columns) => {

  // const [dataSource,setDataSource] = useState(s=>s);
  // console.log('--------------')
  // console.log(list)
  // useEffect(()=>{
  //   setDataSource(l=>l)
  // },[])
  return{
    setDataSource:l => list = l,
    bind:{
      dataSource:list, 
      columns,
      pagination:false
    }
  }
    
  
}

export default useSimpleTable;