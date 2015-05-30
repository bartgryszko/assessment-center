from django.contrib import admin
from users.models import User
from image_cropping import ImageCroppingMixin


class UserAdmin(ImageCroppingMixin, admin.ModelAdmin):
    pass


admin.site.register(User, UserAdmin)
