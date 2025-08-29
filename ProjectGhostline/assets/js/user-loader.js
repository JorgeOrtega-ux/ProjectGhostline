function initUserLoader() {
    const loadMoreButton = document.getElementById('loadMoreUsers');
    const cardsGrid = document.querySelector('.cards-grid');
    
    if (!loadMoreButton || !cardsGrid) {
        return;
    }

    let offset = 25; // El offset inicial para la siguiente carga

    loadMoreButton.addEventListener('click', async function() {
        const totalUsers = parseInt(this.dataset.total, 10);
        
        try {
            const response = await fetch(`${window.PROJECT_CONFIG.baseUrl}/load-users.php?offset=${offset}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const newUsersHtml = await response.text();
            
            if (newUsersHtml.trim() !== '') {
                cardsGrid.insertAdjacentHTML('beforeend', newUsersHtml);
                offset += 25;

                // Ocultar el botón si ya no hay más usuarios que cargar
                if (offset >= totalUsers) {
                    this.style.display = 'none';
                }
            } else {
                // Ocultar el botón si la respuesta está vacía
                this.style.display = 'none';
            }
        } catch (error) {
            console.error('Error fetching more users:', error);
        }
    });
}

export { initUserLoader };