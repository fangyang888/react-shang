import React, { useState,useEffect,useReducer,useRef } from 'react'
import { Tabs,Spin,Table, Button,Input,Popover} from 'antd';
import useSimpleTable from '../../hooks/useSimpleTable.js';
import ajax from '../../api/index'
import SelectTree from '../../components/SelectTree'
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
  const initialList = [{name:123,age:23,tel:13456754567},{}] 
  const [visible,setVisible] = useState(false);
    const columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          key:'age',
          dataIndex: 'age',
          render: (text, row, index) => {
            if (index < initialList.length-1) {
              return (<Popover placement="top" trigger="click"  title='修改商品上限数' visible={visible} onVisibleChange={v=>setVisible(v)}  content={<div>close</div>} ><a>{text}</a> </Popover>);
            }
            return {
              children: <span>总计</span>,
              
            };
          },
        },{
          title: '手机',
          dataIndex: 'tel',
          key: 'tel',
        }
      ];
    // const [params,setParams] = useState({page:1,total:2})
    const [count,setCount] = useState(0)
    const [value,setValue] = useState('')

    const reducer = (state,action) => {
      console.log('======')
       console.log(state);
       console.log(action);
       if(action.type === 'tick'){
            console.log('useReducer');
            setCount(2)
            return [...state,...[{name:456,age:23}]];
        }else{
          throw new Error();
        }
    }
    const [list, dispatch] = useReducer(reducer, initialList);
    const {setDataSource,bind} =  useSimpleTable(list,columns);
    // const [list,setList] = useState([{name:'123'}]);
    
  
    useEffect(()=>{
      setTimeout(()=>{
      
      },1000)
    
    },[])
    const onChange = v => {
      console.log(v)
    }
    return (
      <div>
    
         <Table  {...bind}></Table>
         
       
         
       
      </div>
     
    )
}

export default User;