/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dataset5ifmobile;

/**
 *
 * @author Lucas
 */
public class Coords {
    public final double maxLat;
    public final double maxLng;
    public final double minLat;
    public final double minLng;
    
    public Coords(double lat, double lon, double minlat, double minLon) {
        maxLat = lat;
        maxLng = lon;
        minLat = minlat;
        minLng = minLon;
    }
}
