import React from 'react'
import { connect } from 'react-redux'
import './loading.sass'

/**
 * Loading component which is used in other components with async actions
 * @author Igor Dzichkovskii <igordzich@gmail.com>
 * @param {Object} auth authentification state (loading boolean) passed as prop
 * @param {Object} getDelete getDelete state (loading boolean) passed as prop
 * @param {Object} edit edit state passed (loading boolean) as prop
 * @returns {JSX.Element} may return JSX element if one of the booleans is true
 * @returns {null} may return null if booleans are false
 */
const Loading = ({ auth, getDelete, edit }) => {
  const { loadingAuth } = auth
  const { loadingUsers, loadingDelete } = getDelete
  const { loadingEdit } = edit
  let returnValue = null

  if (loadingAuth || loadingUsers || loadingEdit || loadingDelete) {
    returnValue = (
      <div className='loading' data-testid='l'>
        <div className='dual_ring' data-testid='dl' />
      </div>
    )
  }

  return returnValue
}

/**
 * Function used to map users state to properties of component
 * @param {Object} users destructed state of users passed as property to component
 * @param {Object} getDelete destructed state of users passed as property to component
 * @param {Object} Edit destructed state of users passed as property to component
 * @returns parameters auth, getDelete and edit as property
 */
const mapStateToProps = ({ auth, getDelete, edit }) => ({
  auth,
  getDelete,
  edit
})

export default connect(mapStateToProps)(Loading)
