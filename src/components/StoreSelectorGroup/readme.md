# StoreSelector
朴朴管理后台门店选择器
## Usage
```js
import React, {Component} from 'react'
import StoreSelector from 'components/StoreSelector';

const App = props => {
  const onChangeSingle = v => {
    // v为所选中值  --数组
  }
  const onChangeMultiple = v => {
    // v为所选中值  --数组
  }
  const onChangeSelectStore = data => {
    // { type, city, store} = data;  -- type 门店类型  city 城市数组 store门店数组

  }
  return (
    
    <div>
      <StoreSelectorGroup onChange={v=>onChangeSingle(v)}></StoreSelectorGroup>
      <StoreSelectMultiple onChange={v=>onChangeMultiple(v)}></StoreSelectMultiple>
      <SelectStore  onChange={data=>onChangeSelectStore(data)}></SelectStore>
    </div>
    
  )
}

```

## 属性props
prop | description | default | type
---|--- | ---|--- 
storeTypes | 门店类型(-1为不限、1为非DC门店、0为DC门店) | -1 | number
storeShowNotOnline | 是否显示未上线门店(0为不显示,1为显示) | 0 | number
citySelectUnlimited | 是否可选不限城市(0为不显示,1为显示) | 1 | number
citySelect | 是否可选城市(0为不可以,1为可以) | 1   | number
storeType | 指定显示门店类型（-1全部，0普通门店，1普通门店） | -1   | number
isPermission | 是否进行权限控制(0为不可以,1为可以) | 1 | number
isStoreEmpty | 是否有“空门店”选项(0为没有,1为有) |  0  | number

## 事件onChange
- 返回数据
-StoreSelectorGroup 组件
[] -- 选中的值
-StoreSelectMultiple 组件
[] -- 选中的值
-SelectStore 组件
{
    type: 20, //类型
    city:[],//城市对象列表
    store:[] //门店对象列表
}
```
