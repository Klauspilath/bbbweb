# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(verbose_name='Seating Section', max_length=40, blank=True)),
                ('order', models.CharField(verbose_name='Display Order', max_length=2, blank=True)),
            ],
            options={
                'verbose_name_plural': 'Sections',
                'verbose_name': 'Section',
                'ordering': ('order',),
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='TicketPrice',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('price', models.CharField(verbose_name='Ticket Price', max_length=4, blank=True)),
                ('section', models.ForeignKey(to='ticketprices.Section')),
            ],
            options={
                'verbose_name_plural': 'Ticket Prices',
                'verbose_name': 'Ticket Price',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='WeekDay',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(verbose_name='Day of Week', max_length=10, blank=True)),
                ('order', models.CharField(verbose_name='Display Order', max_length=2, blank=True)),
            ],
            options={
                'verbose_name_plural': 'Days',
                'verbose_name': 'Day of Week',
                'ordering': ('order',),
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='ticketprice',
            name='week_day',
            field=models.ForeignKey(to='ticketprices.WeekDay'),
            preserve_default=True,
        ),
    ]
