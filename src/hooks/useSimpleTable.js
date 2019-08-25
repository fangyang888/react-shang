import React,{useState,useEffect,useRef} from 'react'
let s = [];
const useSimpleTable = (list,columns) => {
  s = list;
  const [dataSource,setDataSource] = useState(s=>s);
  console.log('--------------')
  console.log(list)
  useEffect(()=>{
    setDataSource(l=>l)
  },[])
  return{
    setDataSource:l => {console.log('list',l); return setDataSource(l)},
    bind:{
      dataSource, 
      columns,
      pagination:false
    }
  }
    
  
}

export default useSimpleTable;