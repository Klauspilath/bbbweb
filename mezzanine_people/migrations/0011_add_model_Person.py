# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Person'
        db.create_table('mezzanine_people_person', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('keywords_string', self.gf('django.db.models.fields.CharField')(blank=True, max_length=500)),
            ('site', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['sites.Site'])),
            ('title', self.gf('django.db.models.fields.CharField')(max_length=500)),
            ('slug', self.gf('django.db.models.fields.CharField')(null=True, blank=True, max_length=2000)),
            ('_meta_title', self.gf('django.db.models.fields.CharField')(null=True, blank=True, max_length=500)),
            ('description', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('gen_description', self.gf('django.db.models.fields.BooleanField')(default=True)),
            ('created', self.gf('django.db.models.fields.DateTimeField')(null=True)),
            ('updated', self.gf('django.db.models.fields.DateTimeField')(null=True)),
            ('status', self.gf('django.db.models.fields.IntegerField')(default=2)),
            ('publish_date', self.gf('django.db.models.fields.DateTimeField')(null=True, blank=True)),
            ('expiry_date', self.gf('django.db.models.fields.DateTimeField')(null=True, blank=True)),
            ('short_url', self.gf('django.db.models.fields.URLField')(null=True, blank=True, max_length=200)),
            ('in_sitemap', self.gf('django.db.models.fields.BooleanField')(default=True)),
            ('content', self.gf('mezzanine.core.fields.RichTextField')()),
            ('_order', self.gf('django.db.models.fields.IntegerField')(null=True)),
            ('first_name', self.gf('django.db.models.fields.CharField')(blank=True, max_length=100)),
            ('last_name', self.gf('django.db.models.fields.CharField')(blank=True, max_length=100)),
            ('mugshot', self.gf('mezzanine.core.fields.FileField')(null=True, blank=True, max_length=255)),
            ('mugshot_credit', self.gf('django.db.models.fields.CharField')(blank=True, max_length=200)),
            ('email', self.gf('django.db.models.fields.EmailField')(blank=True, max_length=75)),
            ('bio', self.gf('mezzanine.core.fields.RichTextField')(default='', blank=True)),
            ('job_title', self.gf('django.db.models.fields.CharField')(blank=True, max_length=60)),
            ('order', self.gf('django.db.models.fields.PositiveSmallIntegerField')(default=0)),
        ))
        db.send_create_signal('mezzanine_people', ['Person'])


    def backwards(self, orm):
        # Deleting model 'Person'
        db.delete_table('mezzanine_people_person')


    models = {
        'mezzanine_people.person': {
            'Meta': {'ordering': "('order', 'last_name', 'first_name')", 'object_name': 'Person'},
            '_meta_title': ('django.db.models.fields.CharField', [], {'null': 'True', 'blank': 'True', 'max_length': '500'}),
            '_order': ('django.db.models.fields.IntegerField', [], {'null': 'True'}),
            'bio': ('mezzanine.core.fields.RichTextField', [], {'default': "''", 'blank': 'True'}),
            'categories': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['mezzanine_people.PersonCategory']", 'related_name': "'people'", 'symmetrical': 'False', 'blank': 'True'}),
            'content': ('mezzanine.core.fields.RichTextField', [], {}),
            'created': ('django.db.models.fields.DateTimeField', [], {'null': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'email': ('django.db.models.fields.EmailField', [], {'blank': 'True', 'max_length': '75'}),
            'expiry_date': ('django.db.models.fields.DateTimeField', [], {'null': 'True', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'blank': 'True', 'max_length': '100'}),
            'gen_description': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'in_sitemap': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'job_title': ('django.db.models.fields.CharField', [], {'blank': 'True', 'max_length': '60'}),
            'keywords_string': ('django.db.models.fields.CharField', [], {'blank': 'True', 'max_length': '500'}),
            'last_name': ('django.db.models.fields.CharField', [], {'blank': 'True', 'max_length': '100'}),
            'mugshot': ('mezzanine.core.fields.FileField', [], {'null': 'True', 'blank': 'True', 'max_length': '255'}),
            'mugshot_credit': ('django.db.models.fields.CharField', [], {'blank': 'True', 'max_length': '200'}),
            'order': ('django.db.models.fields.PositiveSmallIntegerField', [], {'default': '0'}),
            'publish_date': ('django.db.models.fields.DateTimeField', [], {'null': 'True', 'blank': 'True'}),
            'short_url': ('django.db.models.fields.URLField', [], {'null': 'True', 'blank': 'True', 'max_length': '200'}),
            'site': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['sites.Site']"}),
            'slug': ('django.db.models.fields.CharField', [], {'null': 'True', 'blank': 'True', 'max_length': '2000'}),
            'status': ('django.db.models.fields.IntegerField', [], {'default': '2'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '500'}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'null': 'True'})
        },
        'mezzanine_people.personcategory': {
            'Meta': {'object_name': 'PersonCategory'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'site': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['sites.Site']"}),
            'slug': ('django.db.models.fields.CharField', [], {'null': 'True', 'blank': 'True', 'max_length': '2000'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '500'})
        },
        'mezzanine_people.personlink': {
            'Meta': {'ordering': "('name',)", 'object_name': 'PersonLink'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            'person': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['mezzanine_people.Person']"}),
            'url': ('django.db.models.fields.URLField', [], {'max_length': '200'})
        },
        'sites.site': {
            'Meta': {'object_name': 'Site', 'ordering': "('domain',)", 'db_table': "'django_site'"},
            'domain': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        }
    }

    complete_apps = ['mezzanine_people']