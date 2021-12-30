let sourceData = [
  {
    label: '一级 1',
    id: '1',
    children: [
      {
        label: '二级 1-1',
        id: '1-1',
        // pid: '1',
        children: [
          {
            label: '三级 1-1-1',
            id: '1-1-1',
            // pid: '1-1',
          },
        ],
      },
      {
        label: '二级 1-2',
        id: '1-2',
        children: [
          {
            label: '三级 1-2-1',
            id: '1-2-1',
            // pid: '1-2',
          },
        ],
      },
    ],
  },
  {
    label: '一级 2',
    id: '2',
    children: [
      {
        label: '二级 2-1',
        id: '2-1',
        children: [
          {
            label: '三级 2-1-1',
            id: '2-1-1',
          },
        ],
      },
    ],
  },
]

// 先给每一层几点添加pid
function setParentId(arr, targetId) {
  const findArr = function (arr1, id) {
    arr1.forEach((item) => {
      if (id) {
        item.pid = id
      }
      if (item.children) {
        findArr(item.children, item.id)
      }
    })
  }
  const cloneArr = JSON.parse(JSON.stringify(arr)) // 深拷贝
  findArr(cloneArr)
  return cloneArr
}

const handleData = setParentId(sourceData)
console.log(JSON.stringify(handleData))

// 深度优先遍历----使用闭包保存局部变量，使用递归
function findParentName(arr, curId) {
  const temp = []
  const findArr = function (arr1, id) {
    for (let i = 0; i < arr1.length; i++) {
      const element = arr1[i]
      if (element.id === id) {
        temp.push(element.label)
        findArr(arr, element.pid)
        break
      } else {
        if (element.children) {
          findArr(element.children, id)
        }
      }
    }
  }
  findArr(arr, curId)
  return temp
}
console.log(findParentName(handleData, '1-1-1'))
