import React, { PureComponent, Fragment } from 'react'
import { GlobalStyle } from './style'
import { IconFontStyle } from './statics/iconfont/iconfont'
import Header from './common/header'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/home'
import Detail from './pages/detail/loadable'
import Login from './pages/login'
import Write from './pages/write'

class App extends PureComponent {
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
							<Route path="/detail/:id" exact component={Detail} />
							<Route path="/login" exact component={Login} />
							<Route path="/write" exact component={Write} />
						</div>
					</BrowserRouter>
				</Fragment>
			</Provider>
		)
	}
}

export default App
