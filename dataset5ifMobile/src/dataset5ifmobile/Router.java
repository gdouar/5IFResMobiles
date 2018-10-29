/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dataset5ifmobile;

/**
 *
 * @author GDouar
 */
public class Router {
    
    private double latitude;
    private double longitude;
    private float radiusM;
    
    public Router(double latitude, double longitude, float radius){
        this.latitude = latitude;
        this.longitude = longitude;
        this.radiusM = radius;
    }
    public double getLatitude(){
        return this.latitude;
    }
    
    public double getLongitude(){
        return this.longitude;
    }
    
    public float getRadius(){
        return this.radiusM;
    }
}
