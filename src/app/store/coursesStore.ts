import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Course = {
  id: number;
  name: string;
  completed: boolean;
};

type CoursesStore = {
  courses: Course[];
  addCourse: (course: Course) => void;
  removeCourse: (courseId: number) => void;
  toggleCourseStatus: (courseId: number) => void;
};

const courseStore: StateCreator<CoursesStore> = (set) => ({
  courses: [],
  addCourse: (course) => {
    set((state) => ({
      courses: [course, ...state.courses],
    }));
  },

  removeCourse: (courseId) => {
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== courseId),
    }));
  },

  toggleCourseStatus: (courseId) => {
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId
          ? { ...course, completed: !course.completed }
          : course
      ),
    }));
  },
});

const useCourseStore = create(
  devtools(
    persist(courseStore, {
      name: "courses",
    })
  )
);

export default useCourseStore;
