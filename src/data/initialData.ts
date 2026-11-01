import { Career, Course, Job, Quiz, QuizQuestionItem, UserProfile } from '../types/index.ts';

export const INITIAL_CAREERS: Career[] = [
  {
    id: 'career-aiml',
    title: 'AI/ML Engineer',
    slug: 'aiml-engineer',
    description: 'AI/ML engineers design, build, and deploy machine learning models and AI systems to solve complex problems in industries like healthcare, finance, e-commerce, and more.',
    category: 'Data Science & AI',
    requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
    recommendedSkills: ['Deep Learning', 'Model Evaluation', 'MLOps', 'PyTorch', 'TensorFlow'],
    beginnerSkills: ['Python Basics', 'Calculus & Linear Algebra', 'Basic Statistics', 'Git'],
    advancedSkills: ['Transformer Architectures', 'Distributed Model Training', 'Model Quantization', 'MLOps Pipelines'],
    averageSalary: '₹6 LPA - ₹20 LPA (varies by experience & location)',
    growthRate: 'High Growth (+36% YoY)',
    responsibilities: [
      'Design, train, fine-tune, and evaluate deep learning and statistical machine learning models.',
      'Build end-to-end data processing and model deployment pipelines.',
      'Collaborate with software engineers to integrate AI models into production microservices.',
      'Optimize models for inference latency, memory consumption, and throughput.'
    ],
    featured: true,
    published: true,
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-10-20T00:00:00Z'
  },
  {
    id: 'career-cloud',
    title: 'Cloud Engineer',
    slug: 'cloud-engineer',
    description: 'Cloud engineers design, implement, and maintain scalable cloud infrastructure, managing migration, network security, and infrastructure-as-code.',
    category: 'Cloud & Infrastructure',
    requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'Terraform'],
    recommendedSkills: ['CI/CD', 'Python', 'Networking Fundamentals', 'CloudSecurity'],
    beginnerSkills: ['Linux Command Line', 'Networking 101', 'Bash Scripting', 'Virtual Machines'],
    advancedSkills: ['Multi-Cloud Architecture', 'Terraform Modules', 'Service Mesh', 'Cost Optimization'],
    averageSalary: '₹6 LPA - ₹24 LPA',
    growthRate: 'High Growth (+28% YoY)',
    responsibilities: [
      'Provision and manage cloud compute, storage, and serverless environments.',
      'Write Infrastructure as Code (IaC) using Terraform and CloudFormation.',
      'Establish automated CI/CD deployment pipelines with zero-downtime rollouts.',
      'Implement strict Identity & Access Management (IAM) and encryption standards.'
    ],
    featured: true,
    published: true,
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-10-20T00:00:00Z'
  },
  {
    id: 'career-swe',
    title: 'Software Engineer',
    slug: 'software-engineer',
    description: 'Software engineers build robust, high-performance web applications, backend services, and APIs powering modern digital platforms.',
    category: 'Software Development',
    requiredSkills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Data Structures', 'SQL'],
    recommendedSkills: ['PostgreSQL', 'Docker', 'System Design', 'Redis'],
    beginnerSkills: ['HTML5/CSS3', 'Modern JavaScript (ES6+)', 'Git & GitHub', 'Algorithmic Thinking'],
    advancedSkills: ['Microservices Architecture', 'Database Sharding', 'Event-Driven Systems (Kafka)', 'Performance Profiling'],
    averageSalary: '₹5 LPA - ₹18 LPA',
    growthRate: 'Steady Growth (+22% YoY)',
    responsibilities: [
      'Develop clean, maintainable frontend and backend full-stack applications.',
      'Architect robust REST and GraphQL APIs with comprehensive automated testing.',
      'Review peer code and participate in sprint planning and design architecture reviews.',
      'Troubleshoot and optimize application latency and database query performance.'
    ],
    featured: true,
    published: true,
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-10-20T00:00:00Z'
  },
  {
    id: 'career-data-scientist',
    title: 'Data Scientist',
    slug: 'data-scientist',
    description: 'Data scientists turn raw, messy data into actionable predictive insights using mathematical modeling, machine learning, and data visualization.',
    category: 'Data Science & AI',
    requiredSkills: ['Python', 'SQL', 'Statistics', 'Data Analysis', 'Machine Learning'],
    recommendedSkills: ['Tableau', 'Pandas', 'NumPy', 'A/B Testing', 'BigQuery'],
    beginnerSkills: ['Data Wrangling with Pandas', 'Exploratory Data Analysis', 'Descriptive Statistics'],
    advancedSkills: ['Causal Inference', 'Time Series Forecasting', 'Natural Language Processing', 'Bayesian Modeling'],
    averageSalary: '₹6 LPA - ₹22 LPA',
    growthRate: 'High Growth (+31% YoY)',
    responsibilities: [
      'Extract, sanitize, and engineer features from massive relational and unstructured datasets.',
      'Formulate statistical hypotheses and design rigorous A/B experiments.',
      'Build predictive regression, classification, and clustering models.',
      'Present actionable business narratives and dashboards to executive stakeholders.'
    ],
    featured: true,
    published: true,
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-10-20T00:00:00Z'
  },
  {
    id: 'career-cybersecurity',
    title: 'Cybersecurity Analyst',
    slug: 'cybersecurity-analyst',
    description: 'Cybersecurity analysts protect systems, networks, and confidential data from cyber threats, unauthorized breaches, and security vulnerabilities.',
    category: 'Cybersecurity',
    requiredSkills: ['Networking', 'Linux', 'Security Fundamentals', 'Threat Analysis', 'SIEM'],
    recommendedSkills: ['Wireshark', 'Python Scripting', 'Cryptography', 'Ethical Hacking'],
    beginnerSkills: ['TCP/IP & OSI Model', 'Linux Permissions', 'Firewalls & Proxies', 'Password Security'],
    advancedSkills: ['Incident Response Forensics', 'Penetration Testing', 'SOC Automation', 'Zero Trust Architecture'],
    averageSalary: '₹5 LPA - ₹16 LPA',
    growthRate: 'Very High Growth (+33% YoY)',
    responsibilities: [
      'Monitor enterprise networks and SIEM alerts for security anomalies and intrusions.',
      'Conduct vulnerability assessments, penetration testing, and security code reviews.',
      'Enforce zero-trust security postures and compliance standards (ISO 27001, SOC2).',
      'Execute incident response playbooks during suspected breaches.'
    ],
    featured: true,
    published: true,
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-10-20T00:00:00Z'
  },
  {
    id: 'career-devops',
    title: 'DevOps Engineer',
    slug: 'devops-engineer',
    description: 'DevOps engineers bridge software development and IT operations to shorten the systems development life cycle and provide continuous delivery with high software quality.',
    category: 'Cloud & Infrastructure',
    requiredSkills: ['CI/CD', 'Docker', 'Kubernetes', 'Linux', 'Terraform', 'Monitoring'],
    recommendedSkills: ['Prometheus', 'Grafana', 'GitOps', 'Go', 'Python'],
    averageSalary: '₹7 LPA - ₹25 LPA',
    growthRate: 'High Growth (+29% YoY)',
    responsibilities: [
      'Build and maintain resilient deployment automation with GitHub Actions and ArgoCD.',
      'Configure centralized observability, metrics, distributed tracing, and alerting.',
      'Scale container clusters across Kubernetes environments with automated failover.',
      'Ensure 99.99% system availability and rapid disaster recovery.'
    ],
    featured: false,
    published: true,
    createdAt: '2026-02-01T00:00:00Z',
    updatedAt: '2026-10-20T00:00:00Z'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-python-ds',
    title: 'Python for Data Science',
    description: 'Master Python programming fundamentals, data structures, Pandas, NumPy, and Matplotlib specifically geared toward data analysis and machine learning.',
    provider: 'Coursera (IBM)',
    courseUrl: 'https://www.coursera.org/learn/python-for-applied-data-science-ai',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    category: 'Data Science',
    skills: ['Python', 'Data Science', 'Data Analysis', 'NumPy', 'Pandas'],
    level: 'Intermediate',
    duration: '6 weeks (4 hrs/week)',
    language: 'English',
    priceType: 'Free',
    priceDescription: '₹0 (Free Audit)',
    certificateAvailable: true,
    featured: true,
    published: true,
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-10-22T00:00:00Z',
    createdBy: 'admin'
  },
  {
    id: 'course-ml-specialization',
    title: 'Machine Learning Specialization',
    description: 'A foundational program created by Andrew Ng and DeepLearning.AI that breaks down supervised learning, neural networks, unsupervised learning, and recommender systems.',
    provider: 'DeepLearning.AI & Coursera',
    courseUrl: 'https://www.coursera.org/specializations/machine-learning-introduction',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&auto=format&fit=crop&q=80',
    category: 'Machine Learning',
    skills: ['Machine Learning', 'Python', 'Algorithms', 'Deep Learning', 'Statistics'],
    level: 'Intermediate',
    duration: '3 months (5 hrs/week)',
    language: 'English',
    priceType: 'Paid',
    priceDescription: '₹4,820 / month',
    certificateAvailable: true,
    featured: true,
    published: true,
    createdAt: '2026-01-12T00:00:00Z',
    updatedAt: '2026-10-22T00:00:00Z',
    createdBy: 'admin'
  },
  {
    id: 'course-aws-cloud',
    title: 'AWS Certified Cloud Practitioner',
    description: 'Comprehensive preparation for the AWS Certified Cloud Practitioner exam (CLF-C02). Covers AWS cloud concepts, core services, security, pricing, and support.',
    provider: 'Udemy (Stephane Maarek)',
    courseUrl: 'https://www.udemy.com/course/aws-certified-cloud-practitioner-new/',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    category: 'Cloud',
    skills: ['AWS', 'Cloud', 'Networking', 'CloudSecurity', 'IAM'],
    level: 'Beginner',
    duration: '15.5 hours on-demand',
    language: 'English',
    priceType: 'Paid',
    priceDescription: '₹2,499 (Certificate included)',
    certificateAvailable: true,
    featured: true,
    published: true,
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-10-22T00:00:00Z',
    createdBy: 'admin'
  },
  {
    id: 'course-fullstack-react',
    title: 'Full Stack Modern Web Development',
    description: 'Build production-ready web apps with React 19, TypeScript, Tailwind CSS, Node.js, and SQL databases. From zero to full deployment.',
    provider: 'freeCodeCamp',
    courseUrl: 'https://www.freecodecamp.org/learn',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80',
    category: 'Web Development',
    skills: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'CSS'],
    level: 'Beginner',
    duration: '40 hours self-paced',
    language: 'English',
    priceType: 'Free',
    priceDescription: '₹0 (100% Free)',
    certificateAvailable: true,
    featured: true,
    published: true,
    createdAt: '2026-02-01T00:00:00Z',
    updatedAt: '2026-10-22T00:00:00Z',
    createdBy: 'admin'
  },
  {
    id: 'course-docker-k8s',
    title: 'Docker & Kubernetes: The Practical Guide',
    description: 'Learn Docker, Docker Compose, multi-container deployments, and production Kubernetes clusters from scratch with hands-on labs.',
    provider: 'Academind / Udemy',
    courseUrl: 'https://www.udemy.com/course/docker-kubernetes-the-practical-guide/',
    thumbnailUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&auto=format&fit=crop&q=80',
    category: 'DevOps',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Linux', 'DevOps'],
    level: 'Intermediate',
    duration: '23.5 hours',
    language: 'English',
    priceType: 'Paid',
    priceDescription: '₹3,199',
    certificateAvailable: true,
    featured: false,
    published: true,
    createdAt: '2026-02-10T00:00:00Z',
    updatedAt: '2026-10-22T00:00:00Z',
    createdBy: 'admin'
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-amazon-intern',
    title: 'Software Development Intern',
    company: 'Amazon',
    description: 'Work alongside world-class Amazon software engineers on high-scale distributed systems, AWS integration, and e-commerce services.',
    location: 'Hyderabad, Telangana, India',
    workMode: 'Hybrid',
    employmentType: 'Internship',
    requiredSkills: ['Python', 'Java', 'Data Structures', 'Web Development'],
    experienceLevel: 'Student / Recent Grad (0-1 yr)',
    applicationUrl: 'https://amazon.jobs',
    source: 'Amazon Careers Portal',
    applicationDeadline: '2026-12-31',
    featured: true,
    published: true,
    createdAt: '2026-10-01T00:00:00Z',
    updatedAt: '2026-10-25T00:00:00Z'
  },
  {
    id: 'job-tcs-frontend',
    title: 'Frontend Developer',
    company: 'TCS',
    description: 'Join Tata Consultancy Services digital unit building responsive client-facing interfaces using React, JavaScript/TypeScript, and modern CSS frameworks.',
    location: 'Bangalore, Karnataka, India',
    workMode: 'Onsite',
    employmentType: 'Full-time',
    requiredSkills: ['React', 'JavaScript', 'CSS', 'HTML', 'Git'],
    experienceLevel: 'Entry / Junior (1-3 yrs)',
    applicationUrl: 'https://www.tcs.com/careers',
    source: 'TCS Careers Portal',
    applicationDeadline: '2026-11-30',
    featured: true,
    published: true,
    createdAt: '2026-10-05T00:00:00Z',
    updatedAt: '2026-10-25T00:00:00Z'
  },
  {
    id: 'job-accenture-data-intern',
    title: 'Data Analyst Intern',
    company: 'Accenture',
    description: 'Collaborate with enterprise analytics teams to process business metrics, build SQL reports, and visualize key performance indicators.',
    location: 'Gurugram, Haryana, India',
    workMode: 'Remote',
    employmentType: 'Internship',
    requiredSkills: ['SQL', 'Excel', 'Data Analysis', 'Python'],
    experienceLevel: 'Student / Fresher',
    applicationUrl: 'https://www.accenture.com/careers',
    source: 'Accenture Talent Network',
    applicationDeadline: '2026-12-15',
    featured: true,
    published: true,
    createdAt: '2026-10-10T00:00:00Z',
    updatedAt: '2026-10-25T00:00:00Z'
  },
  {
    id: 'job-microsoft-cloud',
    title: 'Cloud Associate Engineer',
    company: 'Microsoft',
    description: 'Support enterprise cloud migrations, containerized microservices deployments, and automated Azure/AWS DevOps pipelines.',
    location: 'Bengaluru, Karnataka, India',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    requiredSkills: ['AWS', 'Docker', 'Linux', 'Networking', 'Terraform'],
    experienceLevel: '1-3 years experience',
    applicationUrl: 'https://careers.microsoft.com',
    source: 'Microsoft Careers',
    applicationDeadline: '2027-01-15',
    featured: false,
    published: true,
    createdAt: '2026-10-15T00:00:00Z',
    updatedAt: '2026-10-25T00:00:00Z'
  }
];

