from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from qa.models import Answer, Question, Category
from qa.serializers import AnswerSerializer, QuestionSerializer, \
    CategorySerializer, CommunityAnswerSerializer
from qa.permissions import isOwnerOrReadOnlyPermission, isOwnerPermission


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          isOwnerOrReadOnlyPermission,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        """
        Creates Answer to the Question if no answer exist otherwise updates
        existing object
        """
        question_id = int(request.POST['question'])
        user = request.user

        try:
            answer = Answer.objects.get(question=question_id, user=user)
            self.kwargs['pk'] = answer.pk
            return self.update(request, *args, **kwargs)
        except Answer.DoesNotExist:
            return super(AnswerViewSet, self).create(request, *args, **kwargs)


class UserAnswerViewSet(viewsets.ModelViewSet):
    serializer_class = AnswerSerializer
    permission_classes = (permissions.IsAuthenticated,
                          isOwnerPermission,)

    def get_queryset(self):
        return Answer.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    @detail_route()
    def community_answers(self, request, pk):
        """
        Return a list of public Answers for Question
        """
        answers = Answer.objects.filter(question=pk, is_public=True)
        serializer = CommunityAnswerSerializer(answers, many=True,
                                      context={'request': request})

        return Response(serializer.data)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer