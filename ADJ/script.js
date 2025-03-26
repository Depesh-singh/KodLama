// healthcare.js
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

let waterIntake = parseInt(localStorage.getItem('waterIntake')) || 0;

function initializeApp() {
    // Initialize medication history
    let medicationHistory = JSON.parse(localStorage.getItem('medicationHistory')) || [];
    
    updateMedicationHistoryDisplay(medicationHistory);
    updateHydrationDisplay(waterIntake);

    // Initialize event listeners
    document.getElementById('med-form').addEventListener('submit', handleMedicationSubmit);
    document.querySelectorAll('.glass').forEach(glass => {
        glass.addEventListener('click', () => handleWaterIntake(glass));
    });
}

// Symptom Checker with Emergency Detection
function checkSymptoms() {
    const symptomsInput = document.getElementById('symptoms').value.toLowerCase();
    const resultDiv = document.getElementById('diagnosis-result');
    const emergencyKeywords = {
        cardiac: ['chest pain', 'shortness of breath', 'arm numbness'],
        stroke: ['facial drooping', 'slurred speech', 'confusion'],
        severe: ['unconscious', 'severe bleeding', 'choking'],
        fever: [ 'cough'],
        chickenpox: ['rashes']
    };

    const diagnosticMatrix = {
        flu: {
            symptoms: ['fever', 'cough', 'body ache'],
            advice: 'Rest, hydrate, and consider over-the-counter fever reducers'
        },
        migraine: {
            symptoms: ['headache', 'nausea', 'light sensitivity'],
            advice: 'Rest in a dark room and apply a cold compress'
        },
        allergy: {
            symptoms: ['sneezing', 'itchy eyes', 'runny nose'],
            advice: 'Take antihistamines and avoid allergens'
        }
    };

    // Emergency check
    const emergency = Object.entries(emergencyKeywords).find(([condition, keywords]) => 
        keywords.some(keyword => symptomsInput.includes(keyword))
    );

    if (emergency) {
        resultDiv.innerHTML = `
            <div class="emergency-alert">
                🚨 EMERGENCY: Possible ${emergency[0].toUpperCase()}<br>
                ${getEmergencyInstructions(emergency[0])}
            </div>
        `;
        return;
    }

    // Regular diagnosis
    const diagnosis = Object.entries(diagnosticMatrix).find(([condition, data]) => 
        data.symptoms.every(symptom => symptomsInput.includes(symptom))
    );

    if (diagnosis) {
        resultDiv.innerHTML = `
            <div class="diagnosis-card">
                <h4>Possible ${diagnosis[0].toUpperCase()}</h4>
                <p>${diagnosis[1].advice}</p>
                <button onclick="showDetail('${diagnosis[0]}')">More Info</button>
            </div>
        `;
    } else {
        resultDiv.innerHTML = '<p>No specific diagnosis found. Consult a healthcare professional.</p>';
    }
}

function getEmergencyInstructions(condition) {
    const instructions = {
        cardiac: 'Call emergency services immediately. Chew aspirin if available.',
        stroke: 'Note time of onset. Keep patient calm. Do NOT give food/drink.',
        severe: 'Apply pressure to bleeding. Perform CPR if trained.'
    };
    return instructions[condition] || 'Seek immediate medical attention.';
}

// Medication Tracker
function handleMedicationSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const medEntry = {
        id: Date.now(),
        name: formData.get('med-name'),
        time: formData.get('med-time'),
        dosage: formData.get('med-dosage'),
        frequency: formData.get('med-frequency'),
        taken: false
    };

    medicationHistory.push(medEntry);
    localStorage.setItem('medicationHistory', JSON.stringify(medicationHistory));
    
    updateMedicationHistoryDisplay(medicationHistory);
    scheduleMedicationReminder(medEntry);
    e.target.reset();
}

function scheduleMedicationReminder(med) {
    const now = new Date();
    const [hours, minutes] = med.time.split(':');
    const medTime = new Date();
    medTime.setHours(hours, minutes, 0, 0);

    if (medTime > now) {
        const timeout = medTime - now;
        setTimeout(() => {
            showNotification(`⏰ Take ${med.dosage}mg of ${med.name}`);
            document.querySelector(`[data-med-id="${med.id}"]`).classList.add('urgent');
        }, timeout);
    }
}

function updateMedicationHistoryDisplay(history) {
    const medList = document.getElementById('med-list');
    medList.innerHTML = history.map(med => `
        <div class="med-item" data-med-id="${med.id}">
            <span>${med.name} (${med.dosage}mg)</span>
            <span>${med.time} - ${med.frequency}</span>
            <button onclick="markAsTaken(${med.id})">✔️ Taken</button>
        </div>
    `).join('');
}

function markAsTaken(medId) {
    medicationHistory = medicationHistory.map(med => 
        med.id === medId ? {...med, taken: true} : med
    );
    localStorage.setItem('medicationHistory', JSON.stringify(medicationHistory));
    updateMedicationHistoryDisplay(medicationHistory);
}

// Nutrition Guide
const nutritionPlans = {
    diabetes: {
        meals: {
            breakfast: 'Whole grain toast with avocado and poached egg',
            lunch: 'Grilled chicken with quinoa and steamed broccoli',
            dinner: 'Salmon with roasted vegetables'
        },
        nutrients: ['Chromium', 'Magnesium', 'Fiber']
    },
    hypertension: {
        meals: {
            breakfast: 'Oatmeal with banana and chia seeds',
            lunch: 'Spinach salad with grilled turkey',
            dinner: 'Baked cod with brown rice'
        },
        nutrients: ['Potassium', 'Calcium', 'Omega-3']
    },
    general: { // Added a general nutrition plan
        meals: {
            breakfast: 'Fruit smoothie with yogurt',
            lunch: 'Mixed vegetable salad with chickpeas',
            dinner: 'Grilled chicken with brown rice and vegetables'
        },
        nutrients: ['Vitamins', 'Minerals', 'Fiber']
    }
};

function getNutritionPlan() {
    const condition = document.getElementById('condition').value;
    const plan = nutritionPlans[condition] || nutritionPlans.general;
    
    document.getElementById('nutrition-result').innerHTML = `
        <div class="nutrition-card">
            <h3>${condition.toUpperCase()} DIET PLAN</h3>
            <div class="meal-plan">
                ${Object.entries(plan.meals).map(([meal, items]) => `
                    <div class="meal">
                        <h4>${meal}</h4>
                        <p>${items}</p>
                    </div>
                `).join('')}
            </div>
            <div class="nutrients">
                <h4>Key Nutrients:</h4>
                <ul>${plan.nutrients.map(n => `<li>${n}</li>`).join('')}</ul>
            </div>
        </div>
    `;
}

// Hydration Tracker
function handleWaterIntake(glass) {
    const amount = parseInt(glass.dataset.amount);
    waterIntake += amount;
    glass.style.backgroundColor = '#B3E5FC';
    localStorage.setItem('waterIntake', waterIntake.toString());
    updateHydrationDisplay(waterIntake);
}

function updateHydrationDisplay(intake) {
    document.getElementById('water-total').textContent = intake;
    document.getElementById('hydration-progress').style.width = 
        `${Math.min((intake / 2000) * 100, 100)}%`;
}

// Contact Form Handler
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    if ([...formData.values()].every(Boolean)) {
        showNotification('Message sent successfully!');
        this.reset();
    } else {
        showNotification('Please fill all fields!', true);
    }
});

// Utility Functions
function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.className = `notification ${isError ? 'error' : 'success'}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

function showDetail(condition) {
    // Implement detailed information modal
    console.log('Showing details for:', condition);
}