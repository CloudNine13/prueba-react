import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import './detailForm.scss'
import Error from '../error/error'
import { setError } from '../../actions/errorActions'
import { editUser } from '../../actions/crudActions'

/**
 * Component used to create edit form for user's detail form
 * @param {Function} editDispatch destructed dispatch function of component properties which are set with mapping connection
 * @returns {JSX.Element} edit action form as JSX element
 */
const DetailForm = ({ utils, editDispatch }) => {
  const dispatch = useDispatch()
  const { id, setIsEditable } = utils
  const [userDetail, setUserDetail] = useState({
    first_name: '',
    last_name: '',
    email: '',
    id
  })

  /**
   * Callback function used to dispatch edit action (or error) on submit click
   * @returns nothing from function to prevent dispatch edit action
   */
  const submitEditDetail = () => {
    /* [IMPORTANTE:] En la información de la prueba no se especifica si se necesita 
    actualizar todos los datos a la vez o se puede hacerlo uno por uno. 
    Según el ejemplo dado se supone que se necesita actualizarlo todo a la vez. 
    En el caso contratio rehacer esta parte no será el problema. Lo haré enseguida.
     */
    if (!userDetail.first_name || !userDetail.last_name || !userDetail.email) {
      dispatch(setError('You should fill all of the camps'))
      return
    }

    // Dispatching API action
    editDispatch(userDetail, setIsEditable)
  }

  /**
   * Function to avoid boilerplate code in JSX element to render
   * @param {string} name parameter used to set class, type and object key
   * @param {string} placeholder parameter used to set placeholder name
   * @returns {JSX.Element} prepared JSX.Element input for every situation
   */
  const inputBuilder = (name, placeholder) => (
    <input
      className={name}
      type={name}
      placeholder={placeholder}
      onChange={(event) => {
        const object = { ...userDetail }
        object[name] = event.target.value
        setUserDetail(object)
      }}
    />
  )

  return (
    <form
      className='detail_form'
      onSubmit={(event) => {
        event.preventDefault()
        submitEditDetail()
      }}
    >
      <div className='input_wrapper'>
        {inputBuilder('first_name', 'First Name')}
        {inputBuilder('last_name', 'Last Name')}
      </div>
      {inputBuilder('email', 'Email')}
      <button type='submit'>submit</button>
      <Error />
    </form>
  )
}

/**
 * Function used to map edit dispatcher to properties of component
 * @param {Function} dispatch used to dispatch userDetail put API call
 * @returns {Object} returns dispatcher object with key editDispatch which value is anonymous function
 */
const mapDispatchToProps = (dispatch) => ({
  /**
   * Object with key editDispatch with anonymous function as value.
   * This function calls redux dispatch sending details of user to CRUD (update) action
   * @param {Object} userDetail is the user data parameter passed to put api request
   */
  editDispatch: (userDetail, setIsEditable) =>
    dispatch(editUser(userDetail, setIsEditable))
})

DetailForm.propTypes = {
  utils: PropTypes.shape({
    id: PropTypes.string,
    setIsEditable: PropTypes.func
  }),
  editDispatch: PropTypes.func
}

DetailForm.defaultProps = {
  utils: PropTypes.shape({
    id: '',
    setIsEditable: null
  }),
  editDispatch: null
}

// Connecting dispatcher as props to DetailForm function
export default connect(null, mapDispatchToProps)(DetailForm)
