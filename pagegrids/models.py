from __future__ import unicode_literals
from django.db import models
from django.utils.translation import ugettext_lazy as _
from mezzanine.core.models import RichText, Orderable
from mezzanine.pages.models import Page

class GridPage(Page, RichText):

    class Meta:
        verbose_name = _("Grid Page")
        verbose_name_plural = _("Grid Pages")

class Grid(models.Model):
    grid_title = models.CharField(_("Grid Title"), max_length=255, blank=True)
    grid = models.ForeignKey("GridPage", related_name="grid_page")
    rows = models.CharField(_("value"), max_length=4, blank=True)

    class Meta:
        verbose_name = _("Grid")
        verbose_name_plural = _("Grids")


class GridRow(Orderable):
    title = models.CharField(_("value"), max_length=255, blank=True)
    grid = models.ForeignKey("Grid", related_name="page_grid")

    class Meta:
        verbose_name = _("Row")
        verbose_name_plural = _("Rows")


class GridCell(Orderable):
    value = models.CharField(_("value"), max_length=20, blank=True)
    row = models.ForeignKey("GridRow", related_name="grid_row")


    class Meta:
        verbose_name = _("Row")
        verbose_name_plural = _("Rows")

