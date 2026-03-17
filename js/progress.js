// 学习进度追踪逻辑
document.addEventListener('DOMContentLoaded', () => {
  // 学习路径标签切换
  const pathTabs = document.querySelectorAll('.path-tab');
  pathTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 移除所有active
      pathTabs.forEach(t => t.classList.remove('active'));
      // 添加当前active
      tab.classList.add('active');

      // 模拟加载不同路径的内容
      Toast.info(`已切换到「${tab.textContent}」学习路径`, 1500);
    });
  });

  // 节点状态更新模拟
  const nodeActions = document.querySelectorAll('.node-actions .btn-primary');
  nodeActions.forEach(btn => {
    btn.addEventListener('click', () => {
      const node = btn.closest('.timeline-node');
      const status = node.querySelector('.node-status');

      if (status.classList.contains('status-not-started')) {
        status.textContent = '学习中';
        status.classList.remove('status-not-started');
        status.classList.add('status-in-progress');
        Toast.success('开始学习该节点');
      } else if (status.classList.contains('status-in-progress')) {
        status.textContent = '已完成';
        status.classList.remove('status-in-progress');
        status.classList.add('status-completed');
        Toast.success('恭喜完成该节点学习！');
      }
    });
  });
});