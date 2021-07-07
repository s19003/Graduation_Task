const button = document.querySelector('.button')

button.addEventListener('click', () => {
  let sampleJson = {
    platform: 'Twitter',
    name: '上原',
    comment: 'とても面白いです!!',
    date: new Date().toLocaleString()
  }

  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sampleJson)
  }

  fetch('/', data)
})
