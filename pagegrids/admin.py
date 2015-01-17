from __future__ import unicode_literals

from django.contrib import admin

from mezzanine.core.admin import TabularDynamicInlineAdmin
from mezzanine.pages.admin import PageAdmin
from bbb.pagegrids.models import GridPage, Grid, GridRow, GridCell


class GridInline(TabularDynamicInlineAdmin):
    model = Grid


class GridRowInline(TabularDynamicInlineAdmin):
    model = GridRow


class GridCellInline(TabularDynamicInlineAdmin):
    model = GridCell


class GridAdmin(PageAdmin):

    class Media:
        css = {"all": ("mezzanine/css/admin/gallery.css",)}

    inlines = (GridInline,GridRowInline,GridCellInline)


admin.site.register(GridPage, Grid)
