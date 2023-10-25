const singupForm = document.querySelector('#singupForm')
singupForm.addEventListener('submit', (e)=>{
    e.preventDefault
    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    //array con json//
    const Users = JSON.parse(localStorage.getItem('users')) || []
    const isUserRegistered = Users.find(user => user.email === email)
    //validacion//
    if(isUserRegistered){
        return alert('El usuario ya esta registrado')
    }

    Users.push({name: name, email: email, password: password})
    //uso del localstorage//
    localStorage.setItem('users', JSON.stringify(Users))
    alert('Registro Exitoso!!')
    //redireccion//
    window.location.href = 'login.html'

})