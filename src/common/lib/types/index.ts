// Database table types based on Supabase schema

export interface UsersRole {
  id: number;
  name: string;
}

// Predefined user roles constants
export const USER_ROLES = {
  PROFESSOR: {
    id: 1,
    name: 'Professor'
  },
  ESTUDANTE: {
    id: 2,
    name: 'Estudante'
  },
  CONVIDADO: {
    id: 3,
    name: 'Convidado'
  }
} as const;

export type UserRoleId = keyof typeof USER_ROLES;
export type UserRoleName = typeof USER_ROLES[UserRoleId]['name'];

export interface User {
  id: string; // uuid
  first_name: string;
  last_name: string;
  bio?: string;
  dre?: string;
  created_at: string; // timestamp with time zone
  user_image?: string;
  role_id?: number;
}

export interface Category {
  id: string; // uuid
  name: string;
}

// Predefined categories constants
export const CATEGORIES = {
  COMPUTACAO_CIENTIFICA: {
    id: '04e64ba8-7ade-47c0-8a61-666e517e753a',
    name: 'Computação Científica'
  },
  CIENCIA_DE_DADOS: {
    id: '487f932b-214f-4970-8d34-585e60ff1ee9',
    name: 'Ciência de Dados'
  },
  SISTEMAS_COMPUTACIONAIS_COMUNICACAO: {
    id: '4c93eb04-ddf8-4428-bebc-a2f53fd45cc3',
    name: 'Sistemas Computacionais e Comunicação'
  },
  ENGENHARIA_DE_DADOS: {
    id: '5ed109ac-f22b-4310-952c-4ae50a1cf586',
    name: 'Engenharia de Dados'
  },
  TEORIA_DA_COMPUTACAO: {
    id: '64910501-4ae4-4e99-b0b1-afb753cd4a89',
    name: 'Teoria da Computação'
  },
  ENGENHARIA_DE_SOFTWARE: {
    id: 'ec02ca9f-7a1a-4470-bb47-9b46a56af3d6',
    name: 'Engenharia de Software'
  }
} as const;

export type CategoryId = keyof typeof CATEGORIES;
export type CategoryName = typeof CATEGORIES[CategoryId]['name'];

export interface CourseStatus {
  id: number;
  name: string;
}

// Predefined course statuses constants
export const COURSE_STATUSES = {
  ATIVO: {
    id: 1,
    name: 'Ativo'
  },
  RASCUNHO: {
    id: 2,
    name: 'Rascunho'
  },
  ARQUIVADO: {
    id: 3,
    name: 'Arquivado'
  },
  PAUSADO: {
    id: 4,
    name: 'Pausado'
  }
} as const;

export type CourseStatusId = keyof typeof COURSE_STATUSES;
export type CourseStatusName = typeof COURSE_STATUSES[CourseStatusId]['name'];

export interface Course {
  id: string; // uuid
  title: string;
  description?: string;
  created_at: string; // timestamp with time zone
  duration: number;
  students: number;
  status_id?: number;
  is_public?: boolean;
  enrollment_key?: string;
}

export interface CourseCategory {
  course_id: string; // uuid
  category_id: string; // uuid
}

export interface Enroll {
  id_enroll: string; // uuid
  student_id?: string; // uuid
  course_id?: string; // uuid
  created_at: string; // timestamp with time zone
}

export interface Teach {
  teacher_id: string; // uuid
  course_id: string; // uuid
  created_at: string; // timestamp with time zone
}

export interface CourseLesson {
  id: string; // uuid
  title?: string;
  description?: string;
  content?: string;
  created_at?: string; // timestamp without time zone
  duration?: number;
  course_id?: string; // uuid
}

export interface LessonAttachment {
  id: string; // uuid
  lesson_id: string; // uuid
  file_name: string;
  file_url: string;
  file_type?: string;
  file_size?: number;
  uploaded_at: string; // timestamp with time zone
}

export interface LessonProgress {
  id: string; // uuid
  student_id: string; // uuid
  lesson_id: string; // uuid
  completed?: boolean;
  completed_at?: string; // timestamp with time zone
  time_spent?: number;
}

export interface CourseTask {
  id: string; // uuid
  title?: string;
  description?: string;
  created_at?: string; // timestamp without time zone
  due_at?: string; // timestamp without time zone
  course_id?: string; // uuid
}

export type TaskSubmissionStatus = 'submitted' | 'graded' | 'returned';

export interface TaskSubmission {
  id: string; // uuid
  task_id: string; // uuid
  student_id: string; // uuid
  content?: string;
  file_urls?: string[];
  submitted_at: string; // timestamp with time zone
  grade?: number;
  feedback?: string;
  status?: TaskSubmissionStatus;
}

export interface TaskPriority {
  id: number;
  name: string;
}

