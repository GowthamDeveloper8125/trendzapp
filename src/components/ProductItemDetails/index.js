// Write your code here
import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilatProductItem from '../SimilarProductItem'

import './index.css'

class ProductItemDetails extends Component {
  state = {
    productDetails: '',
    similarProducts: [],
    count: 0,
    responseData: true,
    loader: false,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({loader: true})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const productUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(productUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        style: data.style,
        title: data.title,
        totalReviews: data.total_reviews,
        similarProducts: data.similar_products,
      }
      const similarProductslist = data.similar_products
      const updatedSimilarProductList = similarProductslist.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        brand: eachItem.brand,
        price: eachItem.price,
        rating: eachItem.rating,
        imageUrl: eachItem.image_url,
      }))
      this.setState({
        productDetails: updatedData,
        similarProducts: updatedSimilarProductList,
        responseData: true,
        loader: false,
      })
    } else {
      this.setState({responseData: false, loader: false})
    }
  }

  responseSuccess = () => {
    const {productDetails, similarProducts, count} = this.state
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      style,
      title,
      totalReviews,
    } = productDetails
    return (
      <div className="main-card-container">
        <div className="productDetailsContainer">
          <img src={imageUrl} alt="product" className="productImage" />
          <div className="productDetailedContainer">
            <h1 className="fontDetails color-change">{title}</h1>
            <p className="fontDetails">Rs {price}/- </p>
            <div className="ratingAngReviewContainer">
              <div className="RatingContainer">
                <p>{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="starImage"
                />
              </div>
              <p>{totalReviews} Reviews</p>
            </div>
            <p className="productDescription">{description}</p>
            <p className="fontDetails">
              Available: <span className="color-change">{availability}</span>{' '}
            </p>
            <p className="fontDetails">
              Brand: <span className="color-change">{brand}</span>
            </p>
            <hr />
            <div className="plusMinusContainer">
              <button
                className="icon color-change"
                type="button"
                onClick={this.decreaseCount}
                data-testid="minus"
              >
                -
              </button>
              <p className="icon color-change">{count}</p>
              <button
                type="button"
                className="icon color-change"
                onClick={this.increaceCount}
                data-testid="plus"
              >
                +
              </button>
            </div>
            <button type="button" className="addToCartButton">
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="similarProductMainContainer">
          {similarProducts.map(eachItem => (
            <ul key={eachItem.id}>
              <SimilatProductItem similarProductsDetails={eachItem} />
            </ul>
          ))}
        </div>
      </div>
    )
  }

  getproductLlistItems = () => {
    const {history} = this.props
    history.replace('/products')
  }

  responseFailure = () => (
    <div className="response-failure">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
          className="not-found-image"
        />
        <h1>Product Not Found</h1>
        <button
          type="button"
          onClick={this.getproductLlistItems}
          className="continue-shoping-button"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )

  increaceCount = () => {
    this.setState(prevCount => ({
      count: prevCount.count + 1,
    }))
  }

  decreaseCount = () => {
    const {count} = this.state
    if (count <= 0) {
      this.setState({count: 0})
    } else {
      this.setState(prevCount => ({
        count: prevCount.count - 1,
      }))
    }
  }

  render() {
    const {responseData, loader} = this.state
    return (
      <div>
        <Header />

        {loader ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="blue" width={50} height={50} />
          </div>
        ) : (
          <div>
            {responseData ? this.responseSuccess() : this.responseFailure()}
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(ProductItemDetails)
