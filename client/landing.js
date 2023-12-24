const ideasSection = document.querySelector("#ideas-section");
const apiUrl = "http://localhost:3000/ideas";

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((idea) => {
      const ideaTitle = document.createElement("h3");
      ideaTitle.innerHTML = `${idea.title}`;

      const ideaDescription = document.createElement("p");
      ideaDescription.innerHTML = `Description: ${idea.description}, <br> time  ${idea.created_at}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.innerHTML = "Delete";

      ideasSection.appendChild(ideaTitle);
      ideasSection.appendChild(ideaDescription);
      ideasSection.appendChild(deleteBtn);
    });
  })
  .catch((error) => console.error("Error fetching ideas:", error));
