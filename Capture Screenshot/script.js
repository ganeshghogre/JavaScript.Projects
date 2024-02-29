document.getElementById('screenshotBtn').addEventListener('click', function () {
    this.classList.add('hidden');

    html2canvas(document.documentElement, {
        scale: window.devicePixelRatio, 
        logging: true, 
        useCORS: true, 
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
    }).then(canvas => {
        
        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

        var link = document.createElement('a');
        link.download = 'screenshot.png';
        link.href = image;
        link.click();

        this.classList.remove('hidden');
    });

});