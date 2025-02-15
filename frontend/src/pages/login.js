import React from 'react';
function LogIn() {
    return ( 
        <div className='row' style={{margin:"4% 6%"}}>
            <div className='col-lg-6 col-sm-10 col-md-8 offset-lg-3 offset-md-2 offset-sm-1'>
                <h2 style={{marginBottom:"20px"}}>Login on WeConnect</h2>
                <form action="/login" method="post" class="needs-validation" novalidate>
                <div class="mb-3">
                    <label for="username" class="form-label form-font">Username</label>
                    <input name="username" placeholder="enter username" type="text" id="username" class="form-control input-border" required />
                     <div class="invalid-feedback">
                        Please enter the username.
                      </div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label form-font">Password</label>
                    <input name="password" placeholder="enter password" type="password" id="password" class="form-control input-border" required />
                     <div class="invalid-feedback">
                        Please enter the password.
                      </div>
                </div>
                
               
                <button class="btn btn-success">Login</button>
            </form>
            </div>
        </div>
     );
}

export default LogIn;