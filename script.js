// Symptom Checker
function checkSymptoms() {
    const symptoms = document.getElementById('symptoms').value.toLowerCase();
    const resultDiv = document.getElementById('diagnosis-result');
    let diagnosis = '';

    // Simple AI-like logic (for demo purposes)
    if (symptoms.includes('fever') && symptoms.includes('cough')) {
        diagnosis = 'Possible Cause: Flu or Cold. Next Steps: Rest, hydrate, and consult a doctor if symptoms persist.';
    } else if (symptoms.includes('headache') && symptoms.includes('fatigue')) {
        diagnosis = 'Possible Cause: Stress or Dehydration. Next Steps: Drink water, rest, and monitor symptoms.';
    }
    else if (symptoms.includes('fever') && symptoms.includes('body aches')) {
        diagnosis = 'Possible Cause: Influenza or Viral Infection. Next Steps: Rest, take over-the-counter pain relief, and see a doctor if fever exceeds 103°F (39.4°C).';
    } else if (symptoms.includes('headache') && symptoms.includes('fatigue')) {
        diagnosis = 'Possible Cause: Stress or Dehydration. Next Steps: Drink water, rest, and monitor symptoms.';
    } else if (symptoms.includes('headache') && symptoms.includes('fever')) {
        diagnosis = 'Possible Cause: Sinus Infection or Flu. Next Steps: Use a warm compress, stay hydrated, and consult a doctor if symptoms worsen.';
    } else if (symptoms.includes('sore throat') && symptoms.includes('difficulty swallowing')) {
        diagnosis = 'Possible Cause: Tonsillitis or Pharyngitis. Next Steps: Drink warm tea, avoid irritants, and see a doctor if breathing becomes difficult.';
    } else if (symptoms.includes('abdominal pain') && symptoms.includes('bloating')) {
        diagnosis = 'Possible Cause: Indigestion or Gas. Next Steps: Eat smaller meals, avoid carbonated drinks, and consult a doctor if pain persists.';
    } else if (symptoms.includes('back pain') && symptoms.includes('stiffness')) {
        diagnosis = 'Possible Cause: Muscle Strain or Poor Posture. Next Steps: Stretch gently, apply heat, and see a healthcare provider if severe.';
    } else if (symptoms.includes('skin rash') && symptoms.includes('itching')) {
        diagnosis = 'Possible Cause: Contact Dermatitis or Eczema. Next Steps: Apply a mild moisturizer, avoid scratching, and seek medical advice if spreading.';
    } else if (symptoms.includes('chills') && symptoms.includes('sweating')) {
        diagnosis = 'Possible Cause: Infection or Fever Response. Next Steps: Keep warm, monitor temperature, and consult a doctor if prolonged.';
    } 
     else {
        diagnosis = 'Unable to determine. Please provide more details or consult a healthcare professional.';
    }

    resultDiv.innerHTML = <strong>Result:</strong> ${diagnosis};
}

// Medication Tracker
document.getElementById('med-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const medName = document.getElementById('med-name').value;
    const medTime = document.getElementById('med-time').value;
    const medList = document.getElementById('med-list');

    const li = document.createElement('li');
    li.innerHTML = ${medName} - Take at ${medTime} <button onclick="this.parentElement.remove()">Remove</button>;
    medList.appendChild(li);

    // Reminder (simulated)
    setTimeout(() => alert(Reminder: Take ${medName} now!), calculateTimeDifference(medTime));

    this.reset();
});

function calculateTimeDifference(time) {
    const now = new Date();
    const [hours, minutes] = time.split(':');
    const medDate = new Date();
    medDate.setHours(hours, minutes, 0, 0);
    return medDate - now > 0 ? medDate - now : 0;
}

// Nutrition Guide
function getNutritionPlan() {
    const condition = document.getElementById('condition').value;
    const resultDiv = document.getElementById('nutrition-result');
    let plan = '';

    // Simple AI-like logic (for demo purposes)
    switch (condition) {
        case 'diabetes':
            plan = 'Recommendation: Low-carb meals (e.g., grilled chicken with vegetables). Avoid sugary drinks.';
            break;
        case 'hypertension':
            plan = 'Recommendation: Low-sodium diet (e.g., steamed fish with greens). Limit salt intake.';
            break;
        case 'general':
            plan = 'Recommendation: Balanced diet (e.g., quinoa salad with lean protein). Stay hydrated.';
            break;
    }

    resultDiv.innerHTML = <strong>Your Plan:</strong> ${plan};
}