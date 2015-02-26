from django.contrib import admin
from pages.models import Page

class PagesAdmin(admin.ModelAdmin):
    list_display = ('slug', 'title', 'is_published', 'updated_at')

admin.site.register(Page, PagesAdmin)
