import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { USER_TOKEN } from '../../utils/constants'
import DetailForm from '../detailForm/detailForm'
import './detail.scss'
import { deleteUser, releaseEdit } from '../../actions/crudActions'
import Loading from '../loading/loading'

/**
 * Component used to create user detail's card
 * @returns {JSX.Element} card view as JSX element
 */
const Detail = ({ edit, releaseEditDispatch, deleteUserDispatch }) => {
  const { first_name, last_name, email, updated_at } = edit
  const [isEditable, setIsEditable] = useState(false)
  const { user } = useLocation().state || {}
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const detailUtils = { setIsEditable, id }

  // Restricting access without correct link or token or if user is empty (= if URL is called manually)
  useEffect(() => {
    if (!id) navigate(-1)
    if (!localStorage.getItem(USER_TOKEN)) navigate('/login')
    if (!user) navigate('/')

    // Forgetting edit changes to not have them in other user cards
    return () => releaseEditDispatch()
  }, [])

  /**
   * Function to avoid boilerplate button code inside JSX element to render
   * @param {string} name value used to set css class of the button and it's text
   * @param {Function} onClickCallback function used inside onClick button callback
   * @returns {JSX.Element} JSX element which is used to set button on screen
   */
  const buttonBuilder = (name, onClickCallback) => (
    <button
      className={`${name}_button`}
      type='button'
      onClick={onClickCallback}
    >
      {name}
    </button>
  )

  const deleteUserAction = () => deleteUserDispatch(user.id, navigate)

  return (
    <div className='detail'>
      <Loading />
      <div className='detail_card'>
        <div className='data_wrapper'>
          <img src={user?.avatar} alt='user avatar' />
          {isEditable ? (
            // Detail form component used to dispatch CRUD API call (put)
            <DetailForm utils={detailUtils} />
          ) : (
            <>
              <h1>
                {first_name || user?.first_name} {last_name || user?.last_name}
              </h1>
              <div className='email_wrapper'>
                <p>Email:</p>
                {email || user?.email}
              </div>
              {updated_at ? (
                <div className='updated'>updated at: {updated_at}</div>
              ) : null}
            </>
          )}
        </div>
        <div className='button_wrapper'>
          {buttonBuilder('delete', () => {
            deleteUserAction()
          })}
          {buttonBuilder('edit', () => {
            setIsEditable(!isEditable)
          })}
        </div>
      </div>
      {buttonBuilder('back', () => {
        navigate(-1)
      })}
    </div>
  )
}

const mapStateToProps = ({ edit }) => ({ edit })
const mapDispatcherToProps = (dispatch) => ({
  releaseEditDispatch: () => dispatch(releaseEdit()),
  deleteUserDispatch: (id, navigate) => dispatch(deleteUser(id, navigate))
})

// Setting props type
Detail.propTypes = {
  edit: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    updated_at: PropTypes.string,
    loadingEdit: PropTypes.bool
  }),
  releaseEditDispatch: PropTypes.func,
  deleteUserDispatch: PropTypes.func
}

// Setting default prop
Detail.defaultProps = {
  edit: {
    first_name: '',
    last_name: '',
    email: '',
    updated_at: '',
    loadingEdit: false
  },
  releaseEditDispatch: null,
  deleteUserDispatch: null
}

export default connect(mapStateToProps, mapDispatcherToProps)(Detail)
