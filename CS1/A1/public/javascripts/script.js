
delete_ = (id) => {
    

    // fetch('/delete?' + new URLSearchParams({ id })).
    // then( () => {

    // }).catch((err) => {
    //     console.log("Failed to Delete" + err);
    // });    
    // window.location.replace('http://localhost:3000');
    window.location.replace('/delete?' + new URLSearchParams({ id }));
    
}