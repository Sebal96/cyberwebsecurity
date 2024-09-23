package menu.views.bazawiedzy;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.ListItem;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.theme.lumo.LumoUtility.AlignItems;
import com.vaadin.flow.theme.lumo.LumoUtility.Background;
import com.vaadin.flow.theme.lumo.LumoUtility.BorderRadius;
import com.vaadin.flow.theme.lumo.LumoUtility.Display;
import com.vaadin.flow.theme.lumo.LumoUtility.FlexDirection;
import com.vaadin.flow.theme.lumo.LumoUtility.FontSize;
import com.vaadin.flow.theme.lumo.LumoUtility.FontWeight;
import com.vaadin.flow.theme.lumo.LumoUtility.JustifyContent;
import com.vaadin.flow.theme.lumo.LumoUtility.Margin;
import com.vaadin.flow.theme.lumo.LumoUtility.Overflow;
import com.vaadin.flow.theme.lumo.LumoUtility.Padding;
import com.vaadin.flow.theme.lumo.LumoUtility.TextColor;
import com.vaadin.flow.theme.lumo.LumoUtility.Width;

public class BazawiedzyViewCard extends ListItem {

    public BazawiedzyViewCard(String title, String subtitle, String descriptionText, String label, String url) {
        addClassNames(Background.CONTRAST_5, Display.FLEX, FlexDirection.COLUMN, AlignItems.START, Padding.MEDIUM,
                BorderRadius.LARGE);

        Div div = new Div();
        div.addClassNames(Background.CONTRAST, Display.FLEX, AlignItems.CENTER, JustifyContent.CENTER,
                Margin.Bottom.MEDIUM, Overflow.HIDDEN, BorderRadius.MEDIUM, Width.FULL);
        div.setHeight("160px");

        Image image = new Image();
        image.setWidth("100%");
        image.setSrc(url);
        image.setAlt(title);

        div.add(image);

        Span header = new Span();
        header.addClassNames(FontSize.XLARGE, FontWeight.SEMIBOLD);
        header.setText(title); // Ustawienie tytułu

        Span subtitleSpan = new Span();
        subtitleSpan.addClassNames(FontSize.SMALL, TextColor.SECONDARY);
        subtitleSpan.setText(subtitle); // Ustawienie podtytułu

        Paragraph description = new Paragraph(descriptionText); // Ustawienie opisu
        description.addClassName(Margin.Vertical.MEDIUM);

        Span badge = new Span();
        badge.getElement().setAttribute("theme", "badge");
        badge.setText(label); // Ustawienie etykiety

        add(div, header, subtitleSpan, description, badge);
    }
}

