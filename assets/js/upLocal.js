// Lưu dữ liệu vào localStorage
function saveDataToLocalStorage(data) {
    try {
        localStorage.setItem('carData', JSON.stringify(data));
        console.log('Dữ liệu đã được lưu vào localStorage:', data);
    } catch (error) {
        console.error('Lỗi khi lưu dữ liệu vào localStorage:', error);
    }
}

// Lấy dữ liệu từ localStorage
function getDataFromLocalStorage() {
    try {
        const data = localStorage.getItem('carData');
        if (data) {
            console.log('Dữ liệu lấy từ localStorage:', JSON.parse(data));
            return JSON.parse(data);
        } else {
            console.warn('Không có dữ liệu trong localStorage');
            return [];
        }
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ localStorage:', error);
        return [];
    }
}

// Xóa dữ liệu khỏi localStorage
function clearDataFromLocalStorage() {
    try {
        localStorage.removeItem('carData');
        console.log('Dữ liệu đã được xóa khỏi localStorage');
    } catch (error) {
        console.error('Lỗi khi xóa dữ liệu từ localStorage:', error);
    }
}

// Khởi tạo hoặc cập nhật dữ liệu
function initializeOrUpdateLocalStorage(defaultData) {
    const existingData = getDataFromLocalStorage();
    if (!existingData || existingData.length === 0) {
        console.log('Không có dữ liệu hiện có, khởi tạo với dữ liệu mặc định.');
        saveDataToLocalStorage(defaultData);
    } else {
        console.log('Dữ liệu đã tồn tại trong localStorage, không cần khởi tạo lại.');
    }
}

// Xử lý khi chỉnh sửa dữ liệu
function updateDataInLocalStorage(updatedData) {
    if (!updatedData || !Array.isArray(updatedData)) {
        console.error('Dữ liệu cập nhật không hợp lệ:', updatedData);
        return;
    }

    saveDataToLocalStorage(updatedData);
    console.log('Dữ liệu đã được cập nhật trong localStorage:', updatedData);
}

// Kiểm tra và lưu dữ liệu ban đầu từ file data.js (nếu có)
if (typeof carData !== 'undefined') {
    initializeOrUpdateLocalStorage(carData);
} else {
    console.warn('Không tìm thấy dữ liệu carData từ file data.js');
}
