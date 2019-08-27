import { useState, useEffect,useReducer,useCallback  } from 'react'
import http from "helper/http";

const useTable = (columns, pageSize, host, url, params,isPagination=true) => {
  let initPagination = {
    pageSize,
    current: 1,
    total:0
  }
  const [pagination,setPagination] = useState(initPagination)
  const [loading, setLoading] = useState(false);
  const [getParams, setParams] = useState(params);
  const initialList = [];   
  const reducer = (state,action) => {
    if(action.type === 'success'){
        return [...action.list];
     }else if(action.type === 'fail'){
        return [];
     }else{
       throw new Error();
     }
 }
  const [dataSource, dispatch] = useReducer(reducer, initialList);
  
  const callbackSource = useCallback(async ()=>{
      setLoading(true);
      let p = isPagination?{ ...{ page:pagination.current, size:pagination.pageSize }, ...params }:getParams;
      try {
        const result = await http.get(`${host}${url}`, { params: p });
        if (result && result.data.errcode === 0) {
          let list = result.data.data;
          dispatch({type:'success',list})
          if(isPagination){
            const {total_item_count} = result.data.pager;
            setPagination(Object.assign(pagination,{total:total_item_count}));
           
          }else{
            setPagination(false);
          }
          setLoading(false);
        }else{
          dispatch({type:'fail'})
          setLoading(false);
        }
      } catch (error) {
        dispatch({type:'fail'})
        setLoading(false);
      }
    
  },[pagination.current])
  useEffect(() => {
    callbackSource();
  }, [callbackSource]);
  const initSearch = p => {
    setParams(Object.assign(getParams,p));
     callbackSource();
  }
  return {
    initSearch: p => initSearch(p),
    currentList:dataSource,
    setDataSource:list => dispatch({type:'success',list}),
    bind: {
      dataSource,
      columns,
      loading,
      pagination,
      onChange: e => setPagination({...pagination,...{current:e.current}}),
      rowKey: (record, index) => index,
      locale: { emptyText: "暂无数据" }
    }
  }
}

export default useTable;