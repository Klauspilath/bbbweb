# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Person._order'
        db.add_column('mezzanine_people_person', '_order',
                      self.gf('django.db.models.fields.IntegerField')(null=True),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Person._order'
        db.delete_column('mezzanine_people_person', '_order')


    models = {
        'mezzanine_people.person': {
            'Meta': {'object_name': 'Person', 'ordering': "('order', 'last_name', 'first_name')"},
            '_meta_title': ('django.db.models.fields.CharField', [], {'null': 'True', 'blank': 'True', 'max_length': '500'}),
            '_order': ('django.db.models.fields.IntegerField', [], {'null': 'True'}),
            'bio': ('mezzanine.core.fields.RichTextField', [], {'default': "''", 'blank': 'True'}),
            'categories': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': "orm['mezzanine_people.PersonCategory']", 'blank': 'True', 'related_name': "'people'"}),
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
            'Meta': {'object_name': 'PersonLink', 'ordering': "('name',)"},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            'person': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['mezzanine_people.Person']"}),
            'url': ('django.db.models.fields.URLField', [], {'max_length': '200'})
        },
        'sites.site': {
            'Meta': {'object_name': 'Site', 'db_table': "'django_site'", 'ordering': "('domain',)"},
            'domain': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        }
    }

    complete_apps = ['mezzanine_people']