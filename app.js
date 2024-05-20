document.getElementById('profileForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const profileLink = document.getElementById('profileLink').value;
    const resultDiv = document.getElementById('result');

    try {
        const response = await fetch('/api/check-points', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ profileLink })
        });
        const data = await response.json();
        if (response.ok) {
            resultDiv.innerHTML = `Total Arcade Points: ${data.points}`;
        } else {
            resultDiv.innerHTML = `Error: ${data.error}`;
        }
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});
