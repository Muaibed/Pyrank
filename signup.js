(function () {
    
    var firebaseConfig = {
        apiKey: "AIzaSyAHXbGjCTkH5X-N9T20s7PEhiZwUmGYt6A",
        projectId: "pyrank-7e5de",
    };

    firebase.initializeApp(firebaseConfig);

const btnSignup = document.getElementById("btnSignup");

btnSignup.addEventListener('click', e => {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var id = document.getElementById('id').value;
    var role = document.getElementById('role').value
    var email = document.getElementById("txtEmail").value;
    var password = document.getElementById("txtPassword").value;


    // Create a new user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function (userCredential) {
        // User signed up successfully
        var user = userCredential.user;
  
        // Add additional user information to Firestore
        firebase.firestore().collection('users').doc(user.uid).set({
            firstName: firstName,
            lastName: lastName,
            id: id,
            role: role,
            email: user.email
        })
        .then(function() {
          alert("User added successfully");
        })
        .catch(function(error) {
          alert("Error adding user: ", error);
        });
      })
      .catch(function (error) {
        // Handle errors during sign-up
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Sign-up error:", errorMessage);
        console.log(errorCode);
      });
      document.getElementById('firstName').value = '';
      document.getElementById('lastName').value = '';
      document.getElementById('id').value = '';
      document.getElementById('txtPassword').value = '';
      document.getElementById('txtEmail').value = '';
    });
}());