import React from 'react';
function SignUp() {
    return ( 
        <div className='row' style={{margin:"4% 6%"}}>
            <div className='col-lg-6 col-sm-10 offset-lg-3 offset-sm-1'>
                <h2 style={{marginBottom:"20px"}}>SignUp on WeConnect</h2>
                <form action="/signup" method="post" class="needs-validation" novalidate>
                <div class="mb-3">
                    <label for="name" class="form-label form-font">Name</label>
                    <input name="name" placeholder="enter name" type="text" id="name" class="form-control input-border" required />
                     <div class="invalid-feedback">
                        Please enter your name.
                      </div>
                </div>
                <div class="mb-3">
                    <label for="username" class="form-label form-font">Username</label>
                    <input name="username" placeholder="enter username" type="text" id="username" class="form-control input-border" required />
                     <div class="invalid-feedback">
                        Please enter the username.
                      </div>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label form-font">Email</label>
                    <input name="email" placeholder="enter email" type="text" id="email" class="form-control input-border" required />
                     <div class="invalid-feedback">
                        Please enter the email.
                      </div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label form-font">Password</label>
                    <input name="password" placeholder="enter password" type="password" id="password" class="form-control input-border" required />
                     <div class="invalid-feedback">
                        Please enter the password.
                      </div>
                </div>
                <div class="mb-3">
                    <label for="mobile" class="form-label form-font">Mobile Number</label>
                    <input name="mobile" placeholder="enter mobile number" type="number" id="mobile" class="form-control input-border" required />
                     <div class="invalid-feedback">
                        Please enter the mobile number.
                      </div>
                </div>
                <div className="mb-3">
                        <label htmlFor="role" className="form-label form-font">Role</label>
                        <select name="role" id="role" className="form-control input-border" required>
                            <option value="">Select a role</option>
                            <option value="Resident">Resident</option>
                            <option value="Community Head">Community Head</option>
                            <option value="Organization Member">Organization Member</option>
                        </select>
                        <div className="invalid-feedback">Please select a role.</div>
                    </div>
                <button class="btn btn-success">SignUp</button>
            </form>
            </div>
        </div>
     );
}

export default SignUp;