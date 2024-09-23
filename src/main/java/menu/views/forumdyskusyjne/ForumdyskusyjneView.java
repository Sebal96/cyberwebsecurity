package menu.views.forumdyskusyjne;

import java.util.Arrays;
import java.util.List;

import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.GridVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.AfterNavigationEvent;
import com.vaadin.flow.router.AfterNavigationObserver;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import jakarta.annotation.security.PermitAll;
import menu.views.MainLayout;

@PageTitle("Forum dyskusyjne")
@Route(value = "forum", layout = MainLayout.class)
@PermitAll
public class ForumdyskusyjneView extends Div implements AfterNavigationObserver {

    Grid<Person> grid = new Grid<>();

    public ForumdyskusyjneView() {
        addClassName("forumdyskusyjne-view");
        setSizeFull();
        grid.setHeight("100%");
        grid.addThemeVariants(GridVariant.LUMO_NO_BORDER, GridVariant.LUMO_NO_ROW_BORDERS);
        grid.addComponentColumn(person -> createCard(person));
        add(grid);
    }

    private HorizontalLayout createCard(Person person) {
        HorizontalLayout card = new HorizontalLayout();
        card.addClassName("card");
        card.setSpacing(false);
        card.getThemeList().add("spacing-s");

        Image image = new Image();
        image.setSrc(person.getImage());
        VerticalLayout description = new VerticalLayout();
        description.addClassName("description");
        description.setSpacing(false);
        description.setPadding(false);

        HorizontalLayout header = new HorizontalLayout();
        header.addClassName("header");
        header.setSpacing(false);
        header.getThemeList().add("spacing-s");

        Span name = new Span(person.getName());
        name.addClassName("name");
        Span date = new Span(person.getDate());
        date.addClassName("date");
        header.add(name, date);

        Span post = new Span(person.getPost());
        post.addClassName("post");

        HorizontalLayout actions = new HorizontalLayout();
        actions.addClassName("actions");
        actions.setSpacing(false);
        actions.getThemeList().add("spacing-s");

        Icon likeIcon = VaadinIcon.HEART.create();
        likeIcon.addClassName("icon");
        Span likes = new Span(person.getLikes());
        likes.addClassName("likes");
        Icon commentIcon = VaadinIcon.COMMENT.create();
        commentIcon.addClassName("icon");
        Span comments = new Span(person.getComments());
        comments.addClassName("comments");
        Icon shareIcon = VaadinIcon.CONNECT.create();
        shareIcon.addClassName("icon");
        Span shares = new Span(person.getShares());
        shares.addClassName("shares");

        actions.add(likeIcon, likes, commentIcon, comments, shareIcon, shares);

        description.add(header, post, actions);
        card.add(image, description);
        return card;
    }

    @Override
    public void afterNavigation(AfterNavigationEvent event) {

        // Set some data when this view is displayed.
        List<Person> persons = Arrays.asList( //
createPerson("https://randomuser.me/api/portraits/women/42.jpg", "Anna Musi", "3 maja",
        "W systemach operacyjnych, bezpieczeństwo danych jest kluczowe. Użytkownicy muszą być świadomi zagrożeń i zabezpieczeń, aby chronić swoje informacje.",
        "1K", "500", "20"),
createPerson("https://randomuser.me/api/portraits/men/24.jpg", "Albert Ryszard", "3 maja",
        "Zarządzanie aktualizacjami systemu operacyjnego jest ważne dla ochrony przed lukami w zabezpieczeniach.",
        "1K", "500", "20"),
createPerson("https://randomuser.me/api/portraits/women/24.jpg", "Emilia Elsner", "22 kwietnia",
        "Wykrywanie złośliwego oprogramowania to kluczowy element strategii bezpieczeństwa w IT.",
        "1K", "500", "20"),
createPerson("https://randomuser.me/api/portraits/men/76.jpg", "Sebstian Lato", "21 kwietnia",
        "Zrozumienie architektury systemu operacyjnego może pomóc w lepszym zabezpieczeniu danych.",
        "1K", "500", "20"),
createPerson("https://randomuser.me/api/portraits/women/76.jpg", "Lidia Skowron", "17 kwietnia",
        "Praktyki dotyczące bezpieczeństwa sieci są niezbędne w każdej organizacji.",
        "1K", "500", "20"),
createPerson("https://randomuser.me/api/portraits/men/94.jpg", "Jarosław Wilewski", "17 kwietnia",
        "Używanie silnych haseł to jedna z podstawowych zasad bezpieczeństwa w sieci.",
        "1K", "500", "20"),
createPerson("https://randomuser.me/api/portraits/women/94.jpg", "Diana Las", "8 marca",
        "Regularne audyty bezpieczeństwa pomagają w identyfikacji potencjalnych zagrożeń.",
        "1K", "500", "20"),
createPerson("https://randomuser.me/api/portraits/men/16.jpg", "Iwan Polo", "5 marca",
        "Zrozumienie ataków phishingowych jest kluczowe w ochronie danych osobowych.",
        "1K", "500", "20"),
createPerson("https://randomuser.me/api/portraits/women/16.jpg", "Emila Mocny", "5 marca",
        "Systemy zapobiegania włamaniom są niezbędne w każdej organizacji.",
        "1K", "500", "20"),
createPerson("https://randomuser.me/api/portraits/men/67.jpg", "Marcin Sawa", "4 marca",
        "Wzmacnianie bezpieczeństwa systemów operacyjnych powinno być priorytetem dla wszystkich użytkowników.",
        "1K", "500", "20"),
createPerson("https://randomuser.me/api/portraits/women/67.jpg", "Wiktoria Kot", "2 marca",
        "Edukacja w zakresie bezpieczeństwa IT jest niezbędna w erze cyfrowej.",
        "1K", "500", "20")


        );

        grid.setItems(persons);
    }

    private static Person createPerson(String image, String name, String date, String post, String likes,
            String comments, String shares) {
        Person p = new Person();
        p.setImage(image);
        p.setName(name);
        p.setDate(date);
        p.setPost(post);
        p.setLikes(likes);
        p.setComments(comments);
        p.setShares(shares);

        return p;
    }

}
