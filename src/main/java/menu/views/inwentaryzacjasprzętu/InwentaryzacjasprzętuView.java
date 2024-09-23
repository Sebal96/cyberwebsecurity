package menu.views.inwentaryzacjasprzętu;

import java.util.Optional;

import org.springframework.orm.ObjectOptimisticLockingFailureException;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.dependency.Uses;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.Notification.Position;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.BeanValidationBinder;
import com.vaadin.flow.data.binder.ValidationException;
import com.vaadin.flow.data.renderer.LitRenderer;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import jakarta.annotation.security.PermitAll;
import menu.data.Inventory;
import menu.services.InventoryService;
import menu.views.MainLayout;

@PageTitle("Inwentaryzacja sprzętu")
@Route(value = "inwentaryzacja/:inventoryID?/:action?(edit)", layout = MainLayout.class)
@PermitAll
@Uses(Icon.class)
public class InwentaryzacjasprzętuView extends Div implements BeforeEnterObserver {

    private final String inventory_ID = "inventoryID";
    private final String inventory_EDIT_ROUTE_TEMPLATE = "inwentaryzacja/%s/edit";

    private final Grid<Inventory> grid = new Grid<>(Inventory.class, false);

    private TextField sprzęt;
    private TextField producent;
    private TextField system;
    private TextField wersja;
    private TextField procesor;
    private TextField dodatkowe;
    private Checkbox domyślny;

    private final Button cancel = new Button("Anuluj");
    private final Button save = new Button("Zapisz");

    private final BeanValidationBinder<Inventory> binder;

    private Inventory inventory;

    private final InventoryService inventoryService;
    
    private void refreshGrid() {
        grid.setItems(inventoryService.findAll()); // Ustawienie wszystkich obiektów Inventory w gridzie
    }
    

    public InwentaryzacjasprzętuView(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
        addClassNames("inwentaryzacjasprzętu-view");

        // Create UI
        SplitLayout splitLayout = new SplitLayout();

        createGridLayout(splitLayout);
        createEditorLayout(splitLayout);

        add(splitLayout);

        // Configure Grid
        grid.addColumn("sprzęt").setAutoWidth(true);
        grid.addColumn("producent").setAutoWidth(true);
        grid.addColumn("system").setAutoWidth(true);
        grid.addColumn("wersja").setAutoWidth(true);
        grid.addColumn("procesor").setAutoWidth(true);
        grid.addColumn("dodatkowe").setAutoWidth(true);
        LitRenderer<Inventory> domyślnyRenderer = LitRenderer.<Inventory>of(
                "<vaadin-icon icon='vaadin:${item.icon}' style='width: var(--lumo-icon-size-s); height: var(--lumo-icon-size-s); color: ${item.color};'></vaadin-icon>")
                .withProperty("icon", domyślny -> domyślny.isdomyślny() ? "check" : "minus").withProperty("color",
                        domyślny -> domyślny.isdomyślny()
                                ? "var(--lumo-primary-text-color)"
                                : "var(--lumo-disabled-text-color)");

        grid.addColumn(domyślnyRenderer).setHeader("domyślny").setAutoWidth(true);
        grid.asSingleSelect().addValueChangeListener(event -> {
            if (event.getValue() != null) {
                populateForm(event.getValue());
                UI.getCurrent().navigate(String.format(inventory_EDIT_ROUTE_TEMPLATE, event.getValue().getId()));
            } else {
                clearForm();
                UI.getCurrent().navigate(InwentaryzacjasprzętuView.class);
            }
        });
        
       

        // Configure Form
        binder = new BeanValidationBinder<>(Inventory.class);

        // Bind fields. This is where you'd define e.g. validation rules

        binder.bindInstanceFields(this);

        cancel.addClickListener(e -> {
            clearForm();
        });

        save.addClickListener(e -> {
            try {
                if (this.inventory == null || this.inventory.getId() == null) {
                    this.inventory = new Inventory(); // Tworzenie nowego obiektu, jeśli jest nowy wpis
                }
                binder.writeBean(this.inventory);
                
                // Dodawanie lub aktualizacja w zależności od stanu obiektu
                if (this.inventory.getId() == null) {
                    inventoryService.create(this.inventory); // Stworzenie nowego obiektu
                } else {
                    inventoryService.update(this.inventory);
                }
                
                clearForm();
                refreshGrid(); // Odświeżenie gridu po zapisaniu
                Notification.show("Data saved");
            } catch (ObjectOptimisticLockingFailureException exception) {
                Notification n = Notification.show("Error updating the data. Somebody else has updated the record while you were making changes.");
                n.setPosition(Position.MIDDLE);
                n.addThemeVariants(NotificationVariant.LUMO_ERROR);
            } catch (ValidationException validationException) {
                Notification.show("Failed to save the data. Check again that all values are valid");
            }
        });
        
    }

    @Override
    public void beforeEnter(BeforeEnterEvent event) {
        Optional<Long> inventoryId = event.getRouteParameters().get(inventory_ID).map(Long::parseLong);
        if (inventoryId.isPresent()) {
            Optional<Inventory> inventoryFromBackend = inventoryService.get(inventoryId.get());
            if (inventoryFromBackend.isPresent()) {
                populateForm(inventoryFromBackend.get());
            } else {
                Notification.show(
                        String.format("The requested inventory was not found, ID = %s", inventoryId.get()), 3000,
                        Notification.Position.BOTTOM_START);
                // when a row is selected but the data is no longer available,
                // refresh grid
                
                event.forwardTo(InwentaryzacjasprzętuView.class);
            }
        }
    }

    private void createEditorLayout(SplitLayout splitLayout) {
        Div editorLayoutDiv = new Div();
        editorLayoutDiv.setClassName("editor-layout");

        Div editorDiv = new Div();
        editorDiv.setClassName("editor");
        editorLayoutDiv.add(editorDiv);

        FormLayout formLayout = new FormLayout();
        sprzęt = new TextField("sprzęt");
        producent = new TextField("producent");
        system = new TextField("system");
        wersja = new TextField("wersja");
        procesor = new TextField("procesor");
        dodatkowe = new TextField("dodatkowe");
        domyślny = new Checkbox("domyślny");
        formLayout.add(sprzęt, producent, system, wersja, procesor, dodatkowe, domyślny);

        editorDiv.add(formLayout);
        createButtonLayout(editorLayoutDiv);

        splitLayout.addToSecondary(editorLayoutDiv);
    }

    private void createButtonLayout(Div editorLayoutDiv) {
        HorizontalLayout buttonLayout = new HorizontalLayout();
        buttonLayout.setClassName("button-layout");
        cancel.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        save.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        buttonLayout.add(save, cancel);
        editorLayoutDiv.add(buttonLayout);
    }

    private void createGridLayout(SplitLayout splitLayout) {
        Div wrapper = new Div();
        wrapper.setClassName("grid-wrapper");
        splitLayout.addToPrimary(wrapper);
        wrapper.add(grid);
    }


    private void clearForm() {
        populateForm(null);
    }

    private void populateForm(Inventory value) {
        this.inventory = value;
        binder.readBean(this.inventory);

    }
}
