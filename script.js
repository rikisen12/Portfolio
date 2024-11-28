  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-40FQTWBSE3');

    window.addEventListener("load", function() {
        const loader = document.getElementById('loader');
        loader.style.display = 'none';
    });

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxt3Cq74tDcJXxMc8UlUJhTRfy8LSMy4PTVbipvgF2rWNYNdcu8zZxtTUxzhBsbCrZx5w/exec' // add your own app script link here
    const form = document.forms['submit-to-google-sheet']
    const msg = document.getElementById("msg")
  
    form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Message sent successfully"
            setTimeout(function(){
                msg.innerHTML = ""
            },5000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
    })
