package menu.services;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import menu.data.CyberAlerty;
import menu.data.CyberAlertyRepository;

@Service
public class CyberAlertyService {

    private final CyberAlertyRepository repository;

    @Autowired
    public CyberAlertyService(CyberAlertyRepository repository) {
        this.repository = repository;
        addSampleData(); // Dodanie przykładowych danych
    }

    public Optional<CyberAlerty> get(Long id) {
        return repository.findById(id);
    }

    public CyberAlerty save(CyberAlerty entity) {
        return repository.save(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Page<CyberAlerty> list(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Page<CyberAlerty> list(Pageable pageable, Specification<CyberAlerty> filter) {
        return repository.findAll(filter, pageable);
    }

    public int count() {
        return (int) repository.count();
    }

    private void addSampleData() {
        
        if (repository.count() == 0) {
            repository.save(new CyberAlerty("Zagrożenie związane z Ransomware", "Windows", "Ransomware", "Wysoka", "2024-5-24", false));
            repository.save(new CyberAlerty("Zagrożenie DDoS", "Linux", "DDoS", "Średnia", "2024-6-30", false));
            repository.save(new CyberAlerty("Zagrożenie związane z Phishingiem", "MacOS", "Phishing", "Wysoka", "2024-4-14", false));
            
        }
    }
}
