export type StudentCourseProgress = {
  courseId: string;
  courseName: string;
  progress: number;
  score: number;
  status: "in_progress" | "completed" | "not_started";
  lastActivity: string;
};

export type StudentGameResult = {
  gameType: string;
  score: number;
  attempts: number;
  bestScore: number;
};

export type StudentCertificate = {
  id: string;
  courseName: string;
  issuedDate: string;
  downloadUrl: string;
};

export type StudentProgress = {
  courses: StudentCourseProgress[];
  gameResults: StudentGameResult[];
  certificates: StudentCertificate[];
};

export const mockStudentProgress: Record<string, StudentProgress> = {
  "stud-1": {
    courses: [
      {
        courseId: "course-1",
        courseName: "React Fundamentals",
        progress: 80,
        score: 92,
        status: "in_progress",
        lastActivity: "2024-04-15",
      },
      {
        courseId: "course-2",
        courseName: "Advanced React Patterns",
        progress: 65,
        score: 85,
        status: "in_progress",
        lastActivity: "2024-04-14",
      },
      {
        courseId: "course-3",
        courseName: "Next.js Complete Guide",
        progress: 45,
        score: 78,
        status: "in_progress",
        lastActivity: "2024-04-12",
      },
      {
        courseId: "course-17",
        courseName: "UI/UX Design Fundamentals",
        progress: 100,
        score: 95,
        status: "completed",
        lastActivity: "2024-04-10",
      },
      {
        courseId: "course-28",
        courseName: "SQL Fundamentals",
        progress: 72,
        score: 88,
        status: "in_progress",
        lastActivity: "2024-04-13",
      },
    ],
    gameResults: [
      { gameType: "Quiz", score: 95, attempts: 2, bestScore: 95 },
      { gameType: "Fill in Blank", score: 88, attempts: 1, bestScore: 88 },
      { gameType: "Match", score: 92, attempts: 3, bestScore: 92 },
      { gameType: "Sequence", score: 85, attempts: 2, bestScore: 85 },
      { gameType: "Hotspot", score: 90, attempts: 1, bestScore: 90 },
      { gameType: "Label Image", score: 87, attempts: 2, bestScore: 87 },
      { gameType: "Memory Flip", score: 93, attempts: 1, bestScore: 93 },
      { gameType: "Word Scramble", score: 82, attempts: 3, bestScore: 82 },
      { gameType: "Crossword", score: 78, attempts: 2, bestScore: 78 },
      { gameType: "Swipe", score: 96, attempts: 1, bestScore: 96 },
      { gameType: "Branching", score: 89, attempts: 2, bestScore: 89 },
      { gameType: "Timed Sprint", score: 91, attempts: 1, bestScore: 91 },
    ],
    certificates: [
      {
        id: "cert-1",
        courseName: "UI/UX Design Fundamentals",
        issuedDate: "2024-04-10",
        downloadUrl: "/certificates/cert-1.pdf",
      },
    ],
  },
  "stud-2": {
    courses: [
      {
        courseId: "course-6",
        courseName: "Python for Data Science",
        progress: 100,
        score: 98,
        status: "completed",
        lastActivity: "2024-04-08",
      },
      {
        courseId: "course-7",
        courseName: "Machine Learning Basics",
        progress: 100,
        score: 96,
        status: "completed",
        lastActivity: "2024-04-05",
      },
      {
        courseId: "course-8",
        courseName: "Deep Learning with TensorFlow",
        progress: 88,
        score: 94,
        status: "in_progress",
        lastActivity: "2024-04-15",
      },
      {
        courseId: "course-30",
        courseName: "Deep Learning Fundamentals",
        progress: 92,
        score: 97,
        status: "in_progress",
        lastActivity: "2024-04-14",
      },
      {
        courseId: "course-31",
        courseName: "Neural Networks",
        progress: 85,
        score: 93,
        status: "in_progress",
        lastActivity: "2024-04-13",
      },
    ],
    gameResults: [
      { gameType: "Quiz", score: 98, attempts: 1, bestScore: 98 },
      { gameType: "Fill in Blank", score: 95, attempts: 1, bestScore: 95 },
      { gameType: "Match", score: 97, attempts: 1, bestScore: 97 },
      { gameType: "Sequence", score: 94, attempts: 1, bestScore: 94 },
      { gameType: "Hotspot", score: 96, attempts: 1, bestScore: 96 },
      { gameType: "Label Image", score: 93, attempts: 2, bestScore: 93 },
      { gameType: "Memory Flip", score: 99, attempts: 1, bestScore: 99 },
      { gameType: "Word Scramble", score: 92, attempts: 1, bestScore: 92 },
      { gameType: "Crossword", score: 95, attempts: 1, bestScore: 95 },
      { gameType: "Swipe", score: 98, attempts: 1, bestScore: 98 },
      { gameType: "Branching", score: 96, attempts: 1, bestScore: 96 },
      { gameType: "Timed Sprint", score: 97, attempts: 1, bestScore: 97 },
    ],
    certificates: [
      {
        id: "cert-2",
        courseName: "Python for Data Science",
        issuedDate: "2024-04-08",
        downloadUrl: "/certificates/cert-2.pdf",
      },
      {
        id: "cert-3",
        courseName: "Machine Learning Basics",
        issuedDate: "2024-04-05",
        downloadUrl: "/certificates/cert-3.pdf",
      },
    ],
  },
  "stud-3": {
    courses: [
      {
        courseId: "course-1",
        courseName: "React Fundamentals",
        progress: 35,
        score: 72,
        status: "in_progress",
        lastActivity: "2024-04-15",
      },
      {
        courseId: "course-28",
        courseName: "SQL Fundamentals",
        progress: 28,
        score: 68,
        status: "in_progress",
        lastActivity: "2024-04-14",
      },
    ],
    gameResults: [
      { gameType: "Quiz", score: 75, attempts: 3, bestScore: 75 },
      { gameType: "Fill in Blank", score: 68, attempts: 2, bestScore: 68 },
      { gameType: "Match", score: 72, attempts: 3, bestScore: 72 },
      { gameType: "Sequence", score: 70, attempts: 2, bestScore: 70 },
      { gameType: "Hotspot", score: 65, attempts: 3, bestScore: 65 },
      { gameType: "Label Image", score: 73, attempts: 2, bestScore: 73 },
      { gameType: "Memory Flip", score: 78, attempts: 2, bestScore: 78 },
      { gameType: "Word Scramble", score: 62, attempts: 3, bestScore: 62 },
      { gameType: "Crossword", score: 58, attempts: 3, bestScore: 58 },
      { gameType: "Swipe", score: 80, attempts: 1, bestScore: 80 },
      { gameType: "Branching", score: 71, attempts: 2, bestScore: 71 },
      { gameType: "Timed Sprint", score: 76, attempts: 2, bestScore: 76 },
    ],
    certificates: [],
  },
  "stud-4": {
    courses: [
      {
        courseId: "course-9",
        courseName: "Flutter Complete Course",
        progress: 82,
        score: 90,
        status: "in_progress",
        lastActivity: "2024-04-15",
      },
      {
        courseId: "course-10",
        courseName: "iOS Development with Swift",
        progress: 75,
        score: 87,
        status: "in_progress",
        lastActivity: "2024-04-14",
      },
      {
        courseId: "course-17",
        courseName: "UI/UX Design Fundamentals",
        progress: 100,
        score: 93,
        status: "completed",
        lastActivity: "2024-04-10",
      },
      {
        courseId: "course-18",
        courseName: "Figma Masterclass",
        progress: 68,
        score: 85,
        status: "in_progress",
        lastActivity: "2024-04-13",
      },
    ],
    gameResults: [
      { gameType: "Quiz", score: 91, attempts: 2, bestScore: 91 },
      { gameType: "Fill in Blank", score: 86, attempts: 1, bestScore: 86 },
      { gameType: "Match", score: 89, attempts: 2, bestScore: 89 },
      { gameType: "Sequence", score: 88, attempts: 1, bestScore: 88 },
      { gameType: "Hotspot", score: 92, attempts: 1, bestScore: 92 },
      { gameType: "Label Image", score: 84, attempts: 2, bestScore: 84 },
      { gameType: "Memory Flip", score: 90, attempts: 1, bestScore: 90 },
      { gameType: "Word Scramble", score: 83, attempts: 2, bestScore: 83 },
      { gameType: "Crossword", score: 87, attempts: 1, bestScore: 87 },
      { gameType: "Swipe", score: 93, attempts: 1, bestScore: 93 },
      { gameType: "Branching", score: 85, attempts: 2, bestScore: 85 },
      { gameType: "Timed Sprint", score: 89, attempts: 1, bestScore: 89 },
    ],
    certificates: [
      {
        id: "cert-4",
        courseName: "UI/UX Design Fundamentals",
        issuedDate: "2024-04-10",
        downloadUrl: "/certificates/cert-4.pdf",
      },
    ],
  },
};
