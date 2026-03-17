// 本地存储工具类
const StorageUtil = {
  // 保存数据
  set(key, value) {
    localStorage.setItem(`give_me_${key}`, JSON.stringify(value));
  },

  // 获取数据
  get(key) {
    const data = localStorage.getItem(`give_me_${key}`);
    return data ? JSON.parse(data) : null;
  },

  // 删除数据
  remove(key) {
    localStorage.removeItem(`give_me_${key}`);
  },

  // 清空所有数据
  clear() {
    localStorage.clear();
  }
};

// 时间格式化工具
const DateUtil = {
  // 格式化时间为 YYYY-MM-DD HH:mm:ss
  format(date = new Date()) {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },

  // 补零
  padZero(num) {
    return num < 10 ? `0${num}` : num;
  },

  // 计算时间差（友好显示）
  getTimeAgo(timestamp) {
    const now = new Date().getTime();
    const diff = now - timestamp;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 12 * month;

    if (diff < minute) {
      return '刚刚';
    } else if (diff < hour) {
      return `${Math.floor(diff / minute)}分钟前`;
    } else if (diff < day) {
      return `${Math.floor(diff / hour)}小时前`;
    } else if (diff < week) {
      return `${Math.floor(diff / day)}天前`;
    } else if (diff < month) {
      return `${Math.floor(diff / week)}周前`;
    } else if (diff < year) {
      return `${Math.floor(diff / month)}个月前`;
    } else {
      return `${Math.floor(diff / year)}年前`;
    }
  }
};

// 消息提示工具
const Toast = {
  // 显示提示
  show(message, type = 'info', duration = 3000) {
    // 创建toast元素
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.color = 'white';
    toast.style.zIndex = '9999';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    toast.style.fontSize = '14px';

    // 设置不同类型的背景色
    switch(type) {
      case 'success':
        toast.style.backgroundColor = 'var(--success)';
        break;
      case 'error':
        toast.style.backgroundColor = 'var(--danger)';
        break;
      case 'warning':
        toast.style.backgroundColor = 'var(--warning)';
        break;
      default:
        toast.style.backgroundColor = 'var(--primary)';
    }

    toast.textContent = message;
    document.body.appendChild(toast);

    // 显示toast
    setTimeout(() => {
      toast.style.opacity = '1';
    }, 10);

    // 隐藏toast
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, duration);
  },

  success(message, duration) {
    this.show(message, 'success', duration);
  },

  error(message, duration) {
    this.show(message, 'error', duration);
  },

  warning(message, duration) {
    this.show(message, 'warning', duration);
  },

  info(message, duration) {
    this.show(message, 'info', duration);
  }
};

// 防抖函数
function debounce(func, wait = 500) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// 节流函数
function throttle(func, wait = 500) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime > wait) {
      lastTime = now;
      func.apply(this, args);
    }
  };
}

// 折叠面板初始化
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const icon = item.querySelector('.accordion-icon');

    header.addEventListener('click', () => {
      // 关闭其他面板
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-icon').textContent = '▼';
        }
      });

      // 切换当前面板
      item.classList.toggle('active');
      icon.textContent = item.classList.contains('active') ? '▲' : '▼';
    });
  });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  // 初始化折叠面板
  if (document.querySelector('.accordion')) {
    initAccordion();
  }

  // 初始化新手引导
  initGuideModal();

  // 初始化进度条动画
  initProgressBars();
});

// 新手引导初始化
function initGuideModal() {
  const guideModal = document.getElementById('guideModal');
  const guideClose = document.getElementById('guideClose');
  const hasShownGuide = StorageUtil.get('has_shown_guide');

  // 如果是首次访问，显示引导
  if (!hasShownGuide && guideModal) {
    setTimeout(() => {
      guideModal.classList.add('active');
    }, 1000);

    // 标记已显示
    StorageUtil.set('has_shown_guide', true);
  }

  // 关闭引导
  if (guideClose) {
    guideClose.addEventListener('click', () => {
      if (guideModal) {
        guideModal.classList.remove('active');
      }
    });
  }
}

// 进度条动画初始化
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');

  progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';

    setTimeout(() => {
      bar.style.width = width;
    }, 300);
  });
}

// 导出全局变量
window.StorageUtil = StorageUtil;
window.DateUtil = DateUtil;
window.Toast = Toast;
window.debounce = debounce;
window.throttle = throttle;
window.initAccordion = initAccordion;