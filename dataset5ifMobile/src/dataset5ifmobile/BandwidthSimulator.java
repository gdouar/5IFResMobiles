package dataset5ifmobile;

import java.util.List;

/**
 *
 * @author GDouar
 */
public interface BandwidthSimulator {
    
    void setBandwidths(List<Measure> measures);
    
    void setSignals(List<Measure> measures);
    
}
