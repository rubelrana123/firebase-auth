
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";
import ResetPassword from '../ResetPassword/ResetPassword.js'

import Swal from "sweetalert2";
import useFirebase from "../../Hook/useFirebase";


const Login = ({user, setUser}) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [modalShow, setModalShow] = useState(false);
  // const auth = getAuth(app);

  // const { handleGoogleLogin, test2 } = useFirebase();

  // const handleEmail = (e) => {
  //   setEmail(e.target.value);
  // };
  // const handlePassword = (e) => {
  //   setPassword(e.target.value);
  // };

  // const handleLogin = () => {
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const userInfo = userCredential.user;
  //       setUser(userInfo);
  //       // console.log(usernf);
  //       Swal.fire("Good job!", "You clicked the button!", "success");
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       setError(errorMessage);
  //     });
  // };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error , setError] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const auth = getAuth();

	const {googleHandler} = useFirebase();
  const handleEmail = (event) => {
		const test = /\S+@\S+\.\S+/.test(event.target.value);
		if (!test) {
			setError('please provide a valid email');
			return;
		} else {
			setEmail(event.target.value);
			setError('');
		}
	};

	const handlePassword = (event) => {
		const fieldMail = event.target.value;
		if (!fieldMail) {
			setError('please enter a password');
			return;
		}

		if (!/(?=.*?[A-Z])/.test(fieldMail)) {
			setError('At least one upper case');
			return;
		}
		if (!/((?=.*?[a-z]))/.test(fieldMail)) {
			setError('At least one lower case English letter ');
			return;
		}
		if (!/(.{8,})/.test(fieldMail)) {
			setError('atleast length 4');
			return;
		}
		setError('');
		setPassword(fieldMail);
	};

   const handleLogIn = (event) =>{
     event.preventDefault();
  signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const userInfo = userCredential.user;
			console.log(userInfo);
			setUser(userInfo);
      Swal.fire('log in successfully')
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			setError(errorMessage);
		});
   }

  return (
		<div className='mt-5'>
			<div className='main-container d-flex container justify-content-between align-items-center'>
				<div className='register-image image-fluid w-100  '>
					<img
						className='w-100 img-fluid image-fluid'
						src='https://i.ibb.co/0hLvWvP/undraw-Login-re-4vu2.png'
						alt=''
					/>
				</div>
				<div className='register-form  w-100'>
					<p>{error}</p>
					<div className='input-box'>
						<input
							onBlur={handleEmail}
							className='form-control p-3 m-2'
							type='email'
							placeholder='Email'
						/>
						<input
							onBlur={handlePassword}
							className='form-control p-3 m-2'
							type='password'
							placeholder='password'
						/>
						<p className='link '>
							<Link to='/registration' className='text-decoration-none'>
								<small className='text-danger link'>
									are you new? please register
								</small>
							</Link>
							<span
								onClick={() => setModalShow(true)}
								role='button'
								className='ms-4 text-primary cursor-pointer'
							>
								Forget Password?
							</span>
						</p>
						<input className='p-2' type='checkbox' />{' '}
						<span className='mb-3 '>remember me </span>
						<br />
						<button
							onClick={handleLogIn}
							className='btn btn-info p-3 w-50 mt-3 fw-bold text-white'
						>
							Login
						</button>
					</div>
					<button
						onClick={() => googleHandler()}
						className='btn mt-3 border d-flex align-items-center justify-content-evenly p-2 m-auto'
					>
						<img
							className='w-25 image-fluid btn-image'
							src='https://img.icons8.com/color/344/google-logo.png'
							alt=''
						/>
						<p className='fw-bold'>Google SignIn</p>
					</button>

					<ResetPassword show={modalShow} onHide={() => setModalShow(false)} />
				</div>
			</div>
		</div>
	);
};

export default Login;
