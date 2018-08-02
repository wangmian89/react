import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';
import store from './store';
import './assets/css/comm.css';
import Home from './components/home/index';
import Conent from './components/art/conent';
import List from './components/art/list';
import Pcon from './components/product/content';
import Plist from './components/product/list';
import CarIndex from './components/car/index';
import Confirm from './components/car/confirm';
import Prompt from './components/comm/prompt';
import Centet from './components/centet/index';
import Viwe from './components/centet/viwe';
import Reg from './components/comm/reg';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <div>
                        <CookiesProvider>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/home' component={Home}/>
                            <Route exact path='/conent/:id' component={Conent}/>
                            <Route exact path='/contact/:id' component={Conent}/>
                            <Route exact path='/about/:id' component={Conent}/>
                            <Route exact path='/list/:id' component={List}/>
                            <Route exact path='/pcon/:id' component={Pcon}/>
                            <Route exact path='/plist/:id' component={Plist}/>
                            <Route exact path='/car' component={CarIndex}/>
                            <Route exact path='/confirm' component={Confirm}/>
                            <Route exact path='/prompt' component={Prompt}/>
                            <Route exact path='/centet' component={Centet}/>
                            <Route exact path='/viwe/:oNo' component={Viwe}/>
                            <Route exact path='/reg' component={Reg}/>
                        </CookiesProvider>
                    </div>
                </HashRouter>
            </Provider>
        );
    }
}

export default App;
