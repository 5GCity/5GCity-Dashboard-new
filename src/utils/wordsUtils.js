export default (words) => {
// Calculate length of each word to be used to determine number of words per line
  const Arraywords = words.split(/\s+/) && words.split('-');

   var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
   var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
   Object.assign(text.style, words);
   svg.appendChild(text);
   document.body.appendChild(svg);

   const wordsWithComputedWidth = Arraywords.map(word => {
     text.textContent = word;
     return { word, width: text.getComputedTextLength() }
   })

   text.textContent = '\u00A0'; // Unicode space
   const spaceWidth = text.getComputedTextLength();

   document.body.removeChild(svg);

   const wordsByLines = wordsWithComputedWidth.reduce((result, { word, width}) => {
     const lastLine = result[result.length - 1] || { words: [], width: 0 };

     if (lastLine.words.length === 0) {
       // First word on line
       const newLine = { words: [word], width };
       result.push(newLine);
     } else if (lastLine.width + width + (lastLine.words.length * spaceWidth) < 125) {
       // Word can be added to an existing line
       lastLine.words.push(word);
       lastLine.width += width;
     } else {
       // Word too long to fit on existing line
       const newLine = { words: [word], width }
       result.push(newLine)
     }

     return result
   }, [])
   const newPhrase = wordsByLines.map(line => line.words.join(' '))

   return newPhrase
}
