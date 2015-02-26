from django.db import models
from autoslug import AutoSlugField
from users.models import User
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _

class Category(models.Model):
    parent = models.ForeignKey('Category', null=True, blank=True)
    name = models.CharField(max_length=120)
    slug = AutoSlugField(populate_from="name", editable=True, blank=True)

    def clean(self):
        if self.parent == self:
            raise ValidationError(
                _('Category object cannot be the parent of itself'))

    def __str__(self):
        return self.name


class Question(models.Model):
    value = models.CharField(max_length=250)
    slug = AutoSlugField(populate_from="value", editable=True, blank=True)
    category = models.ForeignKey(Category)
    user = models.ForeignKey(User)
    is_accepted = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.value


class Answer(models.Model):
    value = models.TextField()
    question = models.ForeignKey(Question)
    user = models.ForeignKey(User)
    is_public = models.BooleanField(default=True)
    edited_at = models.DateField(auto_now=True)
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = (("question", "user"), )