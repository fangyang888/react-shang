import React, { useState,useEffect,useReducer,useRef } from 'react'
import { Tabs,Spin,Table, Button} from 'antd';
import useSimpleTable from '../../hooks/useSimpleTable.js'
import Panel from './Panel';
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
    const ref = useRef(null);
    const [params,setParams] = useState({page:1,total:2})
    const [count,setCount] = useState(0)
    const initialList = [{name:123}]  
    const reducer = (state,action) => {
      console.log('======')
       console.log(state);
       console.log(action);
       if(action.type === 'tick'){
            console.log('useReducer');
            setCount(2)
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
    useEffect(()=>{
      console.log(params.page)
    },[params.page]);
    const getChild = () => {
      ref.current.cleanValue();
    }
    return (
      <div>
         <Table {...bind} />
         <Button onClick={()=>dispatch({type:'tick',list:[{name:'rte'}]})}>设置{params.page}</Button>
         <Button onClick={()=>getChild()}>添加</Button>
         <Panel ref={ref}></Panel>
      </div>
     
    )
}

export default User;