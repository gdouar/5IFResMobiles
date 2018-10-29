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
import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;


/**
 *
 * @author Lucas
 */
public class Dataset5ifMobile {
/*    public static double MAX_BANWIDTH = 17.84;
    public static double MIN_BANDWIDTH = 1.15; **/
    public static int MAX_FORCE_SIGNAL = 5;
    public static int NB_RESULTS = 450;
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        
        String[] reseaux = {"Part-dieu", "Eduroam", "INSA INVITE"} ;
        Network[] coords = initMeasures();
        String filename = "result.sql";
        File file = new File(filename);
        ArrayList<Measure> measures = new ArrayList();
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
            Date start = new GregorianCalendar(2018, 1, 1).getTime();
            Date end = new GregorianCalendar(2019, 1, 1).getTime();
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            for(int i=0;i<NB_RESULTS;i++){
                // select random properties
                int j = (int)(Math.random() * (reseaux.length));
                Random r = new Random();
                Network coord = coords[j];
                coord.index = j;
                double longitude = coord.minLng + (coord.maxLng - coord.minLng) * r.nextDouble();
                double latitude = coord.minLat + (coord.maxLat - coord.minLat) * r.nextDouble();
                Date randomDate = new Date(ThreadLocalRandom.current().nextLong(start.getTime(), end.getTime()));
             /*   double bandePassante = MIN_BANDWIDTH + (MAX_BANWIDTH - MIN_BANDWIDTH) * r.nextDouble();
                int forceSignal = (int)(Math.random() * MAX_FORCE_SIGNAL+1);  */
                measures.add(new Measure(longitude, latitude, randomDate, coord));
            }
            BandwidthSimulator bs = new LinearBandwidthSimulator();
            bs.setBandwidths(measures);
            bs.setSignals(measures);
           sql = "INSERT INTO mesures (Latitude, Longitude, DateMesure, BandePasssante, ForceSignal, idReseau) VALUES";
           Iterator<Measure> it = measures.iterator();
           while(it.hasNext()){
               Measure m = it.next();
                sql += "(" + m.getLatitude() + "," + m.getLongitude() + ", '" + dateFormat.format(m.getDate()) 
                        + "'," + m.getBandePassante() + "," + m.getForceSignal() + "," + m.getNetwork().index +")";
                if(it.hasNext()) sql += ","; else sql += ";";
                sql += "\n";
           }
           fos.write(sql.getBytes());
        }
    catch(Exception ex){
        System.err.println(ex.getMessage());
    }
    }
    
    
    public static Network[] initMeasures(){
                Network partDieu = new Network(45.762672,4.853373, 45.760168, 4.857270);
        Network eduroam =  new Network(45.784624, 4.870588, 45.784001, 4.884025);
        Network insainv=  new Network(45.784624, 4.870588, 45.784001, 4.884025);
  
        Router routerPartDieu = new Router(45.761815, 4.855733, 300);
        Router routerEdu1 = new Router(45.784151, 4.869078, 300);
        Router routerEdu2 = new Router(45.782303, 4.871984, 300);
        Router routerEdu3 = new Router(45.784241, 4.876812, 500);
        Router routerEdu4 = new Router(45.785708, 4.879580, 200);
        Router routerEdu5 = new Router(45.785244, 4.883399, 300);
        Router routerInsa1 = new Router(45.782549, 4.872771, 500);
        Router routerInsa2 = new Router(45.784674, 4.879892, 500);
        
        
        partDieu.setRouters(new ArrayList<Router>() {{
            add(routerPartDieu);
        }});
                
        eduroam.setRouters(new ArrayList<Router>() {{
            add(routerEdu1);
            add(routerEdu2);
            add(routerEdu3);
            add(routerEdu4);
            add(routerEdu5);
        }});
        insainv.setRouters(new ArrayList<Router>() {{
             add(routerInsa1);
             add(routerInsa2);
        }});
        return new Network[] {partDieu, eduroam, insainv};
    }
    
    
}
