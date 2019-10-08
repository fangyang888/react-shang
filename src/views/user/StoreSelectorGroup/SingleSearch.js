import React, { useState, useEffect, useCallback } from 'react'
import { Cascader } from 'antd';
import PropTypes from 'prop-types';
import { getCity, getStore } from './constants';
const SingleSearch = props => {
  const { storeType, storeShowNotOnline, citySelectUnlimited, citySelect, isPermission,isStoreEmpty,storeEmptyName } = props;
  const [options, setOptions] = useState([]);
  const callbackCity = useCallback(async () => {
    const params = {
      store_type:storeType,
      is_open: storeShowNotOnline ? true : false,
      // permission_check:isPermission ? true : false
    }
    const storeEmpty = isStoreEmpty ? [{ label: storeEmptyName, value:'00000000-0000-0000-0000-000000000000', isLeaf: true }] : [];
    const unlimited = citySelectUnlimited ? [{ label: '不限', value: -1, isLeaf: true}] : [];
    let list = await getStore(params);
    setOptions([...storeEmpty,...unlimited, ...list]);
  }, [storeType,storeShowNotOnline,isPermission])
  useEffect(() => {
    callbackCity();
  }, [callbackCity])
  const onChange = (value, selectedOptions) => {
    props.onChange(value);
  };
  return (
    <Cascader
      defaultValue={[-1]}
      options={options}
      onChange={(value, selectedOptions) => onChange(value, selectedOptions)}
      style={{ width: '100%' }}
      expandTrigger="hover"
      placeholder="请选择"
      allowClear={false}
      changeOnSelect={citySelect ? true : false}
    />
  )
}
SingleSearch.prototype = {
  storeType: PropTypes.oneOf([-1, 0, 1]), //展示门店类型
  storeShowNotOnline: PropTypes.oneOf([0, 1]),//是否显示未上线门店
  citySelectUnlimited: PropTypes.oneOf([0, 1]),//是否可选不限城市
  citySelect: PropTypes.oneOf([0, 1]),//是否可选城市
  isPermission: PropTypes.oneOf([0, 1]),//是否进行权限控制
  isStoreEmpty: PropTypes.oneOf([0, 1]),//是否有“空门店”选项
  storeEmptyName:PropTypes.string // 空门店命名
}
SingleSearch.defaultProps = {
  storeType: -1, //-1为不限
  storeShowNotOnline: 0,//默认不显示未上线门店
  citySelectUnlimited: 1,//	默认可选
  citySelect: 1,//默认可以
  isPermission: 1,//默认进行权限控制
  isStoreEmpty: 0 ,//默认没有
  storeEmptyName:'暂不绑定门店'
};
export default SingleSearch;