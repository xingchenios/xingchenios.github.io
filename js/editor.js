// 代码编辑器核心功能
class CodeEditor {
  constructor(options) {
    this.editor = document.getElementById(options.editorId);
    this.inputArea = document.getElementById(options.inputId);
    this.outputArea = document.getElementById(options.outputId);
    this.languageSelect = document.getElementById(options.languageId);
    this.runButton = document.getElementById(options.runBtnId);
    this.resetButton = document.getElementById(options.resetBtnId);
    this.saveButton = document.getElementById(options.saveBtnId);

    // 默认代码模板
    this.defaultCode = {
      python: `# Python 示例代码 - 冒泡排序
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# 测试数据
test_array = [64, 34, 25, 12, 22, 11, 90]
print("原始数组:", test_array)
sorted_array = bubble_sort(test_array)
print("排序后:", sorted_array)`,

      javascript: `// JavaScript 示例代码 - 冒泡排序
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换元素
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// 测试数据
const testArray = [64, 34, 25, 12, 22, 11, 90];
console.log("原始数组:", testArray);
const sortedArray = bubbleSort(testArray);
console.log("排序后:", sortedArray);`,

      c: `// C语言示例代码 - 冒泡排序
#include <stdio.h>

void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换元素
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int test_array[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(test_array) / sizeof(test_array[0]);

    printf("原始数组: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", test_array[i]);
    }
    printf("\\n");

    bubble_sort(test_array, n);

    printf("排序后: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", test_array[i]);
    }
    printf("\\n");

    return 0;
}`,

      java: `// Java 示例代码 - 冒泡排序
public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // 交换元素
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    public static void main(String[] args) {
        int[] testArray = {64, 34, 25, 12, 22, 11, 90};

        System.out.print("原始数组: ");
        for (int num : testArray) {
            System.out.print(num + " ");
        }
        System.out.println();

        bubbleSort(testArray);

        System.out.print("排序后: ");
        for (int num : testArray) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`
    };

    // 初始化
    this.init();
  }

  // 初始化编辑器
  init() {
    // 设置默认代码
    this.setDefaultCode('python');

    // 绑定事件
    this.bindEvents();

    // 语法高亮
    this.highlightSyntax();
  }

  // 设置默认代码
  setDefaultCode(language) {
    if (this.editor && this.defaultCode[language]) {
      this.editor.value = this.defaultCode[language];
    }
  }

  // 绑定事件
  bindEvents() {
    // 语言切换
    if (this.languageSelect) {
      this.languageSelect.addEventListener('change', (e) => {
        this.setDefaultCode(e.target.value);
        this.highlightSyntax();
      });
    }

    // 运行代码
    if (this.runButton) {
      this.runButton.addEventListener('click', () => {
        this.runCode();
      });
    }

    // 重置代码
    if (this.resetButton) {
      this.resetButton.addEventListener('click', () => {
        if (this.languageSelect) {
          this.setDefaultCode(this.languageSelect.value);
          this.highlightSyntax();
        }
        this.clearOutput();
      });
    }

    // 保存代码
    if (this.saveButton) {
      this.saveButton.addEventListener('click', () => {
        this.saveCode();
      });
    }

    // 代码编辑时实时高亮
    if (this.editor) {
      this.editor.addEventListener('input', debounce(() => {
        this.highlightSyntax();
      }, 300));
    }
  }

  // 运行代码（模拟）
  runCode() {
    if (!this.editor || !this.outputArea) return;

    this.clearOutput();

    const language = this.languageSelect ? this.languageSelect.value : 'python';
    const code = this.editor.value;
    const input = this.inputArea ? this.inputArea.value : '';

    // 显示运行中
    this.outputArea.textContent = '正在运行代码...';
    this.outputArea.className = 'output-area';

    // 模拟运行延迟
    setTimeout(() => {
      try {
        // 根据不同语言模拟运行结果
        let output = '';

        switch(language) {
          case 'python':
            output = this.runPythonCode(code, input);
            break;
          case 'javascript':
            output = this.runJavaScriptCode(code, input);
            break;
          case 'c':
            output = this.runCCode(code, input);
            break;
          case 'java':
            output = this.runJavaCode(code, input);
            break;
          default:
            output = '暂不支持该语言的运行';
        }

        // 显示运行结果
        this.outputArea.textContent = output;
        this.outputArea.classList.add('output-success');

        // 提示成功
        Toast.success('代码运行成功！');

      } catch (error) {
        // 显示错误信息
        this.outputArea.textContent = `运行错误: ${error.message}`;
        this.outputArea.classList.add('output-error');

        // 提示错误
        Toast.error('代码运行出错！');
      }
    }, 1000);
  }

