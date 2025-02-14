// Constants
const SWIPE_THRESHOLD = 100;

// Major definitions
const majors = {
    CIVIL: "Civil Engineering",
    DIGITAL_IND: "Electromechanical Engineering: Industrial Digitalization",
    MAINT_CTRL: "Electromechanical Engineering: Industrial Maintenance and Control",
    SOFTWARE: "Computer Engineering: Software Engineering and Intelligent Systems",
    OP_EXCL: "Industrial Engineering: Operational Excellence",
    IND_PROD: "Industrial and Production Engineering",
    MECH_DESIGN: "Mechanical Engineering: Design and Industrial Systems",
    MECH_STRUCT: "Mechanical Engineering: Mechanical Engineering and Structures",
    MATERIALS: "Mechanical Engineering: Materials and Manufacturing Processes",
    ENERGY: "Mechanical Engineering: Energy Systems",
    AI_DATA: "Artificial Intelligence and Data Technology: Industrial Systems"
};

// Updated Questions array with 25 questions
const questions = [
    {
        question: "Do you enjoy solving complex problems that require logical thinking?",
        context: "Consider your approach to challenging tasks",
        weights: {SOFTWARE: 2, AI_DATA: 2, DIGITAL_IND: 1}
    },
    {
        question: "Are you interested in designing and building structures like bridges or buildings?",
        context: "Think about your interest in construction and design",
        weights: {CIVIL: 2, MECH_STRUCT: 1}
    },
    {
        question: "Do you like working with machines and understanding how they operate?",
        context: "Consider your interest in mechanical systems",
        weights: {MECH_DESIGN: 2, MAINT_CTRL: 1, MATERIALS: 1}
    },
    {
        question: "Are you fascinated by how data can be used to make decisions?",
        context: "Think about your interest in data analysis",
        weights: {AI_DATA: 2, SOFTWARE: 1, DIGITAL_IND: 1}
    },
    {
        question: "Do you enjoy optimizing processes to make them more efficient?",
        context: "Consider your interest in process improvement",
        weights: {OP_EXCL: 2, IND_PROD: 1, ENERGY: 1}
    },
    {
        question: "Are you interested in renewable energy and sustainable systems?",
        context: "Think about your passion for environmental solutions",
        weights: {ENERGY: 2, MATERIALS: 1, CIVIL: 1}
    },
    {
        question: "Do you like working with software and developing applications?",
        context: "Consider your interest in programming",
        weights: {SOFTWARE: 2, AI_DATA: 1, DIGITAL_IND: 1}
    },
    {
        question: "Are you curious about how materials behave under different conditions?",
        context: "Think about your interest in material science",
        weights: {MATERIALS: 2, MECH_STRUCT: 1, CIVIL: 1}
    },
    {
        question: "Do you enjoy working in teams to solve large-scale problems?",
        context: "Consider your teamwork and collaboration skills",
        weights: {IND_PROD: 2, OP_EXCL: 1, CIVIL: 1}
    },
    {
        question: "Are you interested in robotics and automation?",
        context: "Think about your interest in automated systems",
        weights: {DIGITAL_IND: 2, MECH_DESIGN: 1, AI_DATA: 1}
    },
    // Add 15 more questions here to make it 25 in total
    {
        question: "Do you enjoy working on projects that involve a lot of creativity?",
        context: "Think about your interest in creative problem-solving",
        weights: {MECH_DESIGN: 2, SOFTWARE: 1, AI_DATA: 1}
    },
    {
        question: "Are you interested in the development of smart cities?",
        context: "Consider your interest in urban planning and technology",
        weights: {CIVIL: 2, DIGITAL_IND: 1, AI_DATA: 1}
    },
    {
        question: "Do you like to analyze and improve manufacturing processes?",
        context: "Think about your interest in production and efficiency",
        weights: {IND_PROD: 2, OP_EXCL: 1, MATERIALS: 1}
    },
    {
        question: "Are you interested in the design of energy-efficient systems?",
        context: "Consider your interest in energy conservation",
        weights: {ENERGY: 2, MECH_DESIGN: 1, CIVIL: 1}
    },
    {
        question: "Do you enjoy working with 3D modeling and CAD software?",
        context: "Think about your interest in design and visualization",
        weights: {MECH_DESIGN: 2, SOFTWARE: 1, MATERIALS: 1}
    },
    {
        question: "Are you interested in the development of autonomous vehicles?",
        context: "Consider your interest in robotics and AI",
        weights: {AI_DATA: 2, DIGITAL_IND: 1, MECH_DESIGN: 1}
    },
    {
        question: "Do you like to work on projects that involve environmental sustainability?",
        context: "Think about your interest in green technologies",
        weights: {ENERGY: 2, CIVIL: 1, MATERIALS: 1}
    },
    {
        question: "Are you interested in the development of medical devices?",
        context: "Consider your interest in healthcare technology",
        weights: {MECH_DESIGN: 2, MATERIALS: 1, SOFTWARE: 1}
    },
    {
        question: "Do you enjoy working on projects that involve data visualization?",
        context: "Think about your interest in presenting data effectively",
        weights: {AI_DATA: 2, SOFTWARE: 1, DIGITAL_IND: 1}
    },
    {
        question: "Are you interested in the development of renewable energy technologies?",
        context: "Consider your interest in sustainable energy solutions",
        weights: {ENERGY: 2, MATERIALS: 1, CIVIL: 1}
    },
    {
        question: "Do you like to work on projects that involve artificial intelligence?",
        context: "Think about your interest in AI and machine learning",
        weights: {AI_DATA: 2, SOFTWARE: 1, DIGITAL_IND: 1}
    },
    {
        question: "Are you interested in the development of smart home technologies?",
        context: "Consider your interest in IoT and home automation",
        weights: {DIGITAL_IND: 2, SOFTWARE: 1, AI_DATA: 1}
    },
    {
        question: "Do you enjoy working on projects that involve structural analysis?",
        context: "Think about your interest in building and structural integrity",
        weights: {CIVIL: 2, MECH_STRUCT: 1, MATERIALS: 1}
    },
    {
        question: "Are you interested in the development of aerospace technologies?",
        context: "Consider your interest in aviation and space exploration",
        weights: {MECH_DESIGN: 2, MATERIALS: 1, ENERGY: 1}
    },
    {
        question: "Do you like to work on projects that involve the Internet of Things (IoT)?",
        context: "Think about your interest in connected devices and systems",
        weights: {DIGITAL_IND: 2, SOFTWARE: 1, AI_DATA: 1}
    }
];

