console.log("Hello");


// client side validation

let form = document.querySelector("#form");
let updateForm = document.querySelector('#updateForm');


if(form) {
    form.addEventListener('submit' , function(e) {
        e.preventDefault(); 
        let isValid = validate();
        if(isValid) {
            document.querySelector("#form").submit();
        }
    })
}


if(updateForm) {
    updateForm.addEventListener('submit' , function(e) {
        e.preventDefault();
        let isValid = validate();
        if(isValid) {
            console.log('Loger error');
            sendUpdateReq();
        }
    })
}




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
        // console.log(confirmPswd);
        // console.log(password);
        
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



// Sending user updation request

let editItems = document.querySelector('table');
if(editItems) {
    editItems.addEventListener('click' , (e) => {
        if(e.target.classList.contains('btn-delete')) {
            deleteUser(e);
        }
        else if(e.target.classList.contains('btn-edit')) {
             editUser(e);
        }
    
        // else if(e.target.classList.contains('btn-view')) {
        //     viewUser(e);
        // }
        
    })
}



function editUser(e) {
   const userId = e.target.dataset.url;
   console.log(userId);
}

async function deleteUser(e) {
    const userId = e.target.dataset.url;
    console.log(userId);
    const url = `http://localhost:3000/admin/user/${userId}` ;
    console.log(url);
    const res = await fetch(url, {
                    method: 'DELETE',
                    credentials: "same-origin",
                    headers: {
                    'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                    id: userId
                    })
                });
                
    const redirectPath = await res.json();
    window.location.href = redirectPath.redirect;
    
}

async function sendUpdateReq(){
    const userId = document.getElementById('btn-update').dataset.url;
    console.log(userId);
    const url = `http://localhost:3000/admin/update/${userId}`;
    console.log(url);
    const res = await fetch(url, {
                    method: 'PUT',
                    credentials: "same-origin",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: document.getElementById('name').value,
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value
                    })
                })
    const redirectPath = await res.json();
    window.location.href = redirectPath.redirect;
}









// function viewUser(e) {
//     console.log(e.target.dataset.url)
// }






















































// let deleteBtn = document.g

// function sendDeleteReq(e){
//     console.log(e);
//     // const data = document.getElementById('delete-button').dataset.url;
//     // console.log(data)
//     // const url = `http://localhost:3000/admin/user/${data}` ;
//     // // console.log(url);
//     // fetch(url, {
//     //   method: 'DELETE',
//     //   headers: {
//     //     'Content-Type' : 'application/json'
//     //   },
//     //   body: JSON.stringify({
//     //     id: data
//     //   })
//     // })
//   }


// const url = `http://localhost:3000/admin/user/${data}` ;
//     // console.log(url);
// fetch(url, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type' : 'application/json'
//     },
//     body: JSON.stringify({
//       id: data
//     })
// })




























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