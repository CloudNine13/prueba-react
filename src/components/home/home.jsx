import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getUsers } from '../../actions/userActions'
import { USER_TOKEN } from '../../utils/constants'
import './home.scss'
import Item from '../item/item'
import Loading from '../loading/loading'

const Home = ({ users, getUsersDispatch }) => {
  const usersArray = users && users.users
  const maxPages = users && users.pages
  const [currentPage, setCurrentPage] = useState(1)
  const img =
    'https://www.xkelet.com/static/djangocms_admin_style/fonts/src/chevron-left.svg'
  const navigate = useNavigate()
  const pagesButtons = {
    left: null,
    right: null
  }

  if (currentPage === 1) {
    pagesButtons.right = (
      <button
        type='button'
        onClick={() => {
          setCurrentPage(currentPage + 1)
        }}
      >
        <img className='right_arrow' src={img} alt='' />
      </button>
    )
  } else if (currentPage === maxPages) {
    pagesButtons.left = (
      <button
        type='button'
        onClick={() => {
          setCurrentPage(currentPage - 1)
        }}
      >
        <img className='left_arrow' src={img} alt='' />
      </button>
    )
  }

  useEffect(() => {
    if (!localStorage.getItem(USER_TOKEN)) navigate('/login')
    getUsersDispatch(currentPage)
  }, [currentPage])

  return (
    <>
      <div className='home'>
        <Loading />
        {usersArray &&
          usersArray.map((user) => <Item user={user} key={user.id} />)}
      </div>
      <div className='pages_container'>
        {pagesButtons.left}
        <div className='pages'>
          {currentPage}/{maxPages}
        </div>
        {pagesButtons.right}
      </div>
    </>
  )
}

const mapStateToProps = ({ users }) => ({ users })
const mapDispatchToProps = (dispatch) => ({
  getUsersDispatch: (currentPage) => {
    dispatch(getUsers(currentPage))
  }
})

// Defining property types for states (users, pages, getUsersDispatch function)
Home.propTypes = {
  users: PropTypes.shape({
    users: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      )
    ),
    pages: PropTypes.number
  }),
  getUsersDispatch: PropTypes.func
}

// Defining default value for properties
Home.defaultProps = {
  users: null,
  getUsersDispatch: null
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
