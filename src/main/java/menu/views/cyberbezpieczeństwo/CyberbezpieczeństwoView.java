package menu.views.cyberbezpieczeństwo;

import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.dependency.Uses;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;
import com.vaadin.flow.theme.lumo.LumoUtility.Gap;

import jakarta.annotation.security.PermitAll;
import menu.views.MainLayout;

@PageTitle("Cyberbezpieczeństwo")
@Route(value = "", layout = MainLayout.class)
@RouteAlias(value = "", layout = MainLayout.class)
@PermitAll
@Uses(Icon.class)
public class CyberbezpieczeństwoView extends Composite<VerticalLayout> {

    public CyberbezpieczeństwoView() {
        HorizontalLayout layoutRow = new HorizontalLayout();
        H1 h1 = new H1();
        VerticalLayout layoutColumn2 = new VerticalLayout();
        getContent().setWidth("100%");
        getContent().getStyle().set("flex-grow", "1");
        layoutRow.addClassName(Gap.MEDIUM);
        layoutRow.setWidth("100%");
        layoutRow.setHeight("min-content");
        h1.setText("Bieżące Problemy");
        h1.setWidth("max-content");
        layoutColumn2.setWidth("100%");
        layoutColumn2.getStyle().set("flex-grow", "1");
        getContent().add(layoutRow);
        layoutRow.add(h1);
        getContent().add(layoutColumn2);
       
    }

 

}

