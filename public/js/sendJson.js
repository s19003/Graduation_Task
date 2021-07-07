const button = document.querySelector('.button')

const sample = { name: '上原功也' }

button.addEventListener('click', () => {
  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sample)
  }).then(res => {
    if (!res.ok) {
      throw new Error()
    }

    console.log('OK')
    return res
  })
})
