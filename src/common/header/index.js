import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from './store'
import {
	HeaderWrapper,
	Logo,
	Nav,
	NavItem,
	SearchWrapper,
	NavSearch,
	SearchInfo,
	SearchInfoList,
	SearchInfoTitle,
	SearchInfoSwitch,
	SearchInfoItem,
	Addition,
	Button
} from './style'

import { Link } from 'react-router-dom'

class Header extends Component {
	render() {
		const { focused, handleInputBlur, hendleInputFocus, list } = this.props
		return (
			<HeaderWrapper>
				<Link to="/">
					<Logo />
				</Link>
				<Nav>
					<NavItem className="left active">首页</NavItem>
					<NavItem className="left">下载APP</NavItem>
					<NavItem className="right">
						<i className="iconfont">&#xe636;</i>
					</NavItem>
					<NavItem className="right">登录</NavItem>
					<SearchWrapper>
						<CSSTransition in={focused} timeout={200} classNames="slide">
							<NavSearch
								className={focused ? 'focused' : ''}
								onFocus={() => hendleInputFocus(list)}
								onBlur={handleInputBlur}
							/>
						</CSSTransition>
						<i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe614;</i>
						{this.getListArea()}
					</SearchWrapper>
				</Nav>
				<Addition>
					<Button className="writting">
						<i className="iconfont">&#xe670;</i>写文章
					</Button>
					<Button className="reg">注册</Button>
				</Addition>
			</HeaderWrapper>
		)
	}

	getListArea() {
		const {
			focused,
			list,
			totalPage,
			page,
			handleMouseEnter,
			handleMouseLeave,
			mouseIn,
			handelChangePage
		} = this.props
		const newList = list.toJS()
		const pageList = []
		if (newList.length) {
			let pageLength = page < totalPage ? page * 10 : newList.length
			for (let i = (page - 1) * 10; i < pageLength; i++) {
				pageList.push(<SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>)
			}
		}
		if (focused || mouseIn) {
			return (
				<SearchInfo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
					<SearchInfoTitle>
						热门搜索
						<SearchInfoSwitch
							onClick={() => {
								handelChangePage(page, totalPage, this.spinIcon)
							}}
						>
							<i
								ref={(icon) => {
									this.spinIcon = icon
								}}
								className="iconfont spin"
							>
								&#xe851;
							</i>换一批
						</SearchInfoSwitch>
					</SearchInfoTitle>
					<SearchInfoList>{pageList}</SearchInfoList>
				</SearchInfo>
			)
		} else {
			return null
		}
	}
}

const mapStateToProps = (state) => {
	return {
		focused: state.get('header').get('focused'),
		list: state.getIn([ 'header', 'list' ]),
		totalPage: state.getIn([ 'header', 'totalPage' ]),
		page: state.getIn([ 'header', 'page' ]),
		mouseIn: state.getIn([ 'header', 'mouseIn' ])
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		hendleInputFocus(list) {
			if (list.size === 0) {
				dispatch(actionCreators.getList())
			}
			dispatch(actionCreators.searchFocus())
		},
		handleInputBlur() {
			dispatch(actionCreators.searchBlur())
		},
		handleMouseEnter() {
			dispatch(actionCreators.mouseEnter())
		},
		handleMouseLeave() {
			dispatch(actionCreators.mouseLeave())
		},
		handelChangePage(page, totalPage, spin) {
			let originAngle = spin.style.transform.replace(/[^0-9]/gi, '')
			if (originAngle) {
				originAngle = parseInt(originAngle, 10)
			} else {
				originAngle = 0
			}
			spin.style.transform = `rotate(${originAngle + 360}deg)`
			if (page < totalPage) {
				dispatch(actionCreators.changePage(page + 1))
			} else {
				dispatch(actionCreators.changePage(1))
			}
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
