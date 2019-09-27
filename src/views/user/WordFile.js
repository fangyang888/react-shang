import React, { useEffect, useState } from 'react'
import { getUrlParam } from "helper/util";
import http from "helper/http";
import microservice from 'helper/microservice';
import styles from './index.module.css'
import NewContentContainer from 'components/NewContentContainer';
import { Layout, Form, Row, Col, Input, Button, Menu, Dropdown, Icon, Tabs, Modal, message, Popconfirm } from 'antd';
const host = microservice.javaAdmin;
import StoreSelectorGroup from 'components/StoreSelectorGroup'
const { StoreSelectMultiple } = StoreSelectorGroup;
const { SelectStore } = StoreSelectorGroup;
const wordType = [
  { name: '父词同义词', label: 'parent_synonym', color: '', key: 'parent_word_synonym_list', isSynonym: true },
  { name: '父词', label: 'parent', color: '', key: 'parent_word_list', isSynonym: false },
  { name: '同义词', label: 'text', color: '', key: 'text', isSynonym: false },
  { name: '子词', label: 'child', color: '', key: 'child_word_list', isSynonym: false },
  { name: '子词同义词', label: 'child_synonym', color: '', key: 'child_word_synonym_list', isSynonym: true },
]
const WordFile = props => {
  const wordId = getUrlParam('id');
  const [wordList, setWordList] = useState([])
  useEffect(() => {
    const getWordDetail = async () => {
      const result = await http.get(`${host}/admin/product/products/word/detail?wordId=${wordId}`);
      if (result && result.data.errcode === 0) {
        // setWordList(result.data.data)
        const data = result.data.data;
        const list = data.synonym_list;
        console.log('------')
        console.log(list)
        let wordResult = [];
        // if (list && list.length > 0) {
        //   list.forEach(item => {
        //     const { child_word_list, parent_word_list } = item;
        //     if (child_word_list && child_word_list.length > 0) {
        //       const childSynonymList = [];
        //       child_word_list.forEach(c => {
        //         const { synonym_list } = c;
        //         if (synonym_list && synonym_list.length > 0) {
        //           childSynonymList.push(...synonym_list.map(s => { return { text: s } }))
        //         }
        //       })
        //       item['child_word_synonym_list'] = childSynonymList;
        //     }
        //     if (parent_word_list && parent_word_list.length > 0) {
        //       const parentSynonymList = [];
        //       parent_word_list.forEach(c => {
        //         const { synonym_list } = c;
        //         if (synonym_list && synonym_list.length > 0) {
        //           parentSynonymList.push(...synonym_list.map(s => { return { text: s } }))
        //         }
        //       })

        //       item['parent_word_synonym_list'] = parentSynonymList;
        //     }
        //     wordResult.push(item);
        //   })
        // }
        console.log(wordResult)
        setWordList(list);
        // wordList = list;
      }
    }
    getWordDetail();
  }, [wordId])
  const onChangeSingle = v => {
    // v为所选中值  --数组
  }
  const onChangeMultiple = v => {
    // v为所选中值  --数组
  }
  const onChangeSelectStore = data => {
    // { type, city, store} = data;  -- type 门店类型  city 城市数组 store门店数组

  }
  const getParentAndChildWord = (parentWordList) => {
    if (parentWordList && parentWordList.length > 0) {
      return parentWordList.map(word =>
        <div key={word.word_id} className={styles['word-center']}>{word.text}</div>
      )

    }
  }
  const getParentAndChildSynonymWord = (parentWordList) => {
    if (parentWordList && parentWordList.length > 0) {
      return parentWordList.map((list, i) =>
        (
          list.synonym_list ? <div key={i} className={styles['word-center']}>{list.synonym_list.toString()}</div> : <div key={i} className={styles['word-center']} style={{ height: '41px' }}></div>
        )
      )
    }
  }
  return (
    <NewContentContainer>
      <Layout style={{ background: "#fff", padding: 24, margin: 0 }}>
        {
          wordList.map((list, i) =>
            <div key={list.word_id} className={styles['flex']} style={{ marginTop: i > 0 ? '10px' : 0 }}>
              <div className={styles['flex-width-full']} style={{ backgroundColor: '#f1f8fe' }}>
                {i === 0 && <div className={styles['word-center-white']}>父词同义词</div>}
                <div >
                  {getParentAndChildSynonymWord(list.parent_word_list)}
                </div>
              </div>
              <div className={styles['flex-width-full']} style={{ backgroundColor: '#dbf1ff' }}>
                {i === 0 && <div className={styles['word-center-white']}>父词</div>}
                <div>
                  {getParentAndChildWord(list.parent_word_list)}
                </div>
              </div>
              <div className={styles['flex-width-full']} style={{ backgroundColor: '#b9e3fc' }}>
                {i === 0 && <div className={styles['word-center-white']}>同义词</div>}
                <div className={styles['bg-fixed-center']} style={{ top: i > 0 ? '0px' : '40px' }}>{list.text}</div>
              </div>
              <div className={styles['flex-width-full']} style={{ backgroundColor: '#f1f8fe' }}>
                {i === 0 && <div className={styles['word-center-white']}>字词</div>}
                <div >
                  {getParentAndChildWord(list.child_word_list)}
                </div>
              </div>
              <div className={styles['flex-width-full']} style={{ backgroundColor: '#dbf1ff' }}>
                {i === 0 && <div className={styles['word-center-white']}>字词同义词</div>}
                <div>
                  {getParentAndChildSynonymWord(list.child_word_list)}
                </div>
              </div>
            </div>
          )
        }
      </Layout>
    </NewContentContainer>

  )
}
export default WordFile;