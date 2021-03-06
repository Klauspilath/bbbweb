from __future__ import unicode_literals

from django.conf.urls import patterns, include, url
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from mezzanine.conf import settings
from mezzanine.core.sitemaps import DisplayableSitemap

class HttpsDisplayableSitemap(DisplayableSitemap):
    protocol=('https')

admin.autodiscover()

# Add the urlpatterns for any custom Django applications here.
# You can also change the ``home`` view to add your own functionality
# to the project's homepage.

# Change the admin prefix here to use an alternate URL for the
# admin interface, which would be marginally more secure.
urlpatterns = i18n_patterns("", ("^admin/", include(admin.site.urls)),)


# We don't want to presume how your homepage works, so here are a
# few patterns you can use to set it up.

# HOMEPAGE AS STATIC TEMPLATE
# ---------------------------
# This pattern simply loads the index.html template. It isn't
# commented out like the others, so it's the default. You only need
# one homepage pattern, so if you use a different one, comment this
# one out.

# url("^$", direct_to_template, {"template": "index.html"}, name="home"),

# HOMEPAGE AS AN EDITABLE PAGE IN THE PAGE TREE
# ---------------------------------------------
# This pattern gives us a normal ``Page`` object, so that your
# homepage can be managed via the page tree in the admin. If you
# use this pattern, you'll need to create a page in the page tree,
# and specify its URL (in the Meta Data section) as "/", which
# is the value used below in the ``{"slug": "/"}`` part.
# Also note that the normal rule of adding a custom
# template per page with the template name using the page's slug
# doesn't apply here, since we can't have a template called
# "/.html" - so for this case, the template "pages/index.html"
# should be used if you want to customize the homepage's template.

urlpatterns += patterns('', url("^$", "mezzanine.pages.views.page", {"slug": "/"}, name="home"),

    url("^actors/(?P<slug>.*)%s$" % "/", "bbb.views.bbb.member", name="actor"),
    url("^band/(?P<slug>.*)%s$" % "/", "bbb.views.bbb.member", name="band"),
    url("^producers/(?P<slug>.*)%s$" % "/", "bbb.views.bbb.member", name="producer"),

    # If you'd like more granular control over the patterns in
    # ``mezzanine.urls``, go right ahead and take the parts you want
    # from it, and use them directly below instead of using
    # ``mezzanine.urls``.
    ("^", include("bbb.weeklyshowtimes.urls")),
    ("^", include("bbb.ticketprices.urls")),
    ("^", include("mezzanine.urls")),

    # MOUNTING MEZZANINE UNDER A PREFIX
    # ---------------------------------
    # You can also mount all of Mezzanine's urlpatterns under a
    # URL prefix if desired. When doing this, you need to define the
    # ``SITE_PREFIX`` setting, which will contain the prefix. Eg:
    # SITE_PREFIX = "my/site/prefix"
    # For convenience, and to avoid repeating the prefix, use the
    # commented out pattern below (commenting out the one above of course)
    # which will make use of the ``SITE_PREFIX`` setting. Make sure to
    # add the import ``from django.conf import settings`` to the top
    # of this file as well.
    # Note that for any of the various homepage patterns above, you'll
    # need to use the ``SITE_PREFIX`` setting as well.

    # ("^%s/" % settings.SITE_PREFIX, include("mezzanine.urls"))




)

# Django's sitemap app.
if "django.contrib.sitemaps" in settings.INSTALLED_APPS:
    sitemaps = {"sitemaps": {"all": HttpsDisplayableSitemap}}
    urlpatterns += patterns("django.contrib.sitemaps.views",
        ("^sitemap\.xml$", "sitemap", sitemaps)
    )

# Adds ``STATIC_URL`` to the context of error pages, so that error
# pages can use JS, CSS and images.
handler404 = "mezzanine.core.views.page_not_found"
handler500 = "mezzanine.core.views.server_error"
