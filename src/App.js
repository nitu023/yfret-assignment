import React from 'react';
// import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Suspense} from 'react';  
// import Footer from '../src/component/Footer';
import WishList from '../src/component/WishList'

const MediaCard = React.lazy(() => import('../src/component/Card'));

function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
      <Suspense fallback={<div>Loading...</div>}>
        <Route exact path="/" component={MediaCard}></Route>
      </Suspense>
        <Route exact path="/wishlist" component={WishList}></Route>
      </Switch>
      </BrowserRouter>
       
    </div>
  );
}

export default App;
