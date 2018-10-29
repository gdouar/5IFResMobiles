/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dataset5ifmobile;

import java.util.List;

/**
 *
 * @author Lucas
 */
public class Network {

    public List<Router> getRouters() {
        return routers;
    }
    public final double maxLat;
    public final double maxLng;
    public final double minLat;
    public final double minLng;
    public int index;
    private List<Router> routers;
    public Network(double lat, double lon, double minlat, double minLon) {
        maxLat = lat;
        maxLng = lon;
        minLat = minlat;
        minLng = minLon;
    }
    
    public void setRouters(List<Router> routers){
        this.routers = routers;
    }
}
