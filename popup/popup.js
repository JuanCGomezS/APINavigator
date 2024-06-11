/* document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const urlInput = document.querySelector("#url");
  const methodSelect = document.querySelector("#method");
  const authInput = document.querySelector("#auth");
  const sendBtn = document.querySelector("#send-btn");
  const resultDiv = document.querySelector("#result");
  const loadingDiv = document.querySelector('#loading');

  sendBtn.addEventListener("click", async (event) => {
    loadingDiv.style.display = 'flex';

    try {
      event.preventDefault();
      const url = urlInput.value.trim();
      const method = methodSelect.value;
      const auth = authInput.value.trim();
    
      if (!url) { 
        alert("Ingrese una URL válida"); 
        loadingDiv.style.display = 'none'; 
        return; 
      }

      const response = await chrome.runtime.sendMessage({ action: 'sendRequest', url, method, auth, });
      loadingDiv.style.display = 'none';
      if (response.result == undefined)
      {
        resultDiv.style.color = 'red';
        resultDiv.innerText = `Response: ${response.result}`;
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.title = 'Copiar contenido';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.style.display = 'block';
        resultDiv.appendChild(copyBtn);

        copyBtn.addEventListener('click', () => {
          const textToCopy = resultDiv.textContent.trim();
          navigator.clipboard.writeText(textToCopy);
          alert('Contenido copiado al portapapeles!');
        });
      }
      else
      {
        resultDiv.style.color = 'green';
        resultDiv.innerText = `Response: ${JSON.stringify(response.result, null, 2)}`;
      }
    } catch (error) {
      loadingDiv.style.display = 'none';
      resultDiv.style.color = 'red';
      resultDiv.innerText = `Error: ${error.message}`;
    }
  });
}); */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const urlInput = document.querySelector("#url");
  const methodSelect = document.querySelector("#method");
  const authInput = document.querySelector("#auth");
  const sendBtn = document.querySelector("#send-btn");
  const resultDiv = document.querySelector("#result");
  const loadingDiv = document.querySelector('#loading');

  sendBtn.addEventListener("click", async (event) => {
    //loadingDiv.style.display = 'block';
    loadingDiv.style.display = 'flex';

    try {
      event.preventDefault();
      const url = urlInput.value.trim();
      const method = methodSelect.value;
      const auth = authInput.value.trim();
    
      if (!url) { 
        alert("Ingrese una URL válida"); 
        loadingDiv.style.display = 'none'; 
        return; 
      }

      const response = await chrome.runtime.sendMessage({ action: 'sendRequest', url, method, auth, });
      loadingDiv.style.display = 'none';
      if (response.result == undefined)
      {
        resultDiv.style.color = 'ed';
        resultDiv.innerText = `Error: ${response.result}`;
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.title = 'Copiar contenido';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        resultDiv.appendChild(copyBtn);

        copyBtn.addEventListener('click', () => {
          const textToCopy = resultDiv.textContent.trim();
          navigator.clipboard.writeText(textToCopy);
          alert('Contenido copiado al portapapeles!');
        });
      }
      else
      {
        resultDiv.style.color = 'green';
        resultDiv.innerText = `${JSON.stringify(response.result, null, 2)}`;
      }
    } catch (error) {
      loadingDiv.style.display = 'none';
      resultDiv.style.color = 'ed';
      resultDiv.innerText = `Error: ${error.message}`;
    }
  });
});

/*Estilos para boton Enviar*/
document.querySelectorAll('.button').forEach(button => {

  let div = document.createElement('div'),
      letters = button.textContent.trim().split('');

  function elements(letter, index, array) {
      let element = document.createElement('span'),
          part = (index >= array.length / 2) ? -1 : 1,
          position = (index >= array.length / 2) ? array.length / 2 - index + (array.length / 2 - 1) : index,
          move = position / (array.length / 2),
          rotate = 1 - move;

      element.innerHTML = !letter.trim() ? '&nbsp;' : letter;
      element.style.setProperty('--move', move);
      element.style.setProperty('--rotate', rotate);
      element.style.setProperty('--part', part);
      div.appendChild(element);
  }

  letters.forEach(elements);
  button.innerHTML = div.outerHTML;

  button.addEventListener('mouseenter', e => {
      if(!button.classList.contains('out')) {
          button.classList.add('in');
      }
  });

  button.addEventListener('mouseleave', e => {
      if(button.classList.contains('in')) {
          button.classList.add('out');
          setTimeout(() => button.classList.remove('in', 'out'), 950);
      }
  });

});

/* Botón con un icono de copiar */
const copyBtn = document.querySelector('.copy-btn');

copyBtn.addEventListener('click', () => {
  const resultDiv = document.getElementById('result');
  const textToCopy = resultDiv.textContent.trim();
  navigator.clipboard.writeText(textToCopy);
  alert('Contenido copiado al portapapeles!');
});