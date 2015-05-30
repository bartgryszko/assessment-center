from rest_framework import serializers
from qa.models import Question, Answer, Category
from users.serializers import UserSerializer

class QuestionSerializer(serializers.ModelSerializer):
    community_answers_url = serializers.HyperlinkedIdentityField(
        view_name='question-community-answers')

    class Meta:
        model = Question
        fields = ('url', 'community_answers_url', 'id', 'value', 'slug',
                  'category', 'user', 'is_accepted', 'created_at')


class AnswerSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True,
                                  default=serializers.CurrentUserDefault())

    class Meta:
        model = Answer
        fields = ('url', 'id', 'question', 'user', 'value',
                  'edited_at', 'is_public', 'created_at')


class CommunityAnswerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Answer
        fields = ('url', 'id', 'question', 'user', 'value',
                  'edited_at', 'is_public', 'created_at')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('url', 'id', 'parent', 'name', 'slug')
