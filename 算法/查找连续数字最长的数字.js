// var regExp = /(1(?=2)|2(?=3)|3(?=4)|4(?=5)|5(?=6)|6(?=7)|7(?=8)|8(?=9)){2}\d/

var numArr = [2,4,789,9732,12345,563453,4567192]; // 找出12345

var handleArr = numArr.filter(item => {
    const itemStr = item.toString();
    const lastNum = itemStr.slice(-1);
    const firstNum = itemStr.slice(0, 1)
    console.log(lastNum,firstNum)
    return  lastNum - firstNum === itemStr.length - 1
} );

console.log(handleArr,'----先找出连续的数字')

let result;
if(handleArr.length){
    result = handleArr.reduce((pre,cur) => {
        return cur.toString().length > pre.toString().length? cur : pre
    },0)
}

console.log('最长的是：',result);
