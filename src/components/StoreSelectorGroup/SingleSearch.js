import React, { useState, useEffect, useCallback } from 'react'
import { Cascader } from 'antd';
import PropTypes from 'prop-types';
import { getCity, getStore } from './constants';
const SingleSearch = props => {
  const { storeTypes, storeShowNotOnline, citySelectUnlimited, citySelect, isPermission,isStoreEmpty } = props;
  const [options, setOptions] = useState([]);
  const callbackCity = useCallback(async () => {
    const params = {
      level: 1, //市
      is_enabled: storeShowNotOnline,
      permission_check:isPermission ? true : false
    }
    const storeEmpty = isStoreEmpty ? [{ name: '暂不绑定门店', id:'00000000-0000-0000-0000-000000000000', isLeaf: true }] : [];
    const unlimited = citySelectUnlimited ? [{ name: '不限', id: -1, isLeaf: false, children: [{ name: '不限', id: -1 }] }] : [];
    let list = await getCity(params);
    if (list) {
      const city = list.map(({ name, zip }) => Object.assign({}, { name, id: zip, isLeaf: false, value: zip}));
      setOptions([...storeEmpty,...unlimited, ...city]);
    }

  }, [])
  useEffect(() => {
    callbackCity();
  }, [callbackCity])
  const onChange = (value, selectedOptions) => {
    props.onChange(value);
  };

  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const area_zip = targetOption.id;
    if (!citySelectUnlimited || area_zip !== -1) { //当不限城市的时候  area_zip 等于-1 不请求数据
      targetOption.loading = true;
      const params = {
        store_type: storeTypes,
        city_zip: area_zip,
        is_open: storeShowNotOnline ? true : false,
        permission_check:isPermission ? true : false
      }
      const data = await getStore(params);
      const storeList = data.area_stores[0].stores;
      targetOption.loading = false;
      targetOption.children = storeList.map(item => Object.assign({}, { name: item.abbr_name,id:item.code,value:item.code,key:item.code }));
      console.log(targetOption.children)
      setOptions(c => [...c, [targetOption]]);
      console.log(options)

    }

  };
  return (
    <Cascader
      defaultValue={[-1, -1]}
      fieldNames={{ label: 'name', value: 'id' }}
      options={options}
      loadData={selectedOptions => loadData(selectedOptions)}
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
  storeTypes: PropTypes.oneOf([-1, 0, 1]), //展示门店类型
  storeShowNotOnline: PropTypes.oneOf([0, 1]),//是否显示未上线门店
  citySelectUnlimited: PropTypes.oneOf([0, 1]),//是否可选不限城市
  citySelect: PropTypes.oneOf([0, 1]),//是否可选城市
  isPermission: PropTypes.oneOf([0, 1]),//是否进行权限控制
  isStoreEmpty: PropTypes.oneOf([0, 1])//是否有“空门店”选项
}
SingleSearch.defaultProps = {
  storeTypes: -1, //-1为不限
  storeShowNotOnline: 0,//默认不显示未上线门店
  citySelectUnlimited: 1,//	默认可选
  citySelect: 0,//默认可以
  isPermission: 1,//默认进行权限控制
  isStoreEmpty: 1 //默认没有
};
export default SingleSearch;