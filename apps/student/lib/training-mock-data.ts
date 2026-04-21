import { Program, Specialization, Lesson, Game } from "./training-types"

// Mock Games
const createQuizGame = (id: string, title: string): Game => ({
  id,
  type: "quiz",
  title,
  content: {
    question: "Sample question?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 0,
  },
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

const createFillBlankGame = (id: string, title: string): Game => ({
  id,
  type: "fill-blank",
  title,
  content: {
    text: "The capital of France is ___.",
    blanks: [{ index: 0, correctAnswer: "Paris" }],
  },
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

const createMatchGame = (id: string, title: string): Game => ({
  id,
  type: "match",
  title,
  content: {
    pairs: [
      { left: "Apple", right: "Fruit" },
      { left: "Carrot", right: "Vegetable" },
    ],
  },
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

// Mock Lessons
const createLesson = (
  id: string,
  title: string,
  gameCount: number = 5
): Lesson => {
  const games: Game[] = []
  for (let i = 1; i <= gameCount; i++) {
    if (i % 3 === 0) {
      games.push(createMatchGame(`${id}-game-${i}`, `Match Game ${i}`))
    } else if (i % 2 === 0) {
      games.push(createFillBlankGame(`${id}-game-${i}`, `Fill Blank ${i}`))
    } else {
      games.push(createQuizGame(`${id}-game-${i}`, `Quiz ${i}`))
    }
  }

  return {
    id,
    title,
    description: `Learn ${title}`,
    games,
    progress: 0,
    lastGameIndex: 0,
    isCompleted: false,
  }
}

// Mock Specializations
const createBasicSpecialization = (
  id: string,
  title: string,
  lessonCount: number = 8
): Specialization => {
  const lessons: Lesson[] = []
  for (let i = 1; i <= lessonCount; i++) {
    lessons.push(createLesson(`${id}-lesson-${i}`, `Lesson ${i}: ${title}`))
  }

  return {
    id,
    title,
    description: `Master ${title}`,
    type: "basic",
    lessons,
    isLocked: false,
    progress: 0,
    isCompleted: false,
  }
}

const createAdvancedSpecialization = (
  id: string,
  title: string,
  lessonCount: number = 10
): Specialization => {
  const lessons: Lesson[] = []
  for (let i = 1; i <= lessonCount; i++) {
    lessons.push(
      createLesson(`${id}-lesson-${i}`, `Advanced Lesson ${i}: ${title}`)
    )
  }

  return {
    id,
    title,
    description: `Advanced ${title}`,
    type: "advanced",
    lessons,
    isLocked: true,
    progress: 0,
    isCompleted: false,
  }
}

// Mock Programs
export const mockPrograms: Program[] = [
  {
    id: "prog-1",
    title: "Full Stack Web Development",
    description: "Complete certification in modern web development",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    progress: 64,
    totalSpecializations: 14,
    completedSpecializations: 0,
    specializations: [
      createBasicSpecialization("spec-1", "HTML & CSS Fundamentals"),
      createBasicSpecialization("spec-2", "JavaScript Basics"),
      createBasicSpecialization("spec-3", "React Fundamentals"),
      createBasicSpecialization("spec-4", "Node.js & Express"),
      createBasicSpecialization("spec-5", "Database Design"),
      createBasicSpecialization("spec-6", "RESTful APIs"),
      createBasicSpecialization("spec-7", "Authentication & Security"),
      createBasicSpecialization("spec-8", "State Management"),
      createBasicSpecialization("spec-9", "Testing & Debugging"),
      createBasicSpecialization("spec-10", "Deployment & DevOps"),
      createBasicSpecialization("spec-11", "Performance Optimization"),
      createBasicSpecialization("spec-12", "Responsive Design"),
      createAdvancedSpecialization("spec-13", "Microservices Architecture"),
      createAdvancedSpecialization("spec-14", "Advanced System Design"),
    ],
  },
  {
    id: "prog-2",
    title: "Data Science & Machine Learning",
    description: "Master data analysis and ML algorithms",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    progress: 0,
    totalSpecializations: 14,
    completedSpecializations: 0,
    specializations: [
      createBasicSpecialization("spec-15", "Python Programming"),
      createBasicSpecialization("spec-16", "Statistics Fundamentals"),
      createBasicSpecialization("spec-17", "Data Visualization"),
      createBasicSpecialization("spec-18", "Pandas & NumPy"),
      createBasicSpecialization("spec-19", "SQL for Data Science"),
      createBasicSpecialization("spec-20", "Machine Learning Basics"),
      createBasicSpecialization("spec-21", "Supervised Learning"),
      createBasicSpecialization("spec-22", "Unsupervised Learning"),
      createBasicSpecialization("spec-23", "Feature Engineering"),
      createBasicSpecialization("spec-24", "Model Evaluation"),
      createBasicSpecialization("spec-25", "Time Series Analysis"),
      createBasicSpecialization("spec-26", "Natural Language Processing"),
      createAdvancedSpecialization("spec-27", "Deep Learning"),
      createAdvancedSpecialization("spec-28", "Advanced Neural Networks"),
    ],
  },
  {
    id: "prog-3",
    title: "Cloud Architecture & DevOps",
    description: "Build and manage scalable cloud infrastructure",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    progress: 0,
    totalSpecializations: 14,
    completedSpecializations: 0,
    specializations: [
      createBasicSpecialization("spec-29", "Cloud Computing Basics"),
      createBasicSpecialization("spec-30", "AWS Fundamentals"),
      createBasicSpecialization("spec-31", "Docker & Containers"),
      createBasicSpecialization("spec-32", "Kubernetes Basics"),
      createBasicSpecialization("spec-33", "CI/CD Pipelines"),
      createBasicSpecialization("spec-34", "Infrastructure as Code"),
      createBasicSpecialization("spec-35", "Monitoring & Logging"),
      createBasicSpecialization("spec-36", "Security Best Practices"),
      createBasicSpecialization("spec-37", "Networking Fundamentals"),
      createBasicSpecialization("spec-38", "Load Balancing"),
      createBasicSpecialization("spec-39", "Database Management"),
      createBasicSpecialization("spec-40", "Serverless Architecture"),
      createAdvancedSpecialization("spec-41", "Multi-Cloud Strategy"),
      createAdvancedSpecialization("spec-42", "Enterprise Architecture"),
    ],
  },
]

export const getProgramById = (id: string): Program | undefined => {
  return mockPrograms.find((p) => p.id === id)
}

export const getSpecializationById = (
  programId: string,
  specializationId: string
): Specialization | undefined => {
  const program = getProgramById(programId)
  return program?.specializations.find((s) => s.id === specializationId)
}

export const getLessonById = (
  programId: string,
  specializationId: string,
  lessonId: string
): Lesson | undefined => {
  const specialization = getSpecializationById(programId, specializationId)
  return specialization?.lessons.find((l) => l.id === lessonId)
}

export const getGameById = (
  programId: string,
  specializationId: string,
  lessonId: string,
  gameId: string
): Game | undefined => {
  const lesson = getLessonById(programId, specializationId, lessonId)
  return lesson?.games.find((g) => g.id === gameId)
}
