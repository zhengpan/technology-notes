# useCallBack 示例代码

```javascript
// app.js
import React from 'react'

import ParentComponent from './components/ParentComponent.jsx'

const App = () => {
  return (
    <div className="App">
      <ParentComponent />
    </div>
  )
}

export default App
```

```js
// ParentComponenet.js
import React, { useState,useCallback } from 'react'
import Title from './Title'
import Count from './Count.jsx'
import Button from './Button.jsx'

const ParentComponenet = () => {
  const [age, setAge] = useState(29)
  const [salary, setSalary] = useState(50000)

  // 增加年龄
  const incrementAge = useCallback(() => {
    setAge(age + 1)
  },[age])
  // 增加薪水
  const incrementSalary = useCallback(() => {
    setSalary(salary + 1000)
  },[salary])
  return (
    <div>
      <Title />
      <Count
        text="Age"
        count={age}
      />
      <Button handleClick={incrementAge}>Increment age</Button>
      <Count
        text="Salary"
        count={salary}
      />
      <Button handleClick={incrementSalary}>Increment salary</Button>
    </div>
  )
}

export default ParentComponenet
```

```js
// Button.js
import React from 'react'

function Button(props) {
  console.log('Rendering button', props.children)
  return (
    <button onClick={props.handleClick}>
      {props.children}
    </button>
  )
}

export default React.memo(Button)
```

```js
// count.js
import React from 'react'

function Count(props) {
  console.log(`Rendering ${props.text}`)
  return (
    <div>
      {props.text} - {props.count}
    </div>
  )
}

export default React.memo(Count);
```

```js
import React from 'react'

function Title() {
  console.log('Rendering Title')
  return (
    <h2>useCallback</h2>
  )
}

export default React.memo(Title)
```

