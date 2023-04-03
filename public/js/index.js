// scoket.io
var socket = io({ transports: ['websocket'], upgrade: false });

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var users = document.getElementById('users');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const user = localStorage.getItem('user');
    if (input.value) {
        socket.emit('message', { msg: input.value, by: user });
        input.value = '';
    }
});

socket.on('message', (msg) => {
    var item = document.createElement('li');
    item.textContent = msg.by + ': ' + msg.msg;
    item.style = 'font-size: 1rem';
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('user', (user) => {
    var item = document.createElement('li');
    item.textContent = user + " Connected ...";
    item.style = 'font-size: 0.9rem';
    messages.append(item).show(2000);
    window.scrollTo(0, document.body.scrollHeight);
})

//
socket.on('num_connections', (data) => {
    users.innerHTML = data.count
})


// pop-ups
$.confirm({
    icon: 'fa fa-spinner fa-spin',
    title: 'Your Name !',
    boxWidth: '40%',
    useBootstrap: false,
    content: '' +
        '<form action="" class="formName">' +
        '<div class="form-group">' +
        '<label>Enter something here</label><br><br>' +
        '<input type="text" placeholder="Your name ?" class="name form-control" required />' +
        '</div>' +
        '</form>',
    buttons: {
        formSubmit: {
            text: 'Submit',
            btnClass: 'btn-blue',
            action: function () {
                var name = this.$content.find('.name').val();
                if (!name) {
                    $.alert({
                        title: 'Please Enter Name',
                        boxWidth: '40%',
                        useBootstrap: false,
                    });
                    return false;
                } else {
                    $.alert({
                        title: 'Your name is ' + name,
                        boxWidth: '40%',
                        useBootstrap: false,
                    });
                    socket.emit('user', name);
                    localStorage.setItem('user', name);
                }
            }
        },
    },
});

// darkmode
const options = {
    bottom: '64px', // default: '32px'
    right: '32px', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColor: '#fff',  // default: '#fff'
    buttonColorDark: '#100f2c',  // default: '#100f2c'
    buttonColorLight: '#fff', // default: '#fff'
    saveInCookies: false, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
}

// const darkmode = new Darkmode(options);
// darkmode.showWidget();
