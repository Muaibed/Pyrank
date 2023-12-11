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
    const companiesRef = firestore.collection("companies");

    // Query the "members" subcollection for the specific user
    companiesRef.where("employees", "array-contains", uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("Company:", doc.id, doc.data());
        });
      })
      .catch((error) => {
        console.error("Error getting companies:", error);
      });

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
      document.getElementById('firstnametxt').textContent = 'guest';

  }

  const btnSignOut = document.getElementById('sign-out');

  btnSignOut.addEventListener('click', function(event) {
        auth.signOut()
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  })
});