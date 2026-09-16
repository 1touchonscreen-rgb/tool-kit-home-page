    
    // Case No-1 Title Case
    function convertToTitleCase() {
      let text = document.getElementById("inputText").value;
      let words = text.toLowerCase().split(" ");
      for (let i = 0; i < words.length; i++) {
        if (words[i]) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
      }
      document.getElementById("outputText").value = words.join(" ");
    }
// Case No-2 Upper Case
        function convertToUpperCase() {
      let text = document.getElementById("inputText").value;
      let words = text.toUpperCase();
      document.getElementById("outputText").value = words;
    }
// Case No-3 Lower Case
         function convertToLowerCase() {
      let text = document.getElementById("inputText").value;
      let words = text.toLowerCase();
      document.getElementById("outputText").value = words;
    }

//* Case No-4 Sentence Case
        function convertToSentenceCase() {
      let text = document.getElementById("inputText").value;
      let words = text.toLowerCase();
        if (words[0]) {
          words = words[0].toUpperCase() + words.substr(1);
        }
      document.getElementById("outputText").value = words;
    }      