const ideasSection = document.querySelector(".ideas-section");

const showIdeas = document.createElement("div");
showIdeas.classList.add("show-ideas");

const apiUrl = "http://localhost:3000/ideas";

console.log(apiUrl);

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // Process the data and display it on your page
    data.forEach((idea) => {
      const ideaElement = document.createElement("h3");
      ideaElement.textContent = `Title: ${idea.title}, Description: ${idea.description}, ${idea.created_at}`;
      showIdeas.appendChild(ideaElement);
    });
    ideasSection.appendChild(showIdeas);
  })
  .catch((error) => console.error("Error fetching ideas:", error));
