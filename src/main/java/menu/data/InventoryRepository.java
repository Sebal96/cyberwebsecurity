package menu.data;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface InventoryRepository
        extends
            JpaRepository<Inventory, Long>,
            JpaSpecificationExecutor<Inventory> {

}
