import React, { lazy, Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

const Home = lazy(() => import('./HomePage/Home'));
const Member = lazy(() => import('./MemberPage/Member'));
const Transaction = lazy(() => import('./TransactionPage/Transaction'));
const AddTransaction = lazy(() => import('./TransactionPage/AddTransaction'));

const App = () => (
  <Router>
    <Suspense fallback={<Spinner animation="border" />}>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/member" component={Member}></Route>
        <Route exact path="/transaction" component={Transaction}></Route>
        <Route exact path="/transaction/add" component={AddTransaction}></Route>
      </Switch>
    </Suspense>
  </Router>
);

export default App;
