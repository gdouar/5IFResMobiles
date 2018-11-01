/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dataset5ifmobile;

import java.util.List;
import java.util.Random;

/**
 *
 * @author GDouar
 */
public class RandomBandwidthSimulator implements BandwidthSimulator{
    public static final double MAX_BANWIDTH = 30.84;
    public static final double MIN_BANDWIDTH = 1.15;
    public static final int MAX_FORCE_SIGNAL = 5;
    Random r = new Random();
    @Override
    public void setBandwidths(List<Measure> measures) {
        measures.forEach((m) -> {
            
            m.setBandePassante(MIN_BANDWIDTH + (MAX_BANWIDTH - MIN_BANDWIDTH) * r.nextDouble());
        });
    }

    @Override
    public void setSignals(List<Measure> measures) {
        measures.forEach((m) -> {
            m.setForceSignal((int)(Math.random() * MAX_FORCE_SIGNAL+1));
        });
    }
    
}