export const INITIAL_QUIZZES: { quiz: Quiz; questions: QuizQuestionItem[] }[] = [
  {
    quiz: {
      id: 'quiz-python-basics',
      title: 'Python Basics',
      description: 'Test your understanding of core Python syntax, lists, dictionaries, functions, and control flow.',
      category: 'Python',
      questionsCount: 5,
      durationMinutes: 10,
      difficulty: 'Beginner',
      published: true,
      createdAt: '2026-02-01T00:00:00Z',
      updatedAt: '2026-10-20T00:00:00Z'
    },
    questions: [
      {
        id: 'py-1',
        question: 'Which of the following data types is immutable in Python?',
        options: ['List', 'Dictionary', 'Tuple', 'Set'],
        correctAnswer: 2,
        explanation: 'Tuples are immutable sequences in Python; their elements cannot be modified after assignment.'
      },
      {
        id: 'py-2',
        question: 'What is the correct syntax to define a function in Python?',
        options: ['function myFunc():', 'def myFunc():', 'func myFunc():', 'define myFunc():'],
        correctAnswer: 1,
        explanation: 'In Python, functions are defined using the "def" keyword followed by the function name and parentheses.'
      },
      {
        id: 'py-3',
        question: 'What does the list comprehension `[x**2 for x in range(4)]` evaluate to?',
        options: ['[1, 4, 9, 16]', '[0, 1, 4, 9]', '[0, 2, 4, 6]', '[0, 1, 2, 3]'],
        correctAnswer: 1,
        explanation: 'range(4) produces 0, 1, 2, 3. Squaring each yields [0, 1, 4, 9].'
      },
      {
        id: 'py-4',
        question: 'Which built-in library is typically used for regex operations in Python?',
        options: ['regex', 're', 'string.re', 'match'],
        correctAnswer: 1,
        explanation: 'The "re" module is the built-in standard library for regular expressions in Python.'
      },
      {
        id: 'py-5',
        question: 'How do you check the type of an object in Python?',
        options: ['typeof(obj)', 'obj.type()', 'type(obj)', 'checktype(obj)'],
        correctAnswer: 2,
        explanation: 'The built-in function `type(obj)` or `isinstance(obj, class_info)` is used to inspect types.'
      }
    ]
  },
  {
    quiz: {
      id: 'quiz-dsa',
      title: 'Data Structures & Algorithms',
      description: 'Assess foundational algorithmic complexity, arrays, hash tables, and binary trees.',
      category: 'DSA',
      questionsCount: 5,
      durationMinutes: 15,
      difficulty: 'Intermediate',
      published: true,
      createdAt: '2026-02-01T00:00:00Z',
      updatedAt: '2026-10-20T00:00:00Z'
    },
    questions: [
      {
        id: 'dsa-1',
        question: 'What is the average time complexity of lookups in a hash map?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
        correctAnswer: 2,
        explanation: 'Hash maps provide average O(1) constant time lookups assuming a uniform hash distribution.'
      },
      {
        id: 'dsa-2',
        question: 'Which sorting algorithm has a guaranteed worst-case time complexity of O(n log n)?',
        options: ['QuickSort', 'MergeSort', 'BubbleSort', 'InsertionSort'],
        correctAnswer: 1,
        explanation: 'MergeSort consistently divides the array in half and merges, guaranteeing O(n log n) in all cases.'
      },
      {
        id: 'dsa-3',
        question: 'Which data structure follows the Last-In, First-Out (LIFO) principle?',
        options: ['Queue', 'Stack', 'Array', 'Heap'],
        correctAnswer: 1,
        explanation: 'A Stack operates strictly in LIFO order (push and pop).'
      },
      {
        id: 'dsa-4',
        question: 'What is the height of a balanced Binary Search Tree with n nodes?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
        correctAnswer: 1,
        explanation: 'A balanced BST maintains height logarithmic relative to node count, O(log n).'
      },
      {
        id: 'dsa-5',
        question: 'Breadth-First Search (BFS) on a graph is commonly implemented using which structure?',
        options: ['Stack', 'Queue', 'Priority Queue', 'Disjoint Set'],
        correctAnswer: 1,
        explanation: 'BFS explores vertices level by level using a FIFO Queue.'
      }
    ]
  },
  {
    quiz: {
      id: 'quiz-ml-fundamentals',
      title: 'Machine Learning Fundamentals',
      description: 'Test your understanding of supervised vs unsupervised learning, overfitting, bias-variance tradeoff, and evaluation metrics.',
      category: 'Machine Learning',
      questionsCount: 5,
      durationMinutes: 15,
      difficulty: 'Intermediate',
      published: true,
      createdAt: '2026-02-01T00:00:00Z',
      updatedAt: '2026-10-20T00:00:00Z'
    },
    questions: [
      {
        id: 'ml-1',
        question: 'Which of the following is an example of an unsupervised learning task?',
        options: ['Spam email detection', 'House price regression', 'Customer segmentation clustering', 'Handwritten digit classification'],
        correctAnswer: 2,
        explanation: 'Clustering algorithms like K-Means group unlabeled data without supervision or target labels.'
      },
      {
        id: 'ml-2',
        question: 'What happens when a model has high variance?',
        options: ['It underfits the training data', 'It overfits the training data and generalizes poorly', 'It has zero error on test data', 'It ignores all features'],
        correctAnswer: 1,
        explanation: 'High variance indicates the model is overly sensitive to noise in the training set (overfitting).'
      },
      {
        id: 'ml-3',
        question: 'Which metric is best suited for evaluating a classifier on a heavily imbalanced dataset?',
        options: ['Accuracy', 'F1-Score / PR-AUC', 'Mean Squared Error', 'R-squared'],
        correctAnswer: 1,
        explanation: 'Accuracy is misleading on imbalanced sets; F1-score balances precision and recall on the minority class.'
      },
      {
        id: 'ml-4',
        question: 'What is the primary purpose of L2 regularization (Ridge)?',
        options: ['Set weights to absolute zero', 'Penalize large weights using their squared magnitude', 'Increase model complexity', 'Eliminate training data'],
        correctAnswer: 1,
        explanation: 'L2 regularization adds a penalty proportional to the sum of squared coefficients to prevent extreme weight values.'
      },
      {
        id: 'ml-5',
        question: 'What is the role of an activation function in a neural network?',
        options: ['To initialize weights', 'To introduce non-linearity so the network can learn complex patterns', 'To compute loss gradients directly', 'To normalize pixel values'],
        correctAnswer: 1,
        explanation: 'Without non-linear activation functions (like ReLU or GELU), stacking multiple layers would collapse into a single linear transformation.'
      }
    ]
  }
];

