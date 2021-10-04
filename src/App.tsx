import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.scss';
import { CounterReduxToolkit } from './features/counter/counter-redux-toolkit/Counter';
import { CounterRedux } from './features/counter/counter-redux/Counter';
import { CounterZustand } from './features/counter/counter-zustand/Counter';
import { Dogs } from './features/dogs/dogs';
import { MineSweeperFC } from './features/mine-sweeper/minesweeper-refactored/mine-sweeper';
import { MineSweeperZustand } from './features/mine-sweeper/minesweeper-zustand/mine-sweeper';
import { MineSweeper } from './features/mine-sweeper/minesweeper/mine-sweeper';


function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/counter-redux">Redux</Link>
                        </li>
                        <li>
                            <Link to="/counter-redux-toolkit">Redux toolkit</Link>
                        </li>
                        <li>
                            <Link to="/counter-zustand">Zustand</Link>
                        </li>
                        <li>
                            <Link to="/MineSweeper">MineSweeper</Link>
                        </li>
                        <li>
                            <Link to="/MineSweeperFC">MineSweeperFC</Link>
                        </li>
                        <li>
                            <Link to="/MineSweeperZustand">MineSweeperZustand</Link>
                        </li>
                        {/*<li>*/}
                        {/*    <Link to="/Dogs">Dog breed list</Link>*/}
                        {/*</li>*/}
                    </ul>
                </nav>
                <Switch>
                    <Route path="/counter-redux" exact component={CounterRedux} />
                    <Route path="/counter-redux-toolkit" exact component={CounterReduxToolkit} />
                    <Route path="/counter-zustand" exact component={CounterZustand} />
                    <Route path="/MineSweeper" exact component={MineSweeper} />
                    <Route path="/MineSweeperFC" exact component={MineSweeperFC} />
                    <Route path="/MineSweeperZustand" exact component={MineSweeperZustand} />
                    <Route path="/Dogs" exact component={Dogs} />
                    <Route exact path="/">
                        <h1>Redux vs Zustand and Class vs Functional</h1>
                        <br /><br />
                        <h3>
                            <a href="https://docs.google.com/presentation/d/1DPToqqTVP0_Xernw2U8KfQTudcH_IcyDWrm4JPJH8YQ/edit?usp=sharing">
                                Slides
                            </a>
                        </h3>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
