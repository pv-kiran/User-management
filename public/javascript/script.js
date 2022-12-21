console.log("Hello");

var form = document.querySelector("#form");

form.addEventListener('submit' , function(e) {
    e.preventDefault(); 
    console.log('Hello ... signin')
    let isValid = validate()
    if(isValid) {
        document.querySelector("#form").submit();
    }
})

function validate() {
    var name = document.querySelector('#name').value;
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
    var err = document.querySelector('.error');
    var text ;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    

    

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
    else if(email.match(mailformat) === null) {
        text = "Please enter a valid email";
        err.textContent = text ;
        err.style.height = '4rem';
        return false;
    }
    else if(password.length < 5) {
        text = "Please enter a valid email";
        err.textContent = text ;
        err.style.height = '4rem';
        return false;
    }
    
    return true;
}