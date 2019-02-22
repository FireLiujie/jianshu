import React, { Component, Fragment } from 'react'
import { GlobalStyle } from './style'
import { IconFontStyle } from './statics/iconfont/iconfont'
import Header from './common/header'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/home'
import Detail from './pages/detail'

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Fragment>
					<GlobalStyle />
					<IconFontStyle />
					<BrowserRouter>
						<div>
						<Header />
							<Route path="/" exact component={Home} />
							<Route path="/detail" exact component={Detail} />
						</div>
					</BrowserRouter>
				</Fragment>
			</Provider>
		)
	}
}

export default App
