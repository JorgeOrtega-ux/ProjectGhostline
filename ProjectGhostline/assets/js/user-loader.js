let offset = 25; // El offset inicial para la siguiente carga

function initUserLoader() {
    const loadMoreButton = document.getElementById('loadMoreUsers');
    const cardsGrid = document.querySelector('.cards-grid');
    const searchInput = document.querySelector('.search-input');
    
    if (!loadMoreButton || !cardsGrid) {
        return;
    }

    loadMoreButton.addEventListener('click', async function() {
        const totalUsers = parseInt(this.dataset.total, 10);
        const sortKey = cardsGrid.dataset.sortKey || 'most_relevant';
        const query = searchInput ? searchInput.value.trim() : '';

        try {
            const response = await fetch(`${window.PROJECT_CONFIG.baseUrl}/load-users.php?search_query=${encodeURIComponent(query)}&sort_key=${sortKey}&offset=${offset}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            
            if (data.html.trim() !== '') {
                cardsGrid.insertAdjacentHTML('beforeend', data.html);
                offset += 25;

                const currentDisplayedCount = cardsGrid.children.length;
                if (currentDisplayedCount >= totalUsers) {
                    this.style.display = 'none';
                }
            } else {
                this.style.display = 'none';
            }
        } catch (error) {
            console.error('Error fetching more users:', error);
        }
    });
}

function resetOffset() {
    offset = 25;
}


export { initUserLoader, resetOffset };