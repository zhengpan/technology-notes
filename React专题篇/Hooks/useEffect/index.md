
# useEffect
---

传统的class component 缺点：
> 代码重复。设置标题的代码重复了1遍
> 代码分散。逻辑看起来就分散在了组件生命周期的各个地方

**useEffect 解决的问题**
* EffectHook 用于函数式组件中副作用，执行一些相关的操作，解决上述的问题
* 可以认为是 componentDidMount, componentDidUpdate, componentWillUnmount 的替代品

---
## 需要清除的 Effect (类似生命周期 componentWillUnmount)
useEffect 的第一个参数中添加一个 return 匿名函数，这个匿名函数将在组件卸载的时候执行，因此我们在这里移除监听就好了。




