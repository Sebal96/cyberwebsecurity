package menu.data;

import jakarta.persistence.Entity;

@Entity
public class Inventory extends AbstractEntity {

    private String sprzęt;
    private String producent;
    private String system;
    private String wersja;
    private String procesor;
    private String dodatkowe;
    private boolean domyślny;

    public String getsprzęt() {
        return sprzęt;
    }
    public void setsprzęt(String sprzęt) {
        this.sprzęt = sprzęt;
    }
    public String getproducent() {
        return producent;
    }
    public void setproducent(String producent) {
        this.producent = producent;
    }
    public String getsystem() {
        return system;
    }
    public void setsystem(String system) {
        this.system = system;
    }
    public String getwersja() {
        return wersja;
    }
    public void setwersja(String wersja) {
        this.wersja = wersja;
    }

    public String getprocesor() {
        return procesor;
    }
    public void setprocesor(String procesor) {
        this.procesor = procesor;
    }
    public String getdodatkowe() {
        return dodatkowe;
    }
    public void setdodatkowe(String dodatkowe) {
        this.dodatkowe = dodatkowe;
    }
    public boolean isdomyślny() {
        return domyślny;
    }
    public void setdomyślny(boolean domyślny) {
        this.domyślny = domyślny;
    }

}
