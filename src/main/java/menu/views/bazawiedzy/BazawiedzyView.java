package menu.views.bazawiedzy;

import com.vaadin.flow.component.HasComponents;
import com.vaadin.flow.component.HasStyle;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Main;
import com.vaadin.flow.component.html.OrderedList;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.theme.lumo.LumoUtility.AlignItems;
import com.vaadin.flow.theme.lumo.LumoUtility.Display;
import com.vaadin.flow.theme.lumo.LumoUtility.FontSize;
import com.vaadin.flow.theme.lumo.LumoUtility.Gap;
import com.vaadin.flow.theme.lumo.LumoUtility.JustifyContent;
import com.vaadin.flow.theme.lumo.LumoUtility.ListStyleType;
import com.vaadin.flow.theme.lumo.LumoUtility.Margin;
import com.vaadin.flow.theme.lumo.LumoUtility.MaxWidth;
import com.vaadin.flow.theme.lumo.LumoUtility.Padding;
import com.vaadin.flow.theme.lumo.LumoUtility.TextColor;

import jakarta.annotation.security.PermitAll;
import menu.views.MainLayout;

@PageTitle("Baza wiedzy")
@Route(value = "wiedza", layout = MainLayout.class)
@PermitAll
public class BazawiedzyView extends Main implements HasComponents, HasStyle {

    private OrderedList imageContainer;

    public BazawiedzyView() {
        constructUI();

        imageContainer.add(new BazawiedzyViewCard(
                "Windows",
                "System operacyjny",
                "Microsoft Windows to rodzina systemów operacyjnych stworzonych przez Microsoft.",
                "Systemy",
                "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/MSFT-Windows-Update-RW1cJTH?scl=1&fmt=png-alpha"
            ));
            
            imageContainer.add(new BazawiedzyViewCard(
                "Wdrożeniowe systemu",
                "Zarządzanie projektami",
                "Zarządzanie wdrożeniami systemów informatycznych w organizacji.",
                "Nowoczesne podejście",
                "https://www.erp-view.pl/images/Wdroz%CC%87enie_systemu_MES_-_krok_po_kroku.jpg" 
            ));
            
            // Archiwum szkoleń
            imageContainer.add(new BazawiedzyViewCard(
                "Archiwum szkoleń",
                "Zasoby edukacyjne",
                "Wszystkie dostępne materiały i nagrania z odbytych szkoleń.",
                "Edukacja",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsluyKrsMQ2AmCvIMPsHOr51Qk_5VxBsFWVQ&s" 
            ));
            
            // Historia cyberbezpieczeństwa
            imageContainer.add(new BazawiedzyViewCard(
                "Historia cyberbezpieczeństwa",
                "Ewolucja bezpieczeństwa",
                "Przegląd kluczowych wydarzeń i rozwoju cyberbezpieczeństwa na przestrzeni lat.",
                "Edukacja",
                "https://wtoc2021.pl/_next/image?url=https%3A%2F%2Fwtoc2021.pl%2Fstorage%2Fmedia%2F91c79b27-e056-4886-b6e4-abcf2dcd17a0%2Fthumbnail%2FuG4Ldf7u2iH5FaRGUvDG3qKbZNRje7%2F7474c16fad4c1bf9987b726f5e758918.webp&w=640&q=75"
            ));
            

    }

    private void constructUI() {
        addClassNames("bazawiedzy-view");
        addClassNames(MaxWidth.SCREEN_LARGE, Margin.Horizontal.AUTO, Padding.Bottom.LARGE, Padding.Horizontal.LARGE);

        HorizontalLayout container = new HorizontalLayout();
        container.addClassNames(AlignItems.CENTER, JustifyContent.BETWEEN);

        VerticalLayout headerContainer = new VerticalLayout();
        H2 header = new H2("Baza wiedzy");
        header.addClassNames(Margin.Bottom.NONE, Margin.Top.XLARGE, FontSize.XXXLARGE);
        Paragraph description = new Paragraph("Wszystkie informacje w jednym miejscu");
        description.addClassNames(Margin.Bottom.XLARGE, Margin.Top.NONE, TextColor.SECONDARY);
        headerContainer.add(header, description);

        Select<String> sortBy = new Select<>();
        sortBy.setLabel("Sort by");
        sortBy.setItems("Popularity", "Newest first", "Oldest first");
        sortBy.setValue("Popularity");

        imageContainer = new OrderedList();
        imageContainer.addClassNames(Gap.MEDIUM, Display.GRID, ListStyleType.NONE, Margin.NONE, Padding.NONE);

        container.add(headerContainer, sortBy);
        add(container, imageContainer);

    }
}