// State variables
let currentQuestion = 0;
let answers = [];
let scores = Object.keys(majors).reduce((acc, major) => {
    acc[major] = 0;
    return acc;
}, {});

// DOM Elements
const card = document.getElementById('card');
const questionText = document.getElementById('questionText');
const contextText = document.getElementById('contextText');
const currentQuestionNum = document.getElementById('current');
const resultDiv = document.getElementById('result');
const cardWrapper = document.getElementById('cardWrapper');
const scenarioNumber = document.getElementById('scenarioNumber');

// Touch handling state
let startX = 0;
let currentX = 0;
let isDragging = false;

// Functions
function updateQuestion() {
    questionText.textContent = questions[currentQuestion].question;
    contextText.textContent = questions[currentQuestion].context;
    currentQuestionNum.textContent = currentQuestion + 1;
    scenarioNumber.textContent = `Scenario ${currentQuestion + 1}`;
}

function handleSwipe(isRight) {
    answers.push(isRight);
    currentQuestion++;
    
    if (currentQuestion >= questions.length) {
        calculateResults();
        showResult();
    } else {
        resetCard();
        updateQuestion();
    }
}

function handleSkip() {
    answers.push(null); // null indicates a skipped question
    currentQuestion++;
    
    if (currentQuestion >= questions.length) {
        calculateResults();
        showResult();
    } else {
        resetCard();
        updateQuestion();
    }
}

function resetCard() {
    card.style.transform = 'translateX(0) rotate(0deg)';
    card.style.opacity = '1';
}

function calculateResults() {
    answers.forEach((answer, index) => {
        if (answer !== null) { // Only consider non-skipped questions
            Object.entries(questions[index].weights || {}).forEach(([major, weight]) => {
                scores[major] += weight;
            });
        }
    });
}

