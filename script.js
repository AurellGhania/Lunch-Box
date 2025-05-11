import 'flowbite';


let macroChartInstance;
    function calculateMacros() {
      const carbs = +document.getElementById('carbs').value;
      const protein = +document.getElementById('protein').value;
      const fat = +document.getElementById('fat').value;

      const totalCalories = (carbs * 4) + (protein * 4) + (fat * 9);
      const carbPercent = ((carbs * 4) / totalCalories * 100).toFixed(0);
      const proteinPercent = ((protein * 4) / totalCalories * 100).toFixed(0);
      const fatPercent = ((fat * 9) / totalCalories * 100).toFixed(0);

      let message = `Your breakdown: ${carbPercent}% Carbs, ${proteinPercent}% Protein, ${fatPercent}% Fat. `;
      if (Math.abs(carbPercent - 50) <= 10 && Math.abs(proteinPercent - 20) <= 5 && Math.abs(fatPercent - 30) <= 5) {
        message = "✅ Your macronutrient balance is close to the recommended intake. " + message;
      } else {
        message = "⚠️ Your macronutrient balance differs from recommendations. " + message;
      }
      document.getElementById('macroMessage').textContent = message;

      // Pie Chart
      if (macroChartInstance) macroChartInstance.destroy();
      const ctx = document.getElementById('macroChart').getContext('2d');
      macroChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Carbs', 'Protein', 'Fat'],
          datasets: [{
            data: [carbPercent, proteinPercent, fatPercent],
            backgroundColor: ['#60a5fa', '#34d399', '#f87171']
          }]
        }
      });
    }

    let calorieChartInstance;
    function checkCalories() {
      const age = +document.getElementById('age').value;
      const gender = document.getElementById('gender').value;
      const activity = document.getElementById('activity').value;
      const caloriesToday = +document.getElementById('calories').value;

      if (!age || !gender || !activity) {
        document.getElementById('calorieMessage').textContent = "❗ Please fill all fields.";
        return;
      }

      let recommendedCalories;
      if (gender === 'male') {
        recommendedCalories = 2500;
      } else {
        recommendedCalories = 2000;
      }
      if (activity === 'sedentary') {
        recommendedCalories -= 300;
      } else if (activity === 'active') {
        recommendedCalories += 300;
      }

      let message;
      if (caloriesToday < recommendedCalories * 0.9) {
        message = "⚠️ Intake is LOW.";
      } else if (caloriesToday > recommendedCalories * 1.1) {
        message = "⚠️ Intake is HIGH.";
      } else {
        message = "✅ Intake is NORMAL.";
      }
      message += ` Recommended: ~${recommendedCalories} kcal/day.`;
      document.getElementById('calorieMessage').textContent = message;

      // Bar Chart
      if (calorieChartInstance) calorieChartInstance.destroy();
      const ctx = document.getElementById('calorieChart').getContext('2d');
      calorieChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Calories/day',
            data: [caloriesToday, caloriesToday, caloriesToday, caloriesToday, caloriesToday, caloriesToday, caloriesToday],
            backgroundColor: '#34d399'
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    //calculate bmi

    function calculateBMI() {
      const weight = document.getElementById('weight').value;
      const height = document.getElementById('height').value;
      if (weight > 0 && height > 0) {
        const bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);
        document.getElementById('bmiValue').textContent = bmi;
      }
    }

    //drag and drop
    const draggables = document.querySelectorAll('.draggable');
    const bowl = document.getElementById('bowl');
    const result = document.getElementById('result');
    
    // Pastikan kita mendapatkan elemen draggable yang benar
    console.log('Draggables found:', draggables.length);
    
    draggables.forEach(item => {
      item.addEventListener('dragstart', e => {
        console.log('Drag started for item:', item.textContent);  // Log saat drag dimulai
        e.dataTransfer.setData('text/plain', item.textContent);
      });
    });
    
    bowl.addEventListener('dragover', e => {
      e.preventDefault();
      console.log('dragover event triggered'); // Log saat dragover terjadi
    });
    
    bowl.addEventListener('drop', e => {
      e.preventDefault();
      console.log('drop event triggered'); // Log saat drop terjadi
    
      const food = e.dataTransfer.getData('text/plain');
      const x = e.offsetX;
      const y = e.offsetY;
    
      console.log('Food dropped:', food, 'at position', x, y);  // Log apa yang dijatuhkan dan posisinya
    
      const span = document.createElement('span');
      span.textContent = food;
      span.className = "emoji";
      span.style.left = x + "px";
      span.style.top = y + "px";
      span.style.position = "absolute";  // Pastikan posisinya absolute
    
      bowl.appendChild(span);
      console.log('Item added to bowl');  // Log setelah elemen ditambahkan ke bowl
    
      // Remove "Drop Here" text if ada
      const placeholder = bowl.querySelector('p');
      if (placeholder) placeholder.remove();
    });
    
    function calculateItems() {
      const foods = bowl.querySelectorAll('.emoji');
      console.log("Total items in bowl:", foods.length); // Debugging log
    
      if (foods.length > 0) {
        result.textContent = `You added ${foods.length} item(s) to your lunch box! 🍴`;
      } else {
        result.textContent = "No items in your lunch box. Please add some! 🍴";
      }
    }
        