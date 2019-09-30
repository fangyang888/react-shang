import React, { useState, useEffect, useCallback } from 'react'
import { TreeSelect } from 'antd';
import PropTypes from 'prop-types';
import { getCity, getStore } from './constants';
const { TreeNode, SHOW_PARENT } = TreeSelect;
const all = [{ title: '全部门店', key: -1, value: -1, children: [] }]
const MultipleSearch = props => {
  const { storeTypes, storeShowNotOnline, citySelectUnlimited, citySelect, isPermission } = props;
  const [treeData, setTreeData] = useState([])
  const [value, setValue] = useState(undefined)
  useEffect(() => {
    const fetchCity = async () => {
      const params = {
        level: 1, //市
        is_enabled: storeShowNotOnline,
        permission_check:isPermission ? true : false
      }
      const data = await getCity(params);
      if (data) {
        const list = data.map(item => Object.assign({}, { key: item.zip, title: item.name, value: item.zip }));
        all[0].children = list
        setTreeData(all);
      }

    }
    fetchCity();
  }, [storeTypes])
  const onLoadData = treeNode => {
    return new Promise(async resolve => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      const params = {
        store_type: storeTypes,
        city_zip: treeNode.props.dataRef.value,
        is_open: storeShowNotOnline ? true : false,
        permission_check:isPermission ? true : false
      }
      const data = await getStore(params);
      const storeList = data.area_stores[0].stores;
      treeNode.props.dataRef.children = storeList.map(({ abbr_name, code }) => Object.assign({}, { title: abbr_name, value: code, key: code, isLeaf: true }));
      setTreeData([...treeData]);
      resolve();
    });
  }
  const renderTreeNodes = data =>
    data.map(item =>
      <TreeNode {...item} key={item.key} dataRef={item}>
        {item.children && renderTreeNodes(item.children)}
      </TreeNode>
    );

  const onChange = (value, label, extra) => {
    setValue(value)
    props.onChange(value)
  };
  return (
    <TreeSelect
      style={{ width: '100%' }}
      treeCheckable
      multiple
      value={value}
      showCheckedStrategy={SHOW_PARENT}
      loadData={treeNode => onLoadData(treeNode)}
      onChange={(value, label, extra) => onChange(value, label, extra)}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}

    >
      {renderTreeNodes(treeData)}
    </TreeSelect >
  )
}
MultipleSearch.prototype = {
  storeTypes: PropTypes.oneOf([-1, 0, 1]), //展示门店类型
  storeShowNotOnline: PropTypes.oneOf([0, 1]),//是否显示未上线门店
  citySelectUnlimited: PropTypes.oneOf([0, 1]),//是否可选不限城市
  citySelect: PropTypes.oneOf([0, 1]),//是否可选城市
  isPermission: PropTypes.oneOf([0, 1]),//是否进行权限控制
  onChange: PropTypes.func
}
MultipleSearch.defaultProps = {
  storeTypes: -1, //-1为不限
  storeShowNotOnline: 0,//默认不显示未上线门店
  citySelectUnlimited: 1,//	默认可选
  citySelect: 1,//默认可以
  isPermission: 1//默认进行权限控制
};
export default MultipleSearch;
