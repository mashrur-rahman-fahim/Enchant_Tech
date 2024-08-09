import React from 'react';
import './Payment.css';

export const Payment = () => {
  
  return (
    <div>
      <div className="py-3"></div>
      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="card">
                <div className="card-header">
                  Basic Information
                </div>
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
                        <div class="button-container">
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
  );
}
