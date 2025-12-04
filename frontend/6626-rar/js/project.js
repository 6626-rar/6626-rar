// 项目咨询表单处理
document.addEventListener('DOMContentLoaded', function() {
    // 获取表单和模态窗口元素
    const projectForm = document.getElementById('project-form');
    const resultModal = document.getElementById('project-result-modal');
    const closeButton = resultModal.querySelector('.close');
    const departmentContact = document.getElementById('department-contact');
    const caseStudies = document.getElementById('case-studies');
    
    // 部门联系方式数据
    const departmentContacts = {
        '建筑设计': {
            name: '建筑设计部',
            phone: '0856-1234567',
            email: 'architecture@example.com',
            address: '贵州省铜仁市碧江区河西西外环路282号御景阳光山庄31栋1-2号门面'
        },
        '市政工程': {
            name: '市政工程部',
            phone: '0856-2345678',
            email: 'municipal@example.com',
            address: '贵州省铜仁市碧江区河西西外环路282号御景阳光山庄31栋1-2号门面'
        },
        '工程监理': {
            name: '工程监理部',
            phone: '0856-3456789',
            email: 'supervision@example.com',
            address: '贵州省铜仁市碧江区河西西外环路282号御景阳光山庄31栋1-2号门面'
        },
        '工程勘察': {
            name: '工程勘察部',
            phone: '0856-4567890',
            email: 'survey@example.com',
            address: '贵州省铜仁市碧江区河西西外环路282号御景阳光山庄31栋1-2号门面'
        },
        '工程测绘': {
            name: '工程测绘部',
            phone: '0856-5678901',
            email: 'mapping@example.com',
            address: '贵州省铜仁市碧江区河西西外环路282号御景阳光山庄31栋1-2号门面'
        },
        '工程咨询': {
            name: '工程咨询部',
            phone: '0856-6789012',
            email: 'consulting@example.com',
            address: '贵州省铜仁市碧江区河西西外环路282号御景阳光山庄31栋1-2号门面'
        }
    };
    
    // 优秀案例数据
    const caseStudiesData = {
        '建筑设计': [
            {
                id: 1,
                name: '铜仁市XX小区建设项目',
                description: '该项目位于铜仁市碧江区，总建筑面积约10万平方米，包含住宅、商业等业态。',
                image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="250" height="150" viewBox="0 0 250 150"%3E%3Crect width="250" height="150" fill="%23f5f5f5"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="14" fill="%23666" text-anchor="middle" dy=".3em"%3E建筑设计案例%3C/text%3E%3Ctext x="50%25" y="65%25" font-family="Arial" font-size="12" fill="%23666" text-anchor="middle" dy=".3em"%3E铜仁市XX小区建设项目%3C/text%3E%3C/svg%3E'
            },
            {
                id: 2,
                name: '铜仁市XX商业综合体',
                description: '该项目位于铜仁市市中心，总建筑面积约15万平方米，包含购物中心、写字楼等业态。',
                image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="250" height="150" viewBox="0 0 250 150"%3E%3Crect width="250" height="150" fill="%23f5f5f5"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="14" fill="%23666" text-anchor="middle" dy=".3em"%3E建筑设计案例%3C/text%3E%3Ctext x="50%25" y="65%25" font-family="Arial" font-size="12" fill="%23666" text-anchor="middle" dy=".3em"%3E铜仁市XX商业综合体%3C/text%3E%3C/svg%3E'
            }
        ],
        '市政工程': [
            {
                id: 3,
                name: '铜仁市XX道路拓宽工程',
                description: '该项目为城市主干道拓宽工程，全长约5公里，提升城市交通通行能力。',
                image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="250" height="150" viewBox="0 0 250 150"%3E%3Crect width="250" height="150" fill="%23f5f5f5"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="14" fill="%23666" text-anchor="middle" dy=".3em"%3E市政工程案例%3C/text%3E%3Ctext x="50%25" y="65%25" font-family="Arial" font-size="12" fill="%23666" text-anchor="middle" dy=".3em"%3E铜仁市XX道路拓宽工程%3C/text%3E%3C/svg%3E'
            }
        ],
        '工程监理': [
            {
                id: 4,
                name: '铜仁市XX工厂建设监理',
                description: '该项目为工业厂房建设，总建筑面积约5万平方米，提供全过程监理服务。',
                image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="250" height="150" viewBox="0 0 250 150"%3E%3Crect width="250" height="150" fill="%23f5f5f5"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="14" fill="%23666" text-anchor="middle" dy=".3em"%3E工程监理案例%3C/text%3E%3Ctext x="50%25" y="65%25" font-family="Arial" font-size="12" fill="%23666" text-anchor="middle" dy=".3em"%3E铜仁市XX工厂建设监理%3C/text%3E%3C/svg%3E'
            }
        ],
        '工程勘察': [
            {
                id: 5,
                name: '铜仁市XX山体滑坡勘察',
                description: '该项目为地质灾害勘察，提供详细的地质勘察报告和防治建议。',
                image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="250" height="150" viewBox="0 0 250 150"%3E%3Crect width="250" height="150" fill="%23f5f5f5"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="14" fill="%23666" text-anchor="middle" dy=".3em"%3E工程勘察案例%3C/text%3E%3Ctext x="50%25" y="65%25" font-family="Arial" font-size="12" fill="%23666" text-anchor="middle" dy=".3em"%3E铜仁市XX山体滑坡勘察%3C/text%3E%3C/svg%3E'
            }
        ],
        '工程测绘': [
            {
                id: 6,
                name: '铜仁市XX区域地形图测绘',
                description: '该项目为城市区域地形图测绘，提供高精度的地形数据。',
                image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="250" height="150" viewBox="0 0 250 150"%3E%3Crect width="250" height="150" fill="%23f5f5f5"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="14" fill="%23666" text-anchor="middle" dy=".3em"%3E工程测绘案例%3C/text%3E%3Ctext x="50%25" y="65%25" font-family="Arial" font-size="12" fill="%23666" text-anchor="middle" dy=".3em"%3E铜仁市XX区域地形图测绘%3C/text%3E%3C/svg%3E'
            }
        ],
        '工程咨询': [
            {
                id: 7,
                name: '铜仁市XX项目可行性研究',
                description: '该项目为大型建设项目可行性研究，提供详细的可行性分析报告。',
                image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="250" height="150" viewBox="0 0 250 150"%3E%3Crect width="250" height="150" fill="%23f5f5f5"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="14" fill="%23666" text-anchor="middle" dy=".3em"%3E工程咨询案例%3C/text%3E%3Ctext x="50%25" y="65%25" font-family="Arial" font-size="12" fill="%23666" text-anchor="middle" dy=".3em"%3E铜仁市XX项目可行性研究%3C/text%3E%3C/svg%3E'
            }
        ]
    };
    
    // 表单提交事件处理
    projectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(this);
        const projectType = formData.get('project-type');
        
        // 生成部门联系方式HTML
        const contact = departmentContacts[projectType];
        departmentContact.innerHTML = `
            <div style="background-color: #f8f9fa; padding: 1.5rem; border-radius: 8px;">
                <p><strong>部门名称：</strong>${contact.name}</p>
                <p><strong>联系电话：</strong>${contact.phone}</p>
                <p><strong>电子邮箱：</strong>${contact.email}</p>
                <p><strong>办公地址：</strong>${contact.address}</p>
            </div>
        `;
        
        // 生成优秀案例HTML
        const cases = departmentContacts[projectType] ? caseStudiesData[projectType] : caseStudiesData['建筑设计'];
        let casesHtml = '';
        
        cases.forEach(caseStudy => {
            casesHtml += `
                <div style="background-color: #f8f9fa; padding: 1.5rem; border-radius: 8px;">
                    <div style="width: 100%; height: 150px; overflow: hidden; margin-bottom: 1rem;">
                        <img src="${caseStudy.image}" alt="${caseStudy.name}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <h5 style="margin-bottom: 0.5rem;">${caseStudy.name}</h5>
                    <p style="font-size: 0.9rem; color: #6c757d;">${caseStudy.description}</p>
                </div>
            `;
        });
        
        caseStudies.innerHTML = casesHtml;
        
        // 显示模态窗口
        resultModal.style.display = 'block';
        
        // 重置表单
        this.reset();
    });
    
    // 关闭模态窗口
    closeButton.addEventListener('click', function() {
        resultModal.style.display = 'none';
    });
    
    // 点击模态窗口外部关闭模态窗口
    window.addEventListener('click', function(event) {
        if (event.target === resultModal) {
            resultModal.style.display = 'none';
        }
    });
});