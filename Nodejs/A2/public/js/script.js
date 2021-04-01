
window.onload = () => {

    setTimeout(() => {
        message('close');
    }, 2000);
}


function message(res) {

    console.log('message');

    if (res === 'close') {
        document.getElementById("message").style.display = 'none';
    }
}