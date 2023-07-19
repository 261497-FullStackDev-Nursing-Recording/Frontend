
// const myText = document.getElementById('my-text');
// myText.InformPage.cssText = `height: ${myText.scrollHeight}px; overflow-y: hidden`;
 
// myText.addEventListener("input", function() {
//    this.InformPage.height ="auto";
//    this.InformPage.height = `${this.scrollHeight}px`;

// });


$('#autoresizing').on('input', function () {
    this.style.height = 'auto';

    this.style.height =
        (this.scrollHeight) + 'px';
});
