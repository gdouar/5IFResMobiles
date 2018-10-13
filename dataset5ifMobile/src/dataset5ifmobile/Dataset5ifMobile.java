/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dataset5ifmobile;

import java.io.File;
import java.io.FileOutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;


/**
 *
 * @author Lucas
 */
public class Dataset5ifMobile {
    public static double MAX_BANWIDTH = 17.84;
    public static double MIN_BANDWIDTH = 1.15;
    public static int MAX_FORCE_SIGNAL = 5;
    public static int NB_RESULTS = 450;
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        
        String[] reseaux = {"Part-dieu", "Eduroam", "INSA INVITE"} ;
        Coords[] coords = {new Coords(45.762672,4.853373, 45.760168, 4.857270), 
            new Coords(45.784624, 4.870588, 45.784001, 4.884025),
        new Coords(45.784624, 4.870588, 45.784001, 4.884025)};
        String filename = "result.sql";
        File file = new File(filename);
        try{
            file.createNewFile();
            FileOutputStream fos = new FileOutputStream(filename);
            fos.write(("DELETE FROM mesures;\n" +
                        "DELETE FROM reseaux;\n").getBytes());
            String sql = "INSERT INTO reseaux (IdReseau, SSID, Type) VALUES ";
            for(int i=0;i<reseaux.length;i++){
                sql += "(" + (int) (i+1) + ",'" + reseaux[i] +  "', 'wifi')";
                if(i+1 != reseaux.length) sql += ","; else sql += ";\n\n";
            }
            fos.write(sql.getBytes());
            sql = "INSERT INTO mesures (Latitude, Longitude, DateMesure, BandePasssante, ForceSignal, idReseau) VALUES";
            Date start = new GregorianCalendar(2018, 1, 1).getTime();
            Date end = new GregorianCalendar(2019, 1, 1).getTime();
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            for(int i=0;i<NB_RESULTS;i++){
                int j = (int)(Math.random() * (reseaux.length));
                Random r = new Random();
                Coords coord = coords[j];
                double longitude = coord.minLng + (coord.maxLng - coord.minLng) * r.nextDouble();
                double latitude = coord.minLat + (coord.maxLat - coord.minLat) * r.nextDouble();
                Date randomDate = new Date(ThreadLocalRandom.current().nextLong(start.getTime(), end.getTime()));
                double bandePassante = MIN_BANDWIDTH + (MAX_BANWIDTH - MIN_BANDWIDTH) * r.nextDouble();
                int forceSignal = (int)(Math.random() * MAX_FORCE_SIGNAL+1);
                sql += "(" + latitude + "," + longitude + ", '" + dateFormat.format(randomDate) + "'," + bandePassante + "," + forceSignal + "," + (int) (j+1) +")";
                if(i+1 != NB_RESULTS) sql += ","; else sql += ";";
                sql += "\n";
            }
           fos.write(sql.getBytes());
        }
    catch(Exception ex){
        System.err.println(ex.getMessage());
    }
    }
    
}
