import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: `create-course`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),

    getAllCourses: builder.query({
      query: () => ({
        url: `get-all-courses`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),

    editCourse: builder.mutation({
      query: ({id, data}) => ({
        url: `edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),

    getAllUserCourses: builder.query({
      query: () => ({
        url: `get-courses`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getCourseDetails: builder.query({
      query: (id) => ({
        url: `get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getCourseContent: builder.query({
      query: (id: any) => ({
        url: `get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    addNewQuestion: builder.mutation({
      query: ({question, courseId, contentId}) => ({
        url: `add-question`,
        method: "PUT",
        body: {question, courseId, contentId},
        credentials: "include" as const,
      }),
    }),

    addReplyToQuestion: builder.mutation({
      query: ({answer, courseId, contentId, questionId}) => ({
        url: `add-answer`,
        method: "PUT",
        body: {answer, courseId, contentId, questionId},
        credentials: "include" as const,
      }),
    }),

  }),
});

export const { useCreateCourseMutation, useGetAllCoursesQuery, useDeleteCourseMutation, useEditCourseMutation, useGetAllUserCoursesQuery, useGetCourseDetailsQuery, useGetCourseContentQuery, useAddNewQuestionMutation, useAddReplyToQuestionMutation } = coursesApi;