function showResult() {
    cardWrapper.style.display = 'none';
    resultDiv.style.display = 'block';
    document.querySelector('.progress').style.display = 'none';

    const maxScore = Math.max(...Object.values(scores));
    const topMajors = Object.entries(scores)
        .sort(([,a], [,b]) => b - a)
        .map(([major, score]) => ({
            name: majors[major],
            score: (score / maxScore * 100).toFixed(1)
        }));

    document.getElementById('topMajor').textContent = topMajors[0].name;
    
    const majorListHtml = topMajors.slice(0, 5).map((major, index) => `
        <div class="major-match" style="animation-delay: ${index * 0.1}s">
            <span class="major-name">${major.name}</span>
            <span class="match-percentage">${major.score}%</span>
        </div>
    `).join('');
    
    document.getElementById('majorList').innerHTML = majorListHtml;

    const satisfactionScore = calculateSatisfactionScore();
    const satisfactionText = getSatisfactionText(satisfactionScore);
    document.getElementById('satisfactionPrediction').innerHTML = `
        <div class="satisfaction-title">Career Satisfaction Prediction</div>
        <p>${satisfactionText}</p>
    `;
}

function calculateSatisfactionScore() {
    const consistencyScore = answers.reduce((acc, curr, idx) => {
        return acc + (idx > 0 && curr === answers[idx - 1] ? 1 : 0);
    }, 0) / (answers.length - 1);

    const maxMajorScore = Math.max(...Object.values(scores));
    const avgScore = Object.values(scores).reduce((a, b) => a + b) / Object.keys(scores).length;
    const clarity = (maxMajorScore - avgScore) / maxMajorScore;

    return Math.round((0.7 * clarity + 0.3 * (1 - consistencyScore)) * 100);
}

function getSatisfactionText(score) {
    if (score >= 85) {
        return "Your response pattern shows strong alignment with your recommended field. You're likely to find deep satisfaction in this career path, with good opportunities for growth and achievement.";
    } else if (score >= 70) {
        return "You show good potential for satisfaction in your recommended field. While there might be some areas of uncertainty, your interests align well with the core aspects of this career.";
    } else {
        return "Your interests span multiple areas, which suggests you might want to explore various aspects of your recommended field or consider combining elements from different engineering disciplines.";
    }
}

function restartQuiz() {
    currentQuestion = 0;
    answers = [];
    scores = Object.keys(majors).reduce((acc, major) => {
        acc[major] = 0;
        return acc;
    }, {});
    cardWrapper.style.display = 'block';
    resultDiv.style.display = 'none';
    document.querySelector('.progress').style.display = 'block';
    resetCard();
    updateQuestion();
}

// Event Listeners
card.addEventListener('mousedown', (e) => {
    isDragging = true;
    card.classList.add('swiping');
    startX = e.clientX - card.offsetLeft;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    currentX = e.clientX - startX;
    const rotation = currentX * 0.1;
    const opacity = Math.max(1 - Math.abs(currentX) / 500, 0);
    
    card.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
    card.style.opacity = opacity;
});

document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    
    isDragging = false;
    card.classList.remove('swiping');
    
    if (Math.abs(currentX) > SWIPE_THRESHOLD) {
        handleSwipe(currentX > 0);
    } else {
        resetCard();
    }
});

// Touch events for mobile
card.addEventListener('touchstart', (e) => {
    isDragging = true;
    card.classList.add('swiping');
    startX = e.touches[0].clientX - card.offsetLeft;
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    currentX = e.touches[0].clientX - startX;
    const rotation = currentX * 0.1;
    const opacity = Math.max(1 - Math.abs(currentX) / 500, 0);
    
    card.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
    card.style.opacity = opacity;
});

document.addEventListener('touchend', () => {
    if (!isDragging) return;
    
    isDragging = false;
    card.classList.remove('swiping');
    
    if (Math.abs(currentX) > SWIPE_THRESHOLD) {
        handleSwipe(currentX > 0);
    } else {
        resetCard();
    }
});

// Initialize the first question
updateQuestion();
