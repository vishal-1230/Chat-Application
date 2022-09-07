import {React, useState} from "react";
import logo from "./images/bgfull1edit.png";

function Welcome() {
  const [signup, setsignup] = useState(false);

  function onUserChange(e) {
    if (true) {
      const lbl1 = document.getElementById("userNotAv");
      const lbl2 = document.getElementById("wroPass");
      const btn = document.getElementById("btnsub");
      console.log("trying1");
      async function checkUser() {
        console.log("trying2");
        const response = await fetch(
          `http://127.0.0.1:8000/signup/checkUser?user=${e.target.value}`,
          {
            headers: {
              "Content-Type": "application/json",
              accepts: "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);

        if (data == "0") {
          lbl1.innerHTML = "Username Not Available";
          btn.disabled = true;
        } else if (data == "1") {
          lbl1.innerHTML = "";
          if (lbl2.innerHTML == "") {
            btn.disabled = false;
          }
        } else {
          lbl1.innerHTML = "error!!";
        }
      }

      checkUser();
    }
  }

  function onPassChange(e) {
    if (true) {
      console.log('checking pass');
      const pass = e.target.value;
      const lbl2 = document.getElementById("wroPass");
      const lbl1 = document.getElementById("userNotAv");
      const btn = document.getElementById("btnsub");
      async function checkPass() {
        const response = await fetch(
          `http://127.0.0.1:8000/signup/checkPass?pass=${pass}`,
          {
            headers: {
              "Content-Type": "application/json",
              accepts: "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(response);
        console.log(data);

        if (data == "1") {
          lbl2.innerHTML = "";
          if (lbl1.innerHTML == "") {
            btn.disabled = false;
          }
        } else if (data == "0") {
          lbl2.innerHTML = "Password must have Alphabet, Number and Symbol";
          btn.disabled = true;
        } else {
          lbl2.innerHTML = "error!!";
        }
      }
      checkPass();
    }
  }

  function onConfPassChange(e) {
    const lbl1 = document.getElementById("userNotAv");
    const lbl2 = document.getElementById("wroPass");
    const lbl3 = document.getElementById("notSame");
    const name = document.getElementById("name");
    const btn = document.getElementById("btnsub");
    if (e.target.value == document.getElementById("pswd").value) {
      lbl3.innerHTML = "";
      if (lbl1.innerHTML == "" && lbl2.innerHTML == "") {
        btn.disabled = false;
      }
    } else if (e.target.value != document.getElementById("pswd").value) {
      lbl3.innerHTML = "Passwords are not matching";
      btn.disabled = true;
    } else {
      lbl3.innerHTML = "error!!";
    }
  }

  return (
    <div className="welcome">
      <div className="left">
        <img src={logo} alt="" id="msgslogo" />
      </div>
      <div className="right">
        <div className="signbox">
          {signup ? (
            <div className="authBox">
              <h1>Sign Up</h1><br />
              <form action="http://127.0.0.1:8000/signup" method="post" className="signupform">
                <label htmlFor="name" id="namelbl">
                  Name
                </label><br />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  required
                />
                <br />
                <label htmlFor=""></label><br /><br />
                <label htmlFor="">Username</label>
                <br />
                <input
                  type="text"
                  name="user"
                  id="user"
                  required
                  placeholder="Choose an UserID"
                  autoComplete="off"
                  onChange={onUserChange}
                  className="form-control lg"
                />
                <br />
                <label
                  htmlFor=""
                  id="userNotAv"
                  style={{ fontSize: "smaller", color: "red", padding:0 }}
                ></label>
                <br />
                <br />
                <label htmlFor="">Password</label>
                <br />
                <input
                  type="password"
                  name="pswd"
                  placeholder="Password"
                  required
                  id="pswd"
                  className="form-control lg"
                  onChange={onPassChange}
                />
                <br />
                <label
                  htmlFor=""
                  id="wroPass"
                  style={{ fontSize: "smaller", color: "red", padding:0 }}
                ></label>
                <br />
                <br />
                <label htmlFor="">Confirm Password</label>
                <br />
                <input
                  type="password"
                  name="cnfpswd"
                  placeholder="Re-Enter Password"
                  required
                  id="cnfpswd"
                  className="form-control lg"
                  onChange={onConfPassChange}
                />
                <br />
                <label
                  htmlFor=""
                  id="notSame"
                  style={{ fontSize: "smaller", color: "red", padding:0 }}
                ></label>
                <br />
                <br />
                <button type="submit" id="btnsub" className="btn btn-primary">
                  Sign Up
                </button>
                <br />
              </form><br />
              <span className="btmtext">Already have an account? <span id="loginbtn" className="signuplogin" onClick={()=>{setsignup(!signup)}}> Login</span></span>
            </div>
          ) : (
            <div className="authBox">
              <h1>Login</h1><br />
              <form action="http://127.0.0.1:8000/login" method="post" className="loginform">
                <label htmlFor="">Username</label><br />
                <input type="text" name="user" placeholder="UserID" />
                <br /><br /><br />
                <label htmlFor="">Password</label><br />
                <input type="password" name="pswd" id="pswd" className="pswd" placeholder="Enter Password" />
                <br /><br /><br />
                <button className="btnSub">Login</button>
              </form><br />
              <span className="btmtext">Don't have an account? <span id="signupbtn" className="signuplogin" onClick={()=>{setsignup(!signup)}}> SignUp</span></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
