  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_TRACKING_ID');

    window.addEventListener("load", function() {
        const loader = document.getElementById('loader');
        loader.style.display = 'none';
    });

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyiKt_bDV_nMJBWFQ_N4iHsKhFCtBi7nv4cCiUtzD-YSLhhD3J3PhksvAV6oX95_ovf_Q/exec' // add your own app script link here
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
