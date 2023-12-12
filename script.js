var firebaseConfig = {
  apiKey: "AIzaSyAHXbGjCTkH5X-N9T20s7PEhiZwUmGYt6A",
  projectId: "pyrank-7e5de",
  storageBucket: 'gs://pyrank-7e5de.appspot.com',

};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

// Listen for authentication state changes
auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    
    // Retrieve user data from Firestore
    const userDocRef = firestore.collection('users').doc(uid);
    const companiesRef = firestore.collection("companies");

    companiesRef.where("employees", "array-contains", uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

          console.log("Company:", doc.id, doc.data());
          document.getElementById('companyLogo').src = `${doc.data().logo}`;              
          document.getElementById('companyName').innerHTML = doc.data().name;
          document.getElementById('companyDescription').innerHTML = doc.data().description;
          document.getElementById('companyID').innerHTML = doc.data().id;
          // document.getElementById('logo').innerHTML = doc.data().logo;
          // document.getElementById('projects').innerHTML = doc.data().projects;

          const projectsRef = firestore.collection('projects');
          projectsRef.where('company', '==', doc.id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((projectDoc) => {
            if (projectDoc.exists) {
              document.getElementById('projects').innerHTML += projectDoc.data().name + "<br>"
            }
          });
        });
          

          // getting the employees
          const dataArray = doc.data().employees;
          dataArray.forEach((e) => {
            const employeeRef = firestore.collection('users').doc(e);
            employeeRef.get()
            .then((doc) => {
              if (doc.exists) {
                document.getElementById('empList').innerHTML += doc.data().firstName + " " + doc.data().id + "<br>";
              } else {
                console.log('user not found');
              }
            })
            .catch((error) => {
              console.error('Error getting user:', error);
            });
          });
        });
      })
      .catch((error) => {
        console.error("Error getting companies:", error);
      });

      // Fetch user data
      userDocRef.get()
      .then(doc => {
        if (doc.exists) {
          // Get user data
          const userData = doc.data();
          
          // Update HTML elements with user data
          document.getElementById('firstnametxt').textContent = userData.firstName || 'N/A';
          document.getElementById('lastnametxt').textContent = userData.lastName || 'N/A';
          document.getElementById('roletxt').textContent = userData.role || 'N/A';
          document.getElementById('profile-img').src = `${userData.image}`;              


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
  
  btnSignOut.addEventListener('click', function (event) {
    auth.signOut()
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
    });
    const createProject = document.getElementById('createProject');
    
    createProject.addEventListener('click', function(event) {
      // Retrieve the company ID from the data attribute
      const companyId = document.getElementById('companyID').innerHTML;
    
      window.location.href = `project.html?companyId=${companyId}`;
    });

    const btnChangeImage = document.getElementById('change-image');

    btnChangeImage.addEventListener('click', function(event) {
        window.open('changeImagePopUp.html', 'Change image', 'width=600,height=400')
    });
  });
  