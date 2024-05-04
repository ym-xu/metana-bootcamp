// FIXME: Clean up commented code blocks

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, {useState} from 'react';

function App(){
  const [state, setState] = useState({count: 4, theme: 'blue'})
  const count = state.count
  const theme = state.theme

  function decrementCount(){
    setState(prevState => {
      return {...prevState, count: prevState.count - 1} 
  })
  }
  function incrementCount(){
    setState(prevState => {
      return {...prevState, count: prevState.count + 1} 
  })
  }

  return (
    <>
      <button onClick = {decrementCount}> - </button>
      <span>{count}</span>
      <button onClick = {incrementCount}>+</button>
    </>
  )
}

export default App;