export const DEMO_USER_VINOD: UserProfile = {
  uid: 'usr-student-vinod',
  displayName: 'Vinod Kumar',
  email: 'vinod@example.com',
  accountType: 'student',
  role: 'user',
  createdAt: '2026-10-15T10:00:00Z',
  updatedAt: '2026-10-27T18:00:00Z',
  profileCompleted: true,
  accountStatus: 'active',
  details: {
    college: 'Vignan University',
    degree: 'B.Tech',
    branch: 'Computer Science & Engineering',
    academicYear: 'Final Year',
    graduationYear: '2026',
    skills: ['Python', 'Java', 'SQL', 'Data Structures', 'C++'],
    interests: ['AI/ML', 'Data Science', 'Web Development'],
    preferredCareerPaths: ['AI/ML Engineer', 'Data Scientist', 'Software Engineer'],
    learningGoals: 'Transition into an AI/ML engineering role by mastering machine learning algorithms and deployment pipelines.',
    updatedAt: '2026-10-27T18:00:00Z'
  }
};

export const DEMO_USER_KUMAR: UserProfile = {
  uid: 'usr-prof-kumar',
  displayName: 'Kumar',
  email: 'kumar@example.com',
  accountType: 'professional',
  role: 'user',
  createdAt: '2026-09-01T08:00:00Z',
  updatedAt: '2026-10-27T19:00:00Z',
  profileCompleted: true,
  accountStatus: 'active',
  details: {
    currentRole: 'Software Developer',
    company: 'Tech Solutions Inc.',
    industry: 'Information Technology',
    experienceYears: '3 years',
    targetRole: 'Senior Software Engineer',
    preferredLocation: 'Hyderabad / Remote',
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'Docker'],
    interests: ['Full Stack Development', 'System Design', 'Microservices'],
    preferredCareerPaths: ['Software Engineer', 'Senior Software Engineer', 'Full Stack Developer'],
    learningGoals: 'Master system design, scalable API architecture, and microservices.',
    updatedAt: '2026-10-27T19:00:00Z'
  }
};

export const DEMO_STUDENT_USER: UserProfile = DEMO_USER_VINOD;
export const DEMO_PROFESSIONAL_USER: UserProfile = DEMO_USER_KUMAR;

export const DEMO_ADMIN_USER: UserProfile = {
  uid: 'usr-admin',
  displayName: 'Admin User',
  email: 'admin@skill2career.com',
  accountType: 'professional',
  role: 'admin',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-10-27T12:00:00Z',
  profileCompleted: true,
  accountStatus: 'active',
  details: {
    currentRole: 'Platform Administrator',
    company: 'Skill2Career Inc.',
    skills: ['Administration', 'Cloud Architecture', 'Curriculum Management'],
    interests: ['Career Development', 'EdTech'],
    preferredCareerPaths: [],
    updatedAt: '2026-10-27T12:00:00Z'
  }
};

export const ALL_DEMO_USERS: UserProfile[] = [
  DEMO_USER_VINOD,
  DEMO_USER_KUMAR,
  DEMO_ADMIN_USER,
];

