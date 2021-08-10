# Vue响应式原理
**利用Object.defineProperty + 观察者模式对数据和模版进行绑定，对于数据来说需要进行更新时，触发相应的getter和setter函数，在setter函数中收集依赖，触发对应的视图层更新。**






