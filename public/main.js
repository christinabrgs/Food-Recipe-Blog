const trash = document.getElementsByClassName("fa-trash");


function makeReq(){
    let newRecipe = document.querySelector('input').value
    console.log (newfood)
  
    fetch('search', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'recipe': newRecipe,
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
}
  

Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function(){
      const name = this.parentNode.parentNode.childNodes[1].innerText
      const msg = this.parentNode.parentNode.childNodes[3].innerText
      fetch('messages', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': name,
          'msg': msg
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});
  
  document.querySelector('#submit').addEventListener('click', makeReq)