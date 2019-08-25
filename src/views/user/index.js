import React, { useState,useEffect,useReducer } from 'react'
import { Tabs,Spin,Table} from 'antd';
import useSimpleTable from '../../hooks/useSimpleTable.js'
const { TabPane } = Tabs;

let tabKey = '1';
const tabPaneList = [
    { tab: '全部', key: '1' },
    { tab: '全部1', key: '2' },
    { tab: '全部2', key: '3' },
    { tab: '全部3', key: '4' },
]

const User = () => {
    const columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        }
      ];
    const initialList = [{name:123}]  
    const reducer = (state,action) => {
        // console.log('===========')
        // console.log(state)
        if(action.type === 'tick'){
            console.log('useReducer');
            console.log([...state,...[{name:456}]]);
            // setDataSource([...state,...[{name:456}]])
            return [...state,...[{name:456}]];
        }else{
          throw new Error();
        }
    }
    const [list, dispatch] = useReducer(reducer, initialList);
    const {setDataSource,bind} =  useSimpleTable(list,columns);
    // const [list,setList] = useState([{name:'123'}]);
    
    useEffect(() => {
      const id = setTimeout(()=>{
        dispatch({type:'tick'});
        // console.log('==dis==')
        // console.log(list)
        // setDataSource(list);
        // setDataSource(list) 
       },2000);
      
       return () => 
       
       clearTimeout(id);
    }, [dispatch])
   
    return (
      <Table {...bind} />
    )
}

export default User;