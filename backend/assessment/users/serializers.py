from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'title', 'full_name', 'avatar')


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'title', 'full_name', 'avatar', 'email')


class UserSelectedCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('selected_categories', )