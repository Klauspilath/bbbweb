# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ticketprices', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='section',
            options={'verbose_name': 'Section', 'ordering': ('_order',), 'verbose_name_plural': 'Sections'},
        ),
        migrations.AlterModelOptions(
            name='weekday',
            options={'verbose_name': 'Day of Week', 'ordering': ('_order',), 'verbose_name_plural': 'Days'},
        ),
        migrations.RemoveField(
            model_name='section',
            name='order',
        ),
        migrations.RemoveField(
            model_name='weekday',
            name='order',
        ),
        migrations.AddField(
            model_name='section',
            name='_order',
            field=models.IntegerField(verbose_name='Order', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='weekday',
            name='_order',
            field=models.IntegerField(verbose_name='Order', null=True),
            preserve_default=True,
        ),
    ]
