import { initializeApp } from "firebase/app";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
	updateProfile,
} from "firebase/auth";
import {
	getFirestore,
	query,
	getDocs,
	collection,
	where,
	addDoc,
	doc,
	updateDoc,
	arrayUnion,
	arrayRemove,
	setDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDIxgUmfBwdiuRHjj5evWlQQ6KtchiO4lQ",
  authDomain: "cookin-time-b0ba6.firebaseapp.com",
  projectId: "cookin-time-b0ba6",
  storageBucket: "cookin-time-b0ba6.appspot.com",
  messagingSenderId: "783063137785",
  appId: "1:783063137785:web:27645651e4fff2b1f45128",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;
		const q = query(collection(db, "users"), where("uid", "==", user.uid));
		const docs = await getDocs(q);
		if (docs.docs.length === 0) {
			await addDoc(collection(db, "users"), {
				uid: user.uid,
				name: user.displayName,
				authProvider: "google",
				email: user.email,
			});
		}
		window.location.href = '/'
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const logInWithEmailAndPassword = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const registerWithEmailAndPassword = async (name, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		await addDoc(collection(db, "users"), {
			uid: user.uid,
			name,
			authProvider: "local",
			email,
		});
		window.location.href = '/'
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		alert("Password reset link sent!");
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const logout = () => {
	signOut(auth);
};


// Storage
async function upload(file, user) {
	const fileRef = ref(storage, user.uid);

	const snapshot = await uploadBytes(fileRef, file);
	const photoURL = await getDownloadURL(fileRef);

	updateProfile(user, { photoURL });
	window.location.reload(false);
}

async function favorite(user, newFavoriteId) {
	const q = query(collection(db, "users"), where("uid", "==", user.uid));
	const docs = await getDocs(q);
	console.log(docs);
	// Get the document reference
	const docRef = docs.docs[0];
	console.log(docRef);
	// Update the "Favorite" field with the new value
	console.log(newFavoriteId);
	await updateDoc(docRef, {
		Favorite: arrayUnion(newFavoriteId)
	});

}


export {
	auth,
	db,
	signInWithGoogle,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	sendPasswordReset,
	logout,
	upload,
	favorite,
};
