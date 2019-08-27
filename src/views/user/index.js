import React, { useState,useEffect,useReducer } from 'react'
import { Tabs,Spin,Table, Button} from 'antd';
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
       if(action.type === 'tick'){
            console.log('useReducer');
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
      
       },2000);
      
       return () =>clearTimeout(id);
    }, [dispatch])
   
    return (
      <div>
         <Table {...bind} />
         <Button onClick={()=>dispatch({type:'tick'})}>设置</Button>
      </div>
     
    )
}

export default User;