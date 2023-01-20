window.onload = function () {
    // fetch the data from csv file
    fetch("data/data.csv")
      .then((response) => response.text())
      .then((data) => {
        // parse csv data into a json object
        const jsonData = Papa.parse(data, {
          header: true,
          dynamicTyping: true,
        }).data;
        // loop through the json object
        jsonData.forEach((question,index) => {
          // create elements for question and answer
          const card = document.createElement("div");
          card.classList.add("card");
          const questionDiv = document.createElement("div");
          questionDiv.classList.add("question");
          const questionText = document.createElement("p");
          questionText.innerText = question.question;
          const answerDiv = document.createElement("div");
          answerDiv.classList.add("answer");
          const input = document.createElement("input");
          // set the attributes of the input element
          input.setAttribute("type", "text");
          input.setAttribute("name", `question${index}`);
          input.setAttribute("required", "required");
          // append elements to the question-container div
          questionDiv.appendChild(questionText);
          answerDiv.appendChild(input);
          card.appendChild(questionDiv);
          card.appendChild(answerDiv);
          document.getElementById("question-container").appendChild(card);
        });
        //create submit button 
        const submitCard = document.createElement("div");
        submitCard.classList.add("submit-card");
        const submitButton = document.createElement("input");
        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("value", "Submit");
        submitButton.classList.add("submit-button");
        submitCard.appendChild(submitButton);
        document.getElementById("question-container").appendChild(submitCard);
        // add event listener to the submit button
        submitButton.addEventListener("click", function (event) {
          event.preventDefault();
          let correctAnswers = 0  
        jsonData.forEach((question, i) => {
          const userAnswer = document.querySelector(
            `input[name='question${i}']`
          ).value;
          if (userAnswer.toLowerCase() === question.answer[0].toLowerCase()) {
            correctAnswers++;
          }
        });
        alert(`You got ${correctAnswers} out of ${jsonData.length} correct!`);
      });
    });
};
