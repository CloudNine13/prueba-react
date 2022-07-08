import React from 'react'
import { connect } from 'react-redux'

const Loading = ({ auth, users }) => {
  const { loadingAuth } = auth
  const { loadingUsers } = users
  let returnValue = null

  if (loadingAuth || loadingUsers) {
    returnValue = (
      <div className='loading'>
        <div className='dual_ring' />
      </div>
    )
  }

  return returnValue
}

const mapStateToProps = ({ auth, users }) => ({ auth, users })

export default connect(mapStateToProps)(Loading)
