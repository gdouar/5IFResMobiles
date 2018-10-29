package dataset5ifmobile;

import java.util.Date;

/**
 *
 * @author GDouar
 */
public class Measure {    
    
    private double longitude;
    private double latitude;
    private Date date;
    private Network network;
    private double bandePassante;
    private int forceSignal;
    
    public Measure(double longitude, double latitude, Date date, Network network) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.date = date;
        this.network = network;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public double getBandePassante() {
        return bandePassante;
    }

    public void setBandePassante(double bandePassante) {
        this.bandePassante = bandePassante;
    }

    public int getForceSignal() {
        return forceSignal;
    }

    public void setForceSignal(int forceSignal) {
        this.forceSignal = forceSignal;
    }
    public Network getNetwork() {
        return network;
    }

    public void setNetwork(Network network) {
        this.network = network;
    }

}
