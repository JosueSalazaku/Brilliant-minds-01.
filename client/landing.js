const ideasSection = document.querySelector("#ideas-section");
const showIdeas = document.createElement("div");

showIdeas.classList.add("show-ideas");

const apiUrl = "http://localhost:3000/ideas";

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((idea) => {
      const ideaElement = document.createElement("h3");
      ideaElement.textContent = `Title: ${idea.title}, Description: ${idea.description}, ${idea.created_at}`;
      ideasSection.appendChild(ideaElement);
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      ideaElement.appendChild(deleteBtn);
    });
  })
  .catch((error) => console.error("Error fetching ideas:", error));
