import React, { useEffect, useState, useContext } from 'react';
import './Payment.css';
import { useAuth1 } from '../Authentication/LoginContest';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../cart/CartContext';


export const Payment = () => {
  const { isLoggedIn1, setIsLoggedIn1 } = useAuth1();
  const { cartData } = useContext(CartContext); // Access cartData from context
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    deliveryMethod: 'regular', // Default option
    paymentMethod: 'bkash', // Default option
    agreedToTerms: false,
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn1) {
      navigate('/Login');
      return;
    }

    axios.get('http://localhost:4000/auth', { withCredentials: true })
      .then((response) => {
        const data = response.data;
        if (data.valid) {
          setFormData(prev => ({ ...prev, email: data.email })); // Set email from response
        } else {
          setIsLoggedIn1(false);
          navigate('/Login');
        }
      })
      .catch(err => {
        console.error(err);
        navigate('/Login');
      });
  }, [isLoggedIn1, navigate, setIsLoggedIn1]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Combine cartData with formData
      const paymentData = {
        ...formData,
        products: cartData // Adding cartData to the payload
      };
      const response = await axios.post('http://localhost:4000/payment-option', paymentData);
      console.log('Payment profile created:', response.data);
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div>
      <div className="py-3"></div>
      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">Basic Information</div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      {/* Form Fields */}
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>Phone Number</label>
                          <input
                            type="number"
                            name="phone"
                            className="form-control"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>Email Address</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          <label>Full Address</label>
                          <textarea
                            rows="3"
                            name="address"
                            className="form-control"
                            value={formData.address}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label>City</label>
                          <input
                            type="text"
                            name="city"
                            className="form-control"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label>State</label>
                          <input
                            type="text"
                            name="state"
                            className="form-control"
                            value={formData.state}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label>Zip Code</label>
                          <input
                            type="text"
                            name="zipCode"
                            className="form-control"
                            value={formData.zipCode}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Delivery Options */}
                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          <label>Delivery Method</label>
                          <div className="delivery-options">
                            <div>
                              <input
                                type="radio"
                                id="regularDelivery"
                                name="deliveryMethod"
                                value="regular"
                                checked={formData.deliveryMethod === 'regular'}
                                onChange={handleChange}
                              />
                              <label htmlFor="regularDelivery">Regular Delivery (City)</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                id="outsideDelivery"
                                name="deliveryMethod"
                                value="outside"
                                checked={formData.deliveryMethod === 'outside'}
                                onChange={handleChange}
                              />
                              <label htmlFor="outsideDelivery">Outside City Delivery</label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Payment Methods */}
                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          <label>Payment Method</label>
                          <div className="payment-options">
                            <div>
                              <input
                                type="radio"
                                id="bkash"
                                name="paymentMethod"
                                value="bkash"
                                checked={formData.paymentMethod === 'bkash'}
                                onChange={handleChange}
                              />
                              <label htmlFor="bkash">bKash</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                id="nagad"
                                name="paymentMethod"
                                value="nagad"
                                checked={formData.paymentMethod === 'nagad'}
                                onChange={handleChange}
                              />
                              <label htmlFor="nagad">Nagad</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                id="emipay"
                                name="paymentMethod"
                                value="emipay"
                                checked={formData.paymentMethod === 'emipay'}
                                onChange={handleChange}
                              />
                              <label htmlFor="emipay">EMI/Card Payment</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                id="cod"
                                name="paymentMethod"
                                value="cod"
                                checked={formData.paymentMethod === 'cod'}
                                onChange={handleChange}
                              />
                              <label htmlFor="cod">Cash on Delivery</label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Terms and Conditions */}
                      <div className="col-md-12">
                        <div className="form-group d-flex align-items-center justify-content-between">
                          <div>
                            <label htmlFor="terms" className="form-check-label">
                              <input
                                type="checkbox"
                                id="terms"
                                name="agreedToTerms"
                                checked={formData.agreedToTerms}
                                onChange={handleChange}
                              />
                              I agree to the terms and conditions
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <button type="submit" className="btn btn-success">
                          Place Order
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
