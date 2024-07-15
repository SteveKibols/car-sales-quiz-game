const customerTypes = [
    {
        type: "Tradesperson",
        priorities: ["reliability", "relationships", "cost performance", "practicality"],
        description: "A tradesperson who values reliability and relationships as well as cost performance and practicality.",
        image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4"
    },
    {
        type: "Business Professional",
        priorities: ["quality", "service", "status", "technology"],
        description: "A business professional who prioritises quality and good service, as well as status and advanced technology.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    },
    {
        type: "Family-Oriented Buyer",
        priorities: ["safety", "space", "comfort", "fuel efficiency"],
        description: "A family-oriented buyer who prioritizes safety features, cargo space, and comfort for passengers.",
        image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
    },
    {
        type: "Tech-Savvy Buyer",
        priorities: ["technology", "connectivity", "design", "performance"],
        description: "A tech-savvy buyer who seeks cutting-edge technology, connectivity features, and a sleek design.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
        type: "Eco-Conscious Buyer",
        priorities: ["fuel efficiency", "sustainability", "low emissions", "innovative technology"],
        description: "An environmentally conscious buyer looking for fuel-efficient, sustainable vehicles with low emissions.",
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
    }
];

const recommendations = [
    { name: "Extended warranty", tags: ["reliability", "service", "practicality"] },
    { name: "Fuel-efficient engine", tags: ["cost performance", "fuel efficiency", "sustainability"] },
    { name: "Premium leather seats", tags: ["quality", "comfort", "status"] },
    { name: "Advanced safety package", tags: ["safety", "technology"] },
    { name: "Spacious cargo area", tags: ["practicality", "space"] },
    { name: "24/7 roadside assistance", tags: ["service", "reliability"] },
    { name: "State-of-the-art infotainment system", tags: ["technology", "connectivity"] },
    { name: "Customised financing options", tags: ["relationships", "service"] },
    { name: "High-performance engine", tags: ["performance", "quality"] },
    { name: "Sleek aerodynamic design", tags: ["design", "status"] },
    { name: "Electric powertrain", tags: ["sustainability", "low emissions", "innovative technology"] }
];

let currentCustomer;
let score = 0;
let round = 0;
const totalRounds = 5;
let shuffledCustomers;
let selectedRecommendations = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startQuiz() {
    document.getElementById("start-screen").classList.add("hide");
    document.getElementById("quiz-container").classList.remove("hide");
    resetQuiz();
    nextRound();
}

function resetQuiz() {
    score = 0;
    round = 0;
    shuffledCustomers = shuffleArray([...customerTypes]);
    selectedRecommendations = [];
}

function nextRound() {
    if (round < totalRounds) {
        currentCustomer = shuffledCustomers[round];
        round++;
        selectedRecommendations = [];
        displayCustomer();
        displayRecommendations();
        displaySubmitButton();
    } else {
        showFinalScore();
    }
}

function displayCustomer() {
    document.getElementById("customer-info").innerHTML = `
        <h2>Round ${round}: ${currentCustomer.type}</h2>
        <img src="${currentCustomer.image}" alt="${currentCustomer.type}">
        <p>${currentCustomer.description}</p>
    `;
}

function displayRecommendations() {
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    recommendations.forEach(rec => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = rec.name;
        checkbox.value = rec.name;
        checkbox.onchange = () => updateSelectedRecommendations(rec);

        label.htmlFor = rec.name;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(rec.name));

        optionsContainer.appendChild(label);
    });
}

function updateSelectedRecommendations(rec) {
    const index = selectedRecommendations.findIndex(r => r.name === rec.name);
    if (index > -1) {
        selectedRecommendations.splice(index, 1);
    } else {
        selectedRecommendations.push(rec);
    }
}

function displaySubmitButton() {
    const submitContainer = document.getElementById("submit-container");
    submitContainer.innerHTML = "";
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.onclick = checkAnswer;
    submitContainer.appendChild(submitButton);
}

function checkAnswer() {
    let roundScore = 0;
    let matchingPriorities = new Set();

    selectedRecommendations.forEach(rec => {
        rec.tags.forEach(tag => {
            if (currentCustomer.priorities.includes(tag)) {
                matchingPriorities.add(tag);
            }
        });
    });

    roundScore = Math.min(matchingPriorities.size, 3);
    score += roundScore;

    document.getElementById("feedback").innerHTML = `
        <h3>Feedback</h3>
        <p>You recommended: ${selectedRecommendations.map(rec => rec.name).join(", ")}</p>
        <p>Score for this round: ${roundScore} out of 3</p>
        <p>Matching priorities: ${Array.from(matchingPriorities).join(", ") || "None"}</p>
    `;

    // Scroll to the feedback section
    document.getElementById("feedback").scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
        document.getElementById("feedback").innerHTML = "";
        nextRound();
    }, 3000);
}

function showFinalScore() {
    document.getElementById("quiz-container").innerHTML = `
        <h2>Quiz Complete!</h2>
        <p>Your total score is: ${score} out of ${totalRounds * 3}</p>
        <button onclick="restartQuiz()">Try Again</button>
    `;
}

function restartQuiz() {
    document.getElementById("quiz-container").innerHTML = `
        <div id="customer-info"></div>
        <div id="options"></div>
        <div id="submit-container"></div>
        <div id="feedback"></div>
    `;
    startQuiz();
}

window.onload = () => {
    document.getElementById("start-screen").classList.remove("hide");
    document.getElementById("quiz-container").classList.add("hide");
};