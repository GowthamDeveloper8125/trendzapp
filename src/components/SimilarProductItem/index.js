// Write your code here
import './index.css'

const SimilatProductItem = props => {
  const {similarProductsDetails} = props
  const {title, brand, price, rating, imageUrl} = similarProductsDetails
  return (
    <li className="similarProductImageContainer">
      <img src={imageUrl} alt={title} className="similarProductImage" />
      <p className="fontDetails">{title}</p>
      <p>{brand}</p>
      <div className="price-rating-container">
        <p>Rs {price}/- </p>
        <div className="RatingContainer">
          <p>{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="starImage"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilatProductItem
