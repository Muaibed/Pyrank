var firebaseConfig = {
  apiKey: "AIzaSyAHXbGjCTkH5X-N9T20s7PEhiZwUmGYt6A",
  projectId: "pyrank-7e5de",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

// Listen for authentication state changes
auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in
    const uid = user.uid;

    // Retrieve user data from Firestore
    const userDocRef = firestore.collection('users').doc(uid);

    userDocRef.get()
      .then(doc => {
        if (doc.exists) {
          // Get user data
          const userData = doc.data();

          // Update HTML elements with user data
          document.getElementById('firstnametxt').textContent = userData.firstName || 'N/A';
          document.getElementById('lastnametxt').textContent = userData.lastName || 'N/A';
          document.getElementById('roletxt').textContent = userData.role || 'N/A';

        } else {
          console.log('User document not found.');
        }
      })
      .catch(error => {
        console.error('Error getting user data:', error);
      });
  } else {
    // No user is signed in
    console.log('No user is signed in.');
  }
});