// 主JavaScript文件
// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化模态框
    initModals();
    
    // 初始化表单验证
    initFormValidation();
    
    // 初始化证书懒加载
    initCertificateLazyLoad();
    
    // 初始化平滑滚动
    initSmoothScroll();
    
    // 初始化页内滚动指示器
    initScrollIndicator();
    
    // 初始化表单即时反馈
    initFormRealTimeFeedback();
    
    // 初始化元素动画
    initElementAnimations();
});

// 初始化模态框功能
function initModals() {
    // 获取所有模态框
    const modals = document.querySelectorAll('.modal');
    // 获取所有关闭按钮
    const closeButtons = document.querySelectorAll('.close');
    
    // 关闭模态框函数
    function closeModal(modal) {
        modal.style.display = 'none';
    }
    
    // 打开模态框函数
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
        }
    }
    
    // 为每个关闭按钮添加点击事件
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // 点击模态框外部关闭模态框
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });
}

// 初始化表单验证
function initFormValidation() {
    // 表单提交事件处理
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // 基本表单验证
            if (!this.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                alert('请填写所有必填字段');
            }
        });
    });
}

// 通用的AJAX请求函数
window.ajaxRequest = function(method, url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            callback(null, response);
        } else {
            callback(new Error(`请求失败: ${xhr.status}`), null);
        }
    };
    
    xhr.onerror = function() {
        callback(new Error('网络错误'), null);
    };
    
    xhr.send(JSON.stringify(data));
}

// 显示加载状态
window.showLoading = function(element) {
    element.innerHTML = '<p>加载中...</p>';
}

// 隐藏加载状态
window.hideLoading = function(element) {
    element.innerHTML = '';
}

// 初始化证书懒加载
function initCertificateLazyLoad() {
    // 获取所有证书图片容器
    const certificateImages = document.querySelectorAll('.certificate-image');
    
    // 为每个证书图片容器添加点击事件
    certificateImages.forEach(container => {
        container.addEventListener('click', function() {
            // 获取证书图片URL
            const imageUrl = this.dataset.src;
            // 显示证书大图
            showCertificateModal(imageUrl);
        });
    });
}

// 显示证书大图模态框
function showCertificateModal(imageUrl) {
    // 创建模态框元素
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.zIndex = '3000';
    
    // 创建模态框内容
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.maxWidth = '80%';
    modalContent.style.maxHeight = '80%';
    modalContent.style.overflow = 'auto';
    
    // 创建关闭按钮
    const closeButton = document.createElement('span');
    closeButton.className = 'close';
    closeButton.innerHTML = '&times;';
    
    // 创建图片元素
    const image = document.createElement('img');
    image.src = imageUrl;
    image.style.maxWidth = '100%';
    image.style.maxHeight = '80vh';
    image.style.display = 'block';
    image.style.margin = '0 auto';
    
    // 添加加载状态
    const loadingText = document.createElement('p');
    loadingText.textContent = '图片加载中...';
    loadingText.style.textAlign = 'center';
    loadingText.style.margin = '2rem 0';
    modalContent.appendChild(loadingText);
    
    // 图片加载完成后隐藏加载状态
    image.onload = function() {
        modalContent.removeChild(loadingText);
        modalContent.appendChild(image);
    };
    
    // 图片加载失败处理
    image.onerror = function() {
        loadingText.textContent = '图片加载失败，点击关闭';
        // 模拟图片（实际项目中可替换为默认图片）
        image.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="%23666" text-anchor="middle" dy=".3em"%3E证书图片%3C/text%3E%3C/svg%3E';
        modalContent.removeChild(loadingText);
        modalContent.appendChild(image);
    };
    
    // 组装模态框
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // 显示模态框
    modal.style.display = 'block';
    
    // 关闭模态框功能
    function closeModal() {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    }
    
    // 点击关闭按钮
    closeButton.addEventListener('click', closeModal);
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}

// 初始化平滑滚动
function initSmoothScroll() {
    // 为所有内部链接添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 移除页内滚动指示器功能，保持界面简洁

// 初始化表单即时反馈
function initFormRealTimeFeedback() {
    // 获取所有表单
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // 获取所有表单字段
        const fields = form.querySelectorAll('input, select, textarea');
        
        fields.forEach(field => {
            // 添加输入事件监听器
            field.addEventListener('input', function() {
                validateField(this);
            });
            
            // 添加失焦事件监听器
            field.addEventListener('blur', function() {
                validateField(this);
            });
        });
        
        // 表单提交时验证所有字段
        form.addEventListener('submit', function(e) {
            let isValid = true;
            fields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });
    
    // 字段验证函数
    function validateField(field) {
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message') || document.createElement('span');
        errorMessage.className = 'error-message';
        
        // 清除之前的错误信息
        formGroup.classList.remove('error', 'success');
        
        // 检查必填字段
        if (field.required && !field.value.trim()) {
            errorMessage.textContent = '此字段为必填项';
            formGroup.classList.add('error');
            formGroup.appendChild(errorMessage);
            return false;
        }
        
        // 检查电子邮箱格式
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                errorMessage.textContent = '请输入有效的电子邮箱地址';
                formGroup.classList.add('error');
                formGroup.appendChild(errorMessage);
                return false;
            }
        }
        
        // 检查电话号码格式
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[0-9\s-+()]*$/;
            if (!phoneRegex.test(field.value)) {
                errorMessage.textContent = '请输入有效的电话号码';
                formGroup.classList.add('error');
                formGroup.appendChild(errorMessage);
                return false;
            }
        }
        
        // 验证通过
        formGroup.classList.add('success');
        if (errorMessage.parentNode === formGroup) {
            formGroup.removeChild(errorMessage);
        }
        return true;
    }
}

// 初始化元素动画
function initElementAnimations() {
    // 监听滚动事件，为进入视口的元素添加动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 为所有卡片元素添加初始样式和观察
    document.querySelectorAll('.card, .business-item, .info-item, .qualification-item, .photo-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}