

const getCity = () => {
    return [
        { "zip": 350100, "name": "福州市" }, 
        { "zip": 350200, "name": "厦门市" }, 
        // { "zip": 440300, "name": "深圳市" }
    ];
}
const getStore = zip => {
    if(zip === 350100){
        return [
            { "id": "6660fb8b-9a97-417c-ab47-1ef9c102e64a", "name": "福州1店（仓⼭山融 信）", "city": "福州市", "code": 101, "abbr_name": "FZ-01", "city_zip": 350100 }, 
            { "id": "eaa4a00c-2098-4ec5abf2-65ca645d4bee", "name": "福州2店（仓⼭山⾦金金华）", "city": "福州市", "code": 102, "abbr_name": "FZ-02", "city_zip": 350100 }, 
            { "id": "de3f2bea-ca2e-4629-b6a7-17a8633bcec5", "name": "福州6店（仓⼭山上渡）", "city": "福州市", "code": 106, "abbr_name": "FZ-06", "city_zip": 350100 }]
    }else{
        return [
          {
            abbr_name: "SZ-01",
            city: "深圳市",
            city_zip: 440300,
            code: 301,
            id: "d4859c8c-b95c-4820-a13d-0a68f8654c11",
            name: " 深圳1店（福田福民）"
          }
        ]
    }
   
//    return [
//         {
//           title: 'Child Node1',
//           value: '0-0-1',
//           key: '0-0-1',
//         },
//         {
//           title: 'Child Node2',
//           value: '0-0-2',
//           key: '0-0-2',
//         },
//       ]
}
const data = [
    { title: 'Expand to load', key: '022', value: '44'  },
    { title: 'Expand to load1', key: '133', value: '132'  },
 
]
const getChildren = key =>{
    if(key == '022'){
      return [
          { title: 'Child Node', key: `${key}-0`, value: `${key}-0`, isLeaf: true  },
          { title: 'Child Node1', key: `${key}-1`, value: `${key}-1`, isLeaf: true  },
          { title: 'Child Node2', key: `${key}-2`, value: `${key}-2`, isLeaf: true  },
      ]
    }
    return [
        { title: 'Child Node12', key: `${key}-3`, value: `${key}-3` , isLeaf: true },
        { title: 'Child Node13', key: `${key}-4`, value: `${key}-4` , isLeaf: true },
        { title: 'Child Node14', key: `${key}-5`, value: `${key}-5` , isLeaf: true },
    ]
}
export {
    getCity,
    getStore,
    data,
    getChildren
}
