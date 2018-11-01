package dataset5ifmobile;

import java.util.List;

/**
 *
 * @author GDouar
 */

//TODO un jour peut-être
public class LinearBandwidthSimulator implements BandwidthSimulator {

    @Override
    public void setBandwidths(List<Measure> measures) {
        measures.forEach((m) -> {
            m.setBandePassante(0);
        });
    }

    @Override
    public void setSignals(List<Measure> measures) {
        measures.forEach((m) -> {
            m.setForceSignal(0);
        });
    }
    
}
