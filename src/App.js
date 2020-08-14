import React,{ lazy, Suspense} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Footer from '../src/component/Footer'

const Home = lazy(() => import('./component/Home'));
const Wishlist = lazy(() => import('./component/WishList'));
const Cart = lazy(() => import('./component/Cart'));


function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/wishlist" component={Wishlist}></Route>
            <Route exact path="/cart" component={Cart}></Route>
          </Switch>
        </Suspense>     
      </BrowserRouter>
      <div style={{bottom:0, position:"fixed" , width:"100%"}}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
