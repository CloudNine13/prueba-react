import React from 'react'
import { connect } from 'react-redux'
import './loading.sass'

const Loading = ({ auth, users, edit }) => {
  const { loadingAuth } = auth
  const { loadingUsers, loadingDelete } = users
  const { loadingEdit } = edit
  let returnValue = null

  if (loadingAuth || loadingUsers || loadingEdit || loadingDelete) {
    returnValue = (
      <div className='loading'>
        <div className='dual_ring' />
      </div>
    )
  }

  return returnValue
}

const mapStateToProps = ({ auth, users, edit }) => ({ auth, users, edit })

export default connect(mapStateToProps)(Loading)
