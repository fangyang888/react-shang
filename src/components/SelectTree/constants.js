

const getCity = () => {
    return [
        { "zip": 350100, "name": "福州市" }, 
        // { "zip": 350200, "name": "厦门市" }, 
        // { "zip": 440300, "name": "深圳市" }
    ];
}
const getStore = () => {
    return [
        { "id": "6660fb8b-9a97-417c-ab47-1ef9c102e64a", "name": "福州1店（仓⼭山融 信）", "city": "福州市", "code": 101, "abbr_name": "FZ-01", "city_zip": 350100 }, 
        { "id": "eaa4a00c-2098-4ec5abf2-65ca645d4bee", "name": "福州2店（仓⼭山⾦金金华）", "city": "福州市", "code": 102, "abbr_name": "FZ-02", "city_zip": 350100 }, 
        { "id": "144822e6-9e8e-4eaf-a754-51ae7b57191c", "name": "福州3店（仓⼭山百花洲）", "city": "福州市", "code": 103, "abbr_name": "FZ-03", "city_zip": 350100 }, 
        { "id": "c3bf7de2-53b5-44bd-89bd-7eb043ff81c0", "name": "福州4店（仓⼭山 美林林湾）", "city": "福州市", "code": 104, "abbr_name": "FZ-04", "city_zip": 350100 }, 
        { "id": "af0eea11-1add-4455-bbdbe0ca7250facd", "name": "福州5店（仓⼭山复园）", "city": "福州市", "code": 105, "abbr_name": "FZ-05", "city_zip": 350100 }, 
        { "id": "de3f2bea-ca2e-4629-b6a7-17a8633bcec5", "name": "福州6店（仓⼭山上渡）", "city": "福州市", "code": 106, "abbr_name": "FZ-06", "city_zip": 350100 }]
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
const treeData = [
    { title: 'Expand to load', key: '0' },
    { title: 'Expand to load', key: '1' },
    { title: 'Tree Node', key: '2' },
]

export {
    getCity,
    getStore,
    treeData
}
