package menu.data;

import jakarta.persistence.Entity;


@Entity
public class CyberAlerty extends AbstractEntity {

    private String temat;
    private String system;
    private String podatność;
    private String waga;
    private String data;  
    private boolean rozwiazane;

    public CyberAlerty(String temat, String system, String podatność, String waga, String data, boolean rozwiazane) {
        this.temat = temat;
        this.system = system;
        this.podatność = podatność;
        this.waga = waga;
        this.data = data;
        this.rozwiazane = rozwiazane;
    }

    
    public String getTemat() { return temat; }
    public void setTemat(String temat) { this.temat = temat; }

    public String getSystem() { return system; }
    public void setSystem(String system) { this.system = system; }

    public String getPodatność() { return podatność; }
    public void setPodatność(String podatność) { this.podatność = podatność; }

    public String getWaga() { return waga; }
    public void setWaga(String waga) { this.waga = waga; }

    public String getData() { return data; }
    public void setData(String data) { this.data = data; }

    public boolean isRozwiązane() { return rozwiazane; }
    public void setRozwiązane(boolean rozwiazane) { this.rozwiazane = rozwiazane; }
}

