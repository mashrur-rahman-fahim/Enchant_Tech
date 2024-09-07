import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useAuth1 } from '../Authentication/LoginContest';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const Payment = () => {
  const { isLoggedIn1, setIsLoggedIn1 } = useAuth1();
  const [email, setEmail] = useState(null);
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
          console.log(data.email)
          setEmail(data.email); // Set the email from response
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
                <div className="row">
                  {/* Form Fields */}
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>First Name</label>
                      <input type="text" name="firstname" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Last Name</label>
                      <input type="text" name="lastname" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Phone Number</label>
                      <input type="number" name="phone" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Email Address</label>
                      <input type="email" name="email" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-3">
                      <label>Full Address</label>
                      <textarea rows="3" name="address" className="form-control"></textarea>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>City</label>
                      <input type="text" name="city" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>State</label>
                      <input type="text" name="state" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>Zip Code</label>
                      <input type="text" name="zipcode" className="form-control" />
                    </div>
                  </div>

                  {/* Delivery Options */}
                  <div className="col-md-12">
                    <div className="form-group mb-3">
                      <label>Delivery Method</label>
                      <div className="delivery-options">
                        <div>
                          <input type="radio" id="regularDelivery" name="delivery" value="regular" />
                          <label htmlFor="regularDelivery">Regular Delivery (City)</label>
                        </div>
                        <div>
                          <input type="radio" id="outsideDelivery" name="delivery" value="outside" />
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
                          <input type="radio" id="bkash" name="payment" value="bkash" />
                          <label htmlFor="bkash">bKash</label>
                        </div>
                        <div>
                          <input type="radio" id="nagad" name="payment" value="nagad" />
                          <label htmlFor="nagad">Nagad</label>
                        </div>
                        <div>
                          <input type="radio" id="emipay" name="payment" value="emipay" />
                          <label htmlFor="emipay">EMI/Card Payment</label>
                        </div>
                        <div>
                          <input type="radio" id="cod" name="payment" value="cod" />
                          <label htmlFor="cod">Cash on Delivery</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions and Place Order Button */}
                  <div className="col-md-12">
                    <div className="form-group d-flex align-items-center justify-content-between">
                      <div>
                        <label htmlFor="terms" className="terms-label">
                          <input type="checkbox" name="terms" id="terms" style={{ marginRight: '10px' }} />
                          I have read and agree to the
                          <a href="#" className="terms-link"> Terms and Conditions</a>,
                          <a href="#" className="terms-link"> Privacy Policy</a>,
                          and
                          <a href="#" className="terms-link"> Refund and Return Policy</a>.
                        </label>
                      </div>
                      <div className="button-container">
                        <button type="button" className="btn btn-primary mx-1">Place Order</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}
