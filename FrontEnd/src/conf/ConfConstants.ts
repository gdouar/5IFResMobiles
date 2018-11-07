/**
 * Gestion des constantes de configuration du front
 */
class ConfConstants {
  public static get BACKEND_PORT():number  { return 80; }
  public static get BACKEND_URL():string { return "http://localhost:" + this.BACKEND_PORT + "/"; }
  public static get MAPDATAS_URL():string { return "getMap"; }
}

export { ConfConstants as ConfConstants};