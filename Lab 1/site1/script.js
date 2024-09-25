document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('pixelCanvas');
    const colorPicker = document.getElementById('colorPicker');
    let currentColor = '#000000';
  
    colorPicker.addEventListener('input', function() {
      currentColor = colorPicker.value;
    });
  
    for (let i = 0; i < 256; i++) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixel.addEventListener('click', function() {
        pixel.style.backgroundColor = currentColor;
      });
      canvas.appendChild(pixel);
    }
  });
  
  function clearCanvas() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => pixel.style.backgroundColor = '#fff');
  }
  