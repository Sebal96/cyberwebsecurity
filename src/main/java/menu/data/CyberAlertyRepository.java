package menu.data;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CyberAlertyRepository
        extends
            JpaRepository<CyberAlerty, Long>,
            JpaSpecificationExecutor<CyberAlerty> {

}
