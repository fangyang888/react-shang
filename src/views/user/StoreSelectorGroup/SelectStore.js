import React, { useState, useEffect, useCallback } from 'react'
import { Radio, Checkbox, Button, Row } from 'antd';
import PropTypes from 'prop-types';
import { getCity, getStore } from './constants';
import styles from './index.module.css'
const CheckboxGroup = Checkbox.Group;

const SelectStore = props => {
    const { storeType, storeShowNotOnline, isPermission, style } = props;
    const [type, setType] = useState(-1);
    const [cityOptions, setCityOptions] = useState([]);
    const [cityValue, setCityValue] = useState([]);
    const [storeOptions, setStoreOptions] = useState([]);
    const [storeList, setStoreList] = useState([]);
    const [storeMap, setStoreMap] = useState({});
    const [selectParams, setSelectParams] = useState({ checkedList: [], indeterminate: false, checkAll: false })
    const [citySelected, setCitySelected] = useState('');
    const [indeterminateMap, setIndeterminateMap] = useState({});
    const callbackCity = useCallback(async () => {
        const params = {
            store_type: storeType,
            is_open: storeShowNotOnline ? true : false,
            // permission_check:isPermission ? true : false
        }
        const list = await getStore(params);
        setCityOptions(list);
        setStoreOptions(list);

    }, [storeType, storeShowNotOnline])
    useEffect(() => {
        callbackCity();
    }, [callbackCity])
    useEffect(() => {
        props.onChange({ type, city: [], store: [] })
    }, [type])
   const getCityToStore = async value => {
        setCitySelected(value)
        const store = storeOptions.find(item => item.value === value);
        const stores = store.children;
        setStoreList(stores);
        // const {checkedList} = selectParams;
        console.log(storeMap)
        let checkedList = [];
        if(storeMap && Object.keys(storeMap).length > 0){
           const keys = Object.keys(storeMap);
           console.log('==key==');
           console.log(keys)
           if(keys.includes(value)){
            console.log('=======')
            checkedList = storeMap[value];
           }
        }
        console.log(checkedList)
        // const checkedList = selectedStore;
        setSelectParams(c=>Object.assign(c, {indeterminate: !!checkedList.length && checkedList.length < stores.length, checkAll: checkedList.length === stores.length }) )
       
    }
    const onCheckAllChange = e => {
        const checked = e.target.checked;
        const list = storeList.map(({ value }) => value);
        const data = checked ? list : [];
        setStoreMap(c => Object.assign(c, { [citySelected]: data }));
        setSelectParams({ checkedList: data, indeterminate: false, checkAll: checked })
        setChangeValue(Object.assign(storeMap, { [citySelected]: data }))
    }
    const changeStore = (checkedList, c, a) => {
        setStoreMap(c => Object.assign(c, { [citySelected]: checkedList }))
        setSelectParams(
            { checkedList, indeterminate: !!checkedList.length && checkedList.length < storeList.length, checkAll: checkedList.length === storeList.length }
        )
        setChangeValue(Object.assign(storeMap, { [citySelected]: checkedList }));
        console.log('storeMap',storeMap)
    }
    const setChangeValue = v => {
        const store = getAllStore(v);
        props.onChange({ type, city: [], store })
    }
    const changeCity = v => {
        setCityValue(v);
        props.onChange({ type, city: v, store: [] })
    }
    const getAllStore = map => {
        const keys = Object.keys(map);
        let list = []
        if (keys.length > 0) {
            keys.forEach(k => {
                list.push(...map[k]);
            })
        }
        return list;
    }
    return (
        <div>
            <Radio.Group style={{ ...{ 'lineHeight': '42px' }, ...{ style } }} size="small" onChange={v => setType(v.target.value)} value={type}>
                <Radio value={-1}>不限门店</Radio>
                <Radio value={1}>指定城市</Radio>
                <Radio value={2}>指定门店</Radio>
            </Radio.Group>
            {
                type === 1 && <Row style={{ 'lineHeight': '3em' }}>
                    <Checkbox.Group options={cityOptions} onChange={(v) => changeCity(v)} />
                </Row>
            }
            {
                type === 2 && <Row >
                    <Radio.Group style={{ 'lineHeight': '4em' }} onChange={e => getCityToStore(e.target.value)}>
                        {
                            cityOptions.map(({ label, value }) =>
                                <Radio.Button key={value} value={value}>{label}</Radio.Button>
                            )
                        }
                    </Radio.Group>
                    {
                        storeList.length > 0 &&
                        <Row>
                            <Checkbox
                                indeterminate={selectParams.indeterminate}
                                onChange={e => onCheckAllChange(e)}
                                checked={selectParams.checkAll}
                            >
                                全选
                       </Checkbox>
                            <Row>
                                <CheckboxGroup
                                    options={storeList}
                                    value={selectParams.checkedList}
                                    onChange={list => changeStore(list)}
                                />
                            </Row>
                        </Row>
                    }
                </Row>
            }

        </div>
    )
}
SelectStore.prototype = {
    storeType: PropTypes.oneOf([-1, 0, 1]), //展示门店类型
    storeShowNotOnline: PropTypes.oneOf([0, 1]),//是否显示未上线门店
    citySelectUnlimited: PropTypes.oneOf([0, 1]),//是否可选不限城市
    citySelect: PropTypes.oneOf([0, 1]),//是否可选城市
    isPermission: PropTypes.oneOf([0, 1]),//是否进行权限控制
    isStoreEmpty: PropTypes.oneOf([0, 1]),//是否有“空门店”选项
    style: PropTypes.object
}
SelectStore.defaultProps = {
    storeType: -1, //-1为不限
    storeShowNotOnline: 0,//默认不显示未上线门店
    citySelectUnlimited: 1,//	默认可选
    citySelect: 1,//默认可以
    isPermission: 1,//默认进行权限控制
    isStoreEmpty: 0 //默认没有
};
export default SelectStore;