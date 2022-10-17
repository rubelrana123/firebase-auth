
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, updateProfile} from 'firebase/auth'
import app from "../../Hook/firebaseConfig";
import useFirebase from "../../Hook/useFirebase";
const Registration = ({ user, setUser }) => {
	// useEffect(() => {
	//   onAuthStateChanged(auth, (user) => {
	//     if (user) {
	//       // User is signed in, see docs for a list of available properties
	//       // https://firebase.google.com/docs/reference/js/firebase.User
	//       const uid = user.uid;
	//       setUser(user);
	//       // ...
	//     } else {
	//       // User is signed out
	//       // ...
	//     }
	//   });
	// }, []);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [disable, setIsDisable] = useState(true);

	const { googleHandler } = useFirebase();
	const auth = getAuth(app);
	const handleName = (event) => {
		setName(event.target.value);
	};

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

	// console.log('email' + email);
	// console.log('password' + password);
	// console.log('name' + name);

	const handleRegister = (e) => {
		e.preventDefault();

		if ((name, email, password)) {
			createUserWithEmailAndPassword(auth, email, password)
				.then((result) => {
					const userInfo = result.user;
					console.log(userInfo);
					updateName();
					setUser(userInfo);
					emailVerify();
				})
				.catch((error) => {
					// const errorCode = error.code;
					const errorMessage = error.message;
					setError(errorMessage);
					// ..
				});
		} else {
			setError('please fil out all the input');
			return;
		}
	};
	const updateName = () => {
		updateProfile(auth.currentUser, {
			displayName: name,
		})
			.then(() => {
				console.log('	Profile updated!');
			})
			.catch((error) => {
				const errorMessage = error.message;
				setError(errorMessage);
			});
	};

	const emailVerify = () => {
		sendEmailVerification(auth.currentUser).then(() => {
			alert('Email verification sent!');
		});
	};

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid;
				// ...
			} else {
				// User is signed out
				// ...
			}
		});
	}, []);

	return (
		<div className='mt-5'>
			<div className='main-container d-flex container justify-content-between align-items-center'>
				<div className='register-image image-fluid w-100  '>
					<img
						className='w-100 img-fluid image-fluid'
						src='https://i.ibb.co/hYJTmVX/undraw-Mobile-login-re-9ntv-1.png'
						alt=''
					/>
				</div>
				<div className='register-form  w-100'>
					<div className='input-box'>
						<p className='text-danger'>{error}</p>
						<form action=''>
							<input
								onBlur={handleName}
								className='form-control p-3 m-2'
								type='text'
								placeholder='Enter your name'
								required
							/>
							<input
								onBlur={handleEmail}
								className='form-control p-3 m-2'
								type='email'
								placeholder='Email'
								required
							/>
							<input
								onBlur={handlePassword}
								className='form-control p-3 m-2'
								type='password'
								placeholder='password'
								required
							/>
							<p className='link '>
								<Link to='/login' className='text-decoration-none'>
									<small className='text-danger link'>
										already have an account? please login
									</small>
								</Link>
							</p>
							<input
								onClick={() => setIsDisable(!disable)}
								className='p-2'
								type='checkbox'
							/>{' '}
							<span className='mb-3'>accept term & condition</span>
							<br />
							<button
								onClick={handleRegister}
								type='submit'
								className='btn btn-info p-3 w-50 mt-3 fw-bold text-white'
								disabled={disable}
							>
								Register
							</button>
						</form>
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
				</div>
			</div>
		</div>
	);
};

export default Registration;
