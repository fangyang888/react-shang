import React,{useState,useEffect,useCallback} from 'react'
import { TreeSelect  } from 'antd';
import PropTypes from 'prop-types';
import {getCity,getStore,data,getChildren} from './constants';
const { TreeNode,SHOW_PARENT} = TreeSelect ;
const SingleSearch = props => {
  const { storeTypes, storeShowNotOnline, citySelectUnlimited,citySelect,isPermission} = props;
  //  const onChange = (value, selectedOptions) => {
  //    props.onChange(value);
  // };
  const [treeData,setTreeData] = useState([])
  const [value,setValue] = useState(['44'])
  useEffect(()=>{
    // const data = getCity();
    // const list = data.map(item=>Object.assign(item,{key:item.zip,title:item.name,value:item.zip}));
    setTreeData(data);
  },[storeTypes])
  const onLoadData = treeNode => 
    new Promise(resolve => {
        if (treeNode.props.children) {
          resolve();
          return;
        }
        setTimeout(() => {
          const store = getChildren(treeNode.props.dataRef.key);
          treeNode.props.dataRef.children = store
          console.log(treeData)
          setTreeData([...treeData]);
          resolve();
        }, 1000);
      });
  
  const renderTreeNodes = data => {
    console.log('treeData',treeData)
    const list=  data.map((item,i) => {
      // if (item.children) {
      //   return (
      //     <TreeNode title={item.title} key={item.key} dataRef={item}>
      //       {renderTreeNodes(item.children)}
      //     </TreeNode>
      //   );
      // }
      // return <TreeNode key={item.key} {...item} dataRef={item} />;
      return (
        <TreeNode {...item} key={item.key} dataRef={item}>
          {item.children && renderTreeNodes(item.children)}
        </TreeNode>
      );
    });
    console.log(list)
    return list;
  }
   
   
  
   const onChange = value => {
     console.log(value)
     setTimeout(()=>{
      setValue(value)
     })

  
  };
  const onTreeExpand = expandedKeys =>{
    console.log('========')
    console.log(expandedKeys)
  }
   return(
     <TreeSelect 
     style={{ width: 300 }}  
     treeCheckable 
     multiple  
     value={value}
     showCheckedStrategy={SHOW_PARENT}
     loadData={treeNode=>onLoadData(treeNode)}
     onChange={value=> onChange(value)}
     onTreeExpand={expandedKeys=>onTreeExpand(expandedKeys)}
    //  treeData={treeData}
     >
         {renderTreeNodes(treeData)}
     </TreeSelect >
   )
}
SingleSearch.prototype = {
  storeTypes: PropTypes.oneOf([-1, 0, 1]), //展示门店类型
  storeShowNotOnline: PropTypes.oneOf([ 0, 1]),//是否显示未上线门店
  citySelectUnlimited: PropTypes.oneOf([ 0, 1]),//是否可选不限城市
  citySelect: PropTypes.oneOf([ 0, 1]),//是否可选城市
  isPermission:PropTypes.oneOf([ 0, 1])//是否进行权限控制
}
SingleSearch.defaultProps = {
  storeTypes: -1, //-1为不限
  storeShowNotOnline: 0,//默认不显示未上线门店
  citySelectUnlimited: 1,//	默认可选
  citySelect: 1,//默认可以
  isPermission:1//默认进行权限控制
};
export default SingleSearch;
