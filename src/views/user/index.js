import React, { useState,useEffect,useReducer,useRef } from 'react'
import { Tabs,Spin,Table, Button,Input} from 'antd';
import useSimpleTable from '../../hooks/useSimpleTable.js'
import SelectTree from '../../components/SelectTree'
import Panel from './Panel';
import WordFile from './WordFile';
import StoreSelectorGroup from './StoreSelectorGroup';
const {SelectStore} = StoreSelectorGroup;
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
              return <a>{text}</a>;
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
    
    // useEffect(() => {
    //   const id = setTimeout(()=>{
    //     dispatch({type:'tick'});
      
    //    },2000);
      
    //    return () =>clearTimeout(id);
    // }, [dispatch])
    // useEffect(()=>{
    //   console.log(params.page)
    // },[params.page])
    const onChange = v => {
      console.log(v)
    }
    return (
      <div>
         <Input value={value} onChange={e=>setValue(e.target.value)}></Input>
         <Table  {...bind}
         />
         {/* <Button onClick={()=>dispatch({type:'tick',list:[{name:'rte'}]})}>设置{params.page}</Button>
         <Button onClick={()=>setParams({...params,page:params.page+1})}>添加</Button> */}
         {/* <SelectTree></SelectTree> */}
         <WordFile></WordFile>
         {/* <SelectStore onChange={e=>onChange(e)}></SelectStore> */}
      </div>
     
    )
}

export default User;