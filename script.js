
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

        // Questions array
        const questions = [
            {
                question: "When starting a new game, do you spend more time customizing settings than playing?",
                context: "Think about your approach to new experiences",
                weights: {SOFTWARE: 2, DIGITAL_IND: 1, AI_DATA: 2}
            },
            {
                question: "Do you find yourself reorganizing spaces, even when they're not yours?",
                context: "Consider your natural inclination in any environment",
                weights: {CIVIL: 2, OP_EXCL: 2, IND_PROD: 1}
            },
            {
                question: "Would you rather fix something old than buy something new?",
                context: "Think about your approach to possessions",
                weights: {MAINT_CTRL: 2, MECH_DESIGN: 1, MATERIALS: 1}
            },
            {
                question: "Do you often think about how different materials feel and behave?",
                context: "Consider your tactile awareness",
                weights: {MATERIALS: 2, CIVIL: 1, MECH_STRUCT: 1}
            },
            {
                question: "Are you more fascinated by how traffic flows than by individual cars?",
                context: "Think about what catches your attention",
                weights: {IND_PROD: 2, OP_EXCL: 2, AI_DATA: 1}
            },
            {
                question: "Do you enjoy finding patterns in seemingly random data?",
                context: "Consider your analytical tendencies",
                weights: {AI_DATA: 2, SOFTWARE: 1, DIGITAL_IND: 1}
            },
            {
                question: "Are you more interested in how buildings stand than how they look?",
                context: "Think about your architectural perspective",
                weights: {CIVIL: 2, MECH_STRUCT: 2}
            },
            {
                question: "Do you frequently think about ways to automate daily tasks?",
                context: "Consider your efficiency mindset",
                weights: {SOFTWARE: 2, DIGITAL_IND: 2, AI_DATA: 1}
            },
            {
                question: "Are you curious about the temperature of things around you?",
                context: "Think about your environmental awareness",
                weights: {ENERGY: 2, MECH_DESIGN: 1}
            },
            {
                question: "Do you prefer improving existing systems over creating new ones?",
                context: "Consider your approach to problems",
                weights: {OP_EXCL: 2, MAINT_CTRL: 2}
            },
            {
                question: "Are you fascinated by how machines communicate with each other?",
                context: "Think about your interest in connectivity",
                weights: {DIGITAL_IND: 2, SOFTWARE: 1, AI_DATA: 1}
            },
            {
                question: "Do you notice inefficiencies in everyday processes?",
                context: "Consider your observational habits",
                weights: {IND_PROD: 2, OP_EXCL: 2}
            },
            {
                question: "Are you more interested in why something broke than in fixing it?",
                context: "Think about your problem-solving approach",
                weights: {MATERIALS: 2, MECH_STRUCT: 1, MAINT_CTRL: 1}
            },
            {
                question: "Do you think about the energy usage of devices you use?",
                context: "Consider your resource awareness",
                weights: {ENERGY: 2, DIGITAL_IND: 1}
            },
            {
                question: "Are you more interested in collecting data than analyzing it?",
                context: "Think about your data preferences",
                weights: {AI_DATA: 1, SOFTWARE: 2}
            },
            {
                question: "Do you prefer detailed planning over improvisation?",
                context: "Consider your work style",
                weights: {CIVIL: 1, MECH_DESIGN: 2, IND_PROD: 1}
            },
            {
                question: "Are you fascinated by how things are manufactured?",
                context: "Think about your industrial curiosity",
                weights: {MATERIALS: 2, IND_PROD: 2, MECH_DESIGN: 1}
            },
            {
                question: "Do you often think about the structural integrity of buildings?",
                context: "Consider your safety awareness",
                weights: {CIVIL: 2, MECH_STRUCT: 2}
            },
            {
                question: "Are you more interested in preventing problems than solving them?",
                context: "Think about your maintenance approach",
                weights: {MAINT_CTRL: 2, OP_EXCL: 1}
            },
            {
                question: "Do you enjoy optimizing resource usage in games or real life?",
                context: "Consider your efficiency mindset",
                weights: {ENERGY: 2, OP_EXCL: 2, IND_PROD: 1}
            },
            {
                question: "Are you fascinated by how different materials interact?",
                context: "Think about your material awareness",
                weights: {MATERIALS: 2, CIVIL: 1, MECH_STRUCT: 1}
            },
            {
                question: "Do you prefer working with virtual models over physical ones?",
                context: "Consider your preferred work environment",
                weights: {SOFTWARE: 2, DIGITAL_IND: 2, AI_DATA: 1}
            },
            {
                question: "Are you interested in how energy flows through systems?",
                context: "Think about your system perspective",
                weights: {ENERGY: 2, MECH_DESIGN: 1}
            },
            {
                question: "Do you enjoy predicting how systems will behave?",
                context: "Consider your analytical interests",
                weights: {AI_DATA: 2, SOFTWARE: 1, MECH_STRUCT: 1}
            },
            {
                question: "Are you more interested in how things are made than how they're used?",
                context: "Think about your manufacturing perspective",
                weights: {MATERIALS: 2, IND_PROD: 2, MECH_DESIGN: 1}
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

        function resetCard() {
            card.style.transform = 'translateX(0) rotate(0deg)';
            card.style.opacity = '1';
        }

        function calculateResults() {
            answers.forEach((answer, index) => {
                if (answer) {
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
