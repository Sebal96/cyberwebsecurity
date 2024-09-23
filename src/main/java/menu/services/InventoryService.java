package menu.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import menu.data.Inventory;
import menu.data.InventoryRepository;
@Service
public class InventoryService {
    private final InventoryRepository repository;

    @Autowired
    public InventoryService(InventoryRepository repository) {
        this.repository = repository;
    }

    public Optional<Inventory> get(Long id) {
        return repository.findById(id);
    }

    public Inventory update(Inventory entity) {
        return repository.save(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Page<Inventory> list(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Page<Inventory> list(Pageable pageable, Specification<Inventory> filter) {
        return repository.findAll(filter, pageable);
    }

    public int count() {
        return (int) repository.count();
    }
    
    public Inventory create(Inventory entity) {
        return repository.save(entity); 
    }
    
    public List<Inventory> findAll() {
        return repository.findAll(); 
    }
    
    
   
}
