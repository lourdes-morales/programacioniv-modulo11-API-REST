document.addEventListener('DOMContentLoaded', () => {
    const addWordForm = document.getElementById('add-word-form');
    const searchWordForm = document.getElementById('search-word-form');
    const deleteWordForm = document.getElementById('delete-word-form');
    const editWordForm = document.getElementById('edit-word-form');
    const wordsList = document.getElementById('words-list');
    const searchResult = document.getElementById('search-result');

    addWordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const word = document.getElementById('add-word').value;
        const meaning = document.getElementById('add-meaning').value;
        document.getElementById('add-word').value = '';
        document.getElementById('add-meaning').value = '';

        await fetch('/api/v1/words', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ word, meaning })
        });

        updateWordsList();
    });

    searchWordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const word = document.getElementById('search-word').value;
        document.getElementById('search-word').value = '';

        const response = await fetch(`/api/v1/words/${word}`);
        const data = await response.json();

        if (data.meaning) {
            searchResult.textContent = `El significado de '${word}' es: ${data.meaning}`;
        } else {
            searchResult.textContent = `Palabra '${word}' no encontrada`;
        }
    });

    deleteWordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const word = document.getElementById('delete-word').value;
        document.getElementById('delete-word').value = '';

        await fetch(`/api/v1/words/${word}`, {
            method: 'DELETE'
        });

        updateWordsList();
    });

    editWordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const word = document.getElementById('edit-word').value;
        const meaning = document.getElementById('edit-meaning').value;
        document.getElementById('edit-word').value = '';
        document.getElementById('edit-meaning').value = '';

        await fetch(`/api/v1/words/${word}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ meaning })
        });

        updateWordsList();
    });

    async function updateWordsList() {
        const response = await fetch('/api/v1/words');
        const words = await response.json();

        wordsList.innerHTML = '';
        words.forEach((word) => {
            const listItem = document.createElement('li');
            listItem.textContent = word;
            wordsList.appendChild(listItem);
        });
    }

    updateWordsList();
});


