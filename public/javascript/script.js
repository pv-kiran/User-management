console.log("Hello");

let form = document.querySelector("#form");

// let signInForm = document.querySelector('#loginForm');


form.addEventListener('submit' , function(e) {
    e.preventDefault(); 
    let isValid = validate();
    if(isValid) {
        document.querySelector("#form").submit();
    }
})

function validate() {
    // var name = document.querySelector('#name').value;
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
    var err = document.querySelector('.error');
    var text ;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    if(document.querySelector('#name')) {
        var name = document.querySelector('#name').value;
        
        if( name.length < 5 ) {
            text = "Please enter a valid name";
            err.textContent = text ;
            err.style.height = '4rem';
            return false;
        }
        else if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        text = 'Write full name';
        err.textContent = text;
        err.style.height = '4rem';
        return false;
        }

    }

    
    

    

    if(email.match(mailformat) === null) {
        text = "Please enter a valid email";
        err.textContent = text ;
        err.style.height = '4rem';
        return false;
    }
    else if(password.length < 5) {
        text = "Please enter a valid password";
        err.textContent = text ;
        err.style.height = '4rem';
        return false;
    }


    if(document.querySelector('#confirmPswd')) {
        var confirmPswd = document.querySelector('#confirmPswd').value;
        console.log(confirmPswd);
        console.log(password);
        
        if( confirmPswd === '' ) {
            text = "Please cofirm the password";
            err.textContent = text ;
            err.style.height = '4rem';
            return false;
        }
        else if (confirmPswd != password ) {
            text = 'Please enter the correct password';
            err.textContent = text;
            err.style.height = '4rem';
            return false;
        }

    }
    
    return true;
}

// signInForm.addEventListener('submit' , function(e) {
//     e.preventDefault(); 
//     let isValid = validateSignIn()
//     if(isValid) {
//         document.querySelector("#loginForm").submit();
//     }
// })






// function validateSignIn() {
//     var email = document.querySelector('#email').value;
//     var password = document.querySelector('#password').value;
//     var err = document.querySelector('.error');
//     var text ;
//     var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    

//     if(email.match(mailformat) === null) {
//         text = "Please enter a valid email";
//         err.textContent = text ;
//         err.style.height = '4rem';
//         return false;
//     }
//     else if(password.length < 5) {
//         text = "Please enter a valid password";
//         err.textContent = text ;
//         err.style.height = '4rem';
//         return false;
//     }
    
//     return true;
// }