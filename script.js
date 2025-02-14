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

// Updated Questions array with 25 indirect and varied questions
const questions = [
    {
        question: "Do you find satisfaction in seeing a project come to life from a blueprint?",
        context: "Think about your interest in turning ideas into tangible results",
        weights: {CIVIL: 2, MECH_DESIGN: 1, MECH_STRUCT: 1}
    },
    {
        question: "Are you intrigued by how small changes can improve the efficiency of a system?",
        context: "Consider your interest in optimization and fine-tuning",
        weights: {OP_EXCL: 2, IND_PROD: 1, ENERGY: 1}
    },
    {
        question: "Do you enjoy working with your hands to build or repair things?",
        context: "Think about your preference for practical, hands-on tasks",
        weights: {MAINT_CTRL: 2, MECH_DESIGN: 1, MATERIALS: 1}
    },
    {
        question: "Are you curious about how natural forces like wind or water can be harnessed for energy?",
        context: "Consider your interest in renewable energy sources",
        weights: {ENERGY: 2, CIVIL: 1, MATERIALS: 1}
    },
    {
        question: "Do you like the idea of creating systems that can operate without human intervention?",
        context: "Think about your interest in automation and self-sustaining systems",
        weights: {DIGITAL_IND: 2, AI_DATA: 1, MAINT_CTRL: 1}
    },
    {
        question: "Are you fascinated by how materials can be transformed into something entirely new?",
        context: "Consider your interest in material science and manufacturing",
        weights: {MATERIALS: 2, MECH_DESIGN: 1, CIVIL: 1}
    },
    {
        question: "Do you enjoy solving puzzles that require both creativity and logic?",
        context: "Think about your approach to complex challenges",
        weights: {SOFTWARE: 2, AI_DATA: 1, MECH_DESIGN: 1}
    },
    {
        question: "Are you interested in how cities and communities are planned and developed?",
        context: "Consider your interest in urban planning and infrastructure",
        weights: {CIVIL: 2, OP_EXCL: 1, IND_PROD: 1}
    },
    {
        question: "Do you like the idea of designing products that people use every day?",
        context: "Think about your interest in consumer products and usability",
        weights: {MECH_DESIGN: 2, MATERIALS: 1, IND_PROD: 1}
    },
    {
        question: "Are you drawn to understanding how machines and systems fail and how to prevent it?",
        context: "Consider your interest in reliability and maintenance",
        weights: {MAINT_CTRL: 2, MECH_STRUCT: 1, ENERGY: 1}
    },
    {
        question: "Do you enjoy analyzing patterns and trends in data?",
        context: "Think about your interest in data-driven decision-making",
        weights: {AI_DATA: 2, SOFTWARE: 1, DIGITAL_IND: 1}
    },
    {
        question: "Are you interested in how technology can improve the quality of life for people?",
        context: "Consider your interest in human-centered design and innovation",
        weights: {DIGITAL_IND: 2, SOFTWARE: 1, MECH_DESIGN: 1}
    },
    {
        question: "Do you like the idea of working on projects that have a long-lasting impact?",
        context: "Think about your interest in legacy and sustainability",
        weights: {CIVIL: 2, ENERGY: 1, MATERIALS: 1}
    },
    {
        question: "Are you curious about how energy is generated and distributed across a network?",
        context: "Consider your interest in energy systems and infrastructure",
        weights: {ENERGY: 2, CIVIL: 1, OP_EXCL: 1}
    },
    {
        question: "Do you enjoy working on projects that require collaboration across different fields?",
        context: "Think about your interest in interdisciplinary work",
        weights: {IND_PROD: 2, OP_EXCL: 1, DIGITAL_IND: 1}
    },
    {
        question: "Are you fascinated by how structures withstand forces like earthquakes or heavy loads?",
        context: "Consider your interest in structural integrity and resilience",
        weights: {MECH_STRUCT: 2, CIVIL: 1, MATERIALS: 1}
    },
    {
        question: "Do you like the idea of creating systems that are both efficient and environmentally friendly?",
        context: "Think about your interest in sustainable engineering",
        weights: {ENERGY: 2, CIVIL: 1, MATERIALS: 1}
    },
    {
        question: "Are you interested in how technology can be used to solve global challenges?",
        context: "Consider your interest in large-scale problem-solving",
        weights: {AI_DATA: 2, DIGITAL_IND: 1, SOFTWARE: 1}
    },
    {
        question: "Do you enjoy working on projects that involve both creativity and technical precision?",
        context: "Think about your interest in balancing art and science",
        weights: {MECH_DESIGN: 2, SOFTWARE: 1, MATERIALS: 1}
    },
    {
        question: "Are you drawn to understanding how systems can be made more resilient to failure?",
        context: "Consider your interest in reliability and risk management",
        weights: {MAINT_CTRL: 2, MECH_STRUCT: 1, OP_EXCL: 1}
    },
    {
        question: "Do you like the idea of designing systems that adapt to changing conditions?",
        context: "Think about your interest in dynamic and flexible systems",
        weights: {DIGITAL_IND: 2, AI_DATA: 1, SOFTWARE: 1}
    },
    {
        question: "Are you interested in how technology can improve safety in workplaces?",
        context: "Consider your interest in industrial safety and innovation",
        weights: {OP_EXCL: 2, MAINT_CTRL: 1, IND_PROD: 1}
    },
    {
        question: "Do you enjoy working on projects that involve both analysis and hands-on implementation?",
        context: "Think about your interest in combining theory and practice",
        weights: {MECH_DESIGN: 2, MATERIALS: 1, MAINT_CTRL: 1}
    },
    {
        question: "Are you fascinated by how technology can transform traditional industries?",
        context: "Consider your interest in modernization and innovation",
        weights: {DIGITAL_IND: 2, AI_DATA: 1, SOFTWARE: 1}
    },
    {
        question: "Do you like the idea of working on projects that require both technical skills and creative problem-solving?",
        context: "Think about your interest in multidisciplinary challenges",
        weights: {SOFTWARE: 2, MECH_DESIGN: 1, AI_DATA: 1}
    }
];

// Rest of the script.js file remains unchanged...

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
