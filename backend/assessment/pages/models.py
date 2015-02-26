from django.db import models
from autoslug import AutoSlugField
from ckeditor.fields import RichTextField

class Page(models.Model):
    is_published = models.BooleanField(default=True)
    title = models.CharField(max_length=200, unique=True)
    slug = AutoSlugField(populate_from="title", editable=True, blank=True)
    text = RichTextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title