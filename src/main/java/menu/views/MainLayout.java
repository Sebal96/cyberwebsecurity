package menu.views;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Footer;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Header;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.orderedlayout.Scroller;
import com.vaadin.flow.component.sidenav.SideNav;
import com.vaadin.flow.component.sidenav.SideNavItem;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.server.auth.AccessAnnotationChecker;
import com.vaadin.flow.theme.lumo.LumoUtility;
import java.io.ByteArrayInputStream;
import java.util.Optional;
import menu.data.User;
import menu.security.AuthenticatedUser;
import menu.views.bazawiedzy.BazawiedzyView;
import menu.views.cyberbezpieczeństwo.CyberbezpieczeństwoView;
import menu.views.forumdyskusyjne.ForumdyskusyjneView;
import menu.views.inwentaryzacjasprzętu.InwentaryzacjasprzętuView;
import menu.views.profil.ProfilView;
import menu.views.wiadomościipowiadomienia.WiadomościipowiadomieniaView;
import org.vaadin.lineawesome.LineAwesomeIcon;

/**
 * The main view is a top-level placeholder for other views.
 */
public class MainLayout extends AppLayout {

    private H1 viewTitle;

    private AuthenticatedUser authenticatedUser;
    private AccessAnnotationChecker accessChecker;

    public MainLayout(AuthenticatedUser authenticatedUser, AccessAnnotationChecker accessChecker) {
        this.authenticatedUser = authenticatedUser;
        this.accessChecker = accessChecker;

        setPrimarySection(Section.DRAWER);
        addDrawerContent();
        addHeaderContent();
    }

    private void addHeaderContent() {
        DrawerToggle toggle = new DrawerToggle();
        toggle.setAriaLabel("Menu toggle");

        viewTitle = new H1();
        viewTitle.addClassNames(LumoUtility.FontSize.LARGE, LumoUtility.Margin.NONE);

        addToNavbar(true, toggle, viewTitle);
    }

    private void addDrawerContent() {
        Span appName = new Span("CyberWEB-Security");
        appName.addClassNames(LumoUtility.FontWeight.SEMIBOLD, LumoUtility.FontSize.LARGE);
        Header header = new Header(appName);

        Scroller scroller = new Scroller(createNavigation());

        addToDrawer(header, scroller, createFooter());
    }

    private SideNav createNavigation() {
        SideNav nav = new SideNav();

        if (accessChecker.hasAccess(CyberbezpieczeństwoView.class)) {
            nav.addItem(new SideNavItem("Cyberbezpieczeństwo", CyberbezpieczeństwoView.class,
                    LineAwesomeIcon.GLOBE_SOLID.create()));

        }
        if (accessChecker.hasAccess(ProfilView.class)) {
            nav.addItem(new SideNavItem("Profil", ProfilView.class, LineAwesomeIcon.USER.create()));

        }
        if (accessChecker.hasAccess(InwentaryzacjasprzętuView.class)) {
            nav.addItem(new SideNavItem("Inwentaryzacja sprzętu", InwentaryzacjasprzętuView.class,
                    LineAwesomeIcon.TOOLBOX_SOLID.create()));

        }
        if (accessChecker.hasAccess(BazawiedzyView.class)) {
            nav.addItem(new SideNavItem("Baza wiedzy", BazawiedzyView.class, LineAwesomeIcon.TH_LIST_SOLID.create()));

        }
        if (accessChecker.hasAccess(ForumdyskusyjneView.class)) {
            nav.addItem(new SideNavItem("Forum dyskusyjne", ForumdyskusyjneView.class,
                    LineAwesomeIcon.COMMENT_SOLID.create()));

        }
        if (accessChecker.hasAccess(WiadomościipowiadomieniaView.class)) {
            nav.addItem(new SideNavItem("Wiadomości i powiadomienia", WiadomościipowiadomieniaView.class,
                    LineAwesomeIcon.COMMENTS.create()));

        }

        return nav;
    }

    private Footer createFooter() {
        Footer layout = new Footer();

        Optional<User> maybeUser = authenticatedUser.get();
        if (maybeUser.isPresent()) {
            User user = maybeUser.get();

            Avatar avatar = new Avatar(user.getName());
            StreamResource resource = new StreamResource("profile-pic",
                    () -> new ByteArrayInputStream(user.getProfilePicture()));
            avatar.setImageResource(resource);
            avatar.setThemeName("xsmall");
            avatar.getElement().setAttribute("tabindex", "-1");

            MenuBar userMenu = new MenuBar();
            userMenu.setThemeName("tertiary-inline contrast");

            MenuItem userName = userMenu.addItem("");
            Div div = new Div();
            div.add(avatar);
            div.add(user.getName());
            div.add(new Icon("lumo", "dropdown"));
            div.getElement().getStyle().set("display", "flex");
            div.getElement().getStyle().set("align-items", "center");
            div.getElement().getStyle().set("gap", "var(--lumo-space-s)");
            userName.add(div);
            userName.getSubMenu().addItem("Sign out", e -> {
                authenticatedUser.logout();
            });

            layout.add(userMenu);
        } else {
            Anchor loginLink = new Anchor("login", "Sign in");
            layout.add(loginLink);
        }

        return layout;
    }

    @Override
    protected void afterNavigation() {
        super.afterNavigation();
        viewTitle.setText(getCurrentPageTitle());
    }

    private String getCurrentPageTitle() {
        PageTitle title = getContent().getClass().getAnnotation(PageTitle.class);
        return title == null ? "" : title.value();
    }
}
