document.getElementById('addProductForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;

    try {
        const response = await fetch('/add-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price }),
        });

        if (!response.ok) {
            throw new Error('Failed to add product');
        }

        const product = await response.json();
        const productList = document.getElementById('productList');
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${parseFloat(product.price).toFixed(2)}`;
        productList.appendChild(li);

        document.getElementById('name').value = '';
        document.getElementById('price').value = '';
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add product. Please try again.');
    }
});