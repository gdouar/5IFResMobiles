/**
 * Gestion des fonctionnaités utilitaires de couleur de zones
 */
class ColorsUtil {
   static getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
  }
  
  export { ColorsUtil as ColorsUtil};