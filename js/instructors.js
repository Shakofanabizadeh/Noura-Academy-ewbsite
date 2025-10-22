// نمایش استادان آکادمی با Fetch API


document.addEventListener("DOMContentLoaded", () => {
  const instructorsContainer = document.getElementById('instructorsContainer');
  if (!instructorsContainer) return; // اگر این بخش در صفحه نبود، ادامه نده

  instructorsContainer.textContent = 'Loading instructors...';

  fetch('./data/instructors.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      instructorsContainer.textContent = ''; // حذف متن لودینگ

      data.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style = `
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 15px;
          margin: 10px;
          width: 220px;
          text-align: center;
          background: #f9f9f9;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          display: inline-block;
        `;
        card.innerHTML = `
          <h3>${user.name}</h3>
          <p><strong>Subject:</strong> ${user.subject}</p>
          <p><strong>Email:</strong> ${user.email}</p>
        `;
        instructorsContainer.appendChild(card);
      });
    })
    .catch(error => {
      instructorsContainer.textContent = 'Error loading instructors!';
      console.error(error);
    });
});

