function show(){
  fetch('http://localhost:5000/user')
  .then(res => {
      return res.json()
  })
  .then(obj => {
    console.log(obj)
    con.innerHTML = ''
    obj.forEach(element => {
    let p = document.createElement('p')
    p.innerHTML = `<span>${element.id} -</span><span> ${element.username}</span>`
    con.appendChild(p)
    });       
  });
}

show()

add.onclick = function(){
  let info = {
    username: addInput.value,
  }
  fetch('http://localhost:5000/user', {
    method: 'POST',
    headers: { 
      'Content-type': 'application/json' 
    },
    body: JSON.stringify(info)
  }); 
  show()
  setTimeout(show,100)
}

del.onclick = function(){
  fetch(`http://localhost:5000/user/${delInput.value}`, {
    method: 'DELETE',
}); 
  show()
  setTimeout(show,100)
}

change.onclick = function(){
  let info = {
    username: changeInput.value,
  }
  fetch(`http://localhost:5000/user/${changeInputIndex.value}`, {
    method: 'PUT',
    headers: { 
      'Content-type': 'application/json' 
    },
    body: JSON.stringify(info)
  }); 
  show()
  setTimeout(show,100)
}






         