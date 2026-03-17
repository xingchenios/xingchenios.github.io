// 错题本功能逻辑
document.addEventListener('DOMContentLoaded', () => {
  // 错题筛选标签点击
  const filterTags = document.querySelectorAll('.error-filter .filter-tag');
  filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
      // 移除所有active
      filterTags.forEach(t => t.classList.remove('active'));
      // 添加当前active
      tag.classList.add('active');

      // 这里可以添加筛选逻辑
      Toast.info(`已筛选：${tag.textContent}`, 1500);
    });
  });

  // 重做错题按钮
  const redoBtns = document.querySelectorAll('.error-actions .btn-outline');
  redoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      Toast.info('正在跳转到题目页面...', 1500);
      // 实际项目中这里会跳转到对应的题目页面
    });
  });

  // 删除错题按钮
  const deleteBtns = document.querySelectorAll('.error-actions .btn-danger');
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('确定要从错题本中删除这道题吗？')) {
        const errorItem = btn.closest('.error-item');
        errorItem.style.opacity = '0';
        setTimeout(() => {
          errorItem.remove();
          Toast.success('错题已删除');
        }, 300);
      }
    });
  });
});