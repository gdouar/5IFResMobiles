/**
 * Gestion des fonctionnaités utilitaires de couleur de zones
 */
class ColorsUtil {
  static percentColors = [
    { pct: 0.0, color: { r: 0x00, g: 0x00, b: 0x00 } },
    { pct: 0.5, color: { r: 0x66, g: 0x00, b: 0x66 } },
    { pct: 1.0, color: { r: 0xFF, g: 0x00, b: 0x00 } } ];

   static getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    static getColorForPercentage = function(pct) {
        var percentColors = ColorsUtil.percentColors;
          for (var i = 1; i < percentColors.length - 1; i++) {
              if (pct < percentColors[i].pct) {
                  break;
              }
          }
          var lower = percentColors[i - 1];
          var upper = percentColors[i];
          var range = upper.pct - lower.pct;
          var rangePct = (pct - lower.pct) / range;
          var pctLower = 1 - rangePct;
          var pctUpper = rangePct;
          var color = {
              r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
              g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
              b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
          };
          return '#' + [("00" + (+color.r).toString(16)).slice(-2), ("00" + (+color.g).toString(16)).slice(-2), ("00" + (+color.b).toString(16)).slice(-2)].join('');
          // or output as hex if preferred
      }  
      
  }
  
  export { ColorsUtil as ColorsUtil};