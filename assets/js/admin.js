// Quản lý sản phẩm và khách hàng trong admin.js

document.addEventListener('DOMContentLoaded', () => {
    const productTableBody = document.getElementById('product-table-body');
    const customerTableBody = document.getElementById('customer-table-body');
    const addProductForm = document.getElementById('add-product-form');
    const editProductForm = document.getElementById('edit-product-form');
    const addPreviewImage = document.getElementById('add-preview-image');
    const editPreviewImage = document.getElementById('preview-image');
    let productData = JSON.parse(localStorage.getItem('carData')) || [];
    let customers = JSON.parse(localStorage.getItem('customers')) || [];
    let currentEditIndex = null;

    // Hàm định dạng giá tiền
    function formatPrice(price) {
        if (!price) return 'Đang cập nhật';
        return parseInt(price, 10).toLocaleString('vi-VN') + ' VNĐ';
    }

    // Hàm lưu dữ liệu vào localStorage
    function saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Hiển thị danh sách sản phẩm
    function displayProducts() {
        productTableBody.innerHTML = '';

        productData.forEach((car, carIndex) => {
            car.variants.forEach((variant, variantIndex) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${carIndex + 1}.${variantIndex + 1}</td>
                    <td>${car.model}</td>
                    <td>${car.type}</td>
                    <td>${car.year}</td>
                    <td>${variant.name}</td>
                    <td>${variant.engine}</td>
                    <td>${variant.transmission}</td>
                    <td>${formatPrice(variant.price)}</td>
                    <td><img src="${variant.image}" alt="${variant.name}" style="max-width: 100px;"></td>
                    <td>
                        <button class="btn btn-warning btn-sm btn-edit" data-car-index="${carIndex}" data-variant-index="${variantIndex}">Sửa</button>
                        <button class="btn btn-danger btn-sm btn-delete" data-car-index="${carIndex}" data-variant-index="${variantIndex}">Xóa</button>
                    </td>
                `;
                productTableBody.appendChild(row);
            });
        });

        attachProductActionButtons();
    }

    // Thêm sản phẩm mới
    document.getElementById('save-add-btn').addEventListener('click', () => {
        const name = document.getElementById('add-name').value;
        const type = document.getElementById('add-type').value;
        const year = document.getElementById('add-year').value;
        const variant = document.getElementById('add-variant-name').value;
        const engine = document.getElementById('add-engine').value;
        const transmission = document.getElementById('add-transmission').value;
        const price = document.getElementById('add-price').value;
        const imageFile = document.getElementById('add-image-file').files[0];

        if (!name || !type || !year || !variant || !engine || !transmission || !imageFile) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const newVariant = {
                name: variant,
                engine,
                transmission,
                price: price.replace(/\D/g, ''), // Chỉ giữ lại số
                image: e.target.result,
            };

            const existingCarIndex = productData.findIndex(car => car.model === name);
            if (existingCarIndex !== -1) {
                productData[existingCarIndex].variants.push(newVariant);
            } else {
                productData.push({
                    make: 'Kia',
                    model: name,
                    type,
                    year,
                    variants: [newVariant],
                });
            }

            saveToLocalStorage('carData', productData);
            displayProducts();
            addProductForm.reset();
            addPreviewImage.style.display = 'none';
            bootstrap.Modal.getInstance(document.getElementById('addProductModal')).hide();
        };
        reader.readAsDataURL(imageFile);
    });

    // Sửa sản phẩm
    document.getElementById('save-edit-btn').addEventListener('click', () => {
        const name = document.getElementById('edit-name').value;
        const type = document.getElementById('edit-type').value;
        const year = document.getElementById('edit-year').value;
        const variant = document.getElementById('edit-variant-name').value;
        const engine = document.getElementById('edit-engine').value;
        const transmission = document.getElementById('edit-transmission').value;
        const price = document.getElementById('edit-price').value;
        const imageFile = document.getElementById('edit-image-file').files[0];

        if (!name || !type || !year || !variant || !engine || !transmission) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        const carIndex = currentEditIndex.carIndex;
        const variantIndex = currentEditIndex.variantIndex;

        const reader = new FileReader();
        reader.onload = (e) => {
            const updatedVariant = {
                name: variant,
                engine,
                transmission,
                price: price.replace(/\D/g, ''), // Chỉ giữ lại số
                image: imageFile ? e.target.result : productData[carIndex].variants[variantIndex].image,
            };

            productData[carIndex].variants[variantIndex] = updatedVariant;

            saveToLocalStorage('carData', productData);
            displayProducts();
            editProductForm.reset();
            editPreviewImage.style.display = 'none';
            bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        } else {
            reader.onload();
        }
    });

    // Xóa sản phẩm
    function attachProductActionButtons() {
        document.querySelectorAll('.btn-delete').forEach((button) => {
            button.addEventListener('click', (e) => {
                const carIndex = e.target.dataset.carIndex;
                const variantIndex = e.target.dataset.variantIndex;

                productData[carIndex].variants.splice(variantIndex, 1);

                if (productData[carIndex].variants.length === 0) {
                    productData.splice(carIndex, 1);
                }

                saveToLocalStorage('carData', productData);
                displayProducts();
            });
        });

        document.querySelectorAll('.btn-edit').forEach((button) => {
            button.addEventListener('click', (e) => {
                const carIndex = e.target.dataset.carIndex;
                const variantIndex = e.target.dataset.variantIndex;

                currentEditIndex = { carIndex, variantIndex };
                const product = productData[carIndex];
                const variant = product.variants[variantIndex];

                document.getElementById('edit-name').value = product.model;
                document.getElementById('edit-type').value = product.type;
                document.getElementById('edit-year').value = product.year;
                document.getElementById('edit-variant-name').value = variant.name;
                document.getElementById('edit-engine').value = variant.engine;
                document.getElementById('edit-transmission').value = variant.transmission;
                document.getElementById('edit-price').value = variant.price;
                editPreviewImage.src = variant.image;
                editPreviewImage.style.display = 'block';

                bootstrap.Modal.getOrCreateInstance(document.getElementById('editModal')).show();
            });
        });
    }
    // Hiển thị sản phẩm và khách hàng khi tải trang
    displayProducts();
});
