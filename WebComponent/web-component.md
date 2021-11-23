# web component 基础
Web Components主要由三项技术组成，分别为 Custom elements（自定义元素） Shadow DOM（影子DOM） * HTML templates（HTML模板）

![web component概述图](https://pic3.zhimg.com/80/v2-1ff640edb21454a9e5bb858d760030e2_1440w.jpg)
## 1.1 Custom elements（自定义元素）
custom elements也就是我们常说的自定义标签，它主要通过CustomElementRegistry接口来定义，CustomElementRegistry.define(name, class, extends) 方法用来注册一个custom element，该方法接受以下参数：

name 所创建的元素名称，且需符合 DOMString 标准的字符串。注意，custom element 的名称不能是单个单词，且其中必须要有短横线
class 用于定义元素行为的类
extends 可选参数，一个包含 extends 属性的配置对象，指定了所创建的元素继承自哪个内置元素，可以继承任何内置元素。
具体案例如下：

```javascript
customElements.define('word-count', class WordCount extends HTMLParagraphElement {
    constructor() {
      super();

      // 元素的功能代码
      ...
    }}, 
    { extends: 'p' }
);
```
**custom element的生命周期回调函数**
* connectedCallback：当 custom element首次被插入文档DOM时，被调用 
* disconnectedCallback：当 custom element从文档DOM中删除时，被调用 
* adoptedCallback：当 custom element被移动到新的文档时，被调用 
* attributeChangedCallback: 当 custom element增加、删除、修改自身属性时，被调用

## 1.2 Shadow DOM（影子DOM）
Shadow DOM 接口可以将一个隐藏的、独立的 DOM附加到一个元素上，并且允许将隐藏的 DOM 树附加到常规的 DOM 树中：以 shadow root 节点为起始根节点，在这个根节点的下方，可以是任意元素，和普通的 DOM 元素一样。MDN对其有一张详细的草图方便大家理解：

![shadow dom](https://pic3.zhimg.com/80/v2-40a877f6482fcf9055f315bf50d8b8a2_1440w.jpg)

上图中4个术语意思如下： 
* Shadow host：一个常规 DOM节点，Shadow DOM 会被附加到这个节点上。
* Shadow tree：Shadow DOM内部的DOM树。
* Shadow boundary：Shadow DOM结束的地方，也是常规 DOM开始的地方。
* Shadow root: Shadow tree的根节点

如果我们想将一个 Shadow DOM 附加到 custom element 上，可以在 custom element 的构造函数中添加如下实现：

```javascript
class Button extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({mode: 'open'});
  }
}
```
我们将 Shadow DOM 附加到一个元素之后，可以使用 DOM APIs对它进行操作，如下：
```javascript
class Button extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({mode: 'open'});
    let para = document.createElement('p');
    shadow.appendChild(para);
  }
}
```
我们甚至可以将样式插入到Shadow DOM中， 如下：
```javascript
let style = document.createElement('style');

style.textContent = `
    .btn-wrapper {
      position: relative;
    }
    .btn {
        // ...
    }
`

shadow.appendChild(style);
```

以上是定义组件的最基本方式，一个完整的demo如下：

```javascript
class Button extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({mode: 'open'});
    let para = document.createElement('p');
    shadow.appendChild(para);
    let style = document.createElement('style');

    style.textContent = `
        .btn-wrapper {
          position: relative;
        }
        .btn {
            // ...
        }
    `

    shadow.appendChild(style);
  }
}
customElements.define('xu-button', Button);
```

## 1.3 HTML templates（HTML模板）
emplate 和 slot 元素可以用来灵活填充 Web组件的 shadow DOM 的模板.它们的使用很简单，有点类似于vue的template和slot。一个简单的tempalte例子如下： html <template id="xu_tpl"> <p>趣谈前端</p> </template> 我们可以用 JavaScript 获取它的引用，然后添加到DOM中，代码如下:
```javascript
let template = document.getElementById('xu_tpl');
let templateContent = template.content;
document.body.appendChild(templateContent);
```
至于slot，使用和vue的slot有点类似，主要提供一种插槽机制，比如我们在模版中定义一个插槽：
```html
<template id="xu_tpl">
  <p><slot name="xu-text">趣谈插槽</slot></p>
</template>
```
我们可以这么使用slot：
```html
<xu-button>
  <span slot="xu-text">趣谈前端，让前端更有料!</span>
</xu-button>
```
原文地址：[点我](https://zhuanlan.zhihu.com/p/150268517?from_voters_page=true)


