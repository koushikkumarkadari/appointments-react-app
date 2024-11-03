import {Component} from 'react'
import './index.css'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentTitle: '',
    appointmentDate: '',
    appointmentsList: [],
    starFilter: false,
  }

  onChangeTitle = event => {
    this.setState({appointmentTitle: event.target.value})
  }

  onChangeDate = event => {
    const eventTargetValue = event.target.value
    this.setState({appointmentDate: eventTargetValue})
  }

  onAppointmentAddition = event => {
    event.preventDefault()
    const {appointmentTitle, appointmentDate} = this.state
    const year = parseInt(appointmentDate.slice(0, 4))
    const month = parseInt(appointmentDate.slice(5, 7))
    const day = parseInt(appointmentDate.slice(8))
    const dateValue = format(
      new Date(year, month - 1, day),
      'dd MMMM yyyy, EEEE',
    )
    const newAppointment = {
      id: uuidv4(),
      title: appointmentTitle,
      date: dateValue,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      appointmentDate: '',
      appointmentTitle: '',
    }))
  }

  onAddingFavourite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onStarFilter = () => {
    this.setState(prevState => ({starFilter: !prevState.starFilter}))
  }

  render() {
    const {appointmentTitle, appointmentDate, appointmentsList, starFilter} =
      this.state
    const filteredAppointmentList = appointmentsList.filter(eachAppointment => {
      if (starFilter) {
        return eachAppointment.isStarred === true
      }
      return true
    })
    const starFilterClassName = starFilter
      ? 'starred-button-on'
      : 'starred-button-off'
    return (
      <div className="background-container">
        <div className="appointment-block">
          <div className="inner-appointment-input-container">
            <form onSubmit={this.onAppointmentAddition}>
              <h1 className="appointments-heading">Add Appointment</h1>
              <div className="input-container">
                <label className="label-text" htmlFor="title">
                  TITLE
                </label>
                <input
                  placeholder="Title"
                  className="text-input"
                  value={appointmentTitle}
                  onChange={this.onChangeTitle}
                  id="title"
                  type="text"
                />
                <label className="label-text" htmlFor="date">
                  DATE
                </label>
                <input
                  className="text-input"
                  value={appointmentDate}
                  onChange={this.onChangeDate}
                  id="date"
                  type="date"
                />
              </div>
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <div>
              <img
                className="appointment-image "
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="starred-filter-container">
            <h1 className="appointments-heading small-device-appointment-heading">Appointments</h1>
            <button
              className={starFilterClassName}
              onClick={this.onStarFilter}
              type="button"
            >
              Starred
            </button>
          </div>
          <ul className="appointments-container">
            {filteredAppointmentList.map(each => (
              <AppointmentItem
                onAddingFavourite={this.onAddingFavourite}
                key={each.id}
                each={each}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
