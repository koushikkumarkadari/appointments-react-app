import './index.css'

const AppointmentItem = props => {
  const {each, onAddingFavourite} = props
  const {id, title, date, isStarred} = each
  const likeImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onStarred = () => {
    onAddingFavourite(id)
  }
  return (
    <li className="list-item">
      <div className="appointment-text-container">
        <p className="text-heading">{title}</p>
        <p className="appointment-date">Date: {date}</p>
      </div>
      <button
        className="star-button"
        onClick={onStarred}
        type="button"
        data-testid="star"
      >
        <img src={likeImage} alt="star" />
      </button>
    </li>
  )
}
export default AppointmentItem
