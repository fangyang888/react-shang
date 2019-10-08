import React, { useState, useEffect, useCallback } from 'react'
import { TreeSelect } from 'antd';
import PropTypes from 'prop-types';
import { getCity, getStore } from './constants';
const { TreeNode, SHOW_PARENT } = TreeSelect;
let all = [{ title: '全部门店', key: -1, value: -1, children: [] }]
const MultipleSearch = props => {
  const { storeType, storeShowNotOnline,isPermission } = props;
  const [treeData, setTreeData] = useState([])
  const [value, setValue] = useState(undefined)
  useEffect(() => {
    const fetchCity = async () => {
      const params = {
        store_type:storeType,
        is_open: storeShowNotOnline ? true : false,
        // permission_check:isPermission ? true : false
      }
      const data = await getStore(params);
      all[0].children = data
      setTreeData(all);
   }
    fetchCity();
  }, [storeType])
  const onChange = (value, label, extra) => {
    setValue(value)
    props.onChange(value)
  };
  return (
    <TreeSelect
      style={{ width: '100%' }}
      treeCheckable
      multiple
      treeData={treeData}
      value={value}
      showCheckedStrategy={SHOW_PARENT}
      onChange={(value, label, extra) => onChange(value, label, extra)}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
    >
    </TreeSelect >
  )
}
MultipleSearch.prototype = {
  storeType: PropTypes.oneOf([-1, 0, 1]), //展示门店类型
  storeShowNotOnline: PropTypes.oneOf([0, 1]),//是否显示未上线门店
  isPermission: PropTypes.oneOf([0, 1]),//是否进行权限控制
  onChange: PropTypes.func
}
MultipleSearch.defaultProps = {
  storeType: -1, //-1为不限
  storeShowNotOnline: 0,//默认不显示未上线门店
 isPermission: 1//默认进行权限控制
};
export default MultipleSearch;
