import React, { useEffect, useState } from 'react'

import styles from './index.module.css'

import { Layout, Form, Row, Col, Input, Button, Menu, Dropdown, Icon, Tabs, Modal, message, Popconfirm } from 'antd';

import WORD_FILE from './data'
const wordType = [
  { name: '父词同义词', label: 'parent_synonym', color: '', key: 'parent_word_synonym_list', isSynonym: true },
  { name: '父词', label: 'parent', color: '', key: 'parent_word_list', isSynonym: false },
  { name: '同义词', label: 'text', color: '', key: 'text', isSynonym: false },
  { name: '子词', label: 'child', color: '', key: 'child_word_list', isSynonym: false },
  { name: '子词同义词', label: 'child_synonym', color: '', key: 'child_word_synonym_list', isSynonym: true },
]
const WordFile = props => {
  // const wordId = getUrlParam('id');
  const [wordList, setWordList] = useState([]);
  const [value,setValue] = useState('')
  useEffect(() => {
    const getWordDetail = async () => {
      // const result = await http.get(`${host}/admin/product/products/word/detail?wordId=${wordId}`);
      // if (result && result.data.errcode === 0) {
      //   // setWordList(result.data.data)
      //   const data = result.data.data;
      let list = WORD_FILE.synonym_list;
      let wordResult = [];

      list.map(item => Object.assign(item, { count: getCurrentItemMaxCount(item) }))
      console.log(list)
      setWordList(list);
      // wordList = list;
      // }
    }
    getWordDetail();
  }, [])
  const onChangeSingle = v => {
    // v为所选中值  --数组
  }
  const onChangeMultiple = v => {
    // v为所选中值  --数组
  }
  const onChangeSelectStore = data => {
    // { type, city, store} = data;  -- type 门店类型  city 城市数组 store门店数组

  }
  const getParentAndChildWord = (parentWordList,count) => {
    // if (parentWordList && parentWordList.length > 0) {
      console.log('----23-------')
      // console.log(parentWordList)
      let countList = [];
      for(let j = 0; j < count;j++){
        countList.push(j)
      }
      return countList.map((list, i) =>
        (
          parentWordList && parentWordList.length> 0 && parentWordList[i] && i<= parentWordList.length ?
          <div key={i} className={styles['word-center']}>{parentWordList[i].text}</div>
          :<div key={i} className={styles['word-center']} style={{ height: '41px' }}></div>
        )
        
      )

    // }
  }
  const getParentAndChildSynonymWord = (parentWordList,count) => {
    // if (parentWordList && parentWordList.length > 0) {
      let countList = [];
      for(let j = 0 ;j < count;j++){
        countList.push(j)
      }
      return countList.map((list, i) =>
        (
          parentWordList && parentWordList.length> 0 && i<= parentWordList.length && parentWordList[i] && parentWordList[i].synonym_list ? 
          <div key={i} className={styles['word-center']}>{parentWordList[i].synonym_list.toString()}</div> 
          : <div key={i} className={styles['word-center']} style={{ height: '41px' }}></div>
        )
      )
    // }
  }
  const getCurrentItemMaxCount = item => {
    console.log('----2334-------')
    const { parent_word_list, child_word_list } = item;
    let parentCout = 1;
    let childCount = 1;
    if (parent_word_list && parent_word_list.length > 0) {
      parentCout = getCurrentListMaxCount(parent_word_list)
    }
    if (child_word_list && child_word_list.length > 0) {
      childCount = getCurrentListMaxCount(child_word_list)
    }

    return parentCout > childCount ? parentCout : childCount;

  }
  const getCurrentListMaxCount = (list) => {
    let count = list.length;
    list.forEach(item => {
      const { synonym_list } = item;
      if (synonym_list && synonym_list.length > 0) {
        if (synonym_list.length > count) {
          count = synonym_list.length;
        }
      }
    })
    return count;
  }
  return (
    // <NewContentContainer>
    <div style={{ background: "#fff", padding: 24, margin: 0 }}>
      {
        wordList.map((list, i) =>
          <div key={list.word_id} className={styles['flex']} style={{ marginTop: i > 0 ? '10px' : 0 }}>
            <div className={styles['flex-width-full']} style={{ backgroundColor: '#f1f8fe' }}>
              {i === 0 && <div className={styles['word-center-white']}>父词同义词</div>}
              <div >
                {getParentAndChildSynonymWord(list.parent_word_list,list.count)}
              </div>
            </div>
            <div className={styles['flex-width-full']} style={{ backgroundColor: '#dbf1ff' }}>
              {i === 0 && <div className={styles['word-center-white']}>父词</div>}
              <div>
                {getParentAndChildWord(list.parent_word_list,list.count)}
              </div>
            </div>
            <div className={styles['flex-width-full']} style={{ backgroundColor: '#b9e3fc' }}>
              {i === 0 && <div className={styles['word-center-white']}>同义词</div>}
              <div className={styles['bg-fixed-center']} style={{ top: i > 0 ? '0px' : '40px' }}>{list.text}</div>
            </div>
            <div className={styles['flex-width-full']} style={{ backgroundColor: '#f1f8fe' }}>
              {i === 0 && <div className={styles['word-center-white']}>字词</div>}
              <div >
                {getParentAndChildWord(list.child_word_list,list.count)}
              </div>
            </div>
            <div className={styles['flex-width-full']} style={{ backgroundColor: '#dbf1ff' }}>
              {i === 0 && <div className={styles['word-center-white']}>字词同义词</div>}
              <div>
                {getParentAndChildSynonymWord(list.child_word_list,list.count)}
              </div>
            </div>
          </div>
        )
      }
      <Input value={value} onChange={e=>setValue(e.target.value)}></Input>
    </div>
    // </NewContentContainer>

  )
}
export default WordFile;