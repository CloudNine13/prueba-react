import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getUsers, releaseDelete } from '../../actions/crudActions'
import { USER_TOKEN } from '../../utils/constants'
import './home.scss'
import Item from '../item/item'
import Loading from '../loading/loading'

/**
 * Component used to represent the list of users. Root component ('/')
 * @author Igor Dzichkovskii <igordzich@gmail.com>
 * @param {Object} getDelete object of array of getDelete state which one of them containg user's information.
 * @param {Function} getUsersDispatch dispatch function to get users' information
 * @param {Function} releaseDeleteDispatch dispatch function used to release delete changes after changing the user page
 * @returns {JSX.Element} Home component as JSX element
 */
const Home = ({ getDelete, getUsersDispatch, releaseDeleteDispatch }) => {
  const usersArray = getDelete && getDelete.users
  const maxPages = getDelete && getDelete.pages
  const userCurrentPage = getDelete && getDelete.current_page
  const [currentPage, setCurrentPage] = useState(userCurrentPage)
  const img =
    'https://www.xkelet.com/static/djangocms_admin_style/fonts/src/chevron-left.svg'
  const navigate = useNavigate()
  // Creating page buttons object and setting it to null to prevent user to go past o behind max and min pages
  const pagesButtons = {
    left: null,
    right: null
  }

  // Checking the state of API's pages. On click setting local page to trigger useEffect hook
  if (currentPage === 1) {
    pagesButtons.right = (
      <button
        type='button'
        onClick={() => {
          setCurrentPage(currentPage + 1)
          releaseDeleteDispatch()
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
          releaseDeleteDispatch()
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
          // Using Item component for each user in list
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

/**
 * Function used to map users state to properties of component
 * @param {string} users destructed state of users passed as property to component
 * @returns parameter users as property
 */
const mapStateToProps = ({ getDelete }) => ({ getDelete })

/**
 * Function used to map get and delete action dispatchers to properties of component
 * @param {Function} dispatch used to dispatch release error action
 * @returns {Object} returns dispatchers object with keys getUsersDispatch and releaseDeleteDispatch which value is anonymous function
 */
const mapDispatchToProps = (dispatch) => ({
  /**
   * Object used to get users according to user's current page
   * @param {Number} userCurrentPage is the number representing current page to download pack of users (API requests number of page)
   * @returns {Function} returns dispatch function executing get action
   */
  getUsersDispatch: (userCurrentPage) => dispatch(getUsers(userCurrentPage)),
  /**
   * Object used to release delete changes when page is changed
   * @returns {Function} returns dispatch function executing release delete action
   */
  releaseDeleteDispatch: () => dispatch(releaseDelete())
})

// Defining property types for states (users, pages, getUsersDispatch function)
Home.propTypes = {
  getDelete: PropTypes.shape({
    users: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      )
    ),
    pages: PropTypes.number,
    current_page: PropTypes.number
  }),
  getUsersDispatch: PropTypes.func,
  releaseDeleteDispatch: PropTypes.func
}

// Defining default value for properties
Home.defaultProps = {
  getDelete: {
    users: [{}]
  },
  getUsersDispatch: null,
  releaseDeleteDispatch: null
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