// Predefined task priorities constants
export const TASK_PRIORITIES = {
  URGENTE: {
    id: 1,
    name: 'Urgente'
  },
  ALTA: {
    id: 2,
    name: 'Alta'
  },
  MEDIA: {
    id: 3,
    name: 'Média'
  },
  BAIXA: {
    id: 4,
    name: 'Baixa'
  }
} as const;

export type TaskPriorityId = keyof typeof TASK_PRIORITIES;
export type TaskPriorityName = typeof TASK_PRIORITIES[TaskPriorityId]['name'];

// Helper functions for task priorities
export const getAllTaskPriorities = (): TaskPriority[] => {
  return Object.values(TASK_PRIORITIES);
};

export const getTaskPriorityById = (id: number): TaskPriority | undefined => {
  return Object.values(TASK_PRIORITIES).find(priority => priority.id === id);
};

export const getTaskPriorityByName = (name: string): TaskPriority | undefined => {
  return Object.values(TASK_PRIORITIES).find(priority => priority.name === name);
};

export interface StudentTask {
  id: string; // uuid
  created_at: string; // timestamp with time zone
  student_id?: string; // uuid
  title?: string;
  description?: string;
  due_at?: string; // timestamp without time zone
  completed?: boolean;
  priority?: number;
  priority_id?: number;
}

export type PostType = 'announcement' | 'material' | 'discussion';

export interface Post {
  id: number;
  teacher_id?: string; // uuid
  course_id?: string; // uuid
  created_at: string; // timestamp with time zone
  title: string;
  content?: string;
  post_type?: PostType;
}

export interface Calendar {
  id: string; // uuid
  student_id?: string; // uuid
  course_id?: string; // uuid
  created_at: string; // timestamp with time zone
  user_id?: string; // uuid
  title: string;
  description?: string;
  start_time: string; // timestamp with time zone
  end_time: string; // timestamp with time zone
  shared?: boolean;
}

// Extended types with relations for common use cases

export interface UserWithRole extends User {
  role?: UsersRole;
}

export interface CourseWithDetails extends Course {
  status?: CourseStatus;
  categories?: Category[];
  teachers?: User[];
  lessons?: CourseLesson[];
  tasks?: CourseTask[];
  posts?: Post[];
}

export interface LessonWithAttachments extends CourseLesson {
  attachments?: LessonAttachment[];
}

export interface TaskSubmissionWithDetails extends TaskSubmission {
  task?: CourseTask;
  student?: User;
}

export interface StudentTaskWithPriority extends StudentTask {
  priority_details?: TaskPriority;
}

export interface CalendarWithDetails extends Calendar {
  user?: User;
  course?: Course;
  student?: User;
}

export interface EnrollWithDetails extends Enroll {
  student?: User;
  course?: Course;
}

export interface PostWithAuthor extends Post {
  teacher?: User;
  course?: Course;
}

// Common request/response types

export interface CreateCourseRequest {
  title: string;
  description?: string;
  duration?: number;
  is_public?: boolean;
  enrollment_key?: string;
  category_ids?: string[];
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {
  status_id?: number;
}

export interface CreateLessonRequest {
  title: string;
  description?: string;
  content?: string;
  duration?: number;
  course_id: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  due_at?: string;
  course_id: string;
}

export interface CreatePostRequest {
  title: string;
  content?: string;
  post_type?: PostType;
  course_id: string;
}

export interface CreateCalendarEventRequest {
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  course_id?: string;
  shared?: boolean;
}

export interface SubmitTaskRequest {
  task_id: string;
  content?: string;
  file_urls?: string[];
}

export interface GradeSubmissionRequest {
  grade: number;
  feedback?: string;
  status?: TaskSubmissionStatus;
}

export interface CreateStudentTaskRequest {
  title: string;
  description?: string;
  due_at?: string;
  priority_id?: number;
}

// Database insert/update types (for Supabase operations)

export type DatabaseUser = Omit<User, 'id'> & { id?: string };
export type DatabaseCourse = Omit<Course, 'id' | 'created_at'> & { 
  id?: string; 
  created_at?: string; 
};
export type DatabaseLesson = Omit<CourseLesson, 'id' | 'created_at'> & { 
  id?: string; 
  created_at?: string; 
};
export type DatabaseTask = Omit<CourseTask, 'id' | 'created_at'> & { 
  id?: string; 
  created_at?: string; 
};
export type DatabasePost = Omit<Post, 'id' | 'created_at'> & { 
  id?: number; 
  created_at?: string; 
};
export type DatabaseCalendar = Omit<Calendar, 'id' | 'created_at'> & { 
  id?: string; 
  created_at?: string; 
};
export type DatabaseTaskSubmission = Omit<TaskSubmission, 'id' | 'submitted_at'> & { 
  id?: string; 
  submitted_at?: string; 
};
export type DatabaseStudentTask = Omit<StudentTask, 'id' | 'created_at'> & { 
  id?: string; 
  created_at?: string; 
};