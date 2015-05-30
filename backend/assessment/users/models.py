from django.contrib.auth.models import AbstractUser
from django.contrib.auth.signals import user_logged_in
from django_countries.fields import CountryField
from django.db import models
from django.conf import settings
from django.dispatch import receiver
from image_cropping import ImageRatioField
from easy_thumbnails.files import get_thumbnailer
import os
from uuid import uuid4

def path_and_rename(path):
    def wrapper(instance, filename):
        ext = filename.split('.')[-1]
        filename = '{}.{}'.format(uuid4().hex[0:7], ext)
        return os.path.join(path, filename)
    return wrapper


class User(AbstractUser):
    AVATAR_SIZE_LARGE = (300, 300)
    AVATAR_SIZE_SMALL = (100, 100)

    title = models.CharField(max_length=120, blank=True)
    city = models.CharField(max_length=100, blank=True)
    country = CountryField(blank=True)
    language = models.CharField(max_length=5, choices=settings.LANGUAGES,
                                blank=True)
    avatar_image = models.ImageField(blank=True, null=True,
                                     upload_to=path_and_rename('avatars/'))
    avatar_cropping = ImageRatioField('avatar_image', '300x300')
    selected_categories = models.ManyToManyField('qa.Category', blank=True)

    @property
    def avatar(self):
        if self.avatar_image:
            image = self.avatar_image
        else:
            image = settings.EMPTY_AVATAR

        return get_thumbnailer(image).get_thumbnail(
            {
                'size': self.AVATAR_SIZE_SMALL,
                'box': self.avatar_cropping,
                'crop': True,
                'detail': True
            }).url

    @property
    def full_name(self):
        if len(self.first_name) > 0:
            last_letter = self.last_name[0] + "." if len(self.last_name) > 0 else ""
            return "{0} {1}".format(self.first_name, last_letter)
        elif len(self.username) > 0:
            return self.username
        else:
            return self.pk

    @receiver(user_logged_in)
    def set_user_language(sender, user, request, **kwargs):
        """
        Set user language after login
        """
        lang_code = user.language
        request.session['django_language'] = lang_code