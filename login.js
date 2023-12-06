(function () {
    
    var firebaseConfig = {
        apiKey: "AIzaSyAHXbGjCTkH5X-N9T20s7PEhiZwUmGYt6A"
    };
    firebase.initializeApp(firebaseConfig);

    const txtEmail = document.getElementById("txtEmail");
    const txtPassword = document.getElementById("txtPassword");
    const btnLogin = document.getElementById("btnLogin");
    const btnSignup = document.getElementById("btnSignup");

    //Login Event
    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const password = txtPassword.value;

        const auth = firebase.auth();

        auth.signInWithEmailAndPassword(email, password).then(user =>{
            window.location.href = 'index.html';
        }).catch(err => {
            alert(err.message);
        });
        
    });

    // Signup Event
    btnSignup.addEventListener('click', e => {

        const email = txtEmail.value;
        const password = txtPassword.value;

        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, password).then(user => {
            alert("Signup Successful :)")
        }).catch(err => {
            alert(err.message);
        });

    });


}());