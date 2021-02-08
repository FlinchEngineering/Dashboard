export default class UtilService {
  static generateThumbnail (file:File) {
    
  }

  static generatePassword () {
    function shuffleArray(array: string[]) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
    const numberChars = "0123456789";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const allChars = numberChars + upperChars + lowerChars;
    let randPasswordArray = Array(14);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray = randPasswordArray.fill(allChars, 3);
    return shuffleArray(randPasswordArray.map(x => { 
      return x[Math.floor(Math.random() * x.length)] 
    })).join('');
  }

}