  // 模拟运行Python代码
  runPythonCode(code, input) {
    // 简单模拟Python运行
    if (code.includes('bubble_sort')) {
      return `原始数组: [64, 34, 25, 12, 22, 11, 90]
排序后: [11, 12, 22, 25, 34, 64, 90]
✅ 代码运行成功！`;
    }
    return `📝 输入: ${input || '无'}
📤 输出: Python代码执行完成
✅ 代码运行成功！`;
  }

  // 模拟运行JavaScript代码
  runJavaScriptCode(code, input) {
    if (code.includes('bubbleSort')) {
      return `原始数组: [64, 34, 25, 12, 22, 11, 90]
排序后: [11, 12, 22, 25, 34, 64, 90]
✅ 代码运行成功！`;
    }
    return `📝 输入: ${input || '无'}
📤 输出: JavaScript代码执行完成
✅ 代码运行成功！`;
  }

  // 模拟运行C代码
  runCCode(code, input) {
    if (code.includes('bubble_sort')) {
      return `原始数组: 64 34 25 12 22 11 90
排序后: 11 12 22 25 34 64 90
✅ 代码运行成功！`;
    }
    return `📝 输入: ${input || '无'}
📤 输出: C代码执行完成
✅ 代码运行成功！`;
  }

  // 模拟运行Java代码
  runJavaCode(code, input) {
    if (code.includes('bubbleSort')) {
      return `原始数组: 64 34 25 12 22 11 90
排序后: 11 12 22 25 34 64 90
✅ 代码运行成功！`;
    }
    return `📝 输入: ${input || '无'}
📤 输出: Java代码执行完成
✅ 代码运行成功！`;
  }

  // 保存代码到本地存储
  saveCode() {
    if (!this.editor) return;

    const language = this.languageSelect ? this.languageSelect.value : 'python';
    const code = this.editor.value;
    const timestamp = new Date().getTime();

    // 构造代码对象
    const codeObj = {
      id: `code_${timestamp}`,
      language: language,
      content: code,
      createTime: timestamp,
      updateTime: timestamp
    };

    // 获取已保存的代码列表
    const savedCodes = StorageUtil.get('saved_codes') || [];
    savedCodes.unshift(codeObj);

    // 保存到本地存储
    StorageUtil.set('saved_codes', savedCodes);

    // 提示保存成功
    Toast.success('代码保存成功！');
  }

  // 清空输出
  clearOutput() {
    if (this.outputArea) {
      this.outputArea.textContent = '';
      this.outputArea.className = 'output-area';
    }
  }

  // 语法高亮（简单实现）
  highlightSyntax() {
    // 实际项目中建议使用CodeMirror/Monaco Editor
    // 这里做简单的样式模拟
    if (!this.editor) return;

    // 保存光标位置
    const cursorPos = this.editor.selectionStart;

    // 简单的语法高亮（仅视觉效果）
    const code = this.editor.value;

    // 恢复原始文本（移除高亮标记）
    this.editor.value = code;

    // 提示用户
    Toast.info('语法高亮已更新', 1000);
  }
}

// 页面加载完成后初始化编辑器
document.addEventListener('DOMContentLoaded', () => {
  // 初始化代码编辑器
  if (document.getElementById('codeEditor')) {
    new CodeEditor({
      editorId: 'codeEditor',
      inputId: 'inputArea',
      outputId: 'outputArea',
      languageId: 'languageSelect',
      runBtnId: 'runBtn',
      resetBtnId: 'resetBtn',
      saveBtnId: 'saveBtn'
    });
  }
});