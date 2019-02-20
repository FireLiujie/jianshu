import React from 'react'
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

const getListArea = (show) => {
	if (show) {
		return (
			<SearchInfo>
				<SearchInfoTitle>
					热门搜索
					<SearchInfoSwitch>换一批</SearchInfoSwitch>
				</SearchInfoTitle>
				<SearchInfoList>
					<SearchInfoItem>教育</SearchInfoItem>
					<SearchInfoItem>教育</SearchInfoItem>
					<SearchInfoItem>教育</SearchInfoItem>
					<SearchInfoItem>教育</SearchInfoItem>
					<SearchInfoItem>教育</SearchInfoItem>
					<SearchInfoItem>教育</SearchInfoItem>
				</SearchInfoList>
			</SearchInfo>
		)
	} else {
		return null
	}
}

const Header = (props) => {
	return (
		<HeaderWrapper>
			<Logo />
			<Nav>
				<NavItem className="left active">首页</NavItem>
				<NavItem className="left">下载APP</NavItem>
				<NavItem className="right">
					<i className="iconfont">&#xe636;</i>
				</NavItem>
				<NavItem className="right">登录</NavItem>
				<SearchWrapper>
					<CSSTransition in={props.focused} timeout={200} classNames="slide">
						<NavSearch
							className={props.focused ? 'focused' : ''}
							onFocus={props.hendleInputFocus}
							onBlur={props.handleInputBlur}
						/>
					</CSSTransition>
					<i className={props.focused ? 'focused iconfont' : 'iconfont'}>&#xe614;</i>
					{getListArea(props.focused)}
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

const mapStateToProps = (state) => {
	return {
		focused: state.get('header').get('focused')
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		hendleInputFocus() {
			dispatch(actionCreators.searchFocus())
		},
		handleInputBlur() {
			dispatch(actionCreators.searchBlur())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
