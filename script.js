// Hàm tạo các trái tim
function createHearts() {
    var heartsContainer = document.getElementById("hearts-container");
    heartsContainer.innerHTML = ''; // Xóa các trái tim cũ đi để chuẩn bị hiển thị mới

    var numberOfHearts = 10; // Số lượng trái tim bạn muốn hiển thị

    // Tạo các trái tim
    for (var i = 0; i < numberOfHearts; i++) {
        var heart = document.createElement('div');
        heart.className = 'heart';
        heartsContainer.appendChild(heart);
        animateHeart(heart);
    }
}

// Hàm animateHeart để thực hiện animation cho từng trái tim
function animateHeart(heart) {
    // Làm cho trái tim bay ra khỏi màn hình
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 1 + 's';
    
    // Sau khi hoàn thành animation, xóa trái tim khỏi DOM
    heart.addEventListener('animationend', function() {
        heart.remove();
    });
}

// Hàm xử lý khi chọn tùy chọn từ select
function selectResolution() {
    var selectBox = document.getElementById("resolutionSelect");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    var displayImage = document.getElementById("display-image");
    var displayVideo = document.getElementById("display-video");

    if (selectedValue.endsWith(".png") || selectedValue.endsWith(".jpg") || selectedValue.endsWith(".jpeg")) {
        displayImage.src = selectedValue;
        displayImage.classList.add('show');
        displayVideo.classList.remove('show');
        displayVideo.pause(); // Dừng video nếu đang phát
    } else if (selectedValue.endsWith(".mp4")) {
        displayVideo.src = selectedValue;
        displayVideo.classList.add('show');
        displayImage.classList.remove('show');
        displayVideo.load(); // Tải lại video
        displayVideo.play(); // Phát video
        createHearts(); // Tạo hiệu ứng trái tim khi chọn video
    } else {
        displayImage.classList.remove('show');
        displayVideo.classList.remove('show');
        displayVideo.pause(); // Dừng video nếu đang phát
    }
}

// Lắng nghe sự kiện thay đổi của select và gọi hàm selectResolution()
document.getElementById('resolutionSelect').addEventListener('change', function() {
    selectResolution();
});
// Hàm tạo các trái tim từ nhiều hướng và hướng về phía video trong 8 giây
function createHeartsAroundVideo() {
    var heartsContainer = document.getElementById('hearts-container');
    var displayVideo = document.getElementById('display-video');

    var directions = [-45, 45, 135, 225]; // Các hướng (độ) khác nhau
    var interval = 1000; // Thời gian tạo một trái tim mới

    var timer = setInterval(function() {
        var direction = directions[Math.floor(Math.random() * directions.length)];
        var heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = (Math.random() * window.innerWidth) + 'px';
        heart.style.transform = `rotate(${direction}deg)`;
        heartsContainer.appendChild(heart);

        // Xóa trái tim sau khi hoàn thành animation
        setTimeout(function() {
            heart.remove();
        }, 8000); // Xóa sau 8 giây

    }, interval);

    // Dừng tạo trái tim sau khi video kết thúc
    displayVideo.addEventListener('ended', function() {
        clearInterval(timer);
    });
